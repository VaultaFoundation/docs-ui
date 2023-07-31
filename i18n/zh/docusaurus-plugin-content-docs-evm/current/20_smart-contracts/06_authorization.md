---
title: 授权
---

授权是确定用户是否有权执行交易的过程。
在区块链应用程序中，这是确保智能合约和数字资产安全的关键方面
它控制。

在 Solidity 中，你会得到一个名为的特殊变量 `msg.sender` 它表示调用该函数的用户的地址。
这是您将用来确定用户是否有权执行操作的地址。

## 授权模式

Solidity 中有两种常见的授权模式。

### 必须

那个 `require` 模式是实现授权的最简单方法。这是一行代码，如果不满足条件，则会引发错误。

```solidity
function withdraw(uint256 amount) public {
    require(msg.sender == someExpectedAddress, "only the owner can withdraw");
    // withdraw funds
}
```

### 修改器

修改器模式是一种在多个函数中重用授权逻辑的方法。它是一个在应用它的函数之前调用的函数。

```solidity
contract MyContract {
    address public owner = <some address>;

    modifier onlyOwner() {
        require(msg.sender == owner, "only the owner can call this function");
        _;
    }

    function withdraw(uint256 amount) public onlyOwner {
        // withdraw funds
    }
}
```

## 最佳实践

OpenZeppelin 是一家提供大多数 Solidity 项目中使用的构建模块的公司。他们有一个
“访问控制” 库，它提供了一组可用于在项目中实现授权的合同。

使用这些库比使用自己的库要好，因为它们已经过社区的测试和审计
在成千上万的项目中。

你应该读一读 OpenZeppelin 的 [访问控制文档](https://docs.openzeppelin.com/contracts/4.x/access-control) 到
更好地了解如何使用他们的合同。


