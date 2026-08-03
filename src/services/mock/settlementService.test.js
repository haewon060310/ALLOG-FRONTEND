import { beforeEach, describe, expect, test } from 'vitest';
import { ERROR_CODES } from '../../constants/errorCodes.js';
import { SETTLEMENT_STATUS, VERIFICATION_STATUS } from '../../constants/status.js';
import { createSettlementService } from './settlementService.js';

describe('settlementService', () => {
  let service;
  let input;

  beforeEach(() => {
    service = createSettlementService({
      createId: (type, sequence) => `${type}-${sequence}`,
      now: () => '2026-08-03T00:00:00.000Z',
    });
    input = {
      challengeId: 'challenge-1',
      idempotencyKey: 'settlement-1',
      verifications: [
        { id: 'verification-1', status: VERIFICATION_STATUS.FINAL_APPROVED },
        { id: 'verification-2', status: VERIFICATION_STATUS.FINAL_REJECTED },
        { id: 'verification-3', status: VERIFICATION_STATUS.PROVISIONALLY_APPROVED },
      ],
      scoreResult: { heartReward: 1, pointReward: 100 },
      groupSuccessResult: { rate: 80, isSuccess: true },
    };
  });

  test('첫 정산 요청을 완료한다', () => {
    const result = service.createSettlement(input);

    expect(result.settlement.status).toBe(SETTLEMENT_STATUS.COMPLETED);
  });

  test('같은 키로 다시 요청하면 같은 정산 ID를 반환한다', () => {
    const first = service.createSettlement(input);
    const second = service.createSettlement(input);

    expect(second.settlement.id).toBe(first.settlement.id);
  });

  test('같은 키로 다시 요청해도 원장을 중복 생성하지 않는다', () => {
    service.createSettlement(input);
    const second = service.createSettlement(input);

    expect(second.heartLedger).toHaveLength(1);
    expect(second.pointLedger).toHaveLength(1);
  });

  test('다른 키라도 같은 챌린지는 기존 정산 결과를 반환한다', () => {
    const first = service.createSettlement(input);
    const second = service.createSettlement({ ...input, idempotencyKey: 'settlement-2' });

    expect(second.settlement.id).toBe(first.settlement.id);
    expect(second.heartLedger).toHaveLength(1);
  });

  test('미처리 검토가 있으면 정산을 차단한다', () => {
    const blockedInput = {
      ...input,
      verifications: [
        { id: 'verification-1', status: VERIFICATION_STATUS.OPERATOR_REVIEW },
      ],
    };

    expect(() => service.createSettlement(blockedInput))
      .toThrowError(expect.objectContaining({ code: ERROR_CODES.SETTLEMENT_BLOCKED }));
  });

  test('최종 승인 인증만 보상 대상에 포함한다', () => {
    const result = service.createSettlement(input);

    expect(result.settlement.approvedVerificationIds).toEqual(['verification-1']);
    expect(result.settlement.approvedVerificationCount).toBe(1);
  });

  test('임시 승인 인증은 확정 보상 대상에서 제외한다', () => {
    const result = service.createSettlement(input);

    expect(result.settlement.approvedVerificationIds).not.toContain('verification-3');
  });

  test('입력 오류 후 올바른 요청으로 재시도할 수 있다', () => {
    expect(() => service.createSettlement({ ...input, idempotencyKey: '' }))
      .toThrowError(expect.objectContaining({ code: ERROR_CODES.VALIDATION_ERROR }));

    expect(service.createSettlement(input).settlement.status).toBe(SETTLEMENT_STATUS.COMPLETED);
  });
});
