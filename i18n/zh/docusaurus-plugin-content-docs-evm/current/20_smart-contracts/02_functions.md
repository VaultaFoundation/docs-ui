---
title: 函数
---

<head>
 </head><title>函数 (EVM)</title>

函数是一种在程序中封装逻辑的方法，但它们也可以作为智能合约的入口点。

## 函数声明

Solidity 中的函数声明有一些基本要求：
-必须从 `function` 关键字
-必须有名字
-必须有一个参数列表（即使它为空）
-必须申报 `visibility`
-可以有身体
-可以有返回类型
-可以有修饰符
-可以声明为 `payable`
-应该有可变性修饰符（如果适用）

让我们来看一个简单的函数声明，然后我们将对其进行分解并进入一些更高级的主题。

```solidity
// function <name>(<parameters>) <visibility> <modifiers?> <returns?> { <body> }

function myFunction(bool _myParam) public {
    // Function body
}
```

## 函数参数

函数参数以逗号分隔的类型和名称的列表形式声明，用圆括号括起来。

```solidity
function myFunction(bool _myParam, uint256 _myOtherParam) public {}
```


> 📘 **参数命名惯例**
>
> 在 Solidity 中，通常在函数参数前加下划线 (`_`）。这不是必需的，但它是一个被广泛使用的惯例。
> 目的是区分参数和同名的全局变量。


## 函数可见性

Solidity 中的函数可以有四种可见性之一。

### 公开

公共功能是可见性的万能之选。它们可以从你的合同中调用，也可以从继承的合同中调用，
来自区块链上的其他合约，以及用户从区块链之外的合约。 

```solidity
function myFunction() public {}
```

### 外部

外部函数只能从合约外部调用；可以由其他合约调用，也可以由区块链之外的用户调用。

```solidity
function myFunction() external {}
```

> 💰 **外部比公共便宜**
> 
> 如果你正在编写一个只能在合约外部调用的函数，你应该使用 `external` 而不是 `public`.
> 这是因为 `external` 调用函数比调用更便宜 `public` 函数，因为它们不必将参数复制到 
> 记忆。 

### 内部

内部函数只能从合约内部调用，也只能从继承的合约中调用。

```solidity
function myFunction() internal {}
```

### 私人

私有函数只能在合约内调用。

```solidity
function myFunction() private {}
```

## 函数返回类型

函数可以返回单个值，也可以返回多个值。返回类型在参数列表之后声明，并用逗号分隔。

您也可以命名返回值，这将在函数体中创建一个可以为其赋值的变量。

```solidity
function myFunction() public returns (uint256) {
    return 1;
}

function myOtherFunction() public returns (uint256 myValue) {
    myValue = 1;
}
```


## 函数修饰符

修饰符是一种向函数添加功能的方法，该函数要么在函数之前运行，要么在函数之后运行。 
它们通常用于向函数添加其他检查，或修改函数的返回值。

修饰符是用声明的 `modifier` 关键字，并且可以通过使用将其应用于函数 `modifier` 函数声明后的关键字。

每个修饰符的开头或结尾都必须是 `_;` 声明。函数体将在此处执行。

```solidity
// declaration
modifier myModifier() {
    // Modifier body
    _;
}

// usage
function myFunction() public myModifier {}
```

也可以用空格分隔多个修饰符，将它们串联在一起。

```solidity
function myFunction() public myModifier1 myModifier2 {}
```

## 付费函数

函数可以接受区块链的原生货币作为付款。这是通过将函数声明为 `payable`。

就 EOS EVM 而言，这就是 EOS。

```solidity
function myFunction() public payable {
    uint256 amount = msg.value;
}
```

> 📘 **msg.value**
> 
> `msg.value` 是每个函数中都可用的全局变量。它包含发送到函数的本地货币数量。

## 函数可变性

一个函数可以有三种类型的可变性，它们的含义不同。 

### 默认 

如果函数没有可变性修饰符，则将其视为 “可写” 函数。 
这意味着该函数可以修改合约的状态，当从合约外部调用时，它将消耗用户汽油。

```solidity
function myFunction() external {}
```

### 查看

如果一个函数被声明为 `view`，这意味着该函数不会修改合约的状态，但会修改合约的状态
从合约中读取状态变量。与该功能交互的用户不会被充电。

```solidity
function myFunction() external view returns (uint256) {
    return myStateVariable;
}
```

### Pure

如果一个函数被声明为 `pure`，这意味着该函数不会修改合约的状态，也不会修改合约的状态
从合约中读取状态变量。与该功能交互的用户不会被充电。

```solidity
function myFunction(uint256 a, uint256 b) external pure returns (uint256) {
    return a + b;
}
```

> 📘 **为什么 Pure 有用？**
> 
> 纯函数通常用于向外提供实用函数。例如，如果你想提供一个函数
> 这将根据合约内部使用的逻辑计算一个数字，以便在网络中复制逻辑
> 应用程序，你可以使用 `pure` 函数来做到这一点。 

## 构造函数

构造函数是部署合约时调用的特殊函数。它们被声明为 `constructor` 关键字，
并且只运行一次。

```solidity
constructor() public {
    // Constructor body
}
```
