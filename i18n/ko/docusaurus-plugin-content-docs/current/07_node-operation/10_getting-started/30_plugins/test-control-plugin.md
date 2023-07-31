---
title: test_control_plugin
dont_translate_title: true
---

## 개요

더 `test_control_plugin` 의 내부 테스트를 용이하게 하도록 설계되었습니다. `nodeos` 예.현재 기능을 통해 제어되고 우아한 기능을 사용할 수 있습니다. `nodeos` 지정된 블록 생산자가 생성한 일련의 블록 내에서 특정 블록에 도달하면 종료됩니다.이는 테스트를 위한 것으로, 정확한 시기를 결정하기 위한 것입니다. `nodeos` 인스턴스가 종료됩니다.

> ℹ️ 더 `test_control_plugin` 가장 최근 블록을 가리키는 **헤드 블록** 또는 돌이킬 수 없는 최종성을 달성한 블록을 나타내는**마지막 비가역 블록**을 기반으로 종료를 시작하는 데 사용할 수 있습니다.

더 `test_control_plugin` 또한 에서 제공하는 핵심 기능을 구현합니다. [테스트 컨트롤 API 플러그인](../test_control_api_plugin/index.md).

## 사용법

```console
# config.ini
plugin = eosio::test_control_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::test_control_plugin
```

## 옵션

없음

## 종속성

* [`체인_플러그인`](../chain_plugin/index.md)

### 로드 종속성 예제

```console
# config.ini
plugin = eosio::chain_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [operations] [options]
```
