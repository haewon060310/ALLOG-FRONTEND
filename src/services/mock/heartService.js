import { ERROR_CODES } from '../../constants/errorCodes.js';
import { HEART_STATUS } from '../../constants/status.js';
import { ServiceError } from '../ServiceError.js';

function defaultCreateId(type, sequence) {
  return `${type}-${sequence}`;
}

function copyResult(result) {
  return {
    heartAccount: { ...result.heartAccount },
    reservation: { ...result.reservation },
    transaction: { ...result.transaction },
  };
}

export function createHeartService({
  heartAccount,
  reservations = [],
  transactions = [],
  createId = defaultCreateId,
  now = () => new Date().toISOString(),
} = {}) {
  let account = { ...heartAccount };
  const reservationStore = reservations.map((item) => ({ ...item }));
  const transactionStore = transactions.map((item) => ({ ...item }));
  const idempotentResults = new Map();

  function reserveHeart({ userId, groupId, idempotencyKey } = {}) {
    if (!userId || !groupId || !idempotencyKey) {
      throw new ServiceError({
        code: ERROR_CODES.VALIDATION_ERROR,
        message: '하트 예약 요청을 확인해 주세요.',
      });
    }

    if (idempotentResults.has(idempotencyKey)) {
      return copyResult(idempotentResults.get(idempotencyKey));
    }

    const duplicateReservation = reservationStore.find(
      (reservation) =>
        reservation.userId === userId &&
        reservation.groupId === groupId &&
        reservation.status === HEART_STATUS.RESERVED,
    );

    if (duplicateReservation) {
      throw new ServiceError({
        code: ERROR_CODES.HEART_ALREADY_RESERVED,
        message: '이미 이 그룹에 하트를 예약했습니다.',
      });
    }

    if (!Number.isFinite(account.availableCount) || account.availableCount < 1) {
      throw new ServiceError({
        code: ERROR_CODES.HEART_NOT_AVAILABLE,
        message: '참가 가능한 하트가 부족합니다.',
      });
    }

    const reservation = {
      id: createId('heart-reservation', reservationStore.length + 1),
      userId,
      groupId,
      status: HEART_STATUS.RESERVED,
      reservedAt: now(),
    };
    const transaction = {
      id: createId('heart-transaction', transactionStore.length + 1),
      type: 'RESERVE',
      amount: 1,
      reservationId: reservation.id,
      idempotencyKey,
      createdAt: now(),
    };

    account = {
      ...account,
      availableCount: account.availableCount - 1,
      reservedCount: (account.reservedCount ?? 0) + 1,
    };
    reservationStore.push(reservation);
    transactionStore.push(transaction);

    const result = { heartAccount: account, reservation, transaction };
    idempotentResults.set(idempotencyKey, copyResult(result));

    return copyResult(result);
  }

  function returnReservedHeart({ reservationId, idempotencyKey } = {}) {
    if (!reservationId || !idempotencyKey) {
      throw new ServiceError({
        code: ERROR_CODES.VALIDATION_ERROR,
        message: '하트 반환 요청을 확인해 주세요.',
      });
    }

    if (idempotentResults.has(idempotencyKey)) {
      return copyResult(idempotentResults.get(idempotencyKey));
    }

    const reservation = reservationStore.find(
      (item) => item.id === reservationId,
    );

    if (!reservation) {
      throw new ServiceError({
        code: ERROR_CODES.VALIDATION_ERROR,
        message: '반환할 하트 예약을 찾을 수 없습니다.',
      });
    }

    if (reservation.status === HEART_STATUS.RETURNED) {
      const returnTransaction = transactionStore.find(
        (item) => item.type === 'RETURN' && item.reservationId === reservationId,
      );
      return copyResult({
        heartAccount: account,
        reservation,
        transaction: returnTransaction,
      });
    }

    if (reservation.status !== HEART_STATUS.RESERVED || account.reservedCount < 1) {
      throw new ServiceError({
        code: ERROR_CODES.VALIDATION_ERROR,
        message: '반환 가능한 하트 예약이 아닙니다.',
      });
    }

    reservation.status = HEART_STATUS.RETURNED;
    reservation.releasedAt = now();
    const transaction = {
      id: createId('heart-transaction', transactionStore.length + 1),
      type: 'RETURN',
      amount: 1,
      reservationId,
      idempotencyKey,
      createdAt: now(),
    };

    account = {
      ...account,
      availableCount: account.availableCount + 1,
      reservedCount: account.reservedCount - 1,
    };
    transactionStore.push(transaction);

    const result = { heartAccount: account, reservation, transaction };
    idempotentResults.set(idempotencyKey, copyResult(result));

    return copyResult(result);
  }

  return Object.freeze({ reserveHeart, returnReservedHeart });
}
