import {
  GROUP_SUCCESS_THRESHOLD,
  INITIAL_HEART_COUNT,
  MVP_CHALLENGE_DURATION_DAYS,
  MVP_GROUP_MEMBER_COUNT,
  MVP_REQUIRED_HEART_COUNT,
} from '../../constants/policies.js';
import {
  GROUP_STATUS,
  HEART_STATUS,
  VERIFICATION_STATUS,
} from '../../constants/status.js';

export const mockCurrentUser = Object.freeze({
  id: 'user-1',
  email: 'user@example.com',
  nickname: 'ALLOG 사용자',
  onboardingCompleted: true,
});

export const mockGroups = Object.freeze([
  {
    id: 'group-1',
    name: '7일 수분 루틴',
    routineType: 'WATER',
    durationDays: MVP_CHALLENGE_DURATION_DAYS,
    requiredHeartCount: MVP_REQUIRED_HEART_COUNT,
    maxMembers: MVP_GROUP_MEMBER_COUNT,
    memberCount: 3,
    successThreshold: GROUP_SUCCESS_THRESHOLD,
    status: GROUP_STATUS.RECRUITING,
  },
]);

export const mockChallenges = Object.freeze([
  {
    id: 'challenge-1',
    groupId: 'group-1',
    name: '7일 수분 루틴',
    durationDays: MVP_CHALLENGE_DURATION_DAYS,
    successThreshold: GROUP_SUCCESS_THRESHOLD,
    status: GROUP_STATUS.ACTIVE,
  },
]);

export const mockVerifications = Object.freeze([
  {
    id: 'verification-1',
    challengeId: 'challenge-1',
    userId: mockCurrentUser.id,
    status: VERIFICATION_STATUS.PROVISIONALLY_APPROVED,
  },
]);

export const mockHeartAccount = Object.freeze({
  userId: mockCurrentUser.id,
  availableCount: INITIAL_HEART_COUNT,
  reservedCount: 0,
  status: HEART_STATUS.AVAILABLE,
});

export const mockRewardPoints = Object.freeze({
  userId: mockCurrentUser.id,
  balance: 0,
});
