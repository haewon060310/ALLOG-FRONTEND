import { describe, expect, test } from 'vitest';
import { calculateStreakScore } from './calculateStreakScore.js';

describe('calculateStreakScore', () => {
  test.each([
    [0, 0],
    [1, 3],
    [2, 5],
    [3, 8],
    [4, 10],
    [5, 12],
    [6, 15],
    [10, 15],
    [-1, 0],
    ['3', 0],
    [Number.NaN, 0],
  ])('%s일이면 %s점을 반환한다', (days, expected) => {
    expect(calculateStreakScore(days)).toBe(expected);
  });
});
