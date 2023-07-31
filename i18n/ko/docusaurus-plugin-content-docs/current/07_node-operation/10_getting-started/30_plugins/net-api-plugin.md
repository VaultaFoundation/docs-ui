---
title: net_api_plugin
dont_translate_title: true
---

참조 [네트 API 레퍼런스](https://docs.eosnetwork.com/apis/leap/latest/net.api/).

## 개요

더 `net_api_plugin` 의 기능을 노출합니다. [`넷_플러그인`](../net_plugin/index.md) 에서 관리하는 RPC API 인터페이스로 [`http_plugin`](../http_plugin/index.md).더 `net_api_plugin` 노드 운영자가 활성 노드의 P2P (Peer-to-Peer) 연결을 관리할 수 있습니다.

더 `net_api_plugin` 네 가지 RPC API 엔드포인트를 제공합니다.
* 연결
* 연결 끊기
* 연결
* 상태

> ⚠️ 이 플러그인은 p2p 연결을 관리할 수 있는 엔드포인트를 노출합니다.공개적으로 액세스할 수 있는 노드에서 이 플러그인을 실행하는 것은 악용될 수 있으므로 권장하지 않습니다.

## 사용법

```console
# config.ini
plugin = eosio::net_api_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::net_api_plugin
```

## 옵션

없음

## 종속성

* [`넷_플러그인`](../net_plugin/index.md)
* [`http_plugin`](../http_plugin/index.md)

### 로드 종속성 예제

```console
# config.ini
plugin = eosio::net_plugin
[options]
plugin = eosio::http_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::net_plugin [options]  \
           --plugin eosio::http_plugin [options]
```
