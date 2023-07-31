---
title: prometheus_plugin
dont_translate_title: true
---

## 개요

더 `prometheus_plugin` 다양한 내부 데이터 수집 제공 `nodeos` 지표.클라이언트가 액세스할 수 있습니다. `/v1/prometheus/metrics` 엔드포인트에서 다음 지표를 검색합니다.

- 클라이언트 수
- 동료 수
- 드롭된 블록 수
- 미적용 트랜잭션 대기열 크기 (트랜잭션 수)
- 블랙리스트에 오른 거래 수 (총)
- 블록 생산
- 거래 생성
- 마지막 돌이킬 수 없음
- 현재 헤드 블록 번호
- 주관적인 청구 계정 수
- 주관적인 청구 블록 수
- 예정된 거래
- API 엔드포인트당 API 호출 수

## 형식

더 `prometheus_plugin` endpoint는 지표 이름과 해당 키/값 쌍 (레이블이라고도 함) 으로 구성된 문자열을 시간순으로 수집하여 반환합니다.

지표 이름과 레이블 집합이 주어지면 데이터는 시간순으로 수집되고 다음 표기법을 사용하여 서식이 지정됩니다.

```
<metric name> { <label name>= <label value>, ... }
```

현재 두 가지 지표 유형이 내에서 수집됩니다. `nodeos`:

- **카운터**: 엔드포인트에 대한 요청 수와 같이 시간이 지남에 따라 증가하는 누적 지표입니다.
- **게이지**: 값을 즉시 측정하는 것입니다.기록될 임의의 값일 수 있습니다.

## 사용법

```console
# config.ini
plugin = eosio::prometheus_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::prometheus_plugin
```

## 옵션

다음 중 하나에서 지정할 수 있습니다. `nodeos` 명령줄 또는 `config.ini` 파일:

### 에 대한 구성 옵션 `prometheus_plugin`

옵션 (=기본값) | 설명
-|-
`--prometheus-exporter-address arg (=127.0.0.1:9101)` | 들어오는 프로메테우스 메트릭스 http 요청을 수신하기 위한 로컬 IP 및 포트입니다.

## 종속성

* [`체인_플러그인`](./chain-plugin.md)
* [`http_plugin`](./http-plugin.md)

### 로드 종속성 예제

```console
# config.ini
plugin = eosio::chain_plugin
[options]
plugin = eosio::http_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [operations] [options]  \
           --plugin eosio::http_plugin [options]
```
