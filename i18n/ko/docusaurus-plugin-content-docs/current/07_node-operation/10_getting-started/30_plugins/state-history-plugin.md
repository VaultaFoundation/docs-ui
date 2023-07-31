---
title: state_history_plugin
dont_translate_title: true
---

## 개요

더 `state_history_plugin` 블록 체인의 상태에 대한 과거 정보를 캡처하고 저장하는 데 유용한 도구입니다.이 플러그인은 상호 연결된 다른 노드로부터 블록체인 데이터를 수신한 다음 해당 데이터를 파일에 저장하는 방식으로 작동합니다.또한 플러그인은 소켓 연결을 설정하여 애플리케이션에서 들어오는 연결을 수신합니다.연결되면 플러그인을 시작할 때 플러그인에 설정된 특정 옵션을 기반으로 요청된 블록체인 데이터를 제공할 수 있습니다. `nodeos` 예.

## 사용법

```console
# config.ini
plugin = eosio::state_history_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::state_history_plugin [operations] [options]
```

## 운영

다음에서만 지정할 수 있습니다. `nodeos` 명령줄:

### 명령줄 옵션 `state_history_plugin`

옵션 (=기본값) | 설명
-|-
`--delete-state-history` | 상태 기록 파일 지우기

## 옵션

다음 중 하나에서 지정할 수 있습니다. `nodeos` 명령줄 또는 `config.ini` 파일:

### 에 대한 구성 옵션 `state_history_plugin`

옵션 (=기본값) | 설명
-|-
`--state-history-dir arg (="state-history")` | 상태 기록 디렉토리의 위치 (절대 경로 또는 응용 프로그램 데이터 디렉토리에 대한 상대 경로)
`--state-history-retained-dir arg` | 상태 기록 보관 디렉토리의 위치 (절대 경로 또는 상태 기록 디렉토리에 대한 상대 경로).
`--state-history-archive-dir arg` | 상태 기록 아카이브 디렉토리의 위치 (절대 경로 또는 상태 기록 디렉토리에 대한 상대 경로).값이 빈 문자열이면 보존 제한을 초과한 블록 파일이 삭제됩니다.아카이브 디렉터리의 모든 파일은 완전히 사용자가 제어할 수 있습니다. 즉, 더 이상 노드에서 액세스할 수 없습니다.
`--state-history-stride arg` | 블록 번호가 보폭의 배수일 때 상태 기록 로그 파일을 분할합니다. 보폭에 도달하면 현재 기록 로그와 색인의 이름이 '*-history-^^start num^-^end num^.log/index'로 변경되고 가장 최근의 블록으로 현재 기록 로그와 색인이 새로 생성됩니다.이 형식을 따르는 모든 파일은 확장된 히스토리 로그를 구성하는 데 사용됩니다.
`--max-retained-history-files arg` | 해당 파일의 블록을 쿼리할 수 있도록 유지할 최대 히스토리 파일 그룹 수입니다.이 수에 도달하면 가장 오래된 히스토리 파일이 아카이브 디렉터리로 이동하거나 아카이브 디렉터리가 비어 있으면 삭제됩니다.보관된 히스토리 로그 파일은 사용자가 조작해서는 안 됩니다.
`--trace-history` | 추적 기록 활성화
`--chain-state-history` | 체인 상태 기록 활성화
`--state-history-endpoint arg (=127.0.0.1:8080)` | 들어오는 연결을 수신할 엔드포인트.주의: 이 포트는 내부 네트워크에만 노출하십시오.
`--state-history-unix-socket-path arg` | 들어오는 연결을 수신할 유닉스 소켓을 만들기 위한 경로 (data-dir에 상대적).
`--trace-history-debug-mode` | 추적 기록에 대한 디버그 모드 활성화
`--state-history-log-retain-blocks arg` | 설정된 경우 구성된 수의 최신 블록만 저장하도록 상태 기록 파일을 주기적으로 정리합니다.

## 예제

* [전체 기록을 다시 재생하거나 다시 동기화하는 방법](../../snapshots#replay--resync-with-full-state-history)
* [전체 상태 기록이 포함된 휴대용 스냅샷을 만드는 방법](../../snapshots#creating-a-snapshot-with-full-state-history)
* [전체 상태 기록이 포함된 휴대용 스냅샷을 복원하는 방법](../../snapshots#restoring-a-snapshot-with-full-state-history)

## 종속성

* [`체인_플러그인`](./chain-plugin.md)

### 로드 종속성 예제

```console
# config.ini
plugin = eosio::chain_plugin --disable-replay-opts
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin --disable-replay-opts
```
