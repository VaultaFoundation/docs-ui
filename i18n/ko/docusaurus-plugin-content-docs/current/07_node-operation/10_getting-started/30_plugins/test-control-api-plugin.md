---
title: test_control_api_plugin
dont_translate_title: true
---

참조 [테스트 제어 API 레퍼런스](https://docs.eosnetwork.com/apis/leap/latest/test_control.api/)

## 개요

더 `test_control_api_plugin` 제어 메시지를 전달할 수 있습니다. [테스트_제어_플러그인](../test_control_plugin/index.md).현재 엔드포인트는 플러그인이 정상적인 종료를 시작하도록 지시합니다. `nodeos` 특정 블록에 도달했을 때의 인스턴스이 기능은 주로 테스트 목적으로 설계되었습니다.

## 사용법

```console
# config.ini
plugin = eosio::test_control_api_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::test_control_api_plugin
```

## 옵션

없음

## 사용 예제

```sh
curl %s/v1/test_control/kill_node_on_producer -d '{ \"producer\":\"%s\", \"where_in_sequence\":%d, \"based_on_lib\":\"%s\" }' -X POST -H \"Content-Type: application/json\"" %
```

## 종속성

* [`테스트_제어_플러그인`](../test_control_plugin/index.md)
* [`체인_플러그인`](../chain_plugin/index.md)
* [`http_plugin`](../http_plugin/index.md)

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
