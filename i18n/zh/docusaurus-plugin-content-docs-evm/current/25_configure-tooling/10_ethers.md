---
title: 乙醚
---



[乙醚](https://github.com/ethers-io/ethers.js) 是迄今为止最常用的适用于 EVM 的 JavaScript SDK。

在 EOS EVM 中使用以太币与将其用于任何其他 EVM 兼容链相同。
需要注意的一点是，在撰写本文档时，我们的 RPC 端点不支持批量请求，因此您必须禁用
创建提供商时进行批处理：

```javascript
import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider("https://api.evm.eosnetwork.com/", undefined, {
    batchMaxCount: 1
});
```
