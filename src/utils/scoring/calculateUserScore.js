import { USER_SCORE_WEIGHTS } from '../../constants/policies.js';
import { calculateStreakScore } from './calculateStreakScore.js';

function clampRate(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), 100);
}

function roundScore(value) {
  return Math.round(value * 100) / 100;
}

function calculateWeightedScore(rate, weight) {
  return roundScore((clampRate(rate) / 100) * weight);
}

export function calculateUserScore({
  achievementRate = 0,
  onTimeRate = 0,
  streakDays = 0,
  verificationTrustRate = 0,
  groupContributionRate = 0,
  participationRate = 0,
} = {}) {
  const components = {
    achievement: calculateWeightedScore(
      achievementRate,
      USER_SCORE_WEIGHTS.GOAL_ACHIEVEMENT_RATE,
    ),
    onTime: calculateWeightedScore(
      onTimeRate,
      USER_SCORE_WEIGHTS.ON_TIME_VERIFICATION_RATE,
    ),
    streak: calculateStreakScore(streakDays),
    verificationTrust: calculateWeightedScore(
      verificationTrustRate,
      USER_SCORE_WEIGHTS.VERIFICATION_RELIABILITY,
    ),
    groupContribution: calculateWeightedScore(
      groupContributionRate,
      USER_SCORE_WEIGHTS.GROUP_CONTRIBUTION,
    ),
    participation: calculateWeightedScore(
      participationRate,
      USER_SCORE_WEIGHTS.CHEER_AND_PARTICIPATION,
    ),
  };

  const totalScore = roundScore(
    Object.values(components).reduce((total, score) => total + score, 0),
  );

  return {
    totalScore: Math.min(totalScore, 100),
    components,
  };
}
