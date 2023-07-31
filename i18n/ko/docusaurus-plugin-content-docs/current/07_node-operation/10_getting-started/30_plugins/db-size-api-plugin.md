---
title: db_size_api_plugin
dont_translate_title: true
---

참조 [DB 크기 API 레퍼런스](https://docs.eosnetwork.com/apis/leap/latest/db_size.api/).

## 개요

더 `db_size_api_plugin` 블록체인과 관련된 분석을 획득합니다.최소한 다음 정보를 검색합니다.
* 무료_바이트
* 사용_바이트
* 사이즈
* 지수

## 사용법

```console
# config.ini
plugin = eosio::db_size_api_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::db_size_api_plugin
```

## 옵션

없음

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
