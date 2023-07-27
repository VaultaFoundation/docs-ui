---
title: EVM 代币
--- 

<head>
</head>测试

那个 `EOS` 代币在 `EOS EVM` 的代币和上面的代币完全一样 `EOS Network`。

这意味着 `EOS` 您在交易所看到的代币与您在交易所使用的代币相同 `EOS EVM`。但是，由于大多数 
交易所仅支持这些代币的原生版本，您必须*桥接*您的代币才能在EVM上使用它们。

## 测试网水龙头

想要一些EOS代币来玩吗？点击下面的按钮，从测试网水龙头中获取一些。

<!-- translation-ignore -->

import FaucetTokens from '@site/src/components/FaucetTokens/FaucetTokens';

<FaucetTokens />

<!-- end-translation-ignore -->

## 从 EOS 到 EOS EVM 的桥梁

### 自己动手 Bridge 代币 

如果你有 **EOS** 代币 `EOS Mainnet` 要么 `Jungle Testnet`，您可以将**EOS**直接发送到您的 EVM 地址。
打开您的钱包，将**EOS**代币发送至 `eosio.evm` 将您的 EVM 地址设为 `memo`。


### 来自交易所的桥接代币

> ⚠ **免责声明：**
> 
> 并非所有交易所都支持向智能合约发送代币。根据您使用的交易所，您可能需要
> 首先将代币发送到您自己的钱包，然后按照上一节中的说明进行操作。

要将EOS代币从中心化交易所 (CEX) 提取到EOS EVM地址，请执行以下操作：

1.访问交易所应用程序的提款屏幕
2.选择 EOS 作为硬币
3.选择 EOS 作为网络
4.输入 `eosio.evm` 作为钱包地址
5.输入您的 EOS EVM 公钥作为备忘录

![EOS EVM Token Flow](/images/EOS-EVM_withdraw_from_CEX_to_wallet.png)




## 从 EOS EVM 到 EOS 的桥梁

### 自己动手 Bridge 代币

要将代币从 EVM 地址转移到 EOS 账户，您必须使用 [EOS EVM 主网桥](https://bridge.evm.eosnetwork.com/)
或者 [EOS EVM 丛林测试网桥](https://bridge.testnet.evm.eosnetwork.com/)。

1.选择 `Withdraw`
2.连接你的钱包
3.输入金额
4.输入要发送到的 EOS 账户
 1.添加可选备忘录
5.点击 `Transfer`

### 将代币桥接到交易所

> ⚠ **免责声明：**
>
> 一些交易所尚不支持在EOS上跟踪内联转账，这使他们无法看到EOS EVM的转账。 
> 如果您不确定您的交易所是否支持此功能，请先将代币桥接到原生EOS网络，然后将其发送
> 到您的交易所账户。

您可以按照上述相同的流程进行操作，但与其输入EOS账户，不如输入您的交易所账户名称。

大多数 EOS 交易所还需要 `memo` 字段，因此请务必在此处输入该字段，否则您的代币将丢失**。








## 其他已知代币

| 符号 | 代币名称 | 地址 |
|-----------|-----------------|------------------------------------------
| WEOS | Wrapped EOS | 0xc00592aa41d32d137dc480d9f6d0df19b860104F |
