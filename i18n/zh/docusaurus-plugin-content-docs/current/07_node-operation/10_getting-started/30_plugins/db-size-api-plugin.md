---
title: db_size_api_plugin
dont_translate_title: true
---

请参阅 [数据库大小 API 参考](https://docs.eosnetwork.com/apis/leap/latest/db_size.api/)。

## 概述

那个 `db_size_api_plugin` 获取与区块链相关的分析。它至少会检索以下信息：
* free_bytes
* 已用字节
* 尺寸
* 指数

## 用法

```console
# config.ini
plugin = eosio::db_size_api_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::db_size_api_plugin
```

## 选项

无

## 依赖关系

* [`chain_plugin`](../chain_plugin/index.md)
* [`http_plugin`](../http_plugin/index.md)

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
