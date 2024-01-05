---
title: 铭文
---

EVM 链上的铭文是使用以下方法写入链历史记录的任意数据 `calldata` 领域。
由于数据仅存储在链的历史记录中，而不存储在状态本身中，因此它降低了成本
向链中发送数据。

但是，由于数据实际上不是以状态存储的，因此不可能使用智能合约中的数据。
这意味着在数据写入状态之前，铭文仅用于索引和其他链下目的。

## 汽油费、吞吐量和铭文

在大多数其他EVM支持链上，铭文给汽油费造成了巨大的上行压力，
吞吐量下降。但是，在EOS EVM上，汽油费是固定的，而且该链完全有能力应付
铭文负载对吞吐量没有任何明显影响。

### 想测试铭文吗？

这里的每个部分都有一个表单，你可以用铭文数据触发MetaMask交易。
如果你想使用它们，你需要先使用MetaMask登录。

<!-- translation-ignore -->

import LoginMetaMask from '@site/src/components/LoginMetaMask/LoginMetaMask';

<LoginMetaMask />

<!-- end-translation-ignore -->

## 铭文格式

铭文很简单 `JSON` 可以嵌入到交易呼叫数据中的格式。
必须遵守格式，否则索引器等第三方工具将无法处理数据。

> ✔ **你可以添加其他字段**
>
> 您可以自由地将字段添加到 `JSON` 反对你的特定项目可能从中受益，
> 但是下面的每个字段都是必填字段。

```json
{
  "p": "eorc-20",
  "op": "deploy",
  "tick": "orcs"
}
```

| 密钥 | 描述 |
|---|----------------------------------------------|
| `p` | 该协议帮助工具识别和处理事件 |
| `op` | 操作类型： `deploy, mint, transfer, list`      |
| `tick` | 代币行情器 |


### 部署

```json
{ 
  "p": "eorc-20",
  "op": "deploy",
  "tick": "orcs",
  "max": "420420",
  "lim": "69"
}
```

| 密钥 | 描述 |
|---|------------------------------|
| `max` | 代币的最大供应量 |
| `lim` | 每个铭文的铸币限额 |

<!-- translation-ignore -->

import Inscribe from '@site/src/components/Inscribe/Inscribe';

<Inscribe type="deploy" />

<!-- end-translation-ignore -->


### 薄荷

```json
{ 
  "p": "eorc-20",
  "op": "mint",
  "tick": "orcs",
  "amt": "69"
}
```

| 密钥 | 描述 |
|---|-------------|
| `amt` | 铸币量 |

<!-- translation-ignore -->

<Inscribe type="mint" />

<!-- end-translation-ignore -->


### 转账

```json
{ 
  "p": "eorc-20",
  "op": "transfer",
  "tick": "orcs",
  "amt": "1"
}
```

| 密钥 | 描述 |
|---|-------------|
| `amt` | 转账金额 |

<!-- translation-ignore -->

<Inscribe type="transfer" />

<!-- end-translation-ignore -->


## 发送铭文

向连锁店发送铭文时，必须指定 `mime-type` 数据，或者保持原样 `data:,` 这样就行了
默认为 `text/plain`。

例如：

```
data:,{"p":"eorc-20","op":"deploy","tick":"orcs","max":"420420","lim":"69"}
```

然后，你必须转换 `JSON` 到 `hex` 然后使用 `data` 发送铭文的交易字段。

一个这样的使用示例 `ethers` 将是：

```js
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://api.evm.eosnetwork.com/');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const json = {
    p: 'eorc-20',
    op: 'deploy',
    tick: 'orcs',
    max: '420420',
    lim: '69',
};

const utfBytes = ethers.utils.toUtf8Bytes(JSON.stringify(json));
const hexData = ethers.utils.hexlify(utfBytes);

const tx = {
    to: '0x123...',
    value: 0,
    data: hexData
};

wallet.sendTransaction(tx).then(...);
```

## 你需要知道的规则

索引器有内置规则，在索引铭文时必须遵守这些规则。任何不遵循这些的铭文
规则将被忽略。

#### 所有者/签名者

-**铸币接收者**是交易的签名者
-**转账发件人**（或 `from`) 是交易的签名者
-**转账接收器**是 `to` 交易数据中定义的地址

#### 一般规则

-首次部署自动收报机是唯一一个拥有自动收报机权的人
-股票行情不区分大小写（orcs = ORCS = ORCS...）
-自动报价器的最后一个铭文将获得指定数量或最大供应量的剩余部分
-最大供应量不能超过最大值 `uint64`
