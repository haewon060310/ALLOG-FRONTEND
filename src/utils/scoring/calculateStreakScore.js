import { CONSECUTIVE_SUCCESS_SCORES } from '../../constants/policies.js';

export function calculateStreakScore(days) {
  if (!Number.isFinite(days) || days <= 0) {
    return 0;
  }

  const completedDays = Math.floor(days);
  const scoreKey = Math.min(completedDays, 6);

  return CONSECUTIVE_SUCCESS_SCORES[scoreKey] ?? 0;
}
