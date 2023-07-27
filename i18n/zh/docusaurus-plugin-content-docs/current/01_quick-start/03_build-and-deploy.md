---
title: 构建和部署
--- 

在上一节中，我们写了一个简单的智能合约。在本节中，我们将构建它并将其部署到区块链
使用 EOS Web IDE。

## 智能合约的构建目的是什么？

当你构建智能合约时，它会生成两个文件：
- `mycontract.wasm` -这是将在区块链上运行的编译后的 WebAssembly 代码。
- `mycontract.abi` -这是描述智能合约接口的 ABI 文件。

## 什么是 ABI？

ABI 代表应用程序二进制接口。它是一个描述智能合约接口的文件。它
包含有关您的智能合约公开的函数及其采用的参数的信息。

它还包含有关您的智能合约使用的数据结构以及它们如何存储在智能合约中的信息
区块链。例如，哪些表可用，以及这些表中有哪些字段。

## 什么是 WebAssembly？

WebAssembly 是一种用于基于堆栈的虚拟机的二进制指令格式。它被设计为便携式目标
编译诸如 C/C++/Rust 之类的高级语言，使客户端和服务器应用程序能够在 Web 上部署。

## 说够了，我们来建造吧！

继续点击 `Build` 按钮位于 EOS Web IDE 的左下角。你应该在里面看到一条消息
控制台上写着 `Building project...`

![EOS Web IDE](/images/native-web-ide-build.png)

如果编译成功**，你将在控制台中看到 zip、wasm 和 abi 文件可供下载。

如果构建失败**，您将在控制台中看到错误消息，其中包含错误发生的行号。

![EOS Web IDE](/images/native-web-ide-built.png)

## 部署到测试网

现在我们有了可以毫无错误地构建的智能合约，我们可以将其部署到区块链上。

单击最左侧边栏上的 “部署” 选项卡以打开部署选项。

![EOS Web IDE](/images/native-web-ide-deploy-tab.png)

现在你可以点击 `Build & Deploy` 按钮将您的智能合约部署到区块链。
这将把你的智能合约部署到EOS Jungle Testnet，并允许你与之交互。

![EOS Web IDE](/images/native-web-ide-deploying.png)

如果在部署过程中出现任何错误，您将在控制台中看到这些错误。如果没有， 
你会看到一条消息，上面写着 `Deployed successfully!`.

![EOS Web IDE](/images/native-web-ide-deployed.png)

## 与合约互动

现在我们已经将智能合约部署到区块链上，我们可以与之交互了。

部署后，侧边栏将更新以显示以下内容：
1.合约部署到的账户
2.可用于与合约进行交互的账户列表
3.合同暴露的行为
4.合约公开的表格

![EOS Web IDE](/images/native-web-ide-interact.png)

您可以填写以下字段 `save` 操作，然后单击 `RUN` 按钮来执行动作。

你也可以点击 `GET` 按钮位于要查询的表旁边，以查看该表中的数据， 
你会得到一个 `JSON` 控制台中的输出。

![EOS Web IDE](/images/native-web-ide-interacted.png)

## 恭喜你！

现在，你已经在区块链上构建并部署了你的第一个智能合约，并与之进行了交互。

是时候开始构建自己的智能合约了！这些文档将引导你完成每一个步骤
顺便说一句，但你的第一步是学习 [解剖学](/docs/03_smart-contracts/01_contract-anatomy.md) 的
智能合约。

你可能还想学习其中的一些 [核心概念](/docs/02_core-concepts/10_blockchain-basics/10_decentralization.md) 区块链的。

