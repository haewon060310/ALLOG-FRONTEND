# ALLOG 개발 문서 안내

이 폴더는 Codex가 기획 의도를 잃지 않고 기능을 구현하도록 제공하는 개발 기준 문서다.

## 읽는 순서

1. `00_PROJECT_OVERVIEW.md`
2. `01_PRODUCT_POLICIES.md`
3. `02_FUNCTIONAL_REQUIREMENTS.md`
4. `03_USER_FLOWS.md`
5. `04_DOMAIN_MODEL.md`
6. `05_STATE_MACHINES.md`
7. `06_AI_SYSTEM.md`
8. `07_API_SPEC.md`
9. `08_ERROR_CODES.md`
10. `09_SECURITY_AND_SAFETY.md`
11. `10_ACCEPTANCE_CRITERIA.md`
12. `11_TEST_SCENARIOS.md`
13. `12_IMPLEMENTATION_PLAN.md`

## 문서 우선순위

충돌이 생기면 다음 순서를 따른다.

1. `01_PRODUCT_POLICIES.md`
2. `05_STATE_MACHINES.md`
3. `07_API_SPEC.md`
4. `02_FUNCTIONAL_REQUIREMENTS.md`
5. 나머지 문서

## 개발 전제

- MVP 범위는 축소하지 않는다.
- AI는 단순 문구 생성기가 아니라 추천, 인증 심판, 판정 근거 제공, 재심 전환, 코칭, 실패 분석에 사용한다.
- 초기 개발에서는 실제 백엔드 대신 mock service를 사용할 수 있지만, 실제 API 응답 형태를 유지한다.
- 기능 구현 완료 후 디자인을 적용한다.
