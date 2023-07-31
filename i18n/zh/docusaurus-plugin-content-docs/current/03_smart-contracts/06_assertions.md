---
title: 断言
---

像每个程序一样，可能会出现错误，并且必须验证用户输入。EOS++ 提供了一种明确的方法来做到这一点。

## 恢复状态

断言是一种检查条件是否为真的方法，如果不是，则事务将失败。交易时
失败，事务中发生的所有状态更改都将被回滚。这意味着，任何改动都是 
持久的数据/表将被恢复，就好像事务从未发生过一样。

## 查看

那个 `check` 函数是在 EOS++ 中验证条件的方式。 
该函数将检查指定的条件是否为真，如果不是，则事务将失败。

```cpp
check(1 == 1, "1 should equal 1");
```

的接口 `check` 函数只需要一个条件和 `string` 消息。如果条件为假，则消息
将作为错误抛出，事务将恢复。

## 记录非字符串

从那时起 `check` 函数需要一个 `string` 消息，你可能想知道如何记录非字符串。 
这取决于您要记录的数据类型，但以下是一些常见的示例：

#### 日志 `name`

```cpp
name thisContract = get_self();
check(false, "This contract is: " + thisContract.to_string());
```

#### 日志 `asset`

```cpp
asset myAsset = asset(100, symbol("EOS", 4));
check(false, "My asset is: " + myAsset.to_string());
```

#### 记录整数

```cpp
int myInt = 100;
check(false, "My int is: " + std::to_string(myInt));
```




