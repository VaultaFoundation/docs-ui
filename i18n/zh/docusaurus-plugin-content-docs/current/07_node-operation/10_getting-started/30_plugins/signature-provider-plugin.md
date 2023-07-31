---
title: signature_provider_plugin
dont_translate_title: true
---

## 概述

那个 `signature_provider_plugin` 目前是以前在内部实现的数字签名功能的内部实现 `producer_plugin`。虽然它目前仅由 `producer_plugin`，这种新设计可以更好地分离关注点，如果未来的用例证明有道理，它将使其他插件能够执行签名操作。

## 用法

```console
# config.ini
plugin = eosio::signature_provider_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::signature_provider_plugin
```

## 选项

这些可以从以下任一处指定 `nodeos` 命令行或 `config.ini` 文件:

### 的配置选项 `signature_provider_plugin`

选项（=默认）| 描述
-|-
`--keosd-provider-timeout arg (=5)` | 限制允许向 keosd 提供商发送签名请求的最大时间（以毫秒为单位）

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
