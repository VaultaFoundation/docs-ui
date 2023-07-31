---
title: chain_api_plugin
dont_translate_title: true
---

请参阅 [链式 API 参考手册](https://docs.eosnetwork.com/apis/leap/latest/chain.api/)。

## 概述

那个 `chain_api_plugin` 公开了来自 [`chain_plugin`](./chain-plugin.md) 到由管理的 RPC API 接口 [`http_plugin`](../http_plugin/index.md)。

## 用法

```console
# config.ini
plugin = eosio::chain_api_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::chain_api_plugin
```

## 选项

无

## 依赖关系

* [`chain_plugin`](./chain-plugin.md)
* [`http_plugin`](./http-plugin.md)

### 加载依赖关系示例

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
