---
title: 高级话题
sidebar_class_name: sidebarhidden
---


## 核心

那个 `EOS Core` 为以下内容提供了基本的构建块 `system` 层。但是，由于它们不是作为智能合约实现的，因此它们无法提供相同水平的灵活性。尽管如此， `core` 实现也是开源的，因此可以对其进行修改以适应自定义的业务需求。

核心协议是：

1. [共识协议](01_consensus-protocol.md)
2. [交易协议](02_transactions-protocol.md)
3. [网络或点对点协议](03_network-peer-protocol.md)

## 系统

EOS区块链的独特之处在于，基于其构建的区块链的功能和特征非常灵活，也就是说，可以对其进行更改或完全修改以适应每个商业案例的要求。共识、费用表、账户创建和修改、代币经济、区块生产者注册、投票、多重签名等区块链核心功能是在部署在基于EOS区块链的区块链上的智能合约中实现的。这些智能合约被称为 `system contracts` 而图层为 `EOS system` 图层，或者干脆是 `system` 层。

EOS 网络基金会实施和维护这些 `system contracts` 仅作为参考实现，封装了基于 EOS 的区块链的基本功能。那个 `system contracts` 如下所列：

* [eosio.bios](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.bios) -那个 `eosio.bios` 合约是用于初始化区块链的特殊合约
* [esio.system](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.system) -那个 `eosio.system` 合约是实现EOS区块链基础功能的核心合约
* [eosio.msig](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.msig) -那个 `eosio.msig` 合约实现了多重签名功能
* [esio.token](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.token) -那个 `eosio.token` 合约实现了系统代币功能
* [eosio.wrap](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.wrap) -那个 `eosio.wrap` 合约实现了治理功能
