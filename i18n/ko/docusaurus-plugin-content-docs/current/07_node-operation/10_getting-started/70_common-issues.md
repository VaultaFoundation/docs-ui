---
title: 일반적인 문제
---

## 1.데이터베이스 더티 플래그 설정 오류

더 `Database dirty flag set (likely due to unclean shutdown): replay required` 중지하지 않을 때 오류가 발생합니다. `nodeos` 우아하게.이 오류가 발생하는 경우 유일한 방법은 다시 시작하여 다시 플레이하는 것입니다. `nodeos` 와 `--replay-blockchain`.
중지하려면 `nodeos` 우아하게, 보내세요 `SIGTERM`, `SIGQUIT` 또는 `SIGINT` 그런 다음 프로세스가 종료될 때까지 기다립니다.

## 2.메모리가 데이터와 일치하지 않음 오류

다음과 같은 오류가 발생하는 경우 `St9exception: content of memory does not match data expected by executable` 언제 `nodeos` 시작, 다시 시작 시도 `nodeos` 다음 옵션 중 하나를 사용하여 (사용할 수 있음) `nodeos --help` 전체 옵션 목록을 보려면).

eosio: :chain_plugin 명령줄 옵션:

| 옵션 | 설명 |
|----------------------------|--------------------------------------------------------|
| `--force-all-checks`       | 되돌릴 수 없는 블록을 재생하는 동안 건너뛸 수 있는 검사는 건너뛰지 마세요 |
| `--replay-blockchain`      | 체인 상태 데이터베이스 지우기 및 모든 블록 재생 |
| `--hard-replay-blockchain` | 체인 상태 데이터베이스를 지우고 블록 로그에서 최대한 많은 블록을 복구한 다음 해당 블록을 재생합니다. |
| `--delete-all-blocks`      | 체인 상태 데이터베이스 및 블록 로그 지우기 |

## 3.데이터베이스를 확장할 수 없음 오류

문제를 해결하려면 `Could not grow database file to requested size` 오류, 시작 `nodeos` 와 `--shared-memory-size-mb 1024` 옵션.1GB 공유 메모리 파일은 약 50만 건의 트랜잭션을 허용합니다.

# 4. 3070000: WASM 예외 오류

다음과 같은 오류가 발생하는 경우 `Publishing contract... Error 3070000: WASM Exception Error Details: env.set_proposed_producers_ex unresolveable` 배포를 시도할 때 `eosio.bios` 계약 또는 `eosio.system` EOS 블록체인 (로컬 또는 테스트넷) 을 부팅하려면 계약을 활성화해야 합니다. `PREACTIVATE_FEATURE` 프로토콜 우선.
