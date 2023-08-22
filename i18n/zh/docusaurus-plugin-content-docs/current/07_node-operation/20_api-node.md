---
title: 运行 API 节点
---

API节点是EOS区块链网络的关键组件，它充当包括dApps在内的用户和EOS区块链之间的接口。在处理通过其中一个接收的传入客户端请求时，API 节点扮演以下角色之一 `chain_api_plugin` 端点：

-**推送 API 节点**：接受来自 HTTP 客户端的交易并将其中继到其他对等节点。通常不接受传入的 p2p 交易。仅限上行流量。
-**链 API 节点**：提供对区块链数据的访问，例如账户、权限、合约代码/ABI、合约表等。也需要 API 交易。
-**拉取 API 节点**：类似于 Chain API 节点，但不接受来自 HTTP 客户端的交易。这种设置并不常见，但在技术上是可行的。

> ℹ️ **区块链原语**  
> Chain API 节点还允许访问读取的区块链基元，例如链、区块、交易、生产者、协议功能等。但是，由于这些基元通常在磁盘、内存和带宽方面占用更大，尤其是 `get_block`，它们更适合使用第 2 层历史记录解决方案 `state_history` 插件。

推送 API 节点通常只监听 HTTP 客户端请求，不接受传入的 p2p 交易。这可以腾出处理时间，让推送节点快速处理客户端请求。相比之下，Chain API节点受益于接收p2p交易以同步其本地区块链状态，这也加快了对客户的响应时间。

> ℹ️ **链 API 终端节点**  
> HTTP 客户端通过其中一个发送请求 `chain_api_plugin` 端点。推送请求通常会使用 `send_transaction` 端点或类似的以写入区块链数据或更改区块链状态。常见的拉取请求将使用 `get_table_rows` 端点或类似的读取区块链数据。

## 你为什么要使用 API 节点？

作为开发人员，您可以部署自己的API节点来连接到EOS区块链，并将以下功能引入您的智能合约和dApp中：

-**数据访问**：API节点允许用户查询区块链的状态及其部分历史记录，访问账户余额、交易明细、智能合约数据和其他区块链相关数据等信息。

-**交易广播**：当用户或dApp想要在EOS区块链上执行交易时，他们会将交易提交给API节点。然后，该节点将交易广播到网络，确保交易到达所有必要的区块生产者以包含在区块链中。

> ℹ️ **公共和私有节点**  
> API 节点可以是公共的，也可以是私有的。公共节点向公众开放，任何人都可以使用，而私有节点通常由开发人员、应用程序或组织运营，以私下管理他们与区块链的交互。

-**API 端点**：API 节点公开各种端点，允许客户端与区块链进行交互。这些端点通常基于HTTP/HTTPS并遵循EOSIO API规范，因此开发人员可以更轻松地将EOS集成到他们的应用程序中。

-**负载平衡**：由于对访问区块链的客户端的需求可能很高，因此许多节点运营商使用 API 节点集群进行负载平衡。这样可以确保网络可以处理大量请求，而不会不堪重负。

## 硬件要求

API 节点的实际硬件要求因交易吞吐量、客户端请求、可用带宽等而异。但是，最大的因素主要取决于 API 节点是否需要维护区块日志文件。有关 API 节点实际要求的更多信息，请访问 [硬件要求](../10_getting-started/10_hardware-requirements.md) 部分，特别是：

* [带有区块日志的 API 节点](../10_getting-started/10_hardware-requirements#api-node-with-blocks-log)
* [没有区块日志的 API 节点](../10_getting-started/10_hardware-requirements#api-node-without-blocks-log)

> ℹ️ **链 API 节点维护区块日志**  
> Chain API 节点需要维护自己的区块日志文件才能从区块链中提取数据。维护区块日志文件意味着您的节点从快照或创世中重播了区块链。这使您的 API 节点能够将区块链状态与其他节点同步，并通过在本地读取区块链状态来快速处理客户端请求。Chain API 节点执行的一项常见任务是获取 dApp 或已部署的智能合约请求的表格数据。

## 软件要求

要设置 API 节点，请先安装 Antelope [跳跃](https://github.com/AntelopeIO/leap) 软件。要安装的 Leap 版本取决于您将节点部署在 EOS 测试网还是 EOS 主网上。

> ℹ️ **主网上的 Leap 软件与测试网的对比**  
> EOS测试网通常运行最新的Leap版本，通常是发布后不久的最新版本。为了稳定性和安全性，EOS主网通常会使用Leap软件的先前稳定发行版本。

要查找您要部署的 EOS 网络的其他 API 节点正在运行哪个版本，请在 EOS Nation Validate 网站上选择您选择的 EOS 网络，然后导航到该网络的 API 报告：

* https://validate.eosnation.io/

例如，要查看 EOS 主网、EOS Jungle 测试网或 EOS Kylin 测试网上最新的 API 节点，你可以分别访问：

* https://validate.eosnation.io/eos/reports/api_versions.txt
* https://validate.eosnation.io/jungle4/reports/api_versions.txt
* https://validate.eosnation.io/kylin/reports/api_versions.txt

对于您的 API 节点，您可能需要使用大多数其他 API 节点在要部署的 EOS 网络上使用的相同 Leap 版本。您可以在此处为特定版本选择 Leap 二进制文件：

* https://github.com/AntelopeIO/leap/tags

安装 Leap 软件后，进入下面的配置部分。

## 配置

API 节点可以配置为推送 API 节点、链 API 节点或提取 API 节点。所有 API 节点都必须启用 `chain_api_plugin` 以公开 API 端点。下表突出显示了所有 API 节点类型之间的主要区别：

API 节点类型 | 维护区块日志 | 接受 p2p 交易 | 接受 API 交易
-|-|-|-
**推送 API 节点** | 否 | 否 | 是
**链 API 节点** | 是 | 是 | 是 | 是
**提取 API 节点** | 是 | 是 | 否

> ℹ️ **引擎盖下的插件**  
> 客户端请求由管理的 RPC API 接口接收 `http_plugin` 并最终由 `chain_api_plugin`，它公开了由实现的功能 `chain_plugin`。从那以后 `chain_plugin` 默认情况下处于启用状态，您只需要启用 `chain_api_plugin` 明确地，这也将自动启用 `http_plugin`。查看 [chain_api_plugin](../10_getting-started/30_plugins/chain-api-plugin.md) 更多细节的文档。

### 先决步骤

你的 API 节点将自行运行 `nodeos` 实例。如果你还没有推出 `nodeos` 或者有 `data` 和 `config` 文件夹，请按照本节中的说明进行操作：

* 设置主要 `nodeos` 数据文件夹变量取决于您计划部署的 EOS 网络：

 例如，如果部署在EOS主网上，则可以选择：
  ```ini
  EOSDIR=~/eos/mainnet
  ```
  或者，如果部署在EOS Jungle测试网上，则可以选择：
  ```ini
  EOSDIR=~/eos/jungle_testnet
  ```
  等等

* 创建默认值 `config.ini` 文件-您将在以下步骤中对其进行编辑：

  ```sh
  mkdir -p $EOSDIR
  nodeos --print-default-config >$EOSDIR/config.ini
  ```

按照以下说明将 API 节点配置为推送 API、链 API 或提取 API 节点。首先从 [任何 API 节点配置](#any-api-node-configuration)，然后继续使用您选择要部署的 API 节点配置：

### 任何 API 节点配置

以下配置设置适用于任何 API 节点。

* 打开默认值 `config.ini` 例如，使用您的文本编辑器：

  ```sh
  vim $EOSDIR/config.ini
  ```

编辑默认值 `config.ini` 并添加/取消评论/修改以下字段：

* 设置连锁数据库的最大大小（以 MB 为单位）-确保它低于您的可用内存（以下值为 16 GB RAM）：

  ```ini
  chain-state-db-size-mb = 16384
  ```

> ℹ️ 链数据库最大大小  
> 注意不要高估您的连锁数据库的最大大小。您在中指定的值 `chain-state-db-size-mb` 将在磁盘上预先分配为内存映射文件 `state/shared_memory.bin`。

* 设置本地 IP 和端口以监听传入的 http 请求：

  ```ini
  http-server-address = 0.0.0.0:8888
  ```

* 设置跨源资源共享 (CORS) 值：
  ```ini
  access-control-allow-origin = *
  access-control-allow-headers = Origin, X-Requested-With, Content-Type, Accept
  ```

* 将以下字段设置为指定值或取消注释：

  ```ini
  abi-serializer-max-time-ms = 2000
  chain-threads = 8
  contracts-console = true
  eos-vm-oc-compile-threads = 4
  verbose-http-errors = true
  http-validate-host = false
  http-threads = 6
  ```

* 添加/更新 p2p 端点列表：

  ```ini
  p2p-peer-address = <host1>:<port1>
  p2p-peer-address = <host2>:<port2>
  etc.
  ```

  > ℹ️ **对等**  
  > 有关对等互连的信息，请查看 [对等](../10_getting-started/40_peering.md) 指南，特别是 [如何找到同龄人](../10_getting-started/40_peering.md#how-to-locate-peers) 部分。

 简而言之，替换中最新的 p2p 端点列表 `config.ini` 根据您要部署的 EOS 网络：

 -https://validate.eosnation.io/

 例如，要获取 EOS 主网、EOS Jungle 测试网或 EOS Kylin 测试网上最新的 p2p 端点，你可以分别访问：

 -https://validate.eosnation.io/eos/reports/config.txt
 -https://validate.eosnation.io/jungle4/reports/config.txt
 -https://validate.eosnation.io/kylin/reports/config.txt

* 启用 `chain_api_plugin`:

  ```ini
  plugin = eosio::chain_api_plugin
  ```

### 推送 API 节点配置

一定要仔细阅读 [任何 API 节点配置](#any-api-node-configuration) 第一节。以下配置设置仅适用于 Push API 节点。

编辑默认值 `config.ini` 并添加/取消评论/修改以下字段：

  ```ini
  p2p-accept-transactions = false
  ```

现在 Push API 节点已配置完毕，请继续执行 [部署](#deployment) 部分。

### 链 API 节点配置

一定要仔细阅读 [任何 API 节点配置](#any-api-node-configuration) 第一节。以下配置设置适用于任何全链 API 节点。

编辑默认值 `config.ini` 并添加/取消评论/修改以下字段：

* 选择外部 IP 和端口以监听传入的 p2p 连接：

  ```ini
  p2p-server-address = YOUR_EXTERNAL_IP_ADDRESS:9876
  ```

* 将以下字段设置为指定值或取消注释：

  ```ini
  enable-account-queries = true
  p2p-listen-endpoint = 0.0.0.0:9876
  p2p-max-nodes-per-host = 100
  sync-fetch-span = 2000
  ```

现在，Chain API 节点已配置完毕，请继续执行 [部署](#deployment) 部分。

### 拉取 API 节点配置

一定要仔细阅读 [任何 API 节点配置](#any-api-node-configuration) 第一节。以下配置设置适用于任何 Pull API 节点。

编辑默认值 `config.ini` 并添加/取消评论/修改以下字段：

* 选择外部 IP 和端口以监听传入的 p2p 连接：

  ```ini
  p2p-server-address = YOUR_EXTERNAL_IP_ADDRESS:9876
  ```

* 将以下字段设置为指定值或取消注释：

  ```ini
  api-accept-transactions = false
  enable-account-queries = true
  p2p-listen-endpoint = 0.0.0.0:9876
  p2p-max-nodes-per-host = 100
  sync-fetch-span = 2000
  ```

现在，Pull API 节点已配置完毕，请继续执行 [部署](#deployment) 部分。

## 部署

配置 API 节点后，您可以按照以下步骤部署节点：

### 打开 TCP 端口

如果你的节点将在防火墙/路由器后面运行：
1。打开 TCP 端口 `8888` 仅在设置**推送 API **节点时 
 或
2。打开 TCP 端口 `8888` 和 `9876`，如果设置了**链 API **或**提取 API **节点

如果您正在运行 Docker 容器，请记住打开上面的适用端口。

### 下载最近的快照

接下来，您需要将节点的区块链状态与正在部署的特定EOS区块链同步。要实现这一点，最简单的方法是从最近的快照中恢复。

> ℹ️ **快照**  
> 有关快照的信息，请查看 [快照](../10_getting-started/50_snapshots.md) 指南。

有各种信誉良好的网站可以下载快照。维护各种 EOS 网络最新快照的好来源之一是**EOS Nation Antelopeio Snapshots**网站：

* https://snapshots.eosnation.io/

访问上述网站，然后为要部署节点的 EOS 网络选择最近的快照。例如，对于EOS主网、Jungle测试网或Kylin测试网，你可以分别从网站上的以下部分中选择快照：

* EOS 主网-v6
* Jungle 4 测试网-v6
* Kylin Testnet-v6

按照以下说明下载最新的快照：

* 安装 `zstd` archiver-你需要它来解压缩压缩后的快照：

  ```sh
  sudo apt install zstd
  ```

* 下载最新的压缩快照：

#### 适用于 EOS 主网

  ```sh
  wget https://snapshots.eosnation.io/eos-v6/latest -O $EOSDIR/snapshots/latest.bin.zst
  ```

#### 适用于丛林测试网

  ```sh
  wget https://snapshots.eosnation.io/jungle4-v6/latest -O $EOSDIR/snapshots/latest.bin.zst
  ```

#### 适用于 Kylin 测试网

  ```sh
  wget https://snapshots.eosnation.io/kylin-v6/latest -O $EOSDIR/snapshots/latest.bin.zst
  ```

* 解压缩压缩后的快照：

  ```sh
  zstd -d $EOSDIR/snapshots/latest.bin.zst
  ```

的 `snapshots` 目录现在应该包含未压缩的 `latest.bin` 快照。

### 恢复/从最近的快照启动

按照以下说明从您最近下载的快照中恢复/启动您的节点。

> ℹ `blocks` 目录  
> 如果你重复上面的说明，你可能有一个 ` blocks` 目录已经在你的 `$EOSDIR` 数据目录。除非您还打算使用区块日志（该日志至少应包含快照中的区块），否则建议将所有现有数据存入 `blocks` 目录已删除： `rm -rf $EOSDIR/blocks` 在从快照恢复之前。

* 从最新的快照恢复/启动节点：

  ```sh
  nodeos --data-dir $EOSDIR --config-dir $EOSDIR --snapshot $EOSDIR/snapshots/latest.bin >> $EOSDIR/nodeos.log 2>&1 &
  ```

上面的命令将启动 `nodeos`，正在重定向 `stdout` 和 `stderr` 到 `nodeos.log`。更重要的是， `--snapshot` 选项会将您的 API 节点的链状态同步到您正在部署的 EOS 网络的状态，从最新的快照开始。这包括账户、余额、合约代码、表格等，但不包括过去的交易历史记录，除非您从区块日志进行同步。但是，同步完成后，您的API节点应继续接收最新生成的不可逆区块，其中现在将包括最近的交易历史记录。

> ℹ️ **过去的交易记录**  
> 如果你想让你的API节点拥有过去的区块链历史记录，你需要从区块日志中重播区块链。但是，这种情况并不常见。对于过去的区块链历史，有比 API 节点更好的解决方案，例如历史节点。

## 测试

首先，请确保您的 API 节点成功启动并且它仍在同步或接收区块：
```sh
tail -f $EOSDIR/nodeos.log
```
```
...
info  2023-08-15T23:16:04.797 nodeos    producer_plugin.cpp:651       on_incoming_block    ] Received block b9dd3609f8194902... #92772000 @ 2023-08-15T23:01:02.000 signed by jumpingfrogs [trxs: 0, lib: 92771671, confirmed: 0, net: 0, cpu: 1, elapsed: 55, time: 98, latency: 902797 ms]
info  2023-08-15T23:16:05.367 nodeos    producer_plugin.cpp:651       on_incoming_block    ] Received block 0966e24d95ef120f... #92773000 @ 2023-08-15T23:09:22.000 signed by ivote4eosusa [trxs: 1, lib: 92772667, confirmed: 0, net: 120, cpu: 1253, elapsed: 175, time: 272, latency: 403367 ms]
...
```

其次，确保您的 API 节点从快照成功初始化。搜寻 `snapshot` 在 `nodeos.log` 文件:

```sh
grep -i snapshot $EOSDIR/nodeos.log
```
```
info  2023-08-15T23:15:55.395 nodeos    controller.cpp:603            startup              ] Starting initialization from snapshot and no block log, this may take a significant amount of time
info  2023-08-15T23:15:55.707 nodeos    controller.cpp:610            startup              ] Snapshot loaded, lib: 92757487
info  2023-08-15T23:15:55.707 nodeos    controller.cpp:613            startup              ] Finished initialization from snapshot
...
```

### 本地测试

第三，测试本地 `get_info` 端点来自 `chain_api_plugin` 要请求有关您刚刚部署了 API 节点的区块链的信息，请执行以下操作：

```sh
cleos get info
curl -L http://localhost:8888/v1/chain/get_info
```

或者在浏览器上访问以下 URL：

* http://localhost:8888/v1/chain/get_info

您的 API 节点应返回以下响应：

```
{
  "server_version": "7e1ad13e",
  "chain_id": "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
  ...
  "head_block_producer": "alohaeostest",
  "virtual_block_cpu_limit": 200000000,
  ...
  "earliest_available_block_num": 92757488,
  "last_irreversible_block_time": "2023-08-17T16:02:05.500"
}
```

### 远程测试

最后，你还应该对公众进行测试 `get_info` 终端节点（如果您打算将 API 节点用于公共消费）：

```sh
cleos -u http://YOUR_EXTERNAL_IP_ADDRESS:8888 get info
curl -L http://YOUR_EXTERNAL_IP_ADDRESS:8888/v1/chain/get_info
```

或者在浏览器上访问以下 URL：

* http://YOUR_EXTERNAL_IP_ADDRESS:8888/v1/chain/get_info

> ℹ️ **远程测试提示**  
> 确保从您的网络外部发送/浏览终端节点请求/URL。例如，您可以暂时断开移动设备与 Wi-Fi 网络的连接，并使用移动数据/网络共享。

您的 API 节点应返回与上面最后一个输出相似的响应。如果出现错误，请检查 Wi-Fi 路由器和 Docker 容器上的端口转发设置（如果有）。

## 摘要

在本指南中，您在特定的EOS网络上配置并部署了API节点，例如EOS主网，EOS Jungle测试网，EOS Kylin测试网等。您现在可以为该网络获取一些原生资产，并使用您的API节点部署EOS智能合约并发送交易，获取区块链数据，或两者兼而有之。
