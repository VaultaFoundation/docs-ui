---
title: 活动
---

事件是智能合约作为操作副作用相互通信的一种方式。

事件最常用的用法是跟踪 `eosio.token` (`EOS`) 转账，但它们可用于
合同之间的任何类型的通信。

我们将在下面使用这个确切的例子，但首先我们将介绍事件的基础知识。

## 事件的两面

当然，每个事件都有两个方面：发送方和接收方。

一方面，你有一个 `contract::action` 那就是发出一个事件，另一方面你有一份合约是
正在监听那个事件。

## 事件接收器

事件接收器不是动作，而是当另一个动作标记你的合约时会被调用的函数
作为收件人。 

```cpp
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT receiver : public contract {
public:
    using contract::contract;

    [[eosio::on_notify("*::transfer")]] 
    void watchtransfer(name from, name to, asset quantity, std::string memo) {
        // Your logic here
    }
};
```

那个 `on_notify` 属性以字符串作为参数。此字符串是一个过滤器，将用于确定
哪些操作将触发 `watchtransfer` 函数。过滤器的形式为 `contract::action`，在哪里 `contract`
是发送事件的合约的名称，并且 `action` 是该合同中操作的名称
触发了事件。

那个 `*` 字符是通配符，可以匹配任何合同或操作。所以在上面的例子中， `watchtransfer` 功能
每当任何合约发送 a 时都会被调用 `transfer` 动作到 `receiver` 合同。 
过滤器的合约和操作端都支持通配符，因此您可以使用它来匹配任何合约、任何操作或两者兼而有之。

示例：
- `*::*` -匹配任何合同和任何操作
- `yourcontract::*` -匹配任何动作 `yourcontract`
- `*::transfer` -匹配任何 `transfer` 对任何合同采取行动
- `yourcontract::transfer` -只匹配 `transfer` 动作开启 `yourcontract`

>❔ **谁可以发送活动？**
> >任何合约都可以发送事件，但只能发送中指定的合约 `on_notify` 属性
>将收到通知。但是，即使在以下情况下，每条通知都会给事务增加少量 CPU 使用率
>没有收件人正在收听该活动。


## 事件发件人

Event Senders 是向特殊协议中指定的任何合约发出事件的操作 
`require_recipient` 函数。

```cpp
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT token : public contract {
public:
    using contract::contract;

    ACTION transfer(name from, name to, asset quantity, std::string memo) {
        require_recipient(from);
        require_recipient(to);
    }
};
```

那个 `transfer` 上面的 action 会向两者发出一个事件 `from` 和 `to` 账户（实际上就是这样 `eosio.token` 合同工程）。
因此，如果你的合同是 `from` 要么 `to` 账户，然后你就可以收听了 `transfer` 事件。如果您的账户是**不是**
这两个账户中的任何一个，你都没办法听 `transfer` 来自区块链内部的事件。


>❔ **谁能收到活动？**
>>任何账户都可以接收事件，但只能接收中指定的账户 `require_recipient` 功能
>将收到通知。但是，如果接收事件的账户上没有部署智能合约， 
>则该事件将被忽略，因为它不可能有任何逻辑来处理该事件。

## 资源使用情况

活动是一种强大的工具，但强大的力量往往是有代价的。
事件的接收者有权占用事件原始发送者的 CPU 和 NET 资源。

这是因为事件的发送者是为接收者的 CPU 和 NET 资源付费的人，但通常 
他们无法控制甚至不知道接收器将使用多少 CPU 和 NET 资源。



