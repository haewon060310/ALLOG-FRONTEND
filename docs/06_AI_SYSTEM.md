# AI 기능 명세

## 1. 루틴 추천

입력:

- 관심 루틴
- 생활 패턴
- 수행 가능 시간
- 과거 실패 이유

출력:

- 권장 목표량
- 기간
- 수행 시간
- 추천 이유

제한:

- 의료 진단이나 치료 제안 금지
- 과도한 목표 차단

## 2. 그룹 추천

입력:

- 루틴
- 활동 시간대
- 난이도
- 경쟁 성향
- 과거 성공률
- 그룹 빈자리

출력:

```js
{
  recommendations: [
    {
      groupId,
      fitScore,
      reasons,
      cautions,
    },
  ];
}
```

실패 대체:

- 인기 그룹
- 활동 시간대
- 난이도 기반 규칙 추천

## 3. 인증 판정

입력:

- 사진·영상 또는 활동 데이터
- 목표 행동 조건
- 촬영·기록 시간
- 과거 인증 자료
- 중복·재사용 신호

출력:

```js
{
  (status, confidence, reasons, anomalySignals, suggestedNextAction);
}
```

가능 상태:

- PROVISIONALLY_APPROVED
- NEEDS_REVIEW
- RESUBMISSION_REQUIRED

원칙:

- AI 결과만으로 즉시 제재하거나 보상을 몰수하지 않음
- 불확실한 결과에는 재인증 또는 운영자 검토 경로 제공
- 사용자에게 판정 근거를 설명

## 4. 그룹 상황 코칭

입력:

- 개인 달성률과 순위
- 상위·하위 사용자 점수 차이
- 그룹 성공률
- 미인증 인원
- 마감 시간
- 예상 보상

출력:

- 현재 상태 근거
- 지금 해야 할 행동 한 가지
- 사용자 코칭 톤

금지:

- 조롱
- 공개 비난
- 의료적 판단
- 정의되지 않은 보상 배율
- 사실과 다른 보상 안내

## 5. 이탈 위험 분석

입력:

- 연속 미인증
- 접속 빈도
- 실패 시간대
- 코칭 반응
- 그룹 참여 패턴

출력:

- 위험도
- 주요 이유
- 적절한 개입 시점
- 추천 메시지

## 6. 종료 리포트

출력:

- 성공률
- 강한 시간대
- 실패 패턴
- 그룹 기여
- 획득 보상
- 다음 목표 추천

## 7. 실패 원인 분석과 재도전

입력:

- 이전 챌린지 인증 기록
- 실패 시간대
- 목표량
- 접속과 코칭 반응
- 그룹 활동

출력:

```js
{
  (failureReason,
    adjustedGoal,
    adjustedDeadline,
    recommendedDifficulty,
    recommendedGroup,
    missionSteps);
}
```

## 8. 비동기 처리

AI API는 즉시 최종 결과를 반환하지 않아도 된다.

```js
{
  jobId,
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED"
}
```

## 9. AI 장애 처리

- 인증: ANALYZING 유지 후 재시도
- 추천: 규칙 기반 추천
- 코칭: 템플릿 메시지
- 종료 리포트: 지표 기반 기본 리포트
- 타임아웃 시 `AI_TIMEOUT`
