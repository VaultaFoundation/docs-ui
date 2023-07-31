---
title: trace_api_plugin
dont_translate_title: true
---

请参阅 [跟踪 API 参考](https://docs.eosnetwork.com/apis/leap/latest/trace_api.api/)。

## 概述

那个 `trace_api_plugin` 提供面向消费者的 API，允许从特定区块中检索已停用的操作和关联的元数据。为了启用此功能，该插件将序列化的区块跟踪数据存储在文件系统上，随后可通过 HTTP RPC 请求访问这些数据。

## 目的

在将区块浏览器和交易所等应用程序与EOS区块链集成时，通常需要全面记录区块链处理的所有操作。这包括执行智能合约和预定交易时生成的操作。那个 `trace_api_plugin` 就是为了满足这一要求而设计的。

的主要目标 `trace_api_plugin` 是提供以下功能：

* 提供包括已停用操作及其相关元数据的成绩单。
* 提供以消费者为中心的长期 API，用于检索区块。
* 增强 EOS 节点内的资源管理，确保文件系统存储、磁盘空间和内存等资源的可持续使用。

虽然 `state_history_plugin` 提供了一个二进制流接口，用于访问结构链数据、动作数据和状态增量，这是 `trace_api_plugin` 是为了改善节点资源的维护，包括文件系统、磁盘空间和内存利用率。

## 用法

```console
# config.ini
plugin = eosio::trace_api_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::trace_api_plugin [options]
```

## 配置选项

这些可以从以下任一处指定 `nodeos` 命令行或 `config.ini` 文件:

### 的配置选项 `trace_api_plugin`

选项（=默认）| 描述
-|-
`--trace-dir arg (="traces")` | 跟踪目录的位置（绝对路径或相对于应用程序数据目录的路径）
`--trace-slice-stride arg (=10000)` | 每个 “片段” 跟踪数据将在文件系统上包含的块数
`--trace-minimum-irreversible-history-blocks arg (=-1)` | 在自动删除 “slice” 文件之前，要确保在 LIB 之外保存以供检索的块数。值为 -1 表示将关闭自动删除 “slice” 文件。
`--trace-minimum-uncompressed-irreversible-history-blocks arg (=-1)` | 要确保在 LIB 之前未压缩的块数。压缩的 “切片” 文件仍然可以访问，但在检索时可能会降低性能。值为 -1 表示将关闭 “slice” 文件的自动压缩。
`--trace-rpc-abi arg` | 解码跟踪 RPC 响应时使用的 ABI。必须至少指定一个 ABI 或者必须使用标志 trace-no-abis。ABI 以 ^account-name^=^abi-def^ 的形式指定为 “Key=Value” 对，其中 ^abi-def^ 可以是：包含有效 JSON 编码 ABI 的文件的绝对路径，来自的相对路径 `data-dir` 到包含有效 JSON 编码的 ABI 的文件
`--trace-no-abis` | 用于表示 RPC 响应将不使用 ABI。如果没有 trace-rpc-abi 配置，则不指定此选项将导致错误。这个选项与 trace-rpc-api 是互斥的

## 依赖关系

* [`chain_plugin`](../chain_plugin/index.md)
* [`http_plugin`](../http_plugin/index.md)

### 加载依赖关系示例

如果未在命令行中指定，则以下插件将使用默认设置加载，或者 `config.ini`:

```console
# config.ini
plugin = eosio::chain_plugin
[options]
plugin = eosio::http_plugin 
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [options]  \
           --plugin eosio::http_plugin [options]
```

## 配置示例

这里有一个 `nodeos` 的配置示例 `trace_api_plugin` 在追踪一些羚羊参考合约时：

```sh
nodeos --data-dir data_dir --config-dir config_dir --trace-dir traces_dir
--plugin eosio::trace_api_plugin 
--trace-rpc-abi=eosio=abis/eosio.abi 
--trace-rpc-abi=eosio.token=abis/eosio.token.abi 
--trace-rpc-abi=eosio.msig=abis/eosio.msig.abi 
--trace-rpc-abi=eosio.wrap=abis/eosio.wrap.abi
```

## 定义

本节概述了*slices*、*trace log* 内容和*clog 格式*。掌握这些概念有利于有效利用 `trace_api_plugin` 选项。

### 切片

在背景下 `trace_api_plugin`，*slice* 定义为给定起始区块高度（包括）和给定结束区块高度（不包括）之间的所有相关跟踪数据的集合。例如，从 0 到 10,000 的切片是所有区块数大于或等于 0 且小于 10,000 的区块的集合。跟踪目录包含切片的集合。每个片段都包含一个 *trace data* 日志文件和一个 *trace index* 元数据日志文件：

 *  `trace_<S>-<E>.log`
  *  `trace_index_<S>-<E>.log`

哪里 `<S>` 和 `<E>` 是切片的起始和结束区块号，前面用前导0填充大步向前。例如，如果起始方块为 5，最后一个方块为 15，步幅为 10，则结果为 `<S>` 是 `0000000005` 和 `<E>` 是 `0000000015`。

#### 日志: `trace_<S>-<E>.log`

跟踪数据日志是仅限附加的日志，用于存储实际的二进制序列化区块数据。内容包括为每个操作 ABI 增强的 RPC 请求提供服务所需的事务和操作跟踪数据。支持两种区块类型：
 
 * `block_trace_v0`
  * `block_trace_v1`

数据日志以基本标头开头，其中包含有关存储在日志中的数据的版本控制信息。 `block_trace_v0` 包括区块 ID、区块号、之前的区块 ID、生产时间戳、签署区块的生产者以及实际的跟踪数据。 `block_trace_v1` 添加交易列表和区块中包含的操作列表的 merkle 根哈希，以及自创世以来的生产计划数量。

日志可能包括作为链正常操作的一部分从区块链中分叉出来的区块。由于分叉，文件中的下一个条目的区块号将始终比前一个条目高一或相同或更少。每个跟踪条目在相应的分片文件中都会有一个相应的条目，用于跟踪索引。请注意，通过在中运行 nodeos 可以避免分叉方块 `read-mode=irreversible`。

#### 日志: `trace_index_<S>-<E>.log`

跟踪索引日志或元数据日志是仅限附加的日志，用于存储一系列二进制序列化类型。目前支持两种类型：

 * `block_entry_v0`
  * `lib_entry_v0`

索引日志以基本标头开头，其中包含有关存储在日志中的数据的版本控制信息。 `block_entry_v0` 包括区块 ID 和区块号，以及与数据记录中该区块位置的偏移量。此条目用于定位两者的偏移量 `block_trace_v0` 和 `block_trace_v1` 方块。 `lib_entry_v0` 包括最新已知 LIB 的条目。阅读器模块使用 LIB 信息向用户报告不可逆的状态。

### clog 格式

压缩的跟踪日志文件有 `.clog` 文件扩展名（请参阅 [压缩日志文件](#compression-of-log-files) 下面）。clog 是一个通用的压缩文件，末尾附加了可搜索的解压缩点的索引。clog 格式的布局如下所示：

![](/images/clog-format.png)

数据被压缩成原始的 zlib 形式，并定期放置全齐的 *seek points*。解压缩器可以从这些 *seek points* 中的任何一个开始，而不必读取先前的数据，如果搜索点出现在数据中，它也可以毫无问题地遍历该点。

> ℹ️ 减少跟踪日志的大小  
> 数据压缩可以将跟踪日志的空间增长减少二十倍！例如，使用512个寻道点并使用EOS公共网络上的测试数据集，数据压缩可将跟踪目录的增长从每天约50 GiB/天减少到约2.5 GiB/天（完整数据）。由于跟踪日志内容的高冗余性，压缩率仍可与 `gzip -9`。解压缩后的数据也可以通过 Trace RPC API 立即可用，而不会降低任何服务。

#### 搜寻点的作用

在压缩文件时，寻道点索引会记录原始的未压缩偏移量和新的压缩偏移量，从而创建映射，以便原始索引值（未压缩的偏移量）可以映射到未压缩偏移之前最近的搜索点。这大大缩短了流中稍后出现的未压缩文件部分的搜索时间。

## 自动维护

的主要设计目标之一 `trace_api_plugin` 是为了最大限度地减少文件系统资源的手动管理和维护。为此，该插件便于自动删除跟踪日志文件，并通过数据压缩自动减少其磁盘占用空间。

### 删除日志文件

允许删除以前创建的跟踪日志文件 `trace_api_plugin`，则可以使用以下选项： 

```sh
  --trace-minimum-irreversible-history-blocks N (=-1) 
```

如果争论 `N` 等于 0 或更大，插件只会保留 `N` 磁盘上当前的 LIB 块之前的块。任何区块号小于之前区块号的跟踪日志文件 `N` 将安排自动移除方块。

### 压缩日志文件

那个 `trace_api_plugin` 还支持通过对跟踪日志文件应用数据压缩来优化磁盘空间的选项：

```sh
  --trace-minimum-uncompressed-irreversible-history-blocks N (=-1)
```

如果争论 `N` 等于 0 或更大，插件会自动设置一个后台线程来压缩跟踪日志文件中不可逆的部分。当前 LIB 块之后的前 N 个不可逆块处于未压缩状态。

> ℹ️ 跟踪 API 实用程序  
> 也可以使用手动压缩跟踪日志文件 [trace_api_util](https://docs.eosnetwork.com/manuals/leap/latest/utilities/trace_api_util) 效用。

如果无法通过以下方式有效管理资源使用情况 `trace-minimum-irreversible-history-blocks` 和 `trace-minimum-uncompressed-irreversible-history-blocks` 选项，则可能需要定期进行手动维护。在这种情况下，用户可以选择通过外部系统或循环进程管理资源。

## 手动维护

那个 `trace-dir` 选项定义文件系统上存储跟踪日志文件的目录 `trace_api_plugin`。一旦 LIB 块超出给定切片，这些文件就会保持稳定，然后可以随时删除以回收文件系统空间。部署的 Antelope 系统将允许任何进程外管理系统删除此目录中的部分或全部文件，无论它们代表什么数据，或者是否有正在运行的文件 `nodeos` 实例是否访问它们。名义上可用，但由于手动维护而不再可用的数据，将导致相应的 API 端点发出 HTTP 404 响应。

> ℹ️ 适用于节点操作员  
> 节点操作员可以通过以下方式完全控制其节点中可用历史数据的生命周期 `trace-api-plugin` 还有 `trace-minimum-irreversible-history-blocks` 和 `trace-minimum-uncompressed-irreversible-history-blocks` 选项与任何外部文件系统资源管理器配合使用。
