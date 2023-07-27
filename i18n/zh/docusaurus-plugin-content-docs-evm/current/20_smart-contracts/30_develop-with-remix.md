---
title: 使用 Remix 进行开发
---

Remix 是一个基于 Web 的 IDE，允许你编写、编译和部署智能合约到 EOS EVM。

## 学习界面

前往 [混音](https://remix.ethereum.org/) 你应该会看到以下内容：

![Remix intro](/images/eos-evm_using-remix_intro.png)

Remix 界面可以分为 2 个主要部分：

1.**侧边栏**-此面板会根据您点击的图标而变化。
 -**文件资源管理器**-您可以在这里创建、打开和保存文件。
 -**搜索**-您可以在这里搜索您的文件。
 -**Solidity 编译器**-在这里你可以编译你的智能合约。
 -**部署并运行交易**-您可以在这里部署智能合约并与之交互。
 -**Solidity 单元测试**-您可以在这里为智能合约运行单元测试。
2.**Editor**-您可以在这里编写智能合约代码。
3.**Terminal**-在这里，您将看到编译、部署和运行测试等不同操作的输出。

![Remix sections](/images/eos-evm_using-remix_sections.png)

## 工作区

Remix 有一个工作空间的概念，它本质上是一个文件集合，你可以一起保存和打开。

您可以通过单击 “创建新工作区” `+` 旁边的侧边栏中的图标 `WORKSPACES`

![Remix create workspace](/images/eos-evm_using-remix_create-workspace.png)

在弹出窗口中，选择 `Blank` 在模板下拉列表中，为您的工作区命名，然后单击 `OK`.

![Remix create workspace popup](/images/eos-evm_using-remix_blank-template.png)

现在您的工作区为空，请为我们将要处理的合同创建一个新文件。

点击边栏中的空白页图标并命名文件 `Todo.sol`.

![Remix new workspace](/images/eos-evm_using-remix_new-file.png)

现在，您有了新的工作区，其中包含一个名为的文件 `Todo.sol`，你已经准备好开始编写智能合约了。

![Remix new workspace](/images/eos-evm_using-remix_todosol.png)

## 编写你的智能合约

让我们从编写一个简单的智能合约开始，它允许我们创建待办事项列表，并从待办事项列表中勾选项目。

将以下代码复制并粘贴到您的 `Todo.sol` 文件:

```solidity
pragma solidity ^0.8.0;

contract Todo {
    struct TodoItem {
        string text;
        bool completed;
    }
   
    TodoItem[] public todos;
    uint256 public todoCount;
   
    function addTodoItem(string memory _text) external {
        todos.push(TodoItem(_text, false));
        todoCount++;
    }
   
    function toggleTodoItem(uint _index) external {
        todos[_index].completed = !todos[_index].completed;
    }
}
```

## 解除合约

让我们简要介绍一下这份合约的作用及其运作方式。

### 定义编译器版本

在 Solidity 中，您需要做的第一件事就是定义要使用的编译器版本。

```solidity
pragma solidity ^0.8.0;
```

在我们的例子中，我们使用的是版本 `0.8.0` 的 Solidity 编译器，并允许它使用任何补丁版本的 `0.8` 通过 
在版本前面加上 `^`。

### 定义一个结构

结构是定义自定义数据类型的一种方式。在我们的例子中，我们定义的是 `TodoItem` 具有两个属性的结构：

- `text` -用于存放待办事项文本的字符串
- `completed` -一个布尔值，用于保存待办事项是否已完成

### 定义状态变量

状态变量是存储在区块链上的变量。它们存在于合同的根范围内。

在我们的合约中，我们定义了两个状态变量：

- `todos` -一组的 `TodoItem` 结构
- `todoCount` -一个可以记录我们有多少待办事项的数字

### 定义一个函数

函数是一种封装逻辑的方法，可以从合约外部或合约内部调用。

我们只需要可以从合约外部**调用的函数，所以我们将把函数定义为 `external`.

> ❔ **函数可见性类型**
> 
> 有 4 种不同的函数可见性类型： `external`, `public`, `internal`，以及 `private`.
> 我们将在以后的指南中详细介绍其中的每一项内容。

函数是与智能合约交互的主要方式。它们可以从合同之外调用，也可以从
在合同范围内。

在我们的合同中，我们定义了两个函数：

- `addTodoItem` -此函数采用字符串作为参数，并添加一个新的 `TodoItem` 到 `todos` 数组。
- `toggleTodoItem` -此函数采用数字索引作为参数，并切换 `completed` 的状态
  `TodoItem` 在那个索引下。

## 编译你的智能合约

现在我们已经编写了智能合约，我们需要对其进行编译，以便将其部署到EOS EVM。

点击 `Solidity Compiler` 侧边栏中的图标。

> ❕ **确保您打开了正确的文件**
> 
> 无论你打开什么合约，它都能让你编译，所以一定要有 `Todo.sol` 文件已打开。

现在点击 `Compile Todo.sol` 按钮。

![Remix compile](/images/eos-evm_using-remix_compile.png)

如果你的合同有任何错误，你会在侧边栏上看到一个红色方框，表示它发现的每个错误。

![Remix compile errors](/images/eos-evm_using-remix_compiler-error.png)

## 部署你的智能合约

现在我们已经编译了智能合约，可以将其部署到EOS EVM。

点击 `Deploy & Run Transactions` 侧边栏中的图标。

然后点击 `ENVIROMENT` 下拉列表并选择 `Injected Provider - MetaMask`.

> ❕ **先设置好你的 MetaMask！**
> 
> 如果你还没有，请确保你已经设置好了 MetaMask 钱包并将其连接到 EOS EVM。
> 
> **你可以关注 [本指南](/evm/10_quick-start/02_setup-metamask.md) 学习如何做到这一点。**

![Remix deploy](/images/eos-evm_using-remix_open-deploy.png)

MetaMask 会弹出并要求你关联一个账户。

![Remix connect metamask](/images/eos-evm_using-remix_connect-metamask.png)

你现在可以点击 `Deploy` 按钮可将您的智能合约部署到 EOS EVM。

这将打开一个 MetaMask 弹出窗口，要求你确认交易。

![Remix deploy](/images/eos-evm_using-remix_deploy-button.png)

如果成功，您将在控制台中看到一条消息，还会看到来自 MetaMask 的通知。

![Remix deploy success](/images/eos-evm_using-remix_deployed.png)

> 🤕 **遇到错误？**
> 
> 如果你遇到任何错误，你将从 MetaMask 和 Remix 的主机中获得信息。
> 常见问题是你的钱包里没有足够的余额来支付交易费用，或者你有
> 您的 MetaMask 钱包设置不正确。

## 与你的智能合约互动

现在我们已经部署了智能合约，我们可以与之交互了。

在 `Deploy & Run Transactions` 面板，你会看到一个名为 `Deployed Contracts`。

你应该会看到一份名为的合约 `TODO` 旁边有一个小箭头。点击箭头展开合约。

![Remix deployed contracts](/images/eos-evm_using-remix_deployed-chevron.png)

现在，您将看到合约中所有函数的列表，以及所有公共状态变量。

单击 “” 旁边的输入字段 `addTodoItem` 函数，然后键入一些文本。 
然后点击 `addTodoItem` 按钮，它将使用 MetaMask 向链发送另一笔交易。

![Remix add todo item](/images/eos-evm_using-remix_add-todo.png)

要验证我们是否已将某项添加到待办事项列表中，您可以按 `todoCount` 按钮，它将读取值
的 `todoCount` 状态变量。然后，它将在按钮下方显示结果。

你也可以填写 `0` 索引到 `todos` 数组状态变量，然后按下按钮查看数组状态变量的内容 
`todos` 该索引处的数组。

> 索引从零开始，因此数组中的第一项在索引处 `0`.

![Remix todo count](/images/eos-evm_using-remix_see-count.png)

最后，我们可以通过填写以下内容来切换待办事项 `0` 索引到 `toggleTodoItem` 功能，然后按下
按钮。你可以像以前一样按下 todo 项目来获取 `todos` 再按一次按钮，你应该会看到
那个 `completed` 属性已更改。

![Remix toggle todo item](/images/eos-evm_using-remix_toggle-todo.png)

## 验证您的智能合约

验证是智能合约开发过程中的重要一步。它允许任何人验证
部署到区块链的智能合约代码与您编写的代码相同。

我们有关于以下内容的指南 [如何验证您的智能合约](/evm/20_smart-contracts/60_verify-a-smart-contract.md)， 
但是你需要先从 Remix 那里得到一些信息。 

### 扁平合约

如果您的合约继承或导入了其他合约，则需要先将合约扁平化，然后才能对其进行验证。
在 Solidity 中执行此操作很简单，只需右键单击合约即可 `File Explorer` 选项卡，然后单击 `Flatten`。 

这将在您的工作区中创建一个名为的新文件 `<contract-name>_flattened.sol`。 

### 获取合约元数据

你还需要 `compiler` 和 `EVM version` 你用来编译合约的。你可以找到这个信息
在 `Solidity Compiler` 选项卡。

![Remix compiler version](/images/eos-evm_using-remix_verify.png)


## 后续步骤

**恭喜你！**

现在，你已经在EOS EVM上成功部署了你的第一个智能合约并与之进行了交互！

你学习了智能合约基础知识、设置 MetaMask 以及使用 Remix 进行开发、部署和交互
您的智能合约。
