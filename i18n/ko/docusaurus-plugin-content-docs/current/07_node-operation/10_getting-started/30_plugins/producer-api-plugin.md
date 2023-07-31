---
title: producer_api_plugin
dont_translate_title: true
---

참조 [프로듀서 API 레퍼런스](https://docs.eosnetwork.com/apis/leap/latest/producer.api/).

## 개요

더 `producer_api_plugin` 에 대한 다양한 엔드포인트를 노출합니다. [`프로듀서_플러그인`](./producer-plugin.md) 에서 관리하는 RPC API 인터페이스로 [`http_plugin`](./http-plugin.md).

## 사용법

```console
# config.ini
plugin = eosio::producer_api_plugin
```
```sh
# nodeos startup params
nodeos ... --plugin eosio::producer_api_plugin
```

## 옵션

없음

## 종속성

* [`프로듀서_플러그인`](./producer-plugin.md)
* [`체인_플러그인`](./chain-plugin.md)
* [`http_plugin`](./http-plugin.md)

### 로드 종속성 예제

```console
# config.ini
plugin = eosio::producer_plugin
[options]
plugin = eosio::chain_plugin
[options]
plugin = eosio::http_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::producer_plugin [options]  \
           --plugin eosio::chain_plugin [operations] [options]  \
           --plugin eosio::http_plugin [options]
```
