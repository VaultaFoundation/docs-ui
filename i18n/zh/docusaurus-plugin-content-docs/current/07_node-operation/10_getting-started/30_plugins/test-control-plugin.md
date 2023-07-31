---
title: test_control_plugin
dont_translate_title: true
---

## 概述

那个 `test_control_plugin` 旨在便于内部测试 `nodeos` 实例。当前的功能允许受控且优雅 `nodeos` 在指定区块生产者生成的区块序列中到达特定区块时关闭。这用于测试，以确定确切的时间 `nodeos` 实例将关闭。

> ℹ️ 那个 `test_control_plugin` 可以用来根据**head block**（指最近的区块）或**最后一个不可逆区块**（代表已实现不可逆终局的区块）启动关闭。

那个 `test_control_plugin` 还实现了由提供的核心功能 [测试控制 API 插件](./test-control-api-plugin.md)。

## 用法

```console
# config.ini
plugin = eosio::test_control_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::test_control_plugin
```

## 选项

无

## 依赖关系

* [`chain_plugin`](./chain-plugin.md)

### 加载依赖关系示例

```console
# config.ini
plugin = eosio::chain_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [operations] [options]
```
