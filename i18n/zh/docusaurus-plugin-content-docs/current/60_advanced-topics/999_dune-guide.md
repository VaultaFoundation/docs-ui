---
title: 本地发展
---

[用于节点执行的 Docker 实用程序 (DUNE)](https://github.com/AntelopeIO/DUNE) 是一种客户端工具，允许区块链开发人员和节点运营商执行与智能合约开发和节点管理功能相关的样板任务。

在开始开发智能合约之前，您需要了解 DUNE 以及如何在您的平台上安装它。

### 安装

DUNE 支持以下平台：
* Linux
* 视窗
* macOS

每个受支持平台的安装说明可在 [DUNE 的 github 项目](https://github.com/AntelopeIO/DUNE) 页面。

 跑 `dune --help` 查看所有支持的命令列表。

## 钱包

DUNE 为您处理钱包管理。 

如果您需要将新密钥导入钱包：

```shell
dune --import-dev-key <PRIVATE_KEY>
```

## 节点管理

使用 DUNE 轻松创建新的本地 EOS 区块链。

```shell
dune --start <NODE_NAME>
```

上面的命令创建了一个名为的新节点 `NODE_NAME` 使用默认设置。默认设置将新节点配置为 API/Producer 节点。您可以将智能合约部署到此节点并对其进行测试。

> ❔ **错误**
>
> 在节点设置过程结束时，您可能会看到错误。
> 如果你这样做，你可以参考本指南来解决常见错误，或者通过我们的
> [电报频道](https://t.me/vaultadevelopers) 寻求帮助。

你可以看到系统上的 EOS 节点列表：

```shell
dune --list
```

你可以检查你的主动节点的 RPC API 是否已上线：

```shell
dune -- cleos get info
```

要关闭您的节点，请执行以下操作：

```shell
dune --stop <NODE_NAME>
```

要完全移除一个节点，请执行以下操作：

```shell
dune --remove <NODE_NAME>
```


### 引导你的环境

您的开发环境可能需要依赖一些系统合约，例如：

- `eosio.token` 用于**EOS**代币转账
- `eosio.msig` 用于多重签名交易
- `eosio.system` 用于系统级操作，例如资源管理

启动本地节点很容易。活动节点运行后，您可以使用以下方法对其进行引导：

```shell
dune --bootstrap-system-full
```


## 账户管理

您可以使用账户与智能合约进行交互，也可以在账户之上部署合约。

要创建新账户，请执行以下操作：

```shell
dune --create-account <ACCOUNT_NAME>
```

要获取账户信息，请执行以下操作：

```shell
dune -- cleos get account <ACCOUNT_NAME>
```

## 智能合约开发

创建示例项目，以便您可以学习如何使用 DUNE 编译、部署智能合约以及与之交互。

导航到创建项目的目录，然后运行以下命令：

```shell
dune --create-cmake-app hello .
```

这将创建一个 `hello` 包含 cmake 风格 EOS 智能合约项目的目录。

替换内容 `src/hello.cpp` 使用以下代码：

```cpp
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT hello : public contract {
   public:
      using contract::contract;

      TABLE user_record {
         name user;
         uint64_t primary_key() const { return user.value; }
      };
      typedef eosio::multi_index< name("users"), user_record> user_index;

      ACTION test( name user ) {
         print_f("Hello World from %!\n", user);
         user_index users( get_self(), get_self().value );
         users.emplace( get_self(), [&]( auto& new_record ) {
            new_record.user = user;
         });
      }
};
```

### 编译你的合约

在项目的根目录下，运行以下命令来编译合约：

```shell
dune --cmake-build .
```
你的合同已经编译完了。任何错误都会显示在输出中。 

### 部署你的合约

为您的合同创建一个账户，然后进行部署。

```shell
dune --create-account hello
dune --deploy ./build/hello hello
```

> 👀 **代码权限**
> 
> 默认情况下，DUNE 会添加 `eosio.code` 向账户部署合约时对账户的权限。这允许合约触发对其他智能合约的内联操作。

### 与你的合同互动

将本地 EOS. 节点上的交易发送到区块链，与您的智能合约进行交互。一笔交易包含多个操作。您可以使用--send-action 命令通过单个操作发送事务。

您还必须创建一个用于发送操作的测试账户。

```shell
dune --create-account testaccount

# format: dune --send-action <CONTRACT> <ACTION> <PARAMETERS> <SENDER>
dune --send-action hello test '[bob]' testaccount
```

你应该看到交易成功执行，合约数据库中添加了一行。如果你重复这个命令，它将失败，因为该行已经存在于合约的数据库中。

### 从合同中获取数据

您刚刚在合约的数据库中添加了一行。你可以从链中获取这些数据：

```shell
# format: dune --get-table <CONTRACT> <SCOPE> <TABLE>
dune --get-table hello hello users
```

你会得到一个包含一行或多行的表格结果。如果您没有收到包含一行或多行的表，请确保上述交互成功。

## 在 DUNE 中使用原始程序

如果你想利用原始 EOS 堆栈，你可以使用 `DUNE -- <COMMAND>` 用于访问数据、应用程序和容器内所有其他内容的格式。

示例：
    
```shell
dune -- cleos get info
dune -- nodeos --help
```
