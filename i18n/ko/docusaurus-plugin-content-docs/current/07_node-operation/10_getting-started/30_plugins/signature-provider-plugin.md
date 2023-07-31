---
title: signature_provider_plugin
dont_translate_title: true
---

## 개요

더 `signature_provider_plugin` 현재 이전에 구현된 디지털 서명 기능의 내부 구현입니다. `producer_plugin`.현재는 에서만 사용하고 있지만 `producer_plugin`, 이 새로운 디자인을 통해 우려 사항을 더 잘 분리할 수 있으며 향후 사용 사례에서 정당화된다면 다른 플러그인에서도 서명 작업을 수행할 수 있게 될 것입니다.

## 사용법

```console
# config.ini
plugin = eosio::signature_provider_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::signature_provider_plugin
```

## 옵션

다음 중 하나에서 지정할 수 있습니다. `nodeos` 명령줄 또는 `config.ini` 파일:

### 에 대한 구성 옵션 `signature_provider_plugin`

옵션 (=기본값) | 설명
-|-
`--keosd-provider-timeout arg (=5)` | 서명을 위해 keosd 제공자에게 요청을 보낼 수 있는 최대 시간 (밀리초) 을 제한합니다.

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
