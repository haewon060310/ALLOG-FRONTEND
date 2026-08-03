# API 명세

## 공통

### Base URL

```text
/api/v1
```

### 인증

- Access Token
- Refresh Token

### 권한

```text
USER
GROUP_OWNER
OPERATOR
ADMIN
```

### 성공 응답

```json
{
  "success": true,
  "data": {},
  "meta": {
    "requestId": "uuid",
    "timestamp": "2026-08-03T12:00:00Z"
  }
}
```

### 오류 응답

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자 표시 메시지",
    "details": {}
  },
  "meta": {
    "requestId": "uuid"
  }
}
```

### 공통 원칙

- 시간은 서버에서 UTC 저장, 화면에서 로컬 시간 표시
- 식별자는 UUID 권장
- 하트 예약·차감·반환, 그룹 시작, 정산, 보상 지급은 멱등성 적용
- AI 작업은 `jobId`와 상태를 반환
- 점수·보상·인증 정책 버전 저장
- 운영자 쓰기 API는 감사 로그 생성

---

## 인증·계정

| Method | Endpoint                | 기능                |
| ------ | ----------------------- | ------------------- |
| POST   | `/auth/signup`          | 회원가입            |
| POST   | `/auth/login`           | 로그인              |
| POST   | `/auth/refresh`         | 토큰 재발급         |
| GET    | `/users/me`             | 내 정보             |
| PUT    | `/users/me/onboarding`  | 온보딩 저장         |
| PUT    | `/users/me/preferences` | 코칭·공개 범위 설정 |

## 하트

| Method | Endpoint                                | 기능                |
| ------ | --------------------------------------- | ------------------- |
| GET    | `/hearts/balance`                       | 잔액과 예약 가능 수 |
| GET    | `/hearts/transactions`                  | 하트 원장           |
| POST   | `/groups/{groupId}/heart-reservations`  | 하트 예약           |
| DELETE | `/heart-reservations/{id}`              | 예약 해제           |
| POST   | `/groups/{groupId}/start`               | 그룹 시작과 차감    |
| POST   | `/groups/{groupId}/recruitment-failure` | 모집 실패와 반환    |

## 그룹

| Method | Endpoint                             | 기능           |
| ------ | ------------------------------------ | -------------- |
| GET    | `/groups/recommendations`            | AI 그룹 추천   |
| GET    | `/groups`                            | 그룹 탐색      |
| GET    | `/groups/{id}`                       | 그룹 상세      |
| POST   | `/groups`                            | 그룹 개설      |
| POST   | `/groups/{id}/memberships`           | 그룹 참가      |
| DELETE | `/groups/{id}/memberships/me`        | 참가 취소      |
| POST   | `/groups/{id}/early-start-consents`  | 빠른 시작 동의 |
| POST   | `/groups/{id}/recruitment-extension` | 모집 연장      |

## 챌린지 운영

| Method | Endpoint                      | 기능                       |
| ------ | ----------------------------- | -------------------------- |
| GET    | `/challenges/active`          | 참여 중 챌린지             |
| GET    | `/challenges/{id}/dashboard`  | 현황·성공률·순위·예상 보상 |
| GET    | `/challenges/{id}/members`    | 그룹원 상태                |
| POST   | `/challenges/{id}/cheers`     | 응원 전송                  |
| GET    | `/challenges/{id}/scoreboard` | 점수 근거와 순위           |

## 인증 판정

| Method | Endpoint                            | 기능              |
| ------ | ----------------------------------- | ----------------- |
| POST   | `/challenges/{id}/verifications`    | 인증 제출         |
| GET    | `/verifications/{id}`               | 인증 상태·AI 근거 |
| POST   | `/verifications/{id}/resubmissions` | 재인증            |
| GET    | `/verifications/{id}/history`       | 판정 이력         |

## 신고·이의·운영 검토

| Method | Endpoint                           | 기능             |
| ------ | ---------------------------------- | ---------------- |
| POST   | `/verifications/{id}/reports`      | 인증 신고        |
| GET    | `/reports/{id}`                    | 신고 상태        |
| POST   | `/verifications/{id}/appeals`      | 이의 제기        |
| GET    | `/operator/reviews`                | 운영자 검토 목록 |
| POST   | `/operator/reviews/{id}/decisions` | 최종 승인·반려   |

## 점수·정산·보상

| Method | Endpoint                         | 기능             |
| ------ | -------------------------------- | ---------------- |
| GET    | `/challenges/{id}/scores/me`     | 내 점수 상세     |
| GET    | `/challenges/{id}/group-success` | 고정 분모 성공률 |
| POST   | `/challenges/{id}/settlements`   | 정산 시작        |
| GET    | `/settlements/{id}`              | 정산 상태·결과   |
| GET    | `/rewards/transactions`          | 보상 원장        |

## AI

| Method | Endpoint               | 기능                  |
| ------ | ---------------------- | --------------------- |
| POST   | `/ai/coaching/daily`   | 일일 코칭             |
| POST   | `/ai/coaching/group`   | 그룹 코칭             |
| POST   | `/ai/risk-analysis`    | 이탈 위험             |
| POST   | `/ai/end-reports`      | 종료 리포트           |
| POST   | `/ai/failure-analysis` | 실패 분석과 목표 조정 |

## 재도전

| Method | Endpoint                      | 기능           |
| ------ | ----------------------------- | -------------- |
| GET    | `/retry/eligibility`          | 자격 확인      |
| POST   | `/retry/missions`             | 미션 생성      |
| PUT    | `/retry/missions/{id}/goal`   | 조정 목표 저장 |
| POST   | `/retry/missions/{id}/check`  | 사전 체크      |
| POST   | `/retry/missions/{id}/reward` | 하트 지급      |

## 리워드·알림

| Method | Endpoint                     | 기능        |
| ------ | ---------------------------- | ----------- |
| GET    | `/points/balance`            | 포인트 잔액 |
| GET    | `/coupons`                   | 쿠폰 목록   |
| POST   | `/coupons/{id}/exchange`     | 쿠폰 교환   |
| GET    | `/notifications`             | 알림 목록   |
| PATCH  | `/notifications/{id}/read`   | 읽음 처리   |
| PUT    | `/notifications/preferences` | 알림 설정   |

---

# 핵심 API 처리 규칙

## 그룹 참가

```text
POST /groups/{groupId}/memberships
```

사전 조건:

- 그룹 `RECRUITING`
- 정원과 자격 충족
- 사용 가능한 하트 존재
- 중복 참가 없음

처리:

- HeartReservation 생성
- Membership `CONFIRMED`
- 단일 트랜잭션

## 그룹 시작

```text
POST /groups/{groupId}/start
```

조건:

- 예약 시작형: 시작일 도달 AND 최소 인원
- 빠른 시작형: 최소 인원 AND 동의

처리:

- 그룹 `ACTIVE`
- 모든 예약 하트 `SPENT`
- 고정 인원과 전체 인증 슬롯 스냅샷 생성

## 인증 제출

```text
POST /challenges/{challengeId}/verifications
```

즉시 응답:

```json
{
  "verificationId": "uuid",
  "status": "ANALYZING",
  "aiJobId": "uuid"
}
```

AI 완료:

- `PROVISIONALLY_APPROVED`
- `NEEDS_REVIEW`
- `RESUBMISSION_REQUIRED`

## 운영자 최종 판정

```text
POST /operator/reviews/{reviewId}/decisions
```

반려 시:

- 인증 `FINAL_REJECTED`
- 점수, 순위, 성공률, 예상 보상 재계산
- 감사 로그 저장

## 최종 정산

```text
POST /challenges/{challengeId}/settlements
```

사전 조건:

- 신고 기간 종료
- 미처리 검토 없음 또는 운영자 강제 확정

처리:

- 최종 점수와 순위
- 최종 그룹 성공률
- 하트와 포인트
- 원장 생성

멱등성:

- 같은 요청은 동일한 `settlementId`와 결과 반환

## 재도전 미션

```text
POST /retry/missions
```

자격:

- 하트 0
- 예약 없음
- 최근 7일 미지급
- 제재 없음
