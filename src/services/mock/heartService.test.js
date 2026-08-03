import { beforeEach, describe, expect, test } from 'vitest';
import { ERROR_CODES } from '../../constants/errorCodes.js';
import { HEART_STATUS } from '../../constants/status.js';
import { ServiceError } from '../ServiceError.js';
import { createHeartService } from './heartService.js';

describe('heartService', () => {
  let service;

  beforeEach(() => {
    service = createHeartService({
      heartAccount: { userId: 'user-1', availableCount: 3, reservedCount: 0 },
      createId: (type, sequence) => `${type}-${sequence}`,
      now: () => '2026-08-03T00:00:00.000Z',
    });
  });

  test('하트를 예약하면 사용 가능 수가 줄고 예약 수가 증가한다', () => {
    const result = service.reserveHeart({
      userId: 'user-1',
      groupId: 'group-1',
      idempotencyKey: 'reserve-1',
    });

    expect(result.heartAccount).toMatchObject({ availableCount: 2, reservedCount: 1 });
    expect(result.reservation.status).toBe(HEART_STATUS.RESERVED);
  });

  test('사용 가능한 하트가 없으면 예약하지 않는다', () => {
    service = createHeartService({
      heartAccount: { userId: 'user-1', availableCount: 0, reservedCount: 0 },
    });

    expect(() => service.reserveHeart({ userId: 'user-1', groupId: 'group-1', idempotencyKey: 'reserve-1' }))
      .toThrowError(expect.objectContaining({ code: ERROR_CODES.HEART_NOT_AVAILABLE }));
  });

  test('같은 그룹에 다른 키로 중복 예약하면 거부한다', () => {
    service.reserveHeart({ userId: 'user-1', groupId: 'group-1', idempotencyKey: 'reserve-1' });

    expect(() => service.reserveHeart({ userId: 'user-1', groupId: 'group-1', idempotencyKey: 'reserve-2' }))
      .toThrowError(expect.objectContaining({ code: ERROR_CODES.HEART_ALREADY_RESERVED }));
  });

  test('같은 예약 키를 다시 사용해도 한 번만 차감한다', () => {
    const first = service.reserveHeart({ userId: 'user-1', groupId: 'group-1', idempotencyKey: 'reserve-1' });
    const second = service.reserveHeart({ userId: 'user-1', groupId: 'group-1', idempotencyKey: 'reserve-1' });

    expect(second).toEqual(first);
    expect(second.heartAccount).toMatchObject({ availableCount: 2, reservedCount: 1 });
  });

  test('예약 하트를 반환하면 원래 잔액으로 돌아온다', () => {
    const reserved = service.reserveHeart({ userId: 'user-1', groupId: 'group-1', idempotencyKey: 'reserve-1' });
    const returned = service.returnReservedHeart({ reservationId: reserved.reservation.id, idempotencyKey: 'return-1' });

    expect(returned.heartAccount).toMatchObject({ availableCount: 3, reservedCount: 0 });
    expect(returned.reservation.status).toBe(HEART_STATUS.RETURNED);
  });

  test('같은 반환 요청을 두 번 실행해도 잔액이 한 번만 증가한다', () => {
    const reserved = service.reserveHeart({ userId: 'user-1', groupId: 'group-1', idempotencyKey: 'reserve-1' });
    const first = service.returnReservedHeart({ reservationId: reserved.reservation.id, idempotencyKey: 'return-1' });
    const second = service.returnReservedHeart({ reservationId: reserved.reservation.id, idempotencyKey: 'return-1' });

    expect(second).toEqual(first);
    expect(second.heartAccount).toMatchObject({ availableCount: 3, reservedCount: 0 });
  });

  test('이미 반환된 예약을 다른 키로 요청해도 잔액이 증가하지 않는다', () => {
    const reserved = service.reserveHeart({ userId: 'user-1', groupId: 'group-1', idempotencyKey: 'reserve-1' });
    service.returnReservedHeart({ reservationId: reserved.reservation.id, idempotencyKey: 'return-1' });
    const result = service.returnReservedHeart({ reservationId: reserved.reservation.id, idempotencyKey: 'return-2' });

    expect(result.heartAccount).toMatchObject({ availableCount: 3, reservedCount: 0 });
  });

  test('존재하지 않는 예약 반환은 예측 가능한 오류를 발생시킨다', () => {
    expect(() => service.returnReservedHeart({ reservationId: 'missing', idempotencyKey: 'return-1' }))
      .toThrowError(ServiceError);
  });
});
