---
title: Leap 5.0 升级指南
---

5.0 升级遵循通用升级指南。你可以找到它 [这里](./01_general-upgrade-guide.md)。

以下信息特定于 5.0 升级，仅概述了配置选项的更改。

## 配置选项

### 交易时间窗口配置更改

这些更新基于性能测试和经验数据。
在生产环境中，我们注意到交易超过 30 毫秒限制的情况，因此建议 
增加时间窗口。添加了 read_only 交易 
在 Leap 4.0 中，应增加时间限制以充分利用 read_only 功能。


-移除 `max-transaction-time` （新的默认值）
-设置 `read-only-read-window-time-us` 到 165,000（165 毫秒） 


### 确认 `max-nonprivileged-inline-action-size` 未设置
截至 Leap `v5.0.0-rc1`，节点操作员必须确保 `max-nonprivileged-inline-action-size` 参数不是 
设置在 `config.ini` 允许 `nodeos` 开始。



### 新的配置选项
- `http-category-address` 可用于配置命令行和 ini 文件中的所有地址。该选项可以根据需要多次使用。
- `database-map-mode` 现在支持 `mapped_private` 模式。请参见 [发行说明](https://github.com/AntelopeIO/leap/releases/tag/v5.0.0-rc1) 以获取更多信息。

### 新的命令行选项
- `sync-peer-limit`可以限制要同步的对等点的数量。默认值为 3。
- `eos-vm-oc-enable` 有新模式 `auto` 它在构建区块、应用区块、执行来自 HTTP 或 P2P 的交易以及在 eosio.* 账户（eosio、eosio.token、eosio.ibc 和 eosio.evm）上执行合约时会自动使用 OC。 `eos-vm-oc-enable=auto` 是新的默认值。

### 修改了选项行为
- `max-transaction-time` 现在默认为 `499ms`
-指定 `--p2p-listen-endpoint` 和 `--p2p-server-address` 多次
- `sync-fetch-span` 默认值更改为 `100` 到 `1000`
- `read-only-transaction-threads` 现在可以设置为最大值 128
- `abi-serializer-max-time-ms` 已更新，以限制在主线程上序列化对象以及在 HTTP 线程上反序列化单个对象所花费的时间。
- `http-max-response-time-ms` 默认值已从 30 毫秒更改为 15 毫秒
- `disable-replay-opts` 如果启用状态历史插件，则会自动设置为 true。也可以用作 CLI 选项。

