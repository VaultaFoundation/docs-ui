---
title: “创建代币”
---


代币是一种可拥有的数字资产，例如虚拟收藏品或游戏内货币。它只不过是一个数据结构
它存储在区块链上。

代币合约定义了构成代币的数据结构，这些结构的存储， 
以及为操纵代币可以采取的行动。

区块链代币有两种广泛使用的类型： 
-**可替代代币**可以互换，每个代币彼此相等，就像游戏中的金币一样 
-**不可替代的代币**是独一无二的，比如收藏卡或一块土地

在本教程中，您将创建一种名为**GOLD**的游戏内货币，这是一种*可替代的代币*。 

## 创建新合约

首先，让我们搭建一个基本的合约脚手架。

创建一个 `token.cpp` 文件并添加以下代码：

```cpp
#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/singleton.hpp>
using namespace eosio;

CONTRACT token : public contract {

    public:
    using contract::contract;

    // TODO: Add actions
};
```

## 创建动作

我们的代币合约将有三个动作： 

```cpp
    ACTION issue(name to, asset quantity){
        
    }
    
    ACTION burn(name owner, asset quantity){
        
    }
    
    ACTION transfer(name from, name to, asset quantity, std::string memo){
        
    }
```

将它们添加到您的合约中，然后让我们深入研究每个操作，看看它们做了什么，以及它们采用了哪些参数。

### 问题

那个 `issue` action 会创建新的代币并将其添加到账户余额和总供应量中。 

它需要两个参数：
-**to**：将向其发放代币的账户
-**数量**：要发行的代币数量

### Burn

那个 `burn` action 会从账户余额和总供应量中移除代币。 

它需要两个参数：
-**所有者**：将烧掉代币的账户
-**数量**：要销毁的代币数量

### 转账

那个 `transfer` action 将代币从一个账户转移到另一个账户。 

它需要四个参数：
-**from**：发送代币的账户
-**to**：接收代币的账户
-**数量**：要转移的代币数量
-**备忘录**：转账时要包含的备忘录

## 设置符号和精度

每个可替代代币都有一个**符号**和一个**精度**。

**符号**是代币的标识符（比如EOS、BTC，或者在我们的例子中为GOLD），而**精度**是代币支持的小数位数。
我们将在合约中添加一个常量变量来定义 `symbol` 和 `precision` 我们的代币。

在上面加上这个 `issue` 动作：

```cpp
    const symbol TOKEN_SYMBOL = symbol(symbol_code("GOLD"), 4);
    
    ACTION issue ...
```

以上几行意味着我们将使用该符号创建代币 `GOLD` 而且精度为 `4`。

看起来会像 `100.0000 GOLD` 要么 `0.0001 GOLD`。

## 添加数据结构

现在您已经定义了操作，接下来让我们添加将用于存储令牌数据的数据结构。

把这个放在下面 `TOKEN_SYMBOL` 你刚刚添加了。

```cpp
    const symbol TOKEN_SYMBOL = symbol(symbol_code("GOLD"), 4);

    TABLE balance {
        name     owner;
        asset    balance;

        uint64_t primary_key()const { 
            return owner.value; 
        }
    };
    
    using balances_table = multi_index<"balances"_n, balance>;
```

你刚刚创建了一个 `balance` 结构，它定义了将存储在 `balances` 桌子。
然后，你定义了 `balances_table` type，这是表的定义，该表将存储表的行 `balance` 模型。

稍后您将使用 `balances_table` 键入以实例化对的引用 `balances` 表，然后使用该引用 
在区块链中存储和检索数据。

那个 `owner` 属性的类型是 `name` （EOS 账户名称），并将用于识别拥有代币的账户。
那个 `name` type 是一种高效地将字符串打包成 64 位整数的方法。它仅限于 a-z、1-5 和一个句点，并且可以 
长度不超过 12 个字符。

那个 `balance` 属性的类型是 `asset` 并将用于存储账户拥有的代币数量。
那个 `asset` type 是一种特殊类型，包括符号、精度和金额。它有 `asset.symbol` 属性
还有 `asset.amount` 属性（其类型为 `int64_t`）。

那个 `primary_key` 结构中的函数用于唯一标识每行以进行索引。在这种情况下， 
我们正在使用 `owner` 字段作为主键，但使用 `uint64_t` 取而代之的是代表以提高效率。

接下来，您需要另一张表来存储代币的总供应量。在下面加上这个 `balances_table` 你刚刚添加了：

```cpp
    using supply_table = singleton<"supply"_n, asset>;
```

我们在这里使用的是另一种类型的表格，a `singleton`。A `singleton` 是每个作用域只有一行的表。 
这非常适合存储配置之类的东西。我们将使用它来存储代币的总供应量，就像你一样 
你的合约中只有一个代币。

你可以看到，我们也没有定义要存储的自定义结构，因为我们只需要 `asset` 键入要存储 
总供应量。

## 填写动作

现在您已经定义了数据结构，让我们填写操作。

### 问题

首先，我们将从 `issue` action，它将创建新的代币并将其添加到账户的余额中。

我们只希望部署合约的账户能够调用 `issue` 动作，所以我们将添加 
一种断言，用于确保调用操作的账户与部署合约的账户相同。

```cpp
    ACTION issue(name to, asset quantity){
        check(has_auth(get_self()), "only contract owner can issue new GOLD");
    }
```

接下来，我们要确保我们将发行代币的账户存在于区块链上。我们不想要那样
游戏内甜蜜的金币要浪费掉了!

```cpp
    ...
    check(is_account(to), "the account you are trying to issue GOLD to does not exist");
```

接下来，我们要确保 `quantity` 参数是正数，并且是正确的 
`symbol` 和 `precision`.

```cpp
    ...
    check(quantity.is_valid(), "invalid quantity");
    check(quantity.amount > 0, "must issue a positive quantity");
    check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");
```

Shwew!这是很多支票，但重要的是要确保我们在保护游戏中的金币!

现在让我们开始处理余额表。

```cpp
    ...
    balances_table balances(get_self(), get_self().value);
```

我们拿了 `balances_table` 我们之前定义的类型并实例化了一个新的 `balances_table` 对象。我们通过了 
`get_self()` 函数作为第一个参数（ `code` 参数），返回合约账户的名称。我们通过了 `get_self().value`
作为第二个参数（ `scope` 参数)，它返回 `uint64_t` 表示合约账户的名称。

>❔ **作用域**：作用域是一种将表格中的行分组在一起的方法。你可以把它想象成一个文件夹
>包含表中的所有行。在这种情况下，我们使用合约账户的名称作为范围，所以所有
>中的行 `balances` 表格将在合约账户的名称下分组。如果你愿意
>想了解更多关于瞄准镜的信息，请查看 [智能合约入门指南](/docs/03_smart-contracts/04_state-data.md)。

接下来，我们需要检查是否 `to` 账户已经有余额。我们可以使用以下方法来做到这一点 `find` 上的函数
`balances` 桌子。

```cpp
    ...
    auto to_balance = balances.find(to.value);
```

那个 `find` 函数返回指向表中与主键匹配的行的迭代器。如果 `to` 账户确实如此
没有余额，那么 `find` 函数将返回指向表末尾的迭代器。请记住，主键
因为这张桌子是 `uint64_t`，所以我们需要使用 `to.value` 要获得 `uint64_t` 的代表 `to` 账户。

如果已经有余额，那么我们需要将新代币添加到现有余额中。我们可以使用以下方法来做到这一点
`modify` 上的函数 `balances` 桌子。我们会检查一下是否 `to_balance` 迭代器不等于的结尾
表，如果不是，我们将修改该行。

```cpp
    ...
    if(to_balance != balances.end()){
        balances.modify(to_balance, get_self(), [&](auto& row){
            row.balance += quantity;
        });
    }
```

那个 `modify` 函数需要三个参数：
-**迭代器**：指向要修改的行的迭代器
-**payer**：为存储修改后的行支付内存费用的账户
-**lambda**：一个 lambda 函数，它提供对要修改的行的引用

lambda 函数是您实际修改行的地方。在这种情况下，我们将新代币添加到现有代币中
平衡。

如果还没有余额，那么我们需要创建一个新的余额 `to` 账户。我们可以通过使用来做到这一点
这 `emplace` 上的函数 `balances` 桌子。

```cpp
    ...
    else{
        balances.emplace(get_self(), [&](auto& row){
            row.owner = to;
            row.balance = quantity;
        });
    }
```

那个 `emplace` 函数有两个参数：
-**付款人**：为存储新行支付内存费用的账户
-**lambda**：一个提供对新行的引用的 lambda 函数

lambda 函数是您实际初始化新行的地方。在本例中，我们正在设置 `owner` 到 `to`
账户，以及 `balance` 到 `quantity`。

最后，我们需要更新代币的总供应量。我们可以通过获取 `supply` 桌子。

```cpp
    ...
    supply_table supply(get_self(), get_self().value);
    auto current_supply = supply.get_or_default(asset(0, TOKEN_SYMBOL));
``` 

我们拿了 `supply_table` 我们之前定义并实例化了一个新的 `supply_table` 对象。和以前一样，我们通过了
在 `get_self()` 第一个和第二个参数的函数（分别为： `code`，以及 `scope`）。 

接下来，我们使用了 `get_or_default` 在单例上使用函数来获取代币的当前供应量，或者创建一个新的代币 
如果这是本合约中发行的第一批代币。那个 `get_or_default` 函数需要一个参数， 
如果还不存在任何值，则为要创建的值。在我们的例子中，该默认值是一个新值 `asset` 那我们 
初始化时值为 `0` 还有 `TOKEN_SYMBOL` 我们之前定义的常量。这看起来像 `0.0000 GOLD`。

现在我们有了当前的供应量，我们可以将新的代币添加到当前供应量中，并将价值保存到区块链中。
既然两个 `current_supply` 和 `quantity` 属于类型 `asset`，我们可以使用 `+` 运算符将它们相加。

>✔ **自动溢出保护**
> >那个 `asset` 类会自动处理溢出/下溢。如果有溢出
>它会抛出一个错误并自动中止交易。你不必做任何事情 
>使用时的特殊检查 `asset`。但是，如果使用，则需要这样做 `uint64_t` 或任何其他基本类型。 

```cpp
    ...
    auto new_supply = current_supply + quantity;
    supply.set(new_supply, get_self());
```

我们使用了 `set` 在单例上使用函数，将新的供应保存到区块链。 

那个 `set` 函数有两个参数：
-**value**：要保存到区块链的新价值
-**付款人**：为存储新值支付内存费用的账户

### Burn

那个 `burn` 动作非常类似于 `issue` 行动。唯一的区别是我们从中减去代币
这 `owner` 账户和供应量，而不是增加它们。

让我们像以前一样从检查开始，然后进入逻辑。

```cpp
    ACTION burn(name owner, asset quantity){
        check(has_auth(owner), "only the owner of these tokens can burn them");
        check(quantity.is_valid(), "invalid quantity");
        check(quantity.amount > 0, "must burn a positive quantity");
        check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");
    }
```

我们正在做与在... 相同的检查 `issue` 操作，除了 `is_account` 检查一下，因为我们已经是 
测试看看是否 `owner` 有平衡的 `balances` 桌子。

```cpp
    ...
    balances_table balances(get_self(), get_self().value);
    auto owner_balance = balances.find(owner.value);
    check(owner_balance != balances.end(), "account does not have any GOLD");
```

现在让我们来看看是否 `owner` 账户有足够的代币可以烧掉。

```cpp
    ...
    check(owner_balance->balance.amount >= quantity.amount, "owner doesn't have enough GOLD to burn");
```

让我们计算一个新的余额 `owner` 账户。

```cpp
    ...
    auto new_balance = owner_balance->balance - quantity;
```

我们不需要检查是否 `new_balance` 低于零，因为我们已经检查过是否 `owner` 账户有足够的代币
烧掉。

让我们从中减去代币 `owner` 账户。如果 `new_balance` 为零，那么我们就可以抹掉了
一行来自 `balances` 要保存的表 **RAM **。

```cpp
    ...
    if(new_balance.amount == 0){
        balances.erase(owner_balance);
    }
```

如果 `new_balance` 不为零，那么我们需要修改中的行 `balances` 桌子。

```cpp
    ...
    else {
        balances.modify(owner_balance, get_self(), [&](auto& row){
           row.balance -= quantity;
        });
    }
```

我们还需要从总供应量中移除代币。

```cpp
    ...
    supply_table supply(get_self(), get_self().value);
    supply.set(supply.get() - quantity, get_self());
```

瞧，现在我们可以烧掉虚拟金币了。

### 转账

那个 `transfer` 动作要比动作复杂一点 `issue` 和 `burn` 行动。我们需要从中转移代币
一个账户转到另一个账户，并确保 `from` 账户有足够的代币可以转移。

最重要的是，我们希望做到这一点，以便其他合约可以与我们的代币进行交互，这样他们就可以 
在它之上建造东西。 

再说一遍，让我们从检查开始，然后进入逻辑。

```cpp
    ACTION transfer(name from, name to, asset quantity, string memo){
        check(has_auth(from), "only the owner of these tokens can transfer them");
        check(is_account(to), "to account does not exist");
        check(quantity.is_valid(), "invalid quantity");
        check(quantity.amount > 0, "must transfer a positive quantity");
        check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");
    }
```

我们所做的检查与以前基本相同，但这次我们要确保 `from` 账户（发件人）就是那个 
那就是授权转移，我们正在确保 `to` 账户已存在。

接下来，我们需要获得 `balances` 表并检查是否 `from` 账户有余额。

```cpp
    ...
    balances_table balances(get_self(), get_self().value);
    auto from_balance = balances.find(from.value);
    check(from_balance != balances.end(), "account does not have any GOLD");
```

让我们来看看是否 `from` 账户有足够的代币可以转移。

```cpp
    ...
    check(from_balance->balance.amount >= quantity.amount, "owner doesn't have enough GOLD to transfer");
```

我们需要检查一下是否 `to` 账户有余额在 `balances` 桌子。

```cpp
    ...
    auto to_balance = balances.find(to.value);
```

如果 `to` 账户没有余额，那么我们需要在里面新建一行 `balances` 桌子。

```cpp
    ...
    if(to_balance == balances.end()){
        balances.emplace(get_self(), [&](auto& row){
            row.owner = to;
            row.balance = quantity;
        });
    }
```

如果 `to` 账户_确实_有余额，那么我们需要修改该行 `balances` 桌子。

```cpp
    ...
    else {
        balances.modify(to_balance, get_self(), [&](auto& row){
            row.balance += quantity;
        });
    }
```

现在我们需要检查一下是否 `from` 账户的余额等于 `quantity` 我们正在转移。如果
确实如此，然后我们可以从中删除该行 `balances` 表，然后再次保存**RAM**。

```cpp
    ...
    if(from_balance->balance.amount == quantity.amount){
        balances.erase(from_balance);
    }
```

如果 `from` 账户的余额大于 `quantity` 我们正在转移，那我们需要
修改中的行 `balances` 桌子。

```cpp
    ...
    else {
        balances.modify(from_balance, get_self(), [&](auto& row){
            row.balance -= quantity;
        });
    }
```

最后，我们需要发出一个其他合约可以监听的事件。我们将发出两个事件，其中一个事件有 `from` 
账户作为收件人，另一个账户拥有 `to` 账户为收件人。这允许任何一方倾听
如果他们向该账户部署了合同，就去活动然后用它做点什么。

```cpp
    ...
    require_recipient(from);
    require_recipient(to);
```


## 完整合同

如果您想复制完整的合同，并将其与您的合同进行匹配，可以在下面找到。

<details>
 <summary>点击这里查看完整代码</summary>

```cpp
#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/singleton.hpp>
using namespace eosio;

CONTRACT token : public contract {
   public:
      using contract::contract;

   const symbol TOKEN_SYMBOL = symbol(symbol_code("GOLD"), 4);

   TABLE balance {
      name     owner;
      asset    balance;

      uint64_t primary_key()const { 
         return owner.value; 
      }
   };

   using balances_table = multi_index<"balances"_n, balance>;

   using supply_table = singleton<"supply"_n, asset>;




   ACTION issue(name to, asset quantity){
      check(has_auth(get_self()), "only contract owner can issue new GOLD");
      check(is_account(to), "the account you are trying to issue GOLD to does not exist");
      check(quantity.is_valid(), "invalid quantity");
      check(quantity.amount > 0, "must issue a positive quantity");
      check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");

      balances_table balances(get_self(), get_self().value);

      auto to_balance = balances.find(to.value);

      if(to_balance != balances.end()){
            balances.modify(to_balance, get_self(), [&](auto& row){
               row.balance += quantity;
            });
      }
      else{
            balances.emplace(get_self(), [&](auto& row){
               row.owner = to;
               row.balance = quantity;
            });
      }

      supply_table supply(get_self(), get_self().value);

      auto current_supply = supply.get_or_default(asset(0, TOKEN_SYMBOL));

      supply.set(current_supply + quantity, get_self());
   }

   ACTION burn(name owner, asset quantity){
      check(has_auth(owner), "only the owner of these tokens can burn them");
      check(quantity.is_valid(), "invalid quantity");
      check(quantity.amount > 0, "must burn a positive quantity");
      check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");

      balances_table balances(get_self(), get_self().value);
      auto owner_balance = balances.find(owner.value);
      check(owner_balance != balances.end(), "account does not have any GOLD");
      check(owner_balance->balance.amount >= quantity.amount, "owner doesn't have enough GOLD to burn");

      auto new_balance = owner_balance->balance - quantity;
      check(new_balance.amount >= 0, "quantity exceeds available supply");

      if(new_balance.amount == 0){
         balances.erase(owner_balance);
      }
      else {
         balances.modify(owner_balance, get_self(), [&](auto& row){
               row.balance -= quantity;
         });
      }

      supply_table supply(get_self(), get_self().value);
      supply.set(supply.get() - quantity, get_self());
   }

   ACTION transfer(name from, name to, asset quantity, std::string memo){
      check(has_auth(from), "only the owner of these tokens can transfer them");
      check(is_account(to), "to account does not exist");
      check(quantity.is_valid(), "invalid quantity");
      check(quantity.amount > 0, "must transfer a positive quantity");
      check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");

      balances_table balances(get_self(), get_self().value);
      auto from_balance = balances.find(from.value);
      check(from_balance != balances.end(), "from account does not have any GOLD");
      check(from_balance->balance.amount >= quantity.amount, "from account doesn't have enough GOLD to transfer");

      auto to_balance = balances.find(to.value);
      if(to_balance == balances.end()){
         balances.emplace(get_self(), [&](auto& row){
               row.owner = to;
               row.balance = quantity;
         });
      }
      else {
         balances.modify(to_balance, get_self(), [&](auto& row){
               row.balance += quantity;
         });
      }

      if(from_balance->balance.amount == quantity.amount){
         balances.erase(from_balance);
      }
      else {
         balances.modify(from_balance, get_self(), [&](auto& row){
               row.balance -= quantity;
         });
      }

      require_recipient(from);
      require_recipient(to);
   }
};
```
</details>


## Grab 经过战斗测试的源代码

如果你只想使用 EOS Network 上大多数可替代代币中使用的源代码，你可以前往
[esio.token](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/4702c8f2d95dd06f0924688560b8457962522216/contracts/eosio.token)
存储库来获取它。这场代码战不仅经过了测试，而且还为底层的EOS代币提供了动力。

请注意，标准 `eosio.token` 合约与本教程有很大不同。它更复杂
合约，它允许使用更高级的功能，例如允许用户与合约进行交互以购买自己的内存， 
或者在单个合约中创建多个代币。 

你需要 `create` 用它换一个新代币，然后 `issue` 这些代币在转账之前将其存入账户。 
你还需要 `open` 账户余额，然后才能将代币转移到该账户。


## 挑战

这个代币没有 `MAXIMUM_SUPPLY`。你怎么能在合约中添加一个常量来定义最大供应量
令牌并确保 `issue` 动作没有超过这个最大供应量？
