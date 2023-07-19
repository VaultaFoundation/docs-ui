---
title: 概述
---

EOS EVM 实现了一个在 EOS 网络上运行的智能合约，从现在起我们就称之为 
`EVM Contract`。要将交易发送到EOS EVM网络，必须将交易发送到EVM合约。 
EOS EVM 合约与以太坊 EVM 完全兼容，但可能存在一些细微差异 
参见于 [EVM 兼容性](/evm/999_miscellaneous/20_evm-compatibility.md) 部分。

为了实现完全的 RPC 兼容性，使用了功能齐全的以太坊节点。EOS EVM 测试网和主网 
使用建立在 Silkworm 节点之上的以太坊节点，从现在起我们就称之为 `EOS EVM Node`。

EOS EVM 客户端发送的所有 RPC 请求、读取和写入都首先由代理组件处理， 
按如下方式重定向请求：

-对 EOS EVM RPC 组件的读取，以及
-写入事务包装器服务。

### 读取请求

EOS EVM RPC 组件支持 JSON-RPC 读取请求，该组件是 EOS 的分支 
[silkrPC](https://github.com/torquem-ch/silkrpc) 并以支持几乎所有以太坊的守护程序的形式实现 
JSON-RPC 用于由 EOS EVM 合约管理的虚拟 EVM 区块链。其中有两种 RPC 方法， `eth_sendRawTransaction` 
和 `eth_gasPrice` 是故意禁用的，因为这个守护程序不适合处理它们。而是请求 
因为这两种方法被路由到 Transaction Wrapper 服务，该服务是专门为支持这两种 RPC 方法而设计的。

EOS EVM RPC 组件依赖于（虚拟）EVM 区块链的执行客户端管理的数据库。处决 
客户端是 EOS EVM 节点组件，它是 EOS 的分支 [蚕虫](https://github.com/torquem-ch/silkworm) 修改后可以正常工作 
包括支持 EOS EVM 所需的对 EOS EVM 运行时的更改，例如无信任桥。

EOS EVM 节点需要精确重现 EOS EVM 合约最初完成的 EVM 交易执行。 
它需要使用从EOS EVM合约中提取的数据重建由EOS EVM合约管理的虚拟EVM区块链 
EOS 区块链。为方便起见，EOS EVM 节点连接到 EOS 节点的状态历史插件 (ShiP) 端点 
是 EOS 区块链的一部分。

这种架构使得公开以太坊客户端 Web3 JSON RPC API 以及必要时可能的其他 API 成为可能。

### 写入请求

如前所述，这两种 RPC 方法， `eth_sendRawTransaction` 和 `eth_gasPrice`，不是由 EOS EVM RPC 实现的。 
相反，它们是由以下人员实现的 `Transaction Wrapper` （在下图中 `Tx Wrapper`) 组件。因此，所有 
*写入请求*被转发到交易包装器，交易包装器将它们打包成EOS操作并将其发送到EVM合约。

交易包装器的主要目的是通过以下方式获取原始 EVM 交易 `eth_sendRawTransaction` 然后推 
他们加入了 EOS EVM 合约。 
它通过以下步骤实现了这一点：

1.构造一个 EOS 交易，其中包含 `pushtx` EOS EVM 合约的操作，其中包括 rlp 编码的 EVM 交易。
2.使用充当 EOS 矿工的 EOS 账户的密钥签名 EOS 交易 `pushtx` 行动并支付 EOS 交易的 CPU/NET 成本。
3.通过连接到 EOS 网络的 EOS 节点的链 API 将签名的 EOS 交易发送到 EOS 区块链。

交易包装器还支持 `eth_gasPrice` RPC 方法，尽管事实上它是一种读取方法，因为它是 
实现还取决于对 EOS 节点链 API 的访问权限。特别是，它只是抢走了最低的汽油价格 
在相应的表中在 EOS EVM 合约中配置，然后将其返回给调用者。

![EOS EVM 的总体设计](/images/EOS-EVM_design_drawio.svg)

如果认为有必要，这种架构允许使用以太坊节点的其他实现 
对于某些特定场景。
