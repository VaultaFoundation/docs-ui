---
title: 状态数据
---

智能合约中有两种类型的数据：状态数据和瞬态数据。状态数据是存储在
区块链，并且是持久性的。瞬态数据是指在事务执行期间存储的数据，而不是
持久。交易结束的那一刻，瞬态数据就消失了。

在 Solidity 中，状态数据在合约级别声明，瞬态数据在函数或修饰符中声明。

```solidity
contract MyContract {
    // State data
    uint256 public myStateData = 1;

    // Transient data
    function myFunction() public {
        uint256 myTransientData = 2;
    }
}
```

您可以将任何类型的数据定义为状态数据。

## 访问和修改状态数据

您可以从合同中的任何函数中访问和修改状态数据。也可以直接访问状态数据
来自区块链和合约之外，但是如果没有明确编写函数来修改，则无法对其进行修改。

```solidity
contract MyContract {
    uint256 public myStateData = 1;

    function changeState() public {
        myStateData = 2;
    }
    
    function useState() public {
        uint256 myValue = myStateData;
    }
}
```

在上面的示例中，我们正在修改的值 `myStateData` 从内部 `myFunction` 函数。我们也有
宣布的 `myStateData` 如同 `public`，这意味着可以直接从合同之外对其进行访问。

## 成本

状态数据存储在区块链上，因此读取和写入需要花费汽油。读取和写入状态的成本
数据是智能合约中最高的成本之一。你应该尽量减少你的状态数据量
存储，以及您对其进行读取和写入的次数。

如果你想探索 EVM 代码的运营成本，你应该去看看 [EVM 代码](https://www.evm.codes/?fork=shanghai) 其中
是了解 EVM 操作码的 gas 成本的绝佳资源。

与读取和写入状态数据相关的代码是 `SLOAD` 和 `SSTORE` （州）。相比之下，瞬态操作码
数据是 `MLOAD` 和 `MSTORE` （内存）。

## 最佳实践

Solidity 存储状态数据的方式采用的概念叫做 `slots`。每个 `slot` 是 256 位（32 字节），可以存储
多个变量。如果您有多个小于 256 位的变量，它们将存储在同一个插槽中。

例如，如果你有两个 `uint128` 变量，它们将存储在同一个插槽中。如果你有 `uint128` 还有
`uint256`，它们将存储在不同的插槽中。

因此，最佳做法是将小于 256 位的变量并排分组，
并将大于 256 位的变量保留在自己的插槽中。

```solidity
contract MyContract {
    // slot 1
    uint32 public myStateData1;
    uint32 public myStateData2;
    uint64 public myStateData3;
    uint128 public myStateData4;
    
    // slot 2
    uint256 public myStateData5;
    
    // slot 3
    uint128 public myStateData6;
    uint64 public myStateData7;
    uint32 public myStateData8;
    
    // slot 4
    uint64 public myStateData9;
}
```

以上面的代码为例。所有东西都在里面 `slot 1` 等于 256 位，因此它将存储在同一个插槽中。
但是， `slot 2` 只能容纳一个变量，因为该变量的大小为 256 位。

这些规则也适用于结构。紧密打包的结构比松散打包的结构更高效。

```solidity
// Good
struct MyStruct {
    uint32 a;
    uint32 b;
    uint64 c;
    uint128 d;
    uint256 e;
}

// Bad
struct MyStruct {
    uint32 a;
    uint64 b;
    uint256 c;
    uint32 d;
    uint128 e;
}
```
