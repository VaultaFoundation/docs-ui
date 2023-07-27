---
title: 创建一个 NFT
---

NFT 是一种**不可替代的代币**。这意味着它是一个唯一的代币，不可能是
与另一个代币互换。 

以收藏品为例（名人拥有的钢笔、赢得比赛的球等）。每一个
物品是唯一的，不能与其他物品互换，因为它们的值是
因为它们的独特性。

> 👀 **只想创建一个 NFT 吗？**
> 
> 在本教程中，我们将讨论创建遵循以太坊的 ERC721 的 NFT
> 标准，这样我们就可以使用明确的标准来深入研究一些 EOS 的开发情况。
> 
> **但是**，如果你想创建一个遵循以下内容的 NFT [**原子资产**](https://github.com/pinknetworkx/atomicassets-contract) 标准是哪个
> 在 EOS 网络上更常见，你可以访问 [原子资产 NFT 创作者](https://eos.atomichub.io/creator)
> 在这里，您可以轻松创建一个 NFT，该NFT将立即在AtomicHub市场上市，而无需部署任何代码。

## 什么是 NFT 标准？

NFT 标准是所有 NFT 都必须遵守的一组规则。这允许 NFT 成为
可与其他 NFT 互操作，也适用于市场和钱包等应用程序
了解如何与他们互动。

## 什么是 ERC721 标准？

那个 [ERC721 标准](https://eips.ethereum.org/EIPS/eip-721) 是由以太坊社区创建的 NFT 标准。它
是最常见的 NFT 标准，被以太坊网络上的许多 NFT 所使用。如果你有
见过 Bored Ape，它们是 ERC721 NFT。

![Bored Ape Club Examples](/images/boredapeclub.jpg)

## 创建新合约

创建新的 `nft.cpp` 文件并添加以下代码：

```cpp
#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/singleton.hpp>
using namespace eosio;

CONTRACT nft : public contract {

    public:
    using contract::contract;
    
    // TODO: Add actions
};
```

## 创建动作

如果我们看看 [ERC721 标准](https://eips.ethereum.org/EIPS/eip-721)，我们可以看出
我们需要采取一些行动。总的来说，标准很简单，但是
有些概念不一定是 EOS 原生的。例如，没有概念 
的 `approvals` 在 EOS 上，因为你可以直接向另一个账户发送代币（通过 `on_notify` 事件），与以太坊不同。

为了使标准尽可能接近原始标准，我们将实施
本教程中的那些非原生概念。

我们将要实施的行动有：

```cpp
    ACTION mint(name to, uint64_t token_id){
    
    }
    
    ACTION transfer(name from, name to, uint64_t token_id, std::string memo){
    
    }
    
    [[eosio::action]] uint64_t balanceof(name owner){
    
    }
    
    [[eosio::action]] name ownerof(uint64_t token_id){
    
    }
    
    ACTION approve(name to, uint64_t token_id){
    
    }
    
    ACTION approveall(name from, name to, bool approved){
    
    }
    
    [[eosio::action]] name getapproved(uint64_t token_id){
    
    }
    
    [[eosio::action]] bool approved4all(name owner, name approved_account){
    
    }
    
    [[eosio::action]] std::string gettokenuri(uint64_t token_id){
    
    }
    
    ACTION setbaseuri(std::string base_uri){
    
    }
```

将它们添加到您的合约中，然后让我们深入研究每个操作，看看它们做了什么，以及它们采用了哪些参数。

你会注意到带有返回值的操作标有 `[[eosio::action]]` 相反
的 `ACTION`. 

> ❔ **动作宏**
> 
> `ACTION` 是叫做 a 的东西 `MACRO`，这是一种编写将被替换的代码的方法
> 在编译时使用其他代码。在这种情况下， `ACTION` 宏替换为：
> ```cpp
> [[eosio::action]] void
> ```
> 我们无法使用的原因 `ACTION` 返回值的操作的宏是因为
> 它添加了 `void` 函数的关键字，这意味着它不会返回任何东西。

## 深入研究动作参数

如果你想对参数进行更深入的解释和简要的解释
每项操作，请展开以下部分。

<details>
    <summary>点击此处查看</summary>

### 薄荷

那个 `mint` 操作用于创建新的 NFT。

它需要两个参数：
- `to` -将拥有 NFT 的账户
- `token_id` -NFT 的 ID

### 转账

那个 `transfer` action 用于将 NFT 从一个账户转移到另一个账户。

它需要四个参数：
- `from` -目前拥有 NFT 的账户
- `to` -将拥有 NFT 的账户
- `token_id` -NFT 的 ID
- `memo` -交易中将包含的备忘录

### balanceOf

那个 `balanceof` action 用于获取账户余额。

它需要一个参数：
- `owner` -您想要获得余额的账户

它返回一个 `uint64_t` 这是账户的余额。

### OwnerOf

那个 `ownerof` 操作用于获取 NFT 的所有者。

它需要一个参数：
- `token_id` -NFT 的 ID

它返回一个 `name` 这是拥有 NFT 的账户。

### 批准

那个 `approve` action 用于批准账户代表您转账 NFT。

它需要两个参数：
- `to` -将获准转移 NFT 的账户
- `token_id` -NFT 的 ID

### ApproveAll

那个 `approveall` action 用于批准一个账户代表您转移所有 NFT。

它需要三个参数：
- `from` -目前拥有 NFT 的账户
- `to` -将获准转移 NFT 的账户
- `approved` -一个布尔值，用于确定账户是否获得批准

### 获得批准

那个 `getapproved` action 用于获取获准代表您转移 NFT 的账户。

它需要一个参数：
- `token_id` -NFT 的 ID

它返回一个 `name` 这是获准转移 NFT 的账户。

### 已获批准适用于所有人

那个 `approved4all` action 用于获取账户是否获准代表您转移所有 NFT。

它需要两个参数：
- `owner` -目前拥有 NFT 的账户
- `approved_account` -您要检查其是否获准转移 NFT 的账户

它返回一个 `bool` 这是 `true` 如果该账户获准转移 NFT，以及 `false` 如果不是。

### tokeNuri

那个 `gettokenuri` 操作用于获取 NFT 元数据的 URI。

它需要一个参数：
- `token_id` -NFT 的 ID

它返回一个 `std::string` 这是 NFT 元数据的 URI。

### setBaseuRI

那个 `setbaseuri` 操作用于设置 NFT 元数据的基本 URI。

它需要一个参数：
- `base_uri` -NFT 元数据的基本 URI
    
</details>


## 添加数据结构

现在我们有了行动，我们需要添加一些数据结构来存储 NFT。

我们将使用 `singleton` 用于存储 NFT。 

> ❔ **辛格尔顿**
> 
> A `singleton` 是一个表，每个作用域只能有一行，这与 `multi_index` 其中 
> 每个作用域可以有多行并使用 `primary_key` 来标识每一行。
> Singletons 更接近以太坊的存储模式。 

在操作上方将以下代码添加到您的合约中：

```cpp
    using _owners = singleton<"owners"_n, name>;
    using _balances = singleton<"balances"_n, uint64_t>;
    using _approvals = singleton<"approvals"_n, name>;
    using _approvealls = singleton<"approvealls"_n, name>;
    using _base_uris = singleton<"baseuris"_n, std::string>;
    
    ACTION mint...
```

我们已经为以下内容创建了单例表：
- `_owners` -从代币 ID 到 NFT 所有者的映射
- `_balances` -从所有者到他们拥有的 NFT 数量的映射
- `_approvals` -从代币 ID 到获准转移该 NFT 的账户的映射
- `_approvealls` -从所有者到获准转移所有 NFT 的账户的映射
- `_base_uris` -存储 NFT 元数据的基本 URI 的配置表

> ❔ **表格命名**
> 
> `singleton<"<TABLE NAME>"_n, <ROW TYPE>>`
> 
> 如果我们看一下单例定义，在双引号里面有表名。
> EOS 表中的名称还必须遵循账户名称规则，这意味着它们必须是
> 12 个字符或更少，只能包含字符 `a-z`, `1-5`，以及 `.`。

现在我们已经创建了用于存储 NFT 数据的表和结构，
我们可以开始填写每个动作的逻辑。


## 添加一些辅助函数

我们需要一些辅助函数来使我们的代码更具可读性，更易于使用
使用。将以下代码添加到您的合约中，就在表格定义的正下方：

```cpp
    using _base_uris = singleton<"baseuris"_n, std::string>;
    
    // Helper function to get the owner of an NFT
    name get_owner(uint64_t token_id){
        
        // Note that we are using the "token_id" as the "scope" of this table.
        // This lets us use singleton tables like key-value stores, which is similar
        // to how Ethereum contracts store data.
        
        _owners owners(get_self(), token_id);
        return owners.get_or_default(name(""));
    }
    
    // Helper function to get the balance of an account
    uint64_t get_balance(name owner){
        _balances balances(get_self(), owner.value);
        return balances.get_or_default(0);
    }
    
    // Helper function to get the account that is approved to transfer an NFT on your behalf
    name get_approved(uint64_t token_id){
        _approvals approvals(get_self(), token_id);
        return approvals.get_or_default(name(""));
    }
    
    // Helper function to get the account that is approved to transfer all of your NFTs on your behalf
    name get_approved_all(name owner){
      _approvealls approvals(get_self(), owner.value);
      return approvals.get_or_default(name(""));
   }
    
    // Helper function to get the URI of the NFT's metadata
    std::string get_token_uri(uint64_t token_id){
        _base_uris base_uris(get_self(), get_self().value);
        return base_uris.get_or_default("") + "/" + std::to_string(token_id);
    }
```

辅助函数可以更轻松地从我们之前创建的表中获取数据。
我们将在接下来要实现的操作中使用这些函数。

特别是，有些函数在多个地方使用，因此有意义
为他们创建一个辅助函数。例如， `get_owner` 使用了函数
在 `mint`, `transfer`，以及 `approve` 行动。如果我们没有创建辅助函数
为此，我们必须在每个操作中编写相同的代码。

## 填写动作

我们将仔细检查每个动作并实现其逻辑。密切关注
注释，因为它们将解释每行代码的作用。

### 薄荷

那个 `mint` 操作用于创建新的 NFT。

```cpp
    ACTION mint(name to, uint64_t token_id){
        // We only want to mint NFTs if the action is called by the contract owner
        check(has_auth(get_self()), "only contract can mint");
        
        // The account we are minting to must exist
        check(is_account(to), "to account does not exist");
        
        // Get the owner singleton
        _owners owners(get_self(), token_id);
        
        // Check if the NFT already exists
        check(owners.get_or_default().value == 0, "NFT already exists");
        
        // Set the owner of the NFT to the account that called the action
        owners.set(to, get_self());
        
        // Get the balances table
        _balances balances(get_self(), to.value);
        
        // Set the new balances of the account
        balances.set(balances.get_or_default(0) + 1, get_self());
    }    
```


### 转账

那个 `transfer` action 用于将 NFT 从一个账户转移到另一个账户。

```cpp
    ACTION transfer(name from, name to, uint64_t token_id, std::string memo){
        // The account we are transferring from must authorize this action
        check(has_auth(from), "from account has not authorized the transfer");
        
        // The account we are transferring to must exist
        check(is_account(to), "to account does not exist");
        
        // The account we are transferring from must be the owner of the NFT
        // or allowed to transfer it through an approval
        bool ownerIsFrom = get_owner(token_id) == from;
        bool fromIsApproved = get_approved(token_id) == from;
        check(ownerIsFrom || fromIsApproved, "from account is not the owner of the NFT or approved to transfer the NFT");       
        
        // Get the owner singleton
        _owners owners(get_self(), token_id);
        
        // Set the owner of the NFT to the "to" account
        owners.set(to, get_self());
        
        // Set the new balance for the "from" account
        _balances balances(get_self(), from.value);
        balances.set(balances.get_or_default(0) - 1, get_self());
        
        // Set the new balance for the "to" account
        _balances balances2(get_self(), to.value);
        balances2.set(balances2.get_or_default(0) + 1, get_self());
        
        // Remove the approval for the "from" account
        _approvals approvals(get_self(), token_id);
        approvals.remove();
        
        // Send the transfer notification
        require_recipient(from);
        require_recipient(to);
    }
```

### balanceOf

那个 `balanceof` action 用于获取账户余额。

```cpp
    [[eosio::action]] uint64_t balanceof(name owner){
        return get_balance(owner);
    }
```

> ⚠ **返回值和可组合性**
> 
> 返回值只能在区块链外部使用，目前无法使用
> 在 EOS 中实现智能合约的可组合性。EOS 支持 [**内联操作**](/docs/03_smart-contracts/02_actions.md#inline-actions) 哪个可以使用
> 调用其他智能合约，但它们无法返回值。

### OwnerOf

那个 `ownerof` 操作用于获取 NFT 的所有者。

```cpp
    [[eosio::action]] name ownerof(uint64_t token_id){
        return get_owner(token_id);
    }
```

### 批准

那个 `approve` action 用于批准账户代表您转账 NFT。

```cpp
    ACTION approve(name to, uint64_t token_id){
        // get the token owner
        name owner = get_owner(token_id);
        
        // The owner of the NFT must authorize this action
        check(has_auth(owner), "owner has not authorized the approval");
    
        // The account we are approving must exist
        check(is_account(to), "to account does not exist");
        
        // Get the approvals table
        _approvals approvals(get_self(), token_id);
        
        // Set the approval for the NFT
        approvals.set(to, get_self());
    }
```

### ApproveAll

那个 `approveall` action 用于批准一个账户转移您的所有资金
代表你的 NFT。

```cpp
    ACTION approveall(name from, name to, bool approved){
        // The owner of the NFTs must authorize this action
        check(has_auth(from), "owner has not authorized the approval");
        
        // The account we are approving must exist
        check(is_account(to), "to account does not exist");
        
        // Get the approvals table
        _approvealls approvals(get_self(), from.value);
        
        if(approved){
            // Set the approval for the NFT
            approvals.set(to, get_self());
        } else {
            // Remove the approval for the NFT
            approvals.remove();
        }
    }
```

### 获得批准

那个 `getapproved` action 用于获取获准转账的账户
代表你使用 NFT。

```cpp
    [[eosio::action]] name getapproved(uint64_t token_id){
        return get_approved(token_id);
    }
```

### Approved4All

那个 `approved4all` action 用于检查账户是否已获准转账
代表你所有的NFT。

```cpp
    [[eosio::action]] bool approved4all(name owner, name approved_account){
      return get_approved_all(owner) == approved_account;
   }
```

> ⚠ **动作名称限制**
> 
> 账户名也有与表名相同的限制，因此它们只能包含
> 人物 `a-z`, `1-5`，以及 `.`。因此，我们无法使用该标准 `isApprovedForAll`
> 动作的名称，所以我们正在使用 `approved4all` 相反。

### tokeNuri

那个 `tokenuri` 操作用于获取 NFT 的 URI。

```cpp
    [[eosio::action]] std::string tokenuri(uint64_t token_id){
        return get_token_uri(token_id);
    }
```

### setBaseuRI

那个 `setbaseuri` 操作用于设置 NFT 的基本 URI。

```cpp
    ACTION setbaseuri(std::string base_uri){
        // The account calling this action must be the contract owner
        require_auth(get_self());
        
        // Get the base URI table
        _base_uris base_uris(get_self(), get_self().value);
        
        // Set the base URI
        base_uris.set(base_uri, get_self());
    }
```



## 把所有东西放在一起

现在我们已经准备好了所有动作，我们可以将它们全部放在 `nft.cpp` 文件。

在查看下面的完整合约之前，你应该尝试自己构建、部署合约并与之交互。
首先，你需要在你控制的账户中铸造一些 NFT，然后你可以尝试将它们转移到另一个账户。

你也可以通过批准另一个账户代表你转移你的 NFT 来测试批准机制， 
然后使用已批准的账户将其转移到另一个账户。

<details>
    <summary>点击此处查看完整合同</summary>

```cpp
#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/singleton.hpp>
using namespace eosio;

CONTRACT nft : public contract {

   public:
   using contract::contract;

   // Mapping from token ID to owner
   using _owners = singleton<"owners"_n, name>;
   
   // Mapping owner address to token count
   using _balances = singleton<"balances"_n, uint64_t>;
   
   // Mapping from token ID to approved address
   using _approvals = singleton<"approvals"_n, name>;
   
   // Mapping from owner to operator approvals
   using _approvealls = singleton<"approvealls"_n, name>;
   
   // Registering the token URI
   using _base_uris = singleton<"baseuris"_n, std::string>;

   // Helper function to get the owner of an NFT
   name get_owner(uint64_t token_id){
      _owners owners(get_self(), token_id);
      return owners.get_or_default(name(""));
   }
   
   // Helper function to get the balance of an account
   uint64_t get_balance(name owner){
      _balances balances(get_self(), owner.value);
      return balances.get_or_default(0);
   }
   
   // Helper function to get the account that is approved to transfer an NFT on your behalf
   name get_approved(uint64_t token_id){
      _approvals approvals(get_self(), token_id);
      return approvals.get_or_default(name(""));
   }
   
   // Helper function to get the account that is approved to transfer all of your NFTs on your behalf
   name get_approved_all(name owner){
      _approvealls approvals(get_self(), owner.value);
      return approvals.get_or_default(name(""));
   }
   
   // Helper function to get the URI of the NFT's metadata
   std::string get_token_uri(uint64_t token_id){
      _base_uris base_uris(get_self(), get_self().value);
      return base_uris.get_or_default("") + "/" + std::to_string(token_id);
   }
   
   ACTION mint(name to, uint64_t token_id){
      // We only want to mint NFTs if the action is called by the contract owner
      check(has_auth(get_self()), "only contract can mint");

      // The account we are minting to must exist
      check(is_account(to), "to account does not exist");

      // Get the owner singleton
      _owners owners(get_self(), token_id);

      // Check if the NFT already exists
      check(owners.get_or_default().value == 0, "NFT already exists");

      // Set the owner of the NFT to the account that called the action
      owners.set(to, get_self());

      // Get the balances table
      _balances balances(get_self(), to.value);

      // Set the new balances of the account
      balances.set(balances.get_or_default(0) + 1, get_self());
   }
   
   ACTION transfer(name from, name to, uint64_t token_id, std::string memo){
      // The account we are transferring from must authorize this action
      check(has_auth(from), "from account has not authorized the transfer");

      // The account we are transferring to must exist
      check(is_account(to), "to account does not exist");

      // The account we are transferring from must be the owner of the NFT
      // or allowed to transfer it through an approval
      bool ownerIsFrom = get_owner(token_id) == from;
      bool fromIsApproved = get_approved(token_id) == from;
      check(ownerIsFrom || fromIsApproved, "from account is not the owner of the NFT or approved to transfer the NFT");       

      // Get the owner singleton
      _owners owners(get_self(), token_id);

      // Set the owner of the NFT to the "to" account
      owners.set(to, get_self());

      // Set the new balance for the "from" account
      _balances balances(get_self(), from.value);
      balances.set(balances.get_or_default(0) - 1, get_self());

      // Set the new balance for the "to" account
      _balances balances2(get_self(), to.value);
      balances2.set(balances2.get_or_default(0) + 1, get_self());

      // Remove the approval for the "from" account
      _approvals approvals(get_self(), token_id);
      approvals.remove();

      // Send the transfer notification
      require_recipient(from);
      require_recipient(to);
   }
   
   [[eosio::action]] uint64_t balanceof(name owner){
      return get_balance(owner);
   }
   
   [[eosio::action]] name ownerof(uint64_t token_id){
      return get_owner(token_id);
   }
   
   ACTION approve(name to, uint64_t token_id){
      // get the token owner
      name owner = get_owner(token_id);
      
      // The owner of the NFT must authorize this action
      check(has_auth(owner), "owner has not authorized the approval");
   
      // The account we are approving must exist
      check(is_account(to), "to account does not exist");
      
      // Get the approvals table
      _approvals approvals(get_self(), token_id);
      
      // Set the approval for the NFT
      approvals.set(to, get_self());
   }
   
   ACTION approveall(name from, name to, bool approved){
      // The owner of the NFTs must authorize this action
      check(has_auth(from), "owner has not authorized the approval");
      
      // The account we are approving must exist
      check(is_account(to), "to account does not exist");
      
      // Get the approvals table
      _approvealls approvals(get_self(), from.value);
      
      if(approved){
         // Set the approval for the NFT
         approvals.set(to, get_self());
      } else {
         // Remove the approval for the NFT
         approvals.remove();
      }
   }
   
   [[eosio::action]] name getapproved(uint64_t token_id){
      return get_approved(token_id);
   }
   
   [[eosio::action]] bool approved4all(name owner, name approved_account){
      return get_approved_all(owner) == approved_account;
   }
   
   [[eosio::action]] std::string gettokenuri(uint64_t token_id){
      return get_token_uri(token_id);
   }
   
   ACTION setbaseuri(std::string base_uri){
      // The account calling this action must be the contract owner
      require_auth(get_self());
      
      // Get the base URI table
      _base_uris base_uris(get_self(), get_self().value);
      
      // Set the base URI
      base_uris.set(base_uri, get_self());
   }
};
```
</details>

## 这是出于教育目的

请记住，如果你在EOS网络上部署了这个合约并铸造了代币，
将不支持销售它们的商城（在撰写本指南时）。这仅用于教育目的。

## 挑战

这份 NFT 合约无法烧掉 NFT。添加一个 `burn` 允许代币所有者烧毁自己的 NFT 的操作。
