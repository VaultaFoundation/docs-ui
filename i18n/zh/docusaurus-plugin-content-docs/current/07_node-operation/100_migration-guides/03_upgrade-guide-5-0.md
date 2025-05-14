---
title: Leap 5.0 升级指南
---

要查看 5.0 版本说明，请单击 [这里](https://github.com/AntelopeIO/spring/releases/tag/v5.0.0-rc2)。

## 弃用和移除

### 延期交易已删除
延期交易先前已被弃用并已删除。不能创建新的延期交易。现有的延迟交易将被禁止执行。

### 获取区块标头状态已弃用
从 Leap v5.0.0 开始 `v1/chain/get_block_header_state` 已过时。它将在 Leap v6.0.0 中移除。

## 需要从快照重启
由于状态内存存储的结构变化，必须从快照重新启动 nodeos 5.0，或者从完整交易同步中恢复。来自任何版本的 nodeos 的快照都可用于启动 5.0 节点。

以下是在 ubuntu 上从快照重启的示例步骤：
-下载最新版本
 -前往 [Leap 发布](https://github.com/AntelopeIO/spring/releases) 下载最新版本
-创建新快照
 - `curl -X POST http://127.0.0.1:8888/v1/producer/create_snapshot`
      等待 curl 返回一个包含新创建的快照文件文件名的 JSON 响应。
-停止视频播放
-移除旧包裹
 - `sudo apt-get remove -y leap`
-移除 `shared_memory.bin` 文件位于 nodeos 的数据目录中。这是唯一需要删除的文件。数据目录将是传递给 nodeos 的路径 `--data-dir` 争论，或 `$HOME/local/share/eosio/nodeos/data/state` 默认情况下。
-安装新软件包
 - `apt-get install -y ./leap_5.0.0_amd64.deb`
-使用从中返回的快照文件重新启动节点 `create_snapshot` 上面的请求。添加 `--snapshot` 参数以及任何其他现有论点。
 - `nodeos --snapshot snapshot-1323.....83c5.bin ...`
      这个 `--snapshot` 只需要在 5.x nodeos 首次发布时给出一次论点。

## 所需的配置更改
运行 Leap 5+ 的节点需要对配置进行以下更改才能正常运行。

### 不支持的配置参数
从 Leap v5.0.0 开始，节点操作员必须确保未在 config.ini 中设置以下参数以允许节点启动：
- `cpu-effort-percent`
- `last-block-cpu-effort-percent`
- `last-block-time-offset-us`
- `produce-time-offset-us`
- `max-nonprivileged-inline-action-size`
- `max-scheduled-transaction-time-per-block-ms`
- `disable-subjective-billing` （请参阅下面的 “启用 API 和区块中继的主观计费”）

### 为 API 和区块中继启用主观计费
API 和区块中继需要启用主观计费。以前 `disable-subjective-billing` 可以设置为 false，但是此选项已在 Leap v5.0.0 中删除，因为更具体的选项是多余的。要在运行 Leap v5.0.0 的节点上启用主观计费，请确保在 config.ini 中设置了以下配置值：

```
disable-subjective-api-billing=false
disable-subjective-p2p-billing=false
```

## 推荐的配置更改
对于运行 Leap 5+ 的节点，建议对配置进行以下更改

### 修改交易时间窗口
-注释掉/删除 `max-transaction-time`，或者设置为高于链上限制的值（例如，在 EOS 上设置超过 150 毫秒）
-设置 `read-only-read-window-time-us` 到 165,000（165 毫秒）

这些更新基于性能测试和经验数据。在生产环境中，我们注意到交易超过 30 毫秒限制的情况，我们建议延长时间窗口。 `max-transaction-time` 应将其删除，以允许交易挂钟截止日期的执行由客观的链上限额驱动。

所有读取操作均以并行方式执行。例如`get_table_rows` rpc 在读取窗口内并行运行。出于这个原因，只读时间窗口需要更大。交易要么是只读的，要么不是只读的。交易没有只读组件。

> 注意：只读配置更改仅适用于 Leap 版本 4.x 及更高版本。

### 移除 Prometheus 出口商地址
-移除 `prometheus-exporter-address` 来自 config.ini

它已被新版本所取代 `prometheus` api 端点类别作为 https://github.com/antelopeIO/leap/pull/1137 的一部分实现

## 新增和修改过的选项
### 新的命令行选项
- `sync-peer-limit`可以限制要同步的对等体的数量。默认值为 3。
- `eos-vm-oc-enable` 有新模式了 `auto` 它在构建区块、应用区块、从 HTTP 或 P2P 执行交易以及在 eosio.* 账户（eosio、eosio.token、eosio.ibc 和 eosio.evm）上执行合约时会自动使用 OC。 `eos-vm-oc-enable=auto` 是新的默认值。

### 新的配置选项
- `http-category-address` 可用于配置命令行和 ini 文件中的所有地址。该选项可以根据需要多次使用。

### 修改了选项行为
-指定 `--p2p-listen-endpoint` 和 `--p2p-server-address` 多次
- `sync-fetch-span` 默认值从 100 更改为 1000
- `disable-replay-opts` 如果启用了状态历史插件，则会自动设置为 true。可以在配置文件中指定此选项
- `read-only-threads` 现在可以设置为最大值 128
- `abi-serializer-max-time-ms` 已更新，限制了在主线程上序列化对象和反序列化 HTTP 线程上单个对象所花费的时间。
-的默认值 `http-max-response-time-ms` 已从 30 毫秒更改为 15 毫秒
