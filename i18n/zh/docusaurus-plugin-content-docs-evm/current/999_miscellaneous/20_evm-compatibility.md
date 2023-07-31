---
title: EVM 兼容性
---

EOS EVM 与以太坊 EVM 规范完全兼容，包括所有预编译和操作码。但是，EOS EVM 有一些关键的区别：

## 嵌套调用限制

由于 EOS EVM 合约的限制，EOS EVM 目前最多支持五 (5) 次嵌套调用。EOS EVM 团队将继续优化设计以增加这一数字。

## 保留地址

以十二开头的 EVM 地址 `0xbb` 字节，例如 `0xbbbbbbbbbbbbbbbbbbbbbbbb5530ea015b900000`，专用于在 EVM 内桥接原生 EOS 和 EOS 之间的 EOS。根据不同的桥接规则，向这些地址发送带有值的消息可能会启动桥接事务或中止事务。

此外，尽管不太可能，但任何产生保留地址的合约创建也会使交易中止。

## 预编译

EOS EVM 支持以太坊支持的所有预编译，但有以下规定：

### `modexp (0x05)`

那个 `exponent` 位大小不能超过 `base` 位大小或 `modulus` 位大小。

> ℹ️ 未满足的限制 
如果不满足上述限制，预编译将抛出异常，事务将暂停。

## 操作码

### `BLOCKHASH (0x40)`

此操作码目前不返回指定区块内容的哈希值，而是返回指定区块高度的哈希值和链 ID：

`block_hash = sha256( msg(block_height, chain_id) )`

在哪里：
* `block_height`: 指定的 64 位区块高度
* `chain_id`: 用作 64 位盐值
* `msg`: 连接前导零字节 (0x00) 常量， `block_height`，还有 `chain_id`，采用大端格式。

> ℹ️ 版本字节 
哈希中的前导零字节是版本字节，如果将来引入新的区块哈希方案，版本字节可能会改变。

### `COINBASE (0x41)`

此操作码返回 EOS EVM 合约账户的地址， `eosio.evm`。当前地址是 `0xbbbbbbbbbbbbbbbbbbbbbbbb5530ea015b900000`.

### `DIFFICULTY (0x44)`

由于底层的EOS共识协议中没有哈希难度，因此该操作码目前默认返回1（一）。

### `GASLIMIT (0x45)`

此操作码当前返回 `0x7FFFFFFFFFF` (2^43-1) 作为 EOS EVM 中的最大气体限制。
