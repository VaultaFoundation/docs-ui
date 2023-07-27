---
title: 资源
---

EOS 区块链依赖于三个系统资源： `CPU`, `NET` 和 `RAM`。每个 EOS 账户都需要系统 
与部署在区块链上的智能合约进行交互的资源。

## 内存

RAM 就像在计算机中一样，是一种有限的资源。它是一个快速存储空间，区块链使用它来存储数据。
与最终保留在硬盘上的计算机不同，EOS区块链将其所有数据存储在RAM中。

因此，RAM 是一种非常有限且需求旺盛的资源。存储在区块链上的每条状态数据
必须存储在 RAM 中。这包括账户余额、合约代码和合约数据。

用户可以在EOS区块链上购买和出售RAM。RAM 的价格由 Bancor 算法决定
这是在系统合同中实现的。RAM 的价格由可用的 RAM 数量决定。越少
可用的免费内存，购买内存就越昂贵。

您也可以将不再使用的RAM卖回系统合约，以收回您的EOS并为其他用户腾出RAM。


### 购买 RAM

那个 `eosio` 系统合约提供 `buyram` 和 `buyrambytes` 购买 RAM 的行动。那个 `buyram` 动作在 EOS 中购买 RAM，而 `buyrambytes` 操作以字节为单位购买 RAM。

如果你想快速从任何钱包购买 RAM，你可以**向钱包发送任意数量的 EOS `buyramforeos` 账户**，它会将等量的 RAM 发回给你。

<details>
    <summary>想知道 RAM 价格是如何计算的吗？</summary>

智能合约存储其数据所需的必要RAM是根据使用的区块链状态计算得出的。

作为开发者，要了解您的智能合约所需的内存量，请注意您的智能合约实例化和使用的多索引表所依据的数据结构。一个多索引表所依据的数据结构定义了表中的一行。数据结构的每个数据成员都对应于表中的一个行单元格。
要估算一个多索引行需要在区块链上存储的 RAM 量，必须将每个数据成员类型的大小和每个已定义索引的内存开销（如果有）相加。以下是EOS代码为多索引表、索引和数据类型定义的管理费用：

<br/>

* [多索引 RAM 字节开销](https://github.com/AntelopeIO/leap/blob/f6643e434e8dc304bba742422dd036a6fbc1f039/libraries/chain/include/eosio/chain/contract_table_objects.hpp#L240)
* [每个索引 RAM 字节每行的开销](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L109)
* [修复了共享矢量 RAM 字节的开销](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L108)
* [每个账户 RAM 字节的开销](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L110)
* [设置代码 RAM 字节乘数](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L111)
* [RAM 使用情况更新功能](https://github.com/AntelopeIO/leap/blob/9f0679bd0a42d6c24a966bb79de6d8c0591872a5/libraries/chain/apply_context.cpp#L725)

</details>


## CPU & NET

CPU 和 NET 都是每个 EOS 账户与区块链交互所需的关键资源。

### CPU

CPU 是一种为区块链账户提供处理能力的系统资源。当交易在上执行时 
区块链，它消耗 CPU 和网络资源。为确保交易成功完成，付款人账户必须 
为其分配足够的 CPU。 

账户可用的 CPU 量以微秒为单位。


<details>
    <summary>想知道 CPU 是如何计算的吗？</summary>

区块链执行的交易包含一项或多项操作。每笔交易必须消耗一定数量的 CPU
在最小和最大事务 CPU 使用率值预定义的限制范围内。对于EOS区块链来说，这些限制
在区块链的配置中设置。你可以通过运行以下命令来找出这些限制，然后查阅
这 `min_transaction_cpu_usage` 还有 `max_transaction_cpu_usage` 以微秒为单位表示。

<br/>

对于执行交易的账户，区块链会在执行每笔交易之前计算并更新每个区块的剩余资源。当交易准备好执行时，区块链会决定付款人账户是否有足够的CPU来完成交易的执行。为了计算必要的 CPU，主动构建当前区块的节点会测量执行事务的时间。如果账户有足够的 CPU，则会执行交易；否则交易将被拒绝。有关技术详情，请参阅以下链接：

* [CPU 配置变量](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L66)
* [交易初始化](https://github.com/AntelopeIO/leap/blob/e55669c42dfe4ac112e3072186f3a449936c0c61/libraries/chain/controller.cpp#L1559)
* [交易 CPU 计费](https://github.com/AntelopeIO/leap/blob/e55669c42dfe4ac112e3072186f3a449936c0c61/libraries/chain/controller.cpp#L1577)
* [检查交易的 CPU 使用情况](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/transaction_context.cpp#L381)

</details>

### NET

NET 是一种根据交易使用的网络带宽消耗的资源。

<details>
    <summary>想知道净值是如何计算的吗？</summary>

每笔交易消耗的净额不得超过预定义的最大交易净使用值。对于EOS区块链，此限制是在区块链的配置中设置的。您可以通过运行以下命令来找出此限制，并查阅 `max_transaction_net_usage` 以字节表示。

<br/>

对于执行交易的账户，区块链会在执行每笔交易之前计算并更新每个区块的剩余资源。当交易准备好执行时，区块链决定付款人账户是否有足够的净资产来支付交易的执行。必要的净额是根据交易大小计算的，交易大小是存储在区块链中的打包交易的大小。如果账户有足够的 NET 资源，则可以执行交易；否则交易将被拒绝。有关技术细节，请参阅以下来源：

<br/>

* [NET 配置变量](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L57)
* [交易初始化](https://github.com/AntelopeIO/leap/blob/e55669c42dfe4ac112e3072186f3a449936c0c61/libraries/chain/controller.cpp#L1559)
* [交易净账单](https://github.com/AntelopeIO/leap/blob/e55669c42dfe4ac112e3072186f3a449936c0c61/libraries/chain/controller.cpp#L1577)
* [检查交易的净使用情况](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/transaction_context.cpp#L376)

</details>



### 开机

通过使用系统操作，可以在 EOS 账户上启动 CPU 和 NET。这会消耗 EOS，并且会给你一定数量的 CPU 和净值
这与您在指定时间段内花费的EOS金额成正比。

还有免费服务，比如 [EOS 加电](https://eospowerup.io) 这样你就可以免费为 CPU 和 NET 通电一次 
每天。

<details>
    <summary>查看有关如何手动启动 PowerUp 的详细信息</summary>

启动账户是一种从 PowerUp 资源模型中租用 CPU 和 NET 资源的技术。智能合约在区块链上实现此模型，并将这些资源分配给您选择的账户。为账户加电的操作是 `powerup`。它以以下参数为参数：

<br/>

* 那个 `payer` 在费用中，必须是有效的 EOS 账户。
* 那个 `receiver` 的资源，必须是有效的 EOS 账户。
* 那个 `days` 必须始终匹配 `state.powerup_days` 在中指定 [PowerUp 配置设置](https://github.com/eosnetworkfoundation/eos-system-contracts/blob/7cec470b17bd53b8c78465d4cbd889dbaf1baffb/contracts/eosio.system/include/eosio.system/eosio.system.hpp#L588)。
* 那个 `net_frac`，还有 `cpu_frac` 是所需资源的百分比。计算百分比的最简单方法是将 10^15 (100%) 乘以所需的百分比。例如：10^15 * 0.01 = 10^13。
* 那个 `max_payment`，必须以 EOS 表示，并且是最大金额 `payer` 愿意付钱。

<br/>

```sh
cleos push action eosio powerup '[user, user, 1, 10000000000000, 10000000000000, "1000.0000 EOS"]' -p user
```

<br/>

要查看收到的 NET 和 CPU 权重以及费用金额，请查看 `eosio.reserv::powupresult` 由操作返回，应与以下内容类似：

<br/>

```console
executed transaction: 82b7124601612b371b812e3bf65cf63bb44616802d3cd33a2c0422b58399f54f  144 bytes  521 us
#         eosio <= eosio::powerup               {"payer":"user","receiver":"user","days":1,"net_frac":"10000000000000","cpu_frac":"10000000000000","...
#   eosio.token <= eosio.token::transfer        {"from":"user","to":"eosio.rex","quantity":"999.9901 EOS","memo":"transfer from user to eosio.rex"}
#  eosio.reserv <= eosio.reserv::powupresult    {"fee":"999.9901 EOS","powup_net_weight":"16354","powup_cpu_weight":"65416"}
#          user <= eosio.token::transfer        {"from":"user","to":"eosio.rex","quantity":"999.9901 EOS","memo":"transfer from user to eosio.rex"}
#     eosio.rex <= eosio.token::transfer        {"from":"user","to":"eosio.rex","quantity":"999.9901 EOS","memo":"transfer from user to eosio.rex"}
```

<br/>

EOS 区块链上的 PowerUp 资源模型初始化为 `"powerup_days": 1,`。此设置允许租用 CPU 和 NET 的最长时间为 24 小时。如果您在 24 小时间隔内未使用资源，则租用的 CPU 和 NET 将过期。

<br/>

#### 处理过期订单

系统不会自动回收到期的贷款中的资源。到期的贷款仍处于队列中，必须处理。

<br/>

拨打的任何电话 `powerup` action 也会处理这个队列（一次只能处理两笔到期的贷款）。因此，到期的贷款会自动及时处理。有时，可能需要手动处理队列中的过期贷款，以便将资源释放回系统，从而降低价格。因此，如果任何账户调用，则最多可以处理任意数量的到期贷款 `powerupexec` 行动。

<br/>

查看订单表 `powup.order` 执行以下命令：

<br/>

```sh
cleos get table eosio 0 powup.order
```

<br/>

```json
{
  "rows": [{
      "version": 0,
      "id": 0,
      "owner": "user",
      "net_weight": 16354,
      "cpu_weight": 65416,
      "expires": "2020-11-18T13:04:33"
    }
  ],
  "more": false,
  "next_key": ""
}
```

<br/>

示例 `powerupexec` 打电话:

<br/>

```sh
cleos push action eosio powerupexec '[user, 2]' -p user
```

<br/>

```console
executed transaction: 93ab4ac900a7902e4e59e5e925e8b54622715328965150db10774aa09855dc98  104 bytes  363 us
#         eosio <= eosio::powerupexec           {"user":"user","max":2}
warning: transaction executed locally, but may not be confirmed by the network yet         ]
```

</details>


### 主观计费

为了防止向网络发送垃圾邮件，区块生产者可以选择启用主观的 CPU 和 NET 计费。这意味着，如果 a
交易失败，用于执行交易的 CPU 和 NET 仍将计入发送交易的账户。

这样可以防止账户向网络发送失败的交易的垃圾邮件。但是，此账单不是 
记录在区块链上，实际上不会消耗账户支付的资源。它只能被消耗
实际上是由处理交易的区块生产者进行的。

有关主观计费的更多详细信息，请参阅 [主观计费和交易丢失简介](https://eosnetwork.com/blog/api-plus-an-introduction-to-subjective-billing-and-lost-transactions/) 文章。



