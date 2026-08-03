import { ERROR_CODES } from '../../constants/errorCodes.js';
import {
  SETTLEMENT_STATUS,
  VERIFICATION_STATUS,
} from '../../constants/status.js';
import { ServiceError } from '../ServiceError.js';

const BLOCKING_VERIFICATION_STATUSES = new Set([
  VERIFICATION_STATUS.SUBMITTED,
  VERIFICATION_STATUS.ANALYZING,
  VERIFICATION_STATUS.NEEDS_REVIEW,
  VERIFICATION_STATUS.RESUBMISSION_REQUIRED,
  VERIFICATION_STATUS.APPEALED,
  VERIFICATION_STATUS.OPERATOR_REVIEW,
]);

function defaultCreateId(type, sequence) {
  return `${type}-${sequence}`;
}

function copyResult({ settlement, heartLedger, pointLedger }) {
  return {
    settlement: {
      ...settlement,
      approvedVerificationIds: [...settlement.approvedVerificationIds],
    },
    heartLedger: heartLedger.map((item) => ({ ...item })),
    pointLedger: pointLedger.map((item) => ({ ...item })),
  };
}

export function createSettlementService({
  createId = defaultCreateId,
  now = () => new Date().toISOString(),
} = {}) {
  const settlementStore = [];
  const heartLedger = [];
  const pointLedger = [];

  function createSettlement({
    challengeId,
    idempotencyKey,
    verifications = [],
    scoreResult = {},
    groupSuccessResult = {},
  } = {}) {
    if (!challengeId || !idempotencyKey || !Array.isArray(verifications)) {
      throw new ServiceError({
        code: ERROR_CODES.VALIDATION_ERROR,
        message: '정산 요청을 확인해 주세요.',
      });
    }

    const existingSettlement = settlementStore.find(
      (item) => item.challengeId === challengeId,
    );

    if (existingSettlement) {
      return copyResult({ settlement: existingSettlement, heartLedger, pointLedger });
    }

    const hasPendingReview = verifications.some((verification) =>
      BLOCKING_VERIFICATION_STATUSES.has(verification.status),
    );

    if (hasPendingReview) {
      throw new ServiceError({
        code: ERROR_CODES.SETTLEMENT_BLOCKED,
        message: '미처리 인증 검토가 남아 있습니다.',
      });
    }

    const approvedVerificationIds = verifications
      .filter(
        (verification) =>
          verification.status === VERIFICATION_STATUS.FINAL_APPROVED,
      )
      .map((verification) => verification.id);
    const settlement = {
      id: createId('settlement', settlementStore.length + 1),
      challengeId,
      idempotencyKey,
      status: SETTLEMENT_STATUS.COMPLETED,
      approvedVerificationIds,
      approvedVerificationCount: approvedVerificationIds.length,
      groupSuccessResult: { ...groupSuccessResult },
      settledAt: now(),
    };

    if (approvedVerificationIds.length > 0 && scoreResult.heartReward > 0) {
      heartLedger.push({
        id: createId('heart-ledger', heartLedger.length + 1),
        challengeId,
        amount: scoreResult.heartReward,
        settlementId: settlement.id,
      });
    }

    if (approvedVerificationIds.length > 0 && scoreResult.pointReward > 0) {
      pointLedger.push({
        id: createId('point-ledger', pointLedger.length + 1),
        challengeId,
        amount: scoreResult.pointReward,
        settlementId: settlement.id,
      });
    }

    settlementStore.push(settlement);

    return copyResult({ settlement, heartLedger, pointLedger });
  }

  return Object.freeze({ createSettlement });
}
