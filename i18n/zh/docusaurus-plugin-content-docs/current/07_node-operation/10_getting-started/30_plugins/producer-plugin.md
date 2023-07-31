---
title: producer_plugin
dont_translate_title: true
---

## 概述

那个 `producer_plugin` 包含节点执行区块生产任务的功能。它还实现了由提供的核心功能 [制作人 API 插件](./producer-api-plugin.md).

> ℹ️ 要启用区块生产，特定 `nodeos` 配置是必要的。请参阅 [配置区块生成节点](https://docs.eosnetwork.com/manuals/leap/latest/nodeos/usage/node-setups/producing-node) 详细说明指南。

## 用法

```console
# config.ini
plugin = eosio::producer_plugin [options]
```
```sh
# nodeos startup params
nodeos ... -- plugin eosio::producer_plugin [options]
```

## 选项

这些可以从以下任一处指定 `nodeos` 命令行或 `config.ini` 文件:

### 的配置选项 `producer_plugin`

选项（=默认）| 描述
-|-
`-e [ --enable-stale-production ]` | 即使链已过时，也能启用区块生产。
`-x [ --pause-on-startup ]` | 在暂停生产的状态下启动此节点
`--max-transaction-time arg (=30)` | 限制推送的事务的代码在被视为无效之前允许执行的最大时间（以毫秒为单位）
`--max-irreversible-block-age arg (=-1)` | 限制此节点将在其上生成区块的链的 DPOS 不可逆区块的最大使用寿命（以秒为单位）（使用负值表示无限制）
`-p [ --producer-name ] arg` | 由此节点控制的生产者 ID（例如 inita；可以多次指定）
`--signature-provider arg (=<PUBLIC_KEY>=KEY:<PRIVATE_KEY>)` | key=Value 对 ^public-key^=^provider-spec^ 其中：^public-key^ 是有效 EOSIO 公钥的字符串形式 ^provider-spec^ 是 ^provider-type^ 是 KEY、KEOSD 或 SE KEY：^data^ 是有效的 EOSIO 私钥的字符串形式，它映射到提供的公钥 KEESIO 私钥 OSD: ^data^ 是 keosd 可用且相应钱包已解锁的网址
`--greylist-account arg` | 无法访问扩展 CPU/NET 虚拟资源的帐户
`--greylist-limit arg (=1000)` | 限制 CPU/NET 虚拟资源在低使用率期间可以扩展的倍数（介于 1 到 1000 之间）（仅在主观上强制执行；使用 1000 不强制执行任何限制）
`--produce-time-offset-us arg (=0)` | 非最后一个区块生成时间的偏移量，以微秒为单位。有效范围 0..-block_time_interval。
`--last-block-time-offset-us arg (=-200000)` | 最后一个区块生成时间的偏移量，以微秒为单位。有效范围 0..-block_time_interval。
`--cpu-effort-percent arg (=80)` | 用于生成区块的 cpu 区块生产时间的百分比。整数百分比，例如 80 表示 80%
`--last-block-cpu-effort-percent arg (=80)` | 用于生成最后一个区块的 cpu 区块生产时间的百分比。整数百分比，例如 80 表示 80%
`--max-block-cpu-usage-threshold-us arg (=5000)` | 考虑区块已满的 CPU 区块生产阈值；当在 max-block-cpu-usage 区块的阈值之内时，可以立即生成
`--max-block-net-usage-threshold-bytes arg (=1024)` | 考虑区块已满的净区块生产阈值；当在最大区块净使用量区块的阈值内时，可以立即生成
`--max-scheduled-transaction-time-per-block-ms arg (=100)` | 在恢复正常交易处理之前，在任何区块中停用计划交易（以及根据传入延迟比率计算的传入交易）所花费的最大挂钟时间（以毫秒为单位）。
`--subjective-cpu-leeway-us arg (=31000)` | 启动时的 CPU 配额不足以完成和满足 CPU 使用率的事务所允许的时间（以微秒为单位）。
`--subjective-account-max-failures arg (=3)` | 设置每个窗口大小允许给定账户的最大失败次数。
`--subjective-account-max-failures-window-size arg (=1)` | 设置 subjective-account-max-failu res 的窗口大小（以块数为单位）。
`--subjective-account-decay-time-minutes arg (=1440)` | 设置为账户返回全部主观 cpu 的时间
`--incoming-defer-ratio arg (=1)` | 传入事务和延迟事务排队等候执行时的比率
`--incoming-transaction-queue-size-mb arg (=1024)` | 传入事务队列的最大大小（以 MiB 为单位）。超过此值将在资源耗尽的情况下主观上丢弃事务。
`--disable-subjective-billing arg (=1)` | 禁用 API/P2P 交易的主观 CPU 计费
`--disable-subjective-account-billing arg` | 不在主观 CPU 计费范围内的账户
`--disable-subjective-p2p-billing arg (=1)` | 禁用 P2P 交易的主观 CPU 计费
`--disable-subjective-api-billing arg (=1)` | 禁用 API 交易的主观 CPU 计费
`--producer-threads arg (=2)` | 生产者线程池中的工作线程数
`--snapshots-dir arg (="snapshots")` | 快照目录的位置（绝对路径或相对于应用程序数据目录的路径）
`--read-only-threads arg` | 只读执行线程池中的工作线程数。最多 8 个。
`--read-only-write-window-time-us arg (=200000)` | 写入窗口持续的时间（以微秒为单位）。
`--read-only-read-window-time-us arg (=60000)` | 读取窗口持续的时间（以微秒为单位）。

## 依赖关系

* [`chain_plugin`](./chain-plugin.md)

## 交易的优先级

当 producer 插件有待处理的事务队列时，你可以让其中一种事务类型优先于另一种事务类型。

以下选项设置传入事务和延迟事务处理之间的比率：

```console
  --incoming-defer-ratio arg (=1)       
```

默认值为 `1`， `producer` 插件为每笔延迟事务处理一个传入的交易。什么时候 `arg` 设置为 `10`， `producer` 插件每笔延迟事务处理 10 笔传入交易。

如果 `arg` 设置为足够大的数字，插件始终先处理传入的事务，直到传入事务的队列为空。分别地，如果 `arg` 是 0， `producer` 插件首先处理延迟事务队列。


### 加载依赖关系示例

```console
# config.ini
plugin = eosio::chain_plugin [operations] [options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [operations] [options]
```

有关如何生成方块的详细信息，请阅读以下内容 [区块生成解释器](https://docs.eosnetwork.com/manuals/leap/latest/nodeos/plugins/producer_plugin/block-producing-explained).
