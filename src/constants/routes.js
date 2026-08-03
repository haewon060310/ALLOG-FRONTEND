export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ONBOARDING: '/onboarding',
  GROUPS: '/groups',
  GROUP_DETAIL: '/groups/:groupId',
  CHALLENGE_DETAIL: '/challenges/:challengeId',
  CHALLENGE_VERIFY: '/challenges/:challengeId/verify',
  VERIFICATION_DETAIL: '/verifications/:verificationId',
  REWARDS: '/rewards',
  RETRY: '/retry',
  RETRY_MISSION: '/retry/:missionId',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  OPERATOR_REVIEWS: '/operator/reviews',
};

export const createGroupDetailPath = (groupId) =>
  `/groups/${encodeURIComponent(groupId)}`;

export const createChallengeDetailPath = (challengeId) =>
  `/challenges/${encodeURIComponent(challengeId)}`;

export const createChallengeVerifyPath = (challengeId) =>
  `/challenges/${encodeURIComponent(challengeId)}/verify`;

export const createVerificationDetailPath = (verificationId) =>
  `/verifications/${encodeURIComponent(verificationId)}`;

export const createRetryMissionPath = (missionId) =>
  `/retry/${encodeURIComponent(missionId)}`;
