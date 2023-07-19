---
title: 链接操作模式
---

有时，你需要确保与你的合约互动的用户使用了另一个合同
在他们使用你的之前，先签订合同。例如，你可能需要确保他们有
代币在使用您的合约之前已将代币转移到您的合约账户。

当与代币有关时，这通常被称为 “存款模式”，但存入代币
这不是你唯一一次可能想使用这种模式，因此被称为 “Linked-Actions Pattern”。

以存款模式为例，让我们来看看这笔交易可能是什么样子：
```- Transaction
    1. eosio.token::transfer (Token Transfer) 
        -[inline] mycontract::on_transfer (Notifiable Action Receiver) 
    2. mycontract::record (Regular Action)
```

上表显示了事务中操作的执行顺序。

交易中只有代币转账和 “记录” 操作，但有
也是由您的代币转移触发的事件接收器函数
合约将在代币转移和记录操作之间进行捕获和放置。

这种模式解决的常见问题是，你要确保
在您允许记录操作发生之前，已进行令牌转移。 

让我们来看看一些不带模式的代码：


#### 代币转移操作
```cpp
ACTION transfer(name from, name to, asset quantity, string memo){
    // ...
    require_recipient( from );
    require_recipient( to );
    // ...
}
```

#### 事件接收器和记录动作
```cpp
#include <eosio/asset.hpp>

[[eosio::on_notify("eosio.token::transfer")]]
void on_transfer(name from, name to, asset quantity, string memo){
    // ...
}

ACTION record(name from, uint64_t internal_id, uint8_t status){
    // ...
}
```

你可以在上面看到，我们想添加一些关于用户转移资金的额外信息
在我们的合约中，但我们无法在代币转移操作中这样做，因为我们所拥有的只是 
这 `memo` 字段，这是一个字符串。

>⚠ **性能注意事项**
> >你可能已经猜到你可以做一些字符串操作和转换来获取数据
>你需要进入 `memo` 字段，但不建议这样做。那个 `memo` 字段不仅限于 256
>大多数代币合约中的字符，但是智能合约中的字符串操作是其中之一 
>你能做的最昂贵的操作。

取而代之的是，我们可以使用 linked-actions 模式来确保代币转移已经发生
在我们允许之前 `record` 要采取行动，我们也可以传递我们需要的其他信息
到 `record` 行动。

让我们更新一下 `on_transfer` 事件接收器和 `record` 在它们之间建立联系的操作
使用链接操作模式。


首先，我们要添加一个 `multi_index` 表格到我们的合同中，用于存储我们需要传递的信息
在两个动作之间。

```cpp
TABLE transfer_info {
    name from;
    asset quantity;
    
    uint64_t primary_key() const { return from.value; }
};

using _transfers = multi_index<"transfers"_n, transfer_info>;

[[eosio::on_notify("eosio.token::transfer")]]
void on_transfer(name from, name to, asset quantity, string memo){
    _transfers transfers( get_self(), get_self().value );
    transfers.emplace( get_self(), [&]( auto& row ) {
        row.from = from;
        row.quantity = quantity;
    });
}
```

>⚠ **警告**
>>你应该有更多的支票 `on_transfer` 比我们在这个例子中看到的要多。本指南不是
>关于安全性，所以为了清楚起见，我们省略了这些检查，但你不应该部署令牌事件接收器
>在生产中是这样的。

然后，在我们的 `record` action 我们可以检查转账是否存在，如果有，我们可以
将其从表中删除以释放 RAM 并执行我们的逻辑。

如果没有，我们可以简单地出错然后告诉用户他们需要转移代币
在他们使用合同之前先签订合同。


```cpp

ACTION record(name from, uint64_t internal_id, uint8_t status){
    // ...
    _transfers transfers( get_self(), get_self().value );
    auto transfer = transfers.find( from.value );
    check( transfer != transfers.end(), "Must transfer tokens to contract before using it" );
    transfers.erase( transfer );
    
    // Do your logic here
}
```

## RAM 滥用问题

上面的模式效果很好，但确实有问题。如果用户将代币转移到您的合约中
但从来没有打电话给 `record` 操作，用于存储传输信息的 RAM 永远不会
被释放。

由于您的合同是支付RAM的合约，这意味着账户可以发送少量代币
根据您的合同，消耗您的RAM并使您的合同过于昂贵。

我们可以通过添加一个来解决这个问题 `check` 到 `on_transfer` 事件接收器，以确保数量
在我们存储转账信息之前，已经超过了某个阈值。

```cpp
[[eosio::on_notify("eosio.token::transfer")]]
void on_transfer(name from, name to, asset quantity, string memo){
    check(quantity.amount > 100, "Must transfer more than 100 tokens");
    
    ...    
}
```

或者，我们可以消耗这些成本，然后定期清理表以释放 RAM
这已经不用了。

```cpp
ACTION cleanup(){
    _transfers transfers( get_self(), get_self().value );
    auto transfer = transfers.begin();
    
    uint8_t count = 0;
    while( transfer != transfers.end() && count < 100 ) {
        transfer = transfers.erase( transfer );
        count++;
    }
}
```

请注意，您必须定期自己调用此操作以降低内存使用率，
但是，对于与货币价值无关的关联行动模式，这是一个不错的选择
降低内存使用率的方法。

## 挑战

你怎么能修改上面的代码来捕获 NFT 转账并关联操作，这样
只有所有者和正确的 NFT 才能触发 `record` 行动？


