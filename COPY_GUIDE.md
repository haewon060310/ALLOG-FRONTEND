# 프로젝트에 넣는 위치

압축을 푼 뒤 아래 파일을 현재 `ALLOG-NY` 프로젝트 루트에 복사한다.

```text
ALLOG-NY/
├─ AGENTS.md
├─ .env.example
├─ docs/
│  ├─ README.md
│  ├─ 00_PROJECT_OVERVIEW.md
│  ├─ 01_PRODUCT_POLICIES.md
│  ├─ 02_FUNCTIONAL_REQUIREMENTS.md
│  ├─ 03_USER_FLOWS.md
│  ├─ 04_DOMAIN_MODEL.md
│  ├─ 05_STATE_MACHINES.md
│  ├─ 06_AI_SYSTEM.md
│  ├─ 07_API_SPEC.md
│  ├─ 08_ERROR_CODES.md
│  ├─ 09_SECURITY_AND_SAFETY.md
│  ├─ 10_ACCEPTANCE_CRITERIA.md
│  ├─ 11_TEST_SCENARIOS.md
│  └─ 12_IMPLEMENTATION_PLAN.md
└─ src/
```

`AGENTS.md`는 Codex가 프로젝트 작업 시 우선 참고할 루트 지침 파일이다.

`.env.example`을 복사해 `.env.local` 또는 `.env`로 만든 뒤 실제 환경 값은 로컬에서만 관리한다.
