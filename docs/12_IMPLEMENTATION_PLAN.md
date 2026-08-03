# 구현 순서

디자인보다 기능 완성도를 우선한다. 각 단계가 끝날 때 mock 데이터로 흐름을 검증한다.

## 0단계 프로젝트 기반

- React Router 설치 및 라우팅
- 공통 Layout
- API client
- mock service
- constants와 상태값
- 환경 변수 예시
- 로컬 저장소 기반 임시 세션

완료 기준:

- 각 페이지로 이동 가능
- mock API 성공·실패 응답 처리 가능

## 1단계 계정과 온보딩

- 회원가입·로그인 임시 화면
- 온보딩 폼
- 사용자 설정
- 초기 하트 지급 mock

페이지:

```text
/login
/signup
/onboarding
```

## 2단계 그룹 탐색과 하트 예약

- 그룹 목록
- AI 추천 이유
- 그룹 상세
- 참가
- 하트 예약
- 참가 취소
- 모집 실패 반환

페이지:

```text
/groups
/groups/:groupId
```

## 3단계 그룹 시작과 챌린지 대시보드

- 시작 조건
- 빠른 시작 동의
- 하트 차감
- 고정 분모 생성
- 그룹원 상태
- 순위와 성공률

페이지:

```text
/challenges/:challengeId
```

## 4단계 AI 인증

- 사진 또는 체크 인증
- 비동기 분석 상태
- 판정 근거와 신뢰도
- 임시 승인
- 추가 확인
- 재인증

페이지:

```text
/challenges/:challengeId/verify
/verifications/:verificationId
```

## 5단계 신고·이의·운영자 검토

- 신고
- 신고 상태
- 이의 제기
- 운영자 검토 목록
- 최종 승인·반려
- 재계산

페이지:

```text
/reports/:reportId
/operator/reviews
```

## 6단계 AI 코칭

- 일일 코칭
- 그룹 상황 코칭
- 이탈 위험 메시지
- 코칭 성향 적용
- 템플릿 대체

## 7단계 정산과 보상

- 정산 대기
- 최종 정산
- 하트 재획득
- 포인트 지급
- 원장
- 쿠폰 교환

페이지:

```text
/challenges/:challengeId/result
/rewards
```

## 8단계 AI 재도전

- 자격 확인
- 종료 리포트
- 실패 분석
- 목표 조정
- 사전 체크
- 하트 지급

페이지:

```text
/retry
/retry/:missionId
```

## 9단계 알림과 프로필

- 인증 마감
- 재인증 요청
- 정산 완료
- 사용자 기록과 설정

페이지:

```text
/notifications
/profile
/settings
```

## 10단계 통합 테스트

- 정상 흐름
- 모집 실패
- AI 타임아웃
- 신고와 반려
- 정산 멱등성
- 하트 소진과 재도전

## 첫 Codex 프롬프트 권장 범위

첫 작업에서는 전체 앱을 한 번에 만들지 않는다.

```text
AGENTS.md와 docs 문서를 먼저 읽어.
현재 React + JavaScript + Vite 프로젝트의 기존 구조를 유지하면서
0단계 프로젝트 기반만 구현해.

요구사항:
1. React Router 기반 라우팅을 설정해.
2. src/constants에 상태값과 오류 코드를 분리해.
3. src/services/api/client.js와 src/services/mock 기본 구조를 만들어.
4. 디자인은 최소화하고 기능 확인용 화면만 만들어.
5. 아직 그룹, 인증, 정산 기능은 구현하지 마.
6. 완료 후 변경 파일, 실행 방법, 검증 방법을 정리해.
```
