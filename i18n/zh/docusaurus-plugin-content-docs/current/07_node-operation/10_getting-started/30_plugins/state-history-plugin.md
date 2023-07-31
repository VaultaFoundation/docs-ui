---
title: state_history_plugin
dont_translate_title: true
---

## 概述

那个 `state_history_plugin` 是捕获和存储有关区块链状态的历史信息的宝贵工具。该插件的工作原理是从其他互连节点接收区块链数据，然后将这些数据存储到文件中。此外，该插件建立套接字连接以监听来自应用程序的传入连接。连接后，它可以根据启动插件时为插件设置的特定选项提供所请求的区块链数据 `nodeos` 实例。

## 用法

```console
# config.ini
plugin = eosio::state_history_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::state_history_plugin [operations] [options]
```

## 操作

这些只能从中指定 `nodeos` 命令行：

### 的命令行选项 `state_history_plugin`

选项（=默认）| 描述
-|-
`--delete-state-history` | 清除状态历史文件

## 选项

这些可以从以下任一处指定 `nodeos` 命令行或 `config.ini` 文件:

### 的配置选项 `state_history_plugin`

选项（=默认）| 描述
-|-
`--state-history-dir arg (="state-history")` | 状态历史目录的位置（绝对路径或相对于应用程序数据目录的路径）
`--state-history-retained-dir arg` | 状态历史记录保留目录的位置（绝对路径或相对于状态历史目录的路径）。
`--state-history-archive-dir arg` | 状态历史档案目录的位置（绝对路径或相对于状态历史目录的路径）。如果该值为空字符串，则超出保留限制的块文件将被删除。存档目录中的所有文件完全由用户控制，也就是说，nodeos 将不再访问它们。
`--state-history-stride arg` | 当区块编号是步幅的倍数时拆分状态历史记录日志文件当达到步幅时，当前的历史日志和索引将被重命名为 '*-history-^start num^-^end num^.log/index '，并将使用最新的区块创建新的当前历史日志和索引。遵循此格式的所有文件都将用于构建扩展历史日志。
`--max-retained-history-files arg` | 要保留的最大历史文件组数，以便可以查询这些文件中的块。达到该数字后，最旧的历史文件将被移至存档目录，如果存档目录为空，则将其删除。用户不应操纵保留的历史记录日志文件。
`--trace-history` | 启用跟踪历史记录
`--chain-state-history` | 启用链状态历史记录
`--state-history-endpoint arg (=127.0.0.1:8080)` | 用于监听传入连接的端点。注意：仅向内部网络公开此端口。
`--state-history-unix-socket-path arg` | 创建 unix 套接字的路径（相对于 data-dir），用于监听传入的连接。
`--trace-history-debug-mode` | 为跟踪历史记录启用调试模式
`--state-history-log-retain-blocks arg` | 如果已设置，则定期修剪状态历史文件以仅存储已配置数量的最新区块

## 示例

* [如何使用完整历史记录重播或重新同步](../../snapshots#replay--resync-with-full-state-history)
* [如何创建包含完整状态历史记录的便携式快照](../../snapshots#creating-a-snapshot-with-full-state-history)
* [如何恢复具有完整状态历史记录的便携式快照](../../snapshots#restoring-a-snapshot-with-full-state-history)

## 依赖关系

* [`chain_plugin`](../chain_plugin/index.md)

### 加载依赖关系示例

```console
# config.ini
plugin = eosio::chain_plugin --disable-replay-opts
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin --disable-replay-opts
```
