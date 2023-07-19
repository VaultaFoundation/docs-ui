---
title: JSON RPC 兼容性
---

由于基于Silkworm节点构建的功能齐全的EOS EVM节点，所有JSON-RPC调用都得到了本质上的支持。但是，由于以下原因，某些方法在当前阶段被阻止：

* 某些方法已过时或已停用。
* 有些方法是为本地节点场景设计的。它们不会向公共 API 公开，但是您可以在部署自己的 EOS EVM 节点时访问它们。
* 有些方法涉及复杂的逻辑，因此在公开之前需要进行更多的测试。

## RPC 列表

备注：
* 下面列出的 JSON-RPC 调用不包括在当前阶段被阻止的方法。
* “EOS EVM Node-slowQuery” 专用于专门处理慢速或繁重查询的节点。这样做是为了使那些慢速查询不会停止或降低处理其他方法请求的常规节点的性能。

| RPC 方法 | 目的地 |
|------------------------------------------------------------
| net\ _version | EOS EVM 节点 |
| eth\ _blockNumber | EOS EVM 节点 |
| eth\ _ChainID | EOS EVM 节点 |
| eth\ _协议版本 | EOS EVM 节点 |
| eth\ _gasPrice | Tx Wrapper |
| eth\ _getblockbyHash | EOS EVM 节点 |
| eth\ _getblockbyNumber | EOS EVM 节点 |
| eth\ _getblockTransactionCountbyHash | EOS EVM
| eth\ _getblockTransactionCountbyNumber | EOS E
| eth\ _getunclebyBlockHashandIndex | EOS EVM 节点 |
| eth\ _getunclebyblockNumberandIndex | EOS EVM 节点 |
| eth\ _getunclecountbyBlockHash | EOS EVM 节点 |
| eth\ _getunclecountbyBlockNumber | EOS EVM 节点 |
| eth\ _getTransactionByHash | EOS EVM 节点 |
| eth\ _getrawTransactionByHash | EOS EVM 节点 |
| eth\ _getTransactionBlockHashandIndex | EOS EVM 节点
| eth\ _getrawTrasactionbyBlockHashandIndex | EOS EVM 节点 |
| eth\ _getTransactionbyblockNumberandIndex | EOS E
| eth\ _getrawTransactionbyblockNumberandIndex | EOS EVM
| eth\ _getTransactionReceivet | EOS EVM
| eth\ _getblockReceives | EOS EVM 节点 |
| eth\ _EstimateGas | EOS EVM 节点 |
| eth\ _getBalance | EOS EVM 节点 |
| eth\ _getCode | EOS EVM 节点 |
| eth\ _getTransactionCount | EOS EVM 节点 |
| eth\ _getStorageat | EOS EVM 节点 |
| eth\ _call | EOS EVM 节点 |
| eth\ _CallBundle | EOS EVM 节点 |
| eth\ _createAccessList | EOS EVM 节点 |
| eth\ _getLogs | EOS EVM Node-slowQuery |
| eth\ _sendrawTransaction | Tx 包装器 |
| debug\ _traceblockbyHash | EOS EVM 节点-SlowQuery
| debug\ _traceblockbyNumber | EOS EVM Node-slow
| debug\ _traceTraceTraceTransaction | EOS
| debug\ _traceCall | EOS EVM Node-slowQuery |
| trace\ _call | EOS EVM Node-slowQuery |
| trace\ _CallMany | EOS EVM Node-slowQuery
| trace\ _rawTransaction | EOS EVM 节点-SlowQuery
| trace\ _replayblockTransactions | EOS EVM Node-
| trace\ _replayTransaction | EOS EVM Node-slow
| trace\ _block | EOS EVM 节点-SlowQuery |
| trace\ _filter | EOS EVM 节点-SlowQuery |
| trace\ _get | EOS EVM Node-slowQuery |
| trace\ _transaction | EOS EVM Node-slow

## 批量请求

目前不支持将请求对象数组作为正文发送到 JSON-RPC API。在这种情况下，服务器将返回 400 错误。如果这会对您造成影响，请尝试解决方法，直到此功能得到支持。

失败的请求正文示例：
```json
[{"method":"eth_chainId","params":[],"id":1,"jsonrpc":"2.0"},{"method":"eth_blockNumber","params":[],"id":2,"jsonrpc":"2.0"}]
```
