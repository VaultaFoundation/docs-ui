---
title: producer_plugin
dont_translate_title: true
---

## 개요

더 `producer_plugin` 노드가 블록 제작 작업을 수행하는 기능을 포함합니다.또한 에서 제공하는 핵심 기능을 구현합니다. [프로듀서 API 플러그인](./producer-api-plugin.md).

> ℹ️ 블록 프로덕션을 활성화하려면, 특정 `nodeos` 구성이 필요합니다.를 참조하십시오. [블록 생성 노드 구성](https://docs.eosnetwork.com/manuals/leap/latest/nodeos/usage/node-setups/producing-node) 자세한 지침을 보려면 안내서를 참조하십시오.

## 사용법

```console
# config.ini
plugin = eosio::producer_plugin [options]
```
```sh
# nodeos startup params
nodeos ... -- plugin eosio::producer_plugin [options]
```

## 옵션

다음 중 하나에서 지정할 수 있습니다. `nodeos` 명령줄 또는 `config.ini` 파일:

### 에 대한 구성 옵션 `producer_plugin`

옵션 (=기본값) | 설명
-|-
`-e [ --enable-stale-production ]` | 체인이 오래되더라도 블록 생산이 가능합니다.
`-x [ --pause-on-startup ]` | 생산이 일시 중지된 상태에서 이 노드를 시작합니다.
`--max-transaction-time arg (=30)` | 푸시된 트랜잭션의 코드가 유효하지 않은 것으로 간주되기 전에 실행될 수 있는 최대 시간 (밀리초) 을 제한합니다.
`--max-irreversible-block-age arg (=-1)` | 이 노드가 블록을 생성할 체인에 대한 DPOS 비가역적 블록의 최대 기간 (초) 을 제한합니다 (음수 값을 사용하여 무제한을 나타냄).
`-p [ --producer-name ] arg` | 이 노드가 제어하는 생산자 ID (예: inita, 여러 번 지정할 수 있음)
`--signature-provider arg (=<PUBLIC_KEY>=KEY:<PRIVATE_KEY>)` | 키=^public-key^=^제공자-spec^ 형식의 값 쌍: ^public-key^는 유효한 EOSIO 공개 키의 문자열 형식입니다. ^제공자-스펙^은 ^제공자 유형^ 형식의 문자열입니다. ^데이터^ ^제공자 유형^은 KEY, KEOSD 또는 SE KEY입니다. ^데이터^는 유효한 EOSIO 개인 키의 문자열 형식입니다. 제공된 공개 키 KEOSD에 매핑되는 항목: ^data^는 keosd를 사용할 수 있고 적절한 지갑이 잠금 해제되는 URL입니다.
`--greylist-account arg` | 확장된 CPU/NET 가상 리소스에 액세스할 수 없는 계정
`--greylist-limit arg (=1000)` | CPU/NET 가상 리소스가 사용량이 적을 때 확장할 수 있는 배수에 대한 제한 (1~1000 사이) (주관적으로만 적용됨, 제한을 적용하지 않으려면 1000을 사용)
`--produce-time-offset-us arg (=0)` | 마지막 블록이 아닌 생성 시간의 오프셋 (마이크로초 단위)유효 범위 0..-블록_시간_간격.
`--last-block-time-offset-us arg (=-200000)` | 마지막 블록 생성 시간의 오프셋 (마이크로초)유효 범위 0..-블록_시간_간격.
`--cpu-effort-percent arg (=80)` | 블록 생성에 사용된 cpu 블록 생산 시간의 백분율.정수 백분율, 예: 80% 인 경우 80
`--last-block-cpu-effort-percent arg (=80)` | 마지막 블록을 생성하는 데 사용된 cpu 블록 생산 시간의 백분율정수 백분율, 예: 80% 인 경우 80
`--max-block-cpu-usage-threshold-us arg (=5000)` | 블록이 꽉 찬 것으로 간주하는 CPU 블록 생성 임계값, 최대 블록 CPU 사용량 임계값 이내이면 즉시 블록 생성이 가능한 경우
`--max-block-net-usage-threshold-bytes arg (=1024)` | NET 블록 생산의 임계값: 블록이 꽉 찬 것으로 간주하며, 최대 블록 순 사용량 임계값 이내이면 즉시 블록 생성이 가능한 경우
`--max-scheduled-transaction-time-per-block-ms arg (=100)` | 모든 블록에서 예정된 트랜잭션 (및 수신 지연 비율에 따른 수신 트랜잭션) 을 취소한 후 정상적인 트랜잭션 처리로 돌아가는 데 소요되는 최대 시간 (밀리초)
`--subjective-cpu-leeway-us arg (=31000)` | 부족한 CPU 할당량으로 시작한 트랜잭션이 완료되어 CPU 사용량을 충당하기까지 허용된 시간 (마이크로초).
`--subjective-account-max-failures arg (=3)` | 창 크기당 지정된 계정에 허용되는 최대 실패 횟수를 설정합니다.
`--subjective-account-max-failures-window-size arg (=1)` | 주관적 계정-최대 실패 해상도의 블록 수로 창 크기를 설정합니다.
`--subjective-account-decay-time-minutes arg (=1440)` | 계정의 주관적 CPU 전체를 반환하는 시간을 설정합니다.
`--incoming-defer-ratio arg (=1)` | 수신 트랜잭션과 지연된 트랜잭션이 모두 실행 대기열에 있을 때의 비율
`--incoming-transaction-queue-size-mb arg (=1024)` | 수신 트랜잭션 대기열의 최대 크기 (MiB)이 값을 초과하면 리소스 고갈로 인한 트랜잭션이 주관적으로 삭제됩니다.
`--disable-subjective-billing arg (=1)` | API/P2P 트랜잭션에 대한 주관적인 CPU 청구 비활성화
`--disable-subjective-account-billing arg` | 주관적 CPU 청구에서 제외된 계정
`--disable-subjective-p2p-billing arg (=1)` | P2P 거래에 대한 주관적인 CPU 청구 비활성화
`--disable-subjective-api-billing arg (=1)` | API 트랜잭션에 대한 주관적 CPU 청구 비활성화
`--producer-threads arg (=2)` | 프로듀서 스레드 풀의 작업자 스레드 수
`--snapshots-dir arg (="snapshots")` | 스냅샷 디렉토리의 위치 (절대 경로 또는 애플리케이션 데이터 디렉토리에 대한 상대 경로)
`--read-only-threads arg` | 읽기 전용 실행 스레드 풀의 작업자 스레드 수최대 8명
`--read-only-write-window-time-us arg (=200000)` | 쓰기 창이 지속되는 시간 (마이크로초)
`--read-only-read-window-time-us arg (=60000)` | 읽기 창이 지속되는 시간 (마이크로초)

## 종속성

* [`체인_플러그인`](./chain-plugin.md)

## 거래의 우선순위

생산자 플러그인에 보류 중인 트랜잭션 대기열이 있는 경우 트랜잭션 유형 중 하나에 다른 트랜잭션 유형보다 우선순위를 부여할 수 있습니다.

아래 옵션은 수신 트랜잭션과 지연된 트랜잭션 간의 비율을 설정합니다.

```console
  --incoming-defer-ratio arg (=1)       
```

기본값: `1`, 그 `producer` 플러그인은 지연된 트랜잭션당 하나의 수신 트랜잭션을 처리합니다.언제 `arg` 로 설정 `10`, 그 `producer` 플러그인은 지연된 트랜잭션당 10개의 들어오는 트랜잭션을 처리합니다.

만약 `arg` 충분히 큰 수로 설정된 경우 플러그인은 들어오는 트랜잭션의 대기열이 비어 있을 때까지 항상 들어오는 트랜잭션을 먼저 처리합니다.각각 다음과 같은 경우 `arg` 는 0, `producer` 플러그인은 지연된 트랜잭션 대기열을 먼저 처리합니다.


### 로드 종속성 예제

```console
# config.ini
plugin = eosio::chain_plugin [operations] [options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [operations] [options]
```

블록 생성 방법에 대한 자세한 내용은 다음을 참조하십시오. [블록 프로듀싱 설명자](https://docs.eosnetwork.com/manuals/leap/latest/nodeos/plugins/producer_plugin/block-producing-explained).
