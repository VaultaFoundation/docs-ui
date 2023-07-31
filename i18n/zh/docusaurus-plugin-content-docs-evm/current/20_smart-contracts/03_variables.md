---
title: 变量
---

定义变量是任何编程语言的基本组成部分。在本节中，我们将看看
您可以在 Solidity 中定义的不同类型的变量。

## 定义变量

变量使用以下语法定义：

```solidity
// <type> <name> = <value?>;
uint256 myVariable = 123;
uint256 myOtherVariable;
```

> 📘 **可变默认值**
>
> 如果不为变量赋值，则会为其分配默认值。默认值取决于变量的类型。
> 通常，您可以从类型名称中推断出默认值。例如， `uint256` 将默认为 `0`，以及 `bool` 将默认为 `false`.
> 在编写智能合约时请记住这一点，因为你可能不希望整数的值为 `0` 当你第一次定义它时。

## 整数和布尔值

整数类型用于表示整数。它们可以是有符号的（正数或负数），也可以是无符号的（仅限正数）。


| 整数类型 | 描述 |
|--------------------|
| `bool`                 | 布尔值（真/假）|
| `int8`               | 有符号的 8 位整数 |
| `int16`              | 有符号的 16 位整数 |
| `int32`              | 有符号的 32 位整数 |
| `int64`              | 有符号的 64 位整数 |
| `int128`             | 有符号的 128 位整数 |
| `int256`             | 有符号的 256 位整数 |
| `uint8`              | 无符号 8 位整数 |
| `uint16`             | 无符号 16 位整数 |
| `uint32`             | 32 位无符号整数 |
| `uint64`             | 无符号 64 位整数 |
| `uint128`            | 无符号 128 位整数 |
| `uint256`            | 无符号 256 位整数 |

## 地址

地址类型用于表示以太坊地址。它们可以是 `address` 要么 `address payable`。

| 地址类型 | 描述 |
|--------------------|
| `address`              | 以太坊地址 |
| `address payable`      | 可以发送和接收以太币的以太坊地址 |

## 固定大小的字节数组

固定大小的字节数组用于表示字节序列。它们可以是 `bytes` 要么 `bytes32`。

| 固定大小的字节数组 | 描述 |
|--------------------|
| `bytes`                | 动态字节序列 |
| `bytes1` 到 `bytes32`  | 固定大小的字节序列 |
| `string`               | UTF-8 字节的动态序列 |

> 📘 **枚举基础价值**
>
> 枚举中的每个值都有一个基础值。默认情况下，第一个值的基础值为 `0`,
> 并且每个后续值都有一个比前一个值大一的基础值。

## 结构

结构类型用于表示自定义数据容器。可以使用以下语法定义它们：

```solidity
struct MyStruct {
    uint256 myUint;
    bool myBool;
}
```


## 数组

数组用于表示值的集合。它们可以是固定大小的也可以是动态的。

| 数组 | 描述 |
|--------------------|
| `uint256[]`            | 由无符号的 256 位整数组成的动态数组 |
| `uint256[5]`           | 由长度为 5 的无符号 256 位整数组成的固定大小的数组 |

虽然上面的列表只显示整数数组，但你可以定义任何类型的数组。

```solidity
bool[] myBoolArray;
address payable[] myAddressArray;
```

您也可以定义多维数组。

```solidity
uint256[][] myMultiDimensionalArray;
```

使用以下语法访问/分配数组：

```solidity
myArray[index] = 123;
myOtherArray[indexA][indexB] = 456;
```

## 映射

映射用于表示键值存储。可以使用以下语法定义它们：

```solidity
// mapping(<key type> => <value type>) <name>;
mapping(address => uint256) myMapping;
```

您也可以定义多维映射。

```solidity
mapping(address => mapping(address => uint256)) myMultiDimensionalMapping;
```

访问/分配映射的方式与访问数组的方式相同。

```solidity
myMapping[myAddress] = 123;
myOtherMapping[myAddress][myOtherAddress] = 456;
```

## 枚举

枚举类型用于表示一组固定的值。可以使用以下语法定义它们：

```solidity
enum MyEnum {
    Value1,
    Value2,
    Value3
}
```
