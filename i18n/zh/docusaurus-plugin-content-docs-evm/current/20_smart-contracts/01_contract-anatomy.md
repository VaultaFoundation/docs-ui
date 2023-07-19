---
title: 解剖学
---

<head>
 </head><title>解剖学 (EVM)</title>

EVM 最常用的智能合约开发语言是 `Solidity`。它是一种静态类型、面向对象的语言。
如果你知道 TypeScript、Java 或 C#，那么使用 Solidity 你会有宾至如归的感觉。


## 项目结构

使用 Solidity，您通常会有一个 “入口文件”，即您的主合约，然后在主合约继承的其他合约中扩展功能。

你也可能有一个 `test` 文件夹，如果你正在使用类似的开发框架 `Hardhat`。

你的项目可能看起来像这样：
```text
project/
  contracts/
    MyContract.sol
  test/
    MyContract.ts
```





## 合约结构

以下是一个简单的 Solidity 合约的示例，本指南将详细探讨其中的每个部分。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {

}
```

### 许可证标识符

为了让全世界知道你的合同是根据哪个许可证发布的，你可以使用 `SPDX-License-Identifier` 评论。

```solidity
// SPDX-License-Identifier: MIT
```

您可以使用各种许可证。如果你想更多地探索它们，你应该去看看
出 [这个维基](https://en.wikipedia.org/wiki/Software_license)。



### Pragma

那个 `pragma` 语句告诉编译器您要强制执行 Solidity 编译器的哪个版本。

```solidity
pragma solidity ^0.8.0;
```

这不会改变编译器的版本，但会让它检查它的版本是否与你的版本相匹配 
请在陈述中注明。如果不匹配，则会引发错误。

#### 语义版本控制的简要概述

语义版本控制是大多数软件以易于理解、解析和比较的方式管理版本的方式。它由三个数字组成：

```text
<MAJOR>.<MINOR>.<PATCH>
0.1.1
```

-**主要**：出现重大更改时的更改。
-**次要**：添加了新功能时会发生变化，但没有重大更改。
-**补丁**：修复了错误，但没有新功能或重大更改时会发生变化。

#### 松散锁定版本

```solidity
pragma solidity ^0.8.1;
```

那个 `^` 符号 (`caret`) 表示您将允许更改任何非零版本。所以，就以下情况而言 `^0.8.1`，
你将允许来自的任何版本 `0.8.1` 到 `0.9.0`，但不是 `0.10.0` 要么 `1.0.0`。

如果你有 `^1.2.3`，它将允许来自的任何版本 `1.2.3` 到 `2.0.0`，但不是 `0.1.0` 要么 `3.0.0`。

#### 锁定到特定范围

你也可以改为锁定一系列版本，这样你就可以更好地控制要接受的版本。

```solidity
pragma solidity >=0.8.0 <=0.8.10;
```

另一种方法是为给定数字指定通配符。

```solidity
pragma solidity 0.8.x;
```

这将允许来自以下版本的任何版本 `0.8.0` 到 `0.8.9`，但不是 `0.9.0` 要么 `0.7.0`。

你也可以使用 `*` 作为你的通配符符号。

>❔ **更多选项**
> >Solidity 编译器支持 NodeJS semver 配置。 
>你可以找到更多管理它们的方法 [npmjs semver 文档](https://docs.npmjs.com/cli/v6/using-npm/semver)。







### 导入合约和库

使用 Solidity，您可以将其他合约和库导入到您的合约中。这对于保持代码干净很有用， 
以及使用其他人编写的库。

#### 导入本地文件

您可以使用相对导入来导入项目中的其他文件。

```solidity
import "../lib/somefile.sol";
```

#### 从 node_module 导入

如果你使用的是包管理器，你也可以从 node_module 导入，比如 `npm` 要么 `yarn`.

```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

#### 从 URL 导入

如果您不想使用包管理器，也可以直接从 URL 导入。

```solidity
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/token/ERC20/ERC20.sol";
```




### 合约定义

那个 `contract` 关键字用于定义新合约，其后是您正在定义的合约的名称。

```solidity
contract MyContract {

}
```


### 主要元素

Solidity 智能合约由几个主要元素组成：

-**状态变量**：在合约中存储永久数据的变量。
-**函数**：封装要在内部或外部调用的函数。
-**事件**：由您的合同发出，用于向外界通报变化。
-**修改器**：用于更改函数的行为。

我们将在下一节中更详细地解释这两者。
