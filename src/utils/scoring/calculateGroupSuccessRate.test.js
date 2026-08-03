import { describe, expect, test } from 'vitest';
import { calculateGroupSuccessRate } from './calculateGroupSuccessRate.js';

describe('calculateGroupSuccessRate', () => {
  test('28회 인증은 35개 고정 슬롯에서 80%로 성공한다', () => {
    expect(
      calculateGroupSuccessRate({
        validVerificationCount: 28,
        totalVerificationSlots: 35,
      }),
    ).toEqual({ rate: 80, isSuccess: true });
  });

  test('27회 인증은 35개 고정 슬롯에서 77.14%로 실패한다', () => {
    expect(
      calculateGroupSuccessRate({
        validVerificationCount: 27,
        totalVerificationSlots: 35,
      }),
    ).toEqual({ rate: 77.14, isSuccess: false });
  });

  test.each([
    [35, 35, 100],
    [0, 35, 0],
    [36, 35, 100],
    [10, 0, 0],
  ])('%s회와 %s개 슬롯이면 성공률은 %s%%다', (count, slots, rate) => {
    expect(
      calculateGroupSuccessRate({
        validVerificationCount: count,
        totalVerificationSlots: slots,
      }).rate,
    ).toBe(rate);
  });

  test('무활동 사용자가 있어도 전달받은 고정 슬롯을 그대로 사용한다', () => {
    const result = calculateGroupSuccessRate({
      validVerificationCount: 28,
      totalVerificationSlots: 35,
      inactiveMemberCount: 1,
    });

    expect(result.rate).toBe(80);
  });
});
