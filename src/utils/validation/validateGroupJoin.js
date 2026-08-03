import { ERROR_CODES } from '../../constants/errorCodes.js';
import { GROUP_STATUS } from '../../constants/status.js';

const ERROR_MESSAGES = Object.freeze({
  [ERROR_CODES.VALIDATION_ERROR]: '참가 조건을 확인할 수 없습니다.',
  [ERROR_CODES.GROUP_ALREADY_STARTED]: '이미 시작된 그룹입니다.',
  [ERROR_CODES.GROUP_FULL]: '그룹 정원이 마감되었습니다.',
  [ERROR_CODES.ALREADY_JOINED]: '이미 참가한 그룹입니다.',
  [ERROR_CODES.HEART_ALREADY_RESERVED]:
    '이미 이 그룹에 하트를 예약했습니다.',
  [ERROR_CODES.FORBIDDEN]: '그룹 참가 자격을 충족하지 않습니다.',
  [ERROR_CODES.HEART_NOT_AVAILABLE]: '참가 가능한 하트가 부족합니다.',
});

function invalid(code) {
  return {
    valid: false,
    error: {
      code,
      message: ERROR_MESSAGES[code],
    },
  };
}

export function validateGroupJoin({
  group,
  user,
  heartAccount,
  existingMembership = null,
  existingHeartReservation = null,
} = {}) {
  if (!group || !user || !heartAccount) {
    return invalid(ERROR_CODES.VALIDATION_ERROR);
  }

  if (group.status !== GROUP_STATUS.RECRUITING) {
    return invalid(ERROR_CODES.GROUP_ALREADY_STARTED);
  }

  if (
    !Number.isFinite(group.memberCount) ||
    !Number.isFinite(group.maxMembers) ||
    group.memberCount >= group.maxMembers
  ) {
    return invalid(ERROR_CODES.GROUP_FULL);
  }

  if (existingMembership) {
    return invalid(ERROR_CODES.ALREADY_JOINED);
  }

  if (existingHeartReservation) {
    return invalid(ERROR_CODES.HEART_ALREADY_RESERVED);
  }

  if (user.eligible === false) {
    return invalid(ERROR_CODES.FORBIDDEN);
  }

  if (
    !Number.isFinite(heartAccount.availableCount) ||
    heartAccount.availableCount < 1
  ) {
    return invalid(ERROR_CODES.HEART_NOT_AVAILABLE);
  }

  return { valid: true, error: null };
}
