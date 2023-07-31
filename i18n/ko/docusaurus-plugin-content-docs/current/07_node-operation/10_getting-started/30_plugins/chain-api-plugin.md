---
title: chain_api_plugin
dont_translate_title: true
---

참조 [체인 API 레퍼런스](https://docs.eosnetwork.com/apis/leap/latest/chain.api/).

## 개요

더 `chain_api_plugin` 의 기능을 노출합니다. [`체인_플러그인`](../chain_plugin/index.md) 에서 관리하는 RPC API 인터페이스로 [`http_plugin`](../http_plugin/index.md).

## 사용법

```console
# config.ini
plugin = eosio::chain_api_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::chain_api_plugin
```

## 옵션

없음

## 종속성

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
