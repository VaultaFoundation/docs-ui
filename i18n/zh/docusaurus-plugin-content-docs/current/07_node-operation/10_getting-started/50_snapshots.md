---
title: 快照
---

快照是在特定时间点捕获区块链状态。它包括所有变更的总和 
在此之前，一直发生在交易执行中。这意味着它包括所有创建的账户、合约代码、
合约数据，以及在区块链上创建或修改的任何其他内容。

但是，它不包括区块链的历史记录。这意味着它不包括交易本身。这些
存储在 `blocks.log` 文件。 

## 同步新节点

为了加快同步过程，您可以下载快照并将其导入您的节点。这将允许你跳过
该过程中原本需要更长时间的部分。

### 必需配置

您应该在您的中启用以下插件 `config.ini` 文件:

```ini
plugin = eosio::chain_plugin
plugin = eosio::chain_api_plugin
plugin = eosio::net_plugin
plugin = eosio::net_api_plugin
plugin = eosio::producer_plugin
plugin = eosio::producer_api_plugin
plugin = eosio::state_history_plugin
```

### 获取快照

以下是一些可以下载近期快照的网站：

- [EOS 国家](https://snapshots.eosnation.io/)
- [EOS 瑞典](https://snapshots-main.eossweden.org/)

### 开始之前

你应该清理你的节点 `data/state` 目录。 

### 导入快照

现在，您可以将快照导入到您的节点中：

```shell
nodeos --snapshot /path/to/snapshot.bin
```

> ⚠ **警告**
> 
> 在节点从网络收到至少 1 个区块之前，请勿将其停止，否则它将无法重启。

### 如果你的节点无法接收方块

如果 nodeos 无法从网络接收方块，请尝试使用 `cleos net disconnect` 
和 `cleos net connect` 重新连接超时的节点。

> ⚠ **警告**
> 
> 使用时要小心 `net_api_plugin`。要么使用防火墙来阻止访问你的 `http-server-address`，或者更改 
> 它到 `localhost:8888` 禁用远程访问。

### 使用数据库填充物

如果您使用的是数据库填充器，则需要查找 `Placing initial state in block <block_num>` 在日志中。 

然后，你可以用以下参数开始填充：
```shell
... --fpg-create --fill-skip-to <block_num> --fill-trim
```

**在后续运行中，您不应使用 `--fpg-create` 和 `--fill-skip-to` 争论。**


## 创建包含完整状态历史记录的快照

创建快照允许您创建节点状态的备份。如果你想创建周期性的，这可能很有用 
节点的备份，或者如果您想创建快照与他人共享。

### 创建快照

```shell
curl http://127.0.0.1:8888/v1/producer/create_snapshot
```

上面的命令会触及你的 `producer_api_plugin` 并创建快照。快照将保存在
`data/snapshots` 目录。

等待 `nodeos` 在快照完成后处理多个块。目标是让状态历史档案 
包含的块比便携式快照至少多 1 个，而且 `blocks.log` 之后要包含区块的文件 
它已变得不可逆转。

> ⚠ **警告**
> 
> 如果便携式快照中包含的块被分叉，则该快照将无效。如果发生这种情况，请重复此过程。

### 收集其他文件

上面创建的快照仅包含捕获时的状态。它不包括区块链历史记录。

要创建可用于快速同步节点的完整软件包，您需要收集以下文件：
-的内容 `data/state-history`
  - `chain_state_history.log`
  - `trace_history.log`
  - `chain_state_history.index` -可选：如果没有此文件，恢复将花费更长的时间。
 - `trace_history.index` -可选：如果没有此文件，恢复将花费更长的时间。
-可选： `data/blocks`，但不包括 `data/blocks/reversible`


## 恢复包含完整状态历史记录的快照

该过程与同步新节点的过程几乎相同。唯一的区别是你需要复制
将上一节中的文件放入 `data` 启动节点之前的目录。

您包含的**可选**文件越多，节点同步的速度就越快。

## 重播/使用完整状态历史记录重新同步

重播或重新同步节点将确保该节点与网络同步。如果你愿意，这很有用 
崩溃后重新同步您的节点。

你可以删除 `data/state` 目录，或者使用 `--replay-blockchain` 争论。

```shell
nodeos --replay-blockchain --snapshot /path/to/snapshot.bin
```
