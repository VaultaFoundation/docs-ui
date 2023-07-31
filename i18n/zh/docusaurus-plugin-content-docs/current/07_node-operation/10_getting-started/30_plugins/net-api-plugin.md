---
title: net_api_plugin
dont_translate_title: true
---

请参阅 [网络 API 参考](https://docs.eosnetwork.com/apis/leap/latest/net.api/)。

## 概述

那个 `net_api_plugin` 公开了来自 [`net_plugin`](../net_plugin/index.md) 到由管理的 RPC API 接口 [`http_plugin`](../http_plugin/index.md)。那个 `net_api_plugin` 允许节点操作员管理主动节点的点对点 (p2p) 连接。

那个 `net_api_plugin` 提供了四个 RPC API 端点：
* 连接
* 断开连接
* 连接
* 状态

> ⚠️ 此插件公开了允许管理 p2p 连接的端点。不建议在可公开访问的节点上运行此插件，因为它可能会被利用。

## 用法

```console
# config.ini
plugin = eosio::net_api_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::net_api_plugin
```

## 选项

无

## 依赖关系

* [`net_plugin`](../net_plugin/index.md)
* [`http_plugin`](../http_plugin/index.md)

### 加载依赖关系示例

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
