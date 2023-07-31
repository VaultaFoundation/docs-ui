---
title: producer_api_plugin
dont_translate_title: true
---

请参阅 [制作者 API 参考](https://docs.eosnetwork.com/apis/leap/latest/producer.api/)。

## 概述

那个 `producer_api_plugin` 公开了各种端点 [`producer_plugin`](../producer_plugin/index.md) 到由管理的 RPC API 接口 [`http_plugin`](../http_plugin/index.md)。

## 用法

```console
# config.ini
plugin = eosio::producer_api_plugin
```
```sh
# nodeos startup params
nodeos ... --plugin eosio::producer_api_plugin
```

## 选项

无

## 依赖关系

* [`producer_plugin`](../producer_plugin/index.md)
* [`chain_plugin`](../chain_plugin/index.md)
* [`http_plugin`](../http_plugin/index.md)

### 加载依赖关系示例

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
