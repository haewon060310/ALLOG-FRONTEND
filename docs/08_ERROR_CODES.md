# 오류 코드

| 코드                         | 의미                     | 권장 사용자 메시지                                    |
| ---------------------------- | ------------------------ | ----------------------------------------------------- |
| `UNAUTHORIZED`               | 인증 필요 또는 토큰 만료 | 다시 로그인해 주세요.                                 |
| `FORBIDDEN`                  | 권한 부족                | 이 작업을 수행할 권한이 없습니다.                     |
| `VALIDATION_ERROR`           | 요청 값 오류             | 입력한 내용을 다시 확인해 주세요.                     |
| `HEART_NOT_AVAILABLE`        | 사용 가능한 하트 부족    | 참가 가능한 하트가 부족합니다.                        |
| `HEART_ALREADY_RESERVED`     | 동일 그룹 중복 예약      | 이미 이 그룹에 하트를 예약했습니다.                   |
| `GROUP_FULL`                 | 모집 정원 마감           | 그룹 정원이 마감되었습니다.                           |
| `GROUP_NOT_READY`            | 시작 조건 미충족         | 아직 그룹 시작 조건이 충족되지 않았습니다.            |
| `GROUP_ALREADY_STARTED`      | 이미 시작된 그룹         | 이미 시작된 그룹입니다.                               |
| `ALREADY_JOINED`             | 중복 참가                | 이미 참가한 그룹입니다.                               |
| `MEMBERSHIP_NOT_FOUND`       | 멤버십 없음              | 참가 정보를 찾을 수 없습니다.                         |
| `VERIFICATION_DUPLICATE`     | 중복 인증                | 이미 제출된 인증입니다.                               |
| `VERIFICATION_WINDOW_CLOSED` | 인증 시간 종료           | 인증 가능 시간이 지났습니다.                          |
| `RESUBMISSION_NOT_ALLOWED`   | 재인증 불가              | 현재 상태에서는 재인증할 수 없습니다.                 |
| `REPORT_WINDOW_CLOSED`       | 신고 시간 종료           | 신고 가능 시간이 지났습니다.                          |
| `APPEAL_NOT_ALLOWED`         | 이의 제기 불가           | 현재 상태에서는 이의를 제기할 수 없습니다.            |
| `SETTLEMENT_IN_PROGRESS`     | 정산 중                  | 최종 결과를 계산하고 있습니다.                        |
| `SETTLEMENT_BLOCKED`         | 미처리 검토 존재         | 미처리 인증 검토가 남아 있습니다.                     |
| `RETRY_NOT_ELIGIBLE`         | 재도전 자격 없음         | 현재는 재도전 하트를 받을 수 없습니다.                |
| `RETRY_ALREADY_REWARDED`     | 중복 지급                | 이미 재도전 하트가 지급되었습니다.                    |
| `AI_TIMEOUT`                 | AI 처리 시간 초과        | 분석이 지연되고 있습니다. 잠시 후 다시 확인해 주세요. |
| `AI_RESULT_INVALID`          | AI 응답 형식 오류        | 분석 결과를 다시 처리하고 있습니다.                   |
| `IDEMPOTENCY_CONFLICT`       | 동일 키 요청 충돌        | 요청 정보를 다시 확인해 주세요.                       |

## 구현 원칙

- 컴포넌트에서 오류 문자열을 직접 비교하지 않는다.
- `src/constants/errorCodes.js`에서 코드 상수를 관리한다.
- 사용자 메시지와 개발 로그 메시지를 분리한다.
- 알 수 없는 오류는 `UNKNOWN_ERROR`로 처리하고 requestId를 함께 기록한다.
