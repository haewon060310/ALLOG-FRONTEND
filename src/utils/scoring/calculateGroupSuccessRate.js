import { GROUP_SUCCESS_THRESHOLD } from '../../constants/policies.js';

function normalizeCount(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  return value;
}

export function calculateGroupSuccessRate({
  validVerificationCount = 0,
  totalVerificationSlots = 0,
} = {}) {
  const slots = normalizeCount(totalVerificationSlots);

  if (slots === 0) {
    return { rate: 0, isSuccess: false };
  }

  const validCount = Math.min(normalizeCount(validVerificationCount), slots);
  const rate = Math.round(((validCount / slots) * 100) * 100) / 100;

  return {
    rate,
    isSuccess: rate >= GROUP_SUCCESS_THRESHOLD,
  };
}
