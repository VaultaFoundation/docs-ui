---
title: 编写智能合约
--- 

在本指南中，我们将创建一个简单的智能合约，允许我们在区块链中存储字符串。
我们将使用 **[Web IDE](https://eos-web-ide.netlify.app/)** 编写我们的智能合约并将其部署到 EOS 测试网。

## 什么是智能合约？

你可以把智能合约想象成在区块链上运行的函数。它必须是**确定性**，意思是 
在相同的输入下，它将始终产生相同的输出。这是必需的，以便网络上的所有节点
可以就函数的输出达成一致。

## 什么是 Web IDE？

Web IDE 是在浏览器中运行的集成开发环境。它允许你编写、编译和
将您的智能合约部署到区块链，无需离开浏览器或安装任何软件。

## 说够了，我们开始吧！

打开 [EOS Web IDE](https://eos-web-ide.netlify.app/) 在您的浏览器中。你会看到一个
虚拟合约，它向你展示了智能合约的基本结构。

继续清除编辑器中的所有内容，然后复制并粘贴以下代码：

```cpp
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT mycontract : public contract {
  public:
    using contract::contract;

    TABLE StoredData {
      uint64_t id;
      std::string text;
      
      uint64_t primary_key() const { return id; }
    };
    
    using storage_table = eosio::multi_index<"mytable"_n, StoredData>;

    ACTION save( uint64_t id, std::string text ) {
      storage_table _storage( get_self(), get_self().value );
      _storage.emplace( get_self(), [&]( auto& row ) {
        row.id = id;
        row.text = text;
      });
    }
};
```

看看代码，看看你能不能弄清楚它在做什么。 

如果你在理解代码时遇到困难，别担心，你可以前往 [智能合约基础知识](/docs/03_smart-contracts/01_contract-anatomy.md)
部分，详细了解智能合约的各个部分及其工作原理。

你的屏幕现在应该是这样的：

![EOS Web IDE](/images/native-web-ide-basics.png)
