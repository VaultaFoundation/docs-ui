---
title: 解剖学
---

EOS 最常用的智能合约开发语言是 C++，有时也称为 `EOS++`。 
编写智能合约所需的 C++ 知识非常少。如果你曾经写过 C、C++、Java、C# 或
TypeScript，你应该可以拿起了 `EOS++` 很容易。

社区也在努力支持其他语言，例如 Rust、Python、Go 和 AssemblyScript。
但是，这些文档将重点介绍用于编写智能合约的 C++。 
如果你有兴趣了解其他由社区主导的扩大语言支持的举措， 
看看 [语言支持](/docs/03_smart-contracts/999_language-support.md) 页面。


## 项目结构

在构造项目时，你有很大的自由度。你可以用一块单片 `.cpp` 为你提交文件
整个项目，也可以将其拆分为多个文件。你甚至可以使用像 CMake 这样的构建系统来管理你的
项目。

在此处的大多数指南中，我们将使用单个 `.cpp` 文件。
这是最简单的入门方式，也是编写智能合约的最常见方法。

### 单个文件

以下是单文件智能合约的示例。你的项目中不需要其他任何东西来编译这个，
而且你不需要包含任何其他文件。

```cpp title="project/singlefile.cpp"
#include <eosio/eosio.hpp>

CONTRACT singlefile : public eosio::contract {
  public:
    using contract::contract;

    ACTION test() {
      // ...
    }
};
```

### 多个文件

如果你想将你的项目分成多个文件，你也可以这样做。

```cpp title="project/src/library.hpp"
class library {
    struct data {
      uint64_t id;
      std::string value;
    };
};
```

```cpp title="include/multiplefiles.cpp"
#include <eosio/eosio.hpp>
#include "library.hpp"

CONTRACT multiplefiles : public eosio::contract {
  public:
    using contract::contract;

    ACTION test() {
      // ...
    }
};
```


#### 标题与源代码

在 C++ 中，有两种类型的文件：头文件 (`.hpp/.h`) 和源文件 (`.cpp`）。

-头文件用于声明函数、类、结构和其他类型。
-源文件用于实现头文件中声明的函数。

#### 包含目录

编译项目时，你需要告诉编译器在哪里可以找到你的头文件。

通常，您需要将头文件放在名为的目录中 `include`，以及目录中的源文件
叫 `src`.

```text
project/
  include/
    library.hpp
  src/
    multiplefiles.cpp
```

### 何时使用多文件项目

如果你正在编写一个大型项目，你可能需要将其分成多个文件。

保持项目整洁意味着将其分成逻辑组件。例如，你可能有一个文件供你使用
数据库、用于业务逻辑的文件和一些辅助函数的文件。

这也可以帮助较大的团队在使用版本控制系统时不会碰到对方，比如 `git`。

## 合约结构

合约是面向对象的。你定义合约的方式与定义合约的方式相同 `class`.

```cpp title="project/mycontract.cpp"
#include <eosio/eosio.hpp>

CONTRACT mycontract : public eosio::contract {
    public:
    using contract::contract;
};
```

这里有一些关键组件。 

### 合约定义

那个 `CONTRACT` 关键字是我们告诉编译器我们正在编写 EOS++ 智能合约的方式。

后面必须是合约的名称，以及该合约继承的基类。

```cpp
CONTRACT mycontract : public eosio::contract {
```

> ❕ **很高兴知道**
>
> 通常，您的合同名称应与您的合同名称相同 `.cpp` 文件名。一些编译系统会强制执行此操作
> 对你来说，他们返回的错误并不总是很清楚。

### 访问修饰符

访问修饰符用于定义合约中某些元素的可见性。
C++ 中有三种访问修饰符： 
- `public`: 该元素对所有事物都是可见的。
- `private`：该元素仅对合同本身可见。
- `protected`：该元素对合同本身以及从中继承的任何合约都是可见的。

当你声明一个可见性修饰符时，它下方的所有内容都将具有这种可见性。

```cpp
public:
  // Everything below this is public
private:
  // Everything below this is private
```


> ⚠ **警告**
> 
> 您没有定义合同对外界的可见性。您正在定义自己的可见性
> 与合同的其他要素签订合同。诸如操作和表格之类的内容将始终可公开访问
> 不在你的合同范围内。


### 使用合约

EOS++ 智能合约需要编译的一行是 `using contract::contract;` 线。


### 主要元素

EOS++ 智能合约由两个主要元素组成：

-**操作**：合同的入口点。 
-**表格**：您在合同中存储数据的方式。

我们将在下一节中更详细地解释这两者。
