import { describe, expect, test } from 'vitest';
import { calculateUserScore } from './calculateUserScore.js';

describe('calculateUserScore', () => {
  test('모든 항목이 최대이면 총점은 100점이다', () => {
    const result = calculateUserScore({
      achievementRate: 100,
      onTimeRate: 100,
      streakDays: 6,
      verificationTrustRate: 100,
      groupContributionRate: 100,
      participationRate: 100,
    });

    expect(result.totalScore).toBe(100);
    expect(result.components).toEqual({
      achievement: 45,
      onTime: 15,
      streak: 15,
      verificationTrust: 10,
      groupContribution: 10,
      participation: 5,
    });
  });

  test('모든 항목이 0이면 총점은 0점이다', () => {
    expect(calculateUserScore({}).totalScore).toBe(0);
  });

  test('일부 값만 입력하면 해당 항목만 계산한다', () => {
    const result = calculateUserScore({ achievementRate: 50 });

    expect(result.totalScore).toBe(22.5);
    expect(result.components.achievement).toBe(22.5);
  });

  test('비율을 0에서 100 사이로 보정한다', () => {
    const result = calculateUserScore({
      achievementRate: 150,
      onTimeRate: -20,
    });

    expect(result.components.achievement).toBe(45);
    expect(result.components.onTime).toBe(0);
  });

  test('6일 이상 연속 성공은 15점이다', () => {
    const result = calculateUserScore({ streakDays: 10 });

    expect(result.components.streak).toBe(15);
  });

  test('신고 정확도는 점수 계산에 포함하지 않는다', () => {
    const result = calculateUserScore({ reportAccuracyRate: 100 });

    expect(result.totalScore).toBe(0);
    expect(result.components).not.toHaveProperty('reportAccuracy');
  });

  test('잘못된 값이 있어도 총점은 100점을 초과하지 않는다', () => {
    const result = calculateUserScore({
      achievementRate: Infinity,
      onTimeRate: 1000,
      streakDays: 100,
      verificationTrustRate: 1000,
      groupContributionRate: 1000,
      participationRate: 1000,
    });

    expect(result.totalScore).toBeLessThanOrEqual(100);
  });
});
