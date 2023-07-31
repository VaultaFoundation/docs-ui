---
title: test_control_api_plugin
dont_translate_title: true
---

请参阅 [测试控制 API 参考](https://docs.eosnetwork.com/apis/leap/latest/test_control.api/)

## 概述

那个 `test_control_api_plugin` 允许将控制消息转发到 [测试控制插件](./test-control-plugin.md)。当前端点指示插件启动正常关闭 `nodeos` 到达特定区块后即为实例。此功能主要是为测试目的而设计的。

## 用法

```console
# config.ini
plugin = eosio::test_control_api_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::test_control_api_plugin
```

## 选项

无

## 用法示例

```sh
curl %s/v1/test_control/kill_node_on_producer -d '{ \"producer\":\"%s\", \"where_in_sequence\":%d, \"based_on_lib\":\"%s\" }' -X POST -H \"Content-Type: application/json\"" %
```

## 依赖关系

* [`test_control_plugin`](./test-control-plugin.md)
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
