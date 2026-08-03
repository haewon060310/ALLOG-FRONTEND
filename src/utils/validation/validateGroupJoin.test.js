import { beforeEach, describe, expect, test } from 'vitest';
import { ERROR_CODES } from '../../constants/errorCodes.js';
import { GROUP_STATUS } from '../../constants/status.js';
import { validateGroupJoin } from './validateGroupJoin.js';

describe('validateGroupJoin', () => {
  let input;

  beforeEach(() => {
    input = {
      group: {
        status: GROUP_STATUS.RECRUITING,
        memberCount: 3,
        maxMembers: 5,
      },
      user: { id: 'user-1', eligible: true },
      heartAccount: { availableCount: 3 },
      existingMembership: null,
      existingHeartReservation: null,
    };
  });

  test('모든 조건을 충족하면 참가할 수 있다', () => {
    expect(validateGroupJoin(input)).toEqual({ valid: true, error: null });
  });

  test.each([
    ['하트가 부족하면 참가할 수 없다', { heartAccount: { availableCount: 0 } }, ERROR_CODES.HEART_NOT_AVAILABLE],
    ['정원이 마감되면 참가할 수 없다', { group: { status: GROUP_STATUS.RECRUITING, memberCount: 5, maxMembers: 5 } }, ERROR_CODES.GROUP_FULL],
    ['이미 시작한 그룹에는 참가할 수 없다', { group: { status: GROUP_STATUS.ACTIVE, memberCount: 3, maxMembers: 5 } }, ERROR_CODES.GROUP_ALREADY_STARTED],
    ['이미 참가한 그룹에는 다시 참가할 수 없다', { existingMembership: { id: 'membership-1' } }, ERROR_CODES.ALREADY_JOINED],
    ['이미 하트를 예약한 그룹에는 다시 예약할 수 없다', { existingHeartReservation: { id: 'reservation-1' } }, ERROR_CODES.HEART_ALREADY_RESERVED],
    ['참여 자격이 없으면 참가할 수 없다', { user: { id: 'user-1', eligible: false } }, ERROR_CODES.FORBIDDEN],
  ])('%s', (_, changes, expectedCode) => {
    const result = validateGroupJoin({ ...input, ...changes });

    expect(result.valid).toBe(false);
    expect(result.error.code).toBe(expectedCode);
  });

  test('필수 입력이 없으면 예측 가능한 검증 오류를 반환한다', () => {
    const result = validateGroupJoin({});

    expect(result.valid).toBe(false);
    expect(result.error.code).toBe(ERROR_CODES.VALIDATION_ERROR);
  });

  test('검증 순서상 그룹 상태 오류를 하트 부족보다 먼저 반환한다', () => {
    const result = validateGroupJoin({
      ...input,
      group: { ...input.group, status: GROUP_STATUS.ACTIVE },
      heartAccount: { availableCount: 0 },
    });

    expect(result.error.code).toBe(ERROR_CODES.GROUP_ALREADY_STARTED);
  });
});
