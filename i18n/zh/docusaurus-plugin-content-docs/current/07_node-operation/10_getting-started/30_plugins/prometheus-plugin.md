---
title: prometheus_plugin
dont_translate_title: true
---

## 概述

那个 `prometheus_plugin` 提供各种内部数据收集 `nodeos` 指标。客户可以访问 `/v1/prometheus/metrics` 用于检索以下指标的端点：

-客户数量
-同行人数
-掉落的方块数量
-未应用的事务队列大小（事务数量）
-列入黑名单的交易数量（总计）
-生产的方块
-产生的交易
-最后一次不可逆转
-当前头块数
-账户的主观账单号码
-主观计费区块数
-定期交易
-每个 API 端点的 API 调用次数

## 格式

那个 `prometheus_plugin` endpoint 返回一个字符串，该字符串由指标名称及其相应的键/值对（也称为标签）组成，按时间顺序收集。

给定一个指标名称和一组标签，数据按时间顺序收集，并使用以下表示法进行格式化：

```
<metric name> { <label name>= <label value>, ... }
```

目前，其中收集了两种指标类型 `nodeos`:

-**计数器**：累积指标，会随着时间的推移而增加，例如对终端节点的请求数。
-**仪表**：数值的即时测量。它们可以是将被记录的任意值。

## 用法

```console
# config.ini
plugin = eosio::prometheus_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::prometheus_plugin
```

## 选项

这些可以从以下任一处指定 `nodeos` 命令行或 `config.ini` 文件:

### 的配置选项 `prometheus_plugin`

选项（=默认）| 描述
-|-
`--prometheus-exporter-address arg (=127.0.0.1:9101)` | 用于监听传入的 prometheus 指标 http 请求的本地 IP 和端口。

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
