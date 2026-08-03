# 도메인 모델

## User

```js
{
  (id,
    email,
    nickname,
    onboardingCompleted,
    routinePreferences,
    coachingStyle,
    privacySettings,
    sanctionStatus,
    createdAt);
}
```

## HeartAccount

```js
{
  (userId, availableCount, reservedCount, updatedAt);
}
```

## HeartTransaction

```js
{
  (id,
    userId,
    type, // GRANT, RESERVE, SPEND, RETURN, EXPIRE, ADJUST
    source, // SIGNUP, GROUP_SUCCESS, RETRY_MISSION, OPERATOR
    amount,
    challengeId,
    reservationId,
    idempotencyKey,
    createdAt);
}
```

## HeartReservation

```js
{
  (id,
    userId,
    groupId,
    status, // RESERVED, SPENT, RETURNED, EXPIRED
    reservedAt,
    spentAt,
    releasedAt);
}
```

## GroupChallenge

```js
{
  (id,
    name,
    routineType,
    dailyTarget,
    durationDays,
    requiredHeartCount,
    minMembers,
    maxMembers,
    startMode, // SCHEDULED, EARLY_START_ALLOWED
    scheduledStartAt,
    verificationDeadline,
    successThreshold,
    status,
    fixedMemberCount,
    totalVerificationSlots,
    scorePolicyVersion,
    rewardPolicyVersion,
    verificationPolicyVersion);
}
```

## GroupMembership

```js
{
  (id,
    groupId,
    userId,
    status,
    personalTarget,
    joinedAt,
    startedAt,
    withdrawnAt,
    validVerificationCount,
    inactivityStatus);
}
```

## Verification

```js
{
  (id,
    challengeId,
    userId,
    routineId,
    mediaId,
    activityData,
    capturedAt,
    submittedAt,
    status,
    aiJobId,
    aiConfidence,
    aiReasons,
    anomalySignals,
    provisionalScore,
    finalScore);
}
```

## VerificationReview

```js
{
  (id,
    verificationId,
    type, // AUTO_REVIEW, RESUBMISSION, APPEAL, OPERATOR_REVIEW
    status,
    reasonCode,
    note,
    actorId,
    createdAt,
    decidedAt);
}
```

## Report

```js
{
  (id,
    verificationId,
    reporterId,
    reasonCode,
    description,
    status,
    reporterTrustSnapshot,
    createdAt);
}
```

## ScoreSnapshot

```js
{
  (id,
    challengeId,
    userId,
    totalScore,
    components,
    rank,
    groupSuccessRate,
    provisional,
    scorePolicyVersion,
    createdAt);
}
```

## ChallengeSettlement

```js
{
  (id,
    challengeId,
    status,
    reportDeadline,
    reviewDeadline,
    finalLeaderboard,
    finalGroupSuccessRate,
    rewardResult,
    settledAt,
    idempotencyKey);
}
```

## RetryMission

```js
{
  (id,
    userId,
    sourceChallengeId,
    failureReason,
    adjustedGoal,
    recommendedGroupId,
    steps,
    status,
    rewardGranted,
    completedAt);
}
```

## RewardPointTransaction

```js
{
  (id,
    userId,
    type, // PENDING, GRANT, USE, CANCEL, EXPIRE
    amount,
    source,
    challengeId,
    createdAt);
}
```

## Notification

```js
{
  (id, userId, type, title, message, read, createdAt);
}
```

## AuditLog

```js
{
  (id, actorId, action, targetType, targetId, reason, before, after, createdAt);
}
```
