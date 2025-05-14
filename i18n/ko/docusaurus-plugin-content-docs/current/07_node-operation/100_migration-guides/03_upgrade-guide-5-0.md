---
title: 리프 5.0 업그레이드 가이드
---

5.0 릴리스 노트를 보려면 클릭하십시오. [이리](https://github.com/AntelopeIO/spring/releases/tag/v5.0.0-rc2).

## 지원 중단 및 삭제

### 지연된 트랜잭션 제거됨
지연된 트랜잭션은 이전에 지원이 중단되어 제거되었습니다.지연된 트랜잭션을 새로 생성할 수 없습니다.기존의 지연된 트랜잭션은 실행이 차단됩니다.

### 블록 헤더 상태 가져오기 지원 중단됨
Leap v5.0.0부터 `v1/chain/get_block_header_state` 더 이상 사용되지 않습니다.Leap v6.0.0에서 제거될 예정입니다.

## 스냅샷에서 재시작 필요
상태 메모리 스토리지의 구조적 변경으로 인해 스냅샷에서 노드 5.0을 다시 시작하거나 전체 트랜잭션 동기화에서 복구해야 합니다.모든 버전의 노드에서 가져온 스냅샷을 사용하여 5.0 노드를 시작할 수 있습니다.

다음은 우분투의 스냅샷에서 다시 시작하는 예제 단계입니다.
- 최신 릴리즈 다운로드
 - Head to a [리프 릴리즈](https://github.com/AntelopeIO/spring/releases) 최신 버전을 다운로드하려면
- 새 스냅샷 생성
 - `curl -X POST http://127.0.0.1:8888/v1/producer/create_snapshot`
      curl이 새로 생성된 스냅샷 파일의 파일 이름을 포함하는 JSON 응답과 함께 반환될 때까지 기다리십시오.
- 노드 중지
- 기존 패키지 제거
 - `sudo apt-get remove -y leap`
- 제거 `shared_memory.bin` 파일은 노드의 데이터 디렉토리에 있습니다.이 파일만 제거해야 합니다.데이터 디렉터리는 노드에 전달되는 경로가 됩니다. `--data-dir` 논쟁, 또는 `$HOME/local/share/eosio/nodeos/data/state` 기본적으로.
- 새 패키지 설치
 - `apt-get install -y ./leap_5.0.0_amd64.deb`
- 에서 반환한 스냅샷 파일로 노드를 다시 시작합니다. `create_snapshot` 위에 요청하세요.추가 `--snapshot` 인수를 다른 기존 인수와 함께
 - `nodeos --snapshot snapshot-1323.....83c5.bin ...`
      이것은 `--snapshot` 인수는 5.x 노드를 처음 시작할 때 한 번만 제공하면 됩니다.

## 필수 구성 변경
Leap 5+를 실행하는 노드가 제대로 작동하려면 다음과 같은 구성 변경이 필요합니다.

### 지원되지 않는 구성 매개 변수
Leap v5.0.0부터 노드 운영자는 노드를 시작할 수 있도록 config.ini 파일에 다음 매개 변수가 설정되어 있지 않은지 확인해야 합니다.
- `cpu-effort-percent`
- `last-block-cpu-effort-percent`
- `last-block-time-offset-us`
- `produce-time-offset-us`
- `max-nonprivileged-inline-action-size`
- `max-scheduled-transaction-time-per-block-ms`
- `disable-subjective-billing` (아래 “API 및 블록 릴레이에 대한 주관적 결제 활성화” 참조)

### API 및 블록 릴레이에 대한 주관적 결제 활성화
API와 블록 릴레이는 주관적 청구를 활성화해야 합니다.이전에는 `disable-subjective-billing` false로 설정할 수 있지만 이 옵션은 보다 구체적인 옵션이 중복되어 Leap v5.0.0에서 제거되었습니다.Leap v5.0.0을 실행하는 노드에서 주관적 결제를 활성화하려면 config.ini 에서 다음 구성 값을 설정해야 합니다.

```
disable-subjective-api-billing=false
disable-subjective-p2p-billing=false
```

## 권장 구성 변경
Leap 5+를 실행하는 노드의 경우 다음과 같은 구성 변경을 권장합니다.

### 트랜잭션 시간 창 수정
- 댓글 남기/ 삭제 `max-transaction-time`, 또는 온체인 한도보다 높은 값으로 설정 (예: EOS에서 150ms 이상)
- 설정 `read-only-read-window-time-us` 165,000밀리초 (165밀리초) 까지

이러한 업데이트는 성능 테스트와 실증 데이터를 기반으로 합니다.프로덕션 환경에서 트랜잭션이 30ms 제한을 초과하는 사례가 확인되었으므로 시간을 늘리는 것이 좋습니다. `max-transaction-time` 목표 온체인 한도에 따라 거래 벽시계 마감 시한을 적용할 수 있도록 제거해야 합니다.

모든 읽기 작업은 병렬로 수행됩니다.예를 들면 다음과 같습니다.`get_table_rows` rpc는 읽기 창 내에서 병렬로 실행됩니다.이러한 이유로 읽기 전용 시간 창이 더 커야 합니다.트랜잭션은 읽기 전용이거나 읽기 전용이 아닙니다.트랜잭션에는 읽기 전용 구성 요소가 없습니다.

> 참고:읽기 전용 구성 변경 사항은 Leap 버전 4.x 이상에만 적용됩니다.

### 프로메테우스 익스포터 주소 제거
- 제거 `prometheus-exporter-address` config.ini 에서

이 제품은 새 것으로 교체되었습니다. `prometheus` https://github.com/antelopeIO/leap/pull/1137 의 일부로 구현된 api 엔드포인트 카테고리

## 신규 및 수정된 옵션
### 새 명령줄 옵션
- `sync-peer-limit`동기화할 피어 수를 제한할 수 있습니다.기본값은 3입니다.
- `eos-vm-oc-enable` 새로운 모드가 있습니다 `auto` 블록을 구축하고, 블록을 적용하고, HTTP 또는 P2P에서 트랜잭션을 실행하고, eosio.* 계정 (eosio, eosio.token, eosio.ibc 및 eosio.evm) 에서 계약을 실행할 때 자동으로 OC를 사용합니다. `eos-vm-oc-enable=auto` 새 기본값입니다.

### 새 구성 옵션
- `http-category-address` 명령줄과 ini 파일의 모든 주소를 구성하는 데 사용할 수 있습니다.이 옵션은 필요에 따라 여러 번 사용할 수 있습니다.

### 옵션 동작을 수정했습니다.
- 지정하기 `--p2p-listen-endpoint` 과 `--p2p-server-address` 여러 번
- `sync-fetch-span` 기본값이 100에서 1000으로 변경되었습니다.
- `disable-replay-opts` 상태 기록 플러그인이 활성화되면 자동으로 true로 설정됩니다.이 옵션은 구성 파일에서 지정할 수 있습니다.
- `read-only-threads` 이제 최대 128로 설정할 수 있습니다
- `abi-serializer-max-time-ms` 기본 스레드에서 객체를 직렬화하고 HTTP 스레드에서 단일 객체를 역직렬화하는 데 소요되는 시간을 제한하도록 업데이트되었습니다.
- 기본값은 `http-max-response-time-ms` 30밀리초에서 15밀리초로 변경되었습니다
