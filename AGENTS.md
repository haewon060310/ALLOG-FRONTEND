# ALLOG-NY 개발 지침

## 프로젝트 목적

ALLOG는 하트를 예약해 웰니스 그룹 챌린지에 참가하고, AI 인증·재심·그룹 상황 기반 코칭을 통해 경쟁과 협력으로 루틴을 지속하도록 돕는 그룹형 AI 웰니스 게임이다.

---

# 현재 개발 단계

- React + JavaScript + Vite
- TypeScript는 사용하지 않는다.
- UI 디자인은 기능 구현 완료 후 적용한다.
- 현재는 기능 흐름, 상태 전이, 데이터 정합성, 예외 처리를 우선한다.
- 임시 UI는 텍스트, 버튼, 폼, 표 형태로만 구현한다.
- 디자인 시스템, 애니메이션, 반응형 스타일링은 디자인 문서가 확정될 때까지 구현하지 않는다.

---

# 개발 철학

ALLOG는 단순한 습관 관리 앱이 아니다.

모든 기능은 아래 서비스 루프를 강화해야 한다.

```
하트
→ 그룹 참여
→ AI 인증
→ AI 코칭
→ 경쟁과 협력
→ 보상
→ 다음 챌린지 참여
```

이 흐름과 직접 관련 없는 기능은 추가하지 않는다.

---

# 개발 우선순위

항상 아래 순서를 따른다.

1. 데이터 모델
2. 상태 관리
3. Service(API / Mock)
4. 비즈니스 로직
5. 페이지 기능
6. 공통 컴포넌트
7. 스타일 적용
8. UI 개선
9. 리팩토링

디자인보다 기능 구현을 우선한다.

---

# 문서 우선순위

작업 전에 반드시 `docs/README.md`를 읽는다.

문서 내용이 충돌하면 아래 우선순위를 따른다.

1. `docs/01_PRODUCT_POLICIES.md`
2. `docs/05_STATE_MACHINES.md`
3. `docs/07_API_SPEC.md`
4. `docs/02_FUNCTIONAL_REQUIREMENTS.md`
5. 나머지 문서

기획서 정책을 임의로 변경하지 않는다.

---

# Codex 작업 원칙

1. 작업 전에 관련 문서를 먼저 읽는다.
2. 한 번에 하나의 기능 단위만 구현한다.
3. 기존 파일을 삭제하거나 구조를 크게 변경하기 전에 이유를 설명한다.
4. TypeScript를 사용하지 않는다.
5. API가 준비되지 않은 단계에서는 `src/services/mock`을 사용한다.
6. 상태값과 오류 코드는 문서에 정의된 문자열을 그대로 사용한다.
7. 하트, 포인트, 정산 관련 로직은 UI 컴포넌트 안에 직접 작성하지 않는다.
8. 점수, 성공률, 보상 계산은 순수 함수로 분리한다.
9. AI 응답은 구조화된 객체(JSON) 형태로 처리한다.
10. 문자열 하드코딩으로 AI 결과를 구현하지 않는다.
11. 기존 import와 실행 흐름을 깨뜨리지 않는다.
12. 작업 완료 후 변경 사항을 반드시 정리한다.

---

# 구현 완료 조건

기능은 아래 조건을 모두 만족해야 완료로 간주한다.

- npm run build 성공
- import 오류 없음
- console error 없음
- mock API 정상 동작
- docs 정책과 일치
- 기존 기능이 깨지지 않음

위 조건을 만족하지 않으면 구현 완료로 판단하지 않는다.

---

# 권장 폴더 구조

```text
src/
├─ assets/
├─ components/
│  ├─ common/
│  ├─ challenge/
│  ├─ verification/
│  ├─ reward/
│  └─ feedback/
├─ constants/
├─ hooks/
├─ layouts/
├─ pages/
├─ services/
│  ├─ api/
│  ├─ mock/
│  └─ storage/
├─ styles/
├─ utils/
│  ├─ scoring/
│  ├─ validation/
│  └─ formatting/
├─ App.jsx
└─ main.jsx
```

---

# 추가 권장 파일

```text
.env.example

src/constants/status.js
src/constants/errorCodes.js
src/constants/policies.js
src/constants/storageKeys.js

src/services/api/client.js
src/services/mock/mockData.js

src/utils/scoring/calculateScore.js
src/utils/scoring/calculateGroupSuccess.js
src/utils/scoring/calculateStreakScore.js
```

---

# API 구현 원칙

- 실제 API와 Mock API는 동일한 응답 구조를 사용한다.
- 컴포넌트는 Mock 여부를 알지 못하도록 Service 계층을 사용한다.
- 모든 API 응답은 success / data / error 구조를 따른다.
- 하트 예약, 그룹 시작, 정산은 멱등성을 고려한다.
- AI 기능은 동기 처리 대신 Job 기반 비동기 구조를 고려한다.

---

# 상태 관리 원칙

- 상태 문자열은 constants만 사용한다.
- 문자열 비교를 직접 작성하지 않는다.
- 계산 로직은 utils로 분리한다.
- 페이지에서는 계산하지 않는다.
- Service는 데이터만 제공한다.

---

# 테스트 원칙

다음 기능은 순수 함수로 작성하여 테스트 가능해야 한다.

- 사용자 점수 계산
- 그룹 성공률 계산
- 연속 성공 점수 계산
- 하트 예약
- 하트 반환
- 정산 로직

---

# 금지 사항

- 기획 정책을 임의로 변경하지 않는다.
- 신고 정확도를 사용자 순위 점수에 포함하지 않는다.
- 임시 승인 상태에서 하트나 포인트를 확정 지급하지 않는다.
- 무활동 사용자를 그룹 성공률 분모에서 임의로 제거하지 않는다.
- 정의되지 않은 보상 배율을 추가하지 않는다.
- 의료 진단 또는 치료 판단 기능을 구현하지 않는다.
- 실제 존재하지 않는 AI 기능을 임의로 추가하지 않는다.
- 페이지 컴포넌트에 비즈니스 로직을 집중시키지 않는다.
- 새로운 라이브러리를 설치하거나 프로젝트 구조를 변경하기 전에는 반드시 이유를 설명하고 사용자 승인을 받는다.

---

# 작업 완료 보고

작업이 끝나면 아래 순서대로 보고한다.

1. 변경한 파일
2. 생성한 파일
3. 수정한 주요 내용
4. 실행 방법
5. 검증 결과
6. npm run build 결과
7. 남아 있는 문제
8. 다음 권장 작업
