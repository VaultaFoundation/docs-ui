---
title: 行动
---

动作是可以在智能合约上调用的函数。它是某些功能的入口点
你想向外界揭露的东西。

任何账户都可以调用操作，甚至其他智能合约。

## 定义一个动作

定义动作有两种方法，一种比较详细，但允许你指定动作的返回类型，
另一个是总会回来的速记 `void`。

### 简单动作

当不需要指定操作的返回类型时，可以使用 `ACTION` 关键字哪个 
是的简写 `[[eosio::action]] void`.

```cpp
ACTION youraction(){
    // Your logic here
}
```

### 指定返回类型

如果要指定操作的返回类型，则必须使用 `[[eosio::action]]` 属性后面是
返回类型。

```cpp
[[eosio::action]] uint64_t youraction(){
    // Your logic here
    return 1337;
}
```

> ⚠ **返回值和可组合性**
>
> 返回值只能在区块链外部使用，目前无法使用
> 在 EOS 中实现智能合约的可组合性。 


## 内联操作

内联操作是从合约中调用另一个合约的操作的一种方式。 
当你想在其他合约之上构建功能时，这很有用。

下面让我们用两个简单的合约来演示这一点。

```cpp title="sender.cpp"
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT sender : public contract {
public:
    using contract::contract;

    ACTION sendinline(name user) {
        action(
            permission_level{get_self(), name("active")},
            name("contract2"),
            name("receiver"),
            std::make_tuple(user)
        ).send();
    }
};
```

> ❔ **您的合约账户**
> 
> 那个 `get_self()` 函数返回部署合约的账户名称。它很有用
> 在部署之前你不知道这个合约将部署到哪里，或者合约是否可能部署到哪里
> 使用多个账户。

```cpp title="receiver.cpp"
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT receiver : public contract {
public:
    using contract::contract;

    ACTION received(name user) {
        print("I was called by ", user);
    }
};
```

| 合约 | 账户部署到 |
|-----------------------------------------|
| `sender`   | `contract1`         |
| `receiver` | `contract2`         |

如果你已经部署了这两份合同，你可以致电 `contract1::sendinline` action，然后它会调用
`contract2::receiver` 行动。

它还会传递参数 `user` 到 `contract2::receiver` 行动。 

### 内联操作发送器的接口

那个 `action` 构造函数需要四个参数：

```cpp
action(
    <permission_level>, 
    <contract>, 
    <action>, 
    <data>
).send();
```

- `permission_level` -调用操作时使用的权限级别
- `contract (name type)` -动作部署到的账户
- `action (name type)` -将被调用的操作的名称
- `data` -将以元组形式传递给操作的数据

> ❔ **名称功能**
> 
> 那个 `name()` 函数用于转换 a `string` 变成一个 `name` 键入。这在你想通过时很有用
> 以字符串形式表示的账户或操作名称，但您正在调用的函数需要 `name` 键入。

### 创建权限级别

那个 `permission_level` 参数用于指定调用操作时使用的权限级别。
这要么是部署操作的合同，要么是账户的权限 
合约已部署到 has。

那个 `permission_level` 构造函数有两个参数：

```cpp
permission_level(
    <account (name type)>, 
    <permission (name type)>
)
```

> ⚠ **合约是新发件人**
>
> 当您调用内联操作时，调用该操作的合约将成为新的发送者。
> 出于安全原因，原始授权不会传递给新合同，这意味着
> 新合约可以代表原始发件人采取行动（比如发送代币）。

### 创建元组

那个 `data` 参数用于指定您正在调用的操作的参数。

元组只是将多个参数组合在一起的一种方法。你可以使用创建元组 `std::make_tuple` 函数。

```cpp
std::make_tuple(<arg1>, <arg2>, <arg3>, ...);
```

### 代码权限

有一种特殊的账户权限叫做 `eosio.code` 这允许合约调用内联操作。
如果没有此许可，您的合同将无法对其他合同提起诉讼。

此权限位于 `active` 权限级别，这样其他合约就使用了 `require_auth`
函数将能够验证您的合约是否有权调用该操作。

要添加代码权限，您需要更新账户的活动权限才能由以下人员控制
`<YOURACCOUNT>@eosio.code` **以及您当前的有效权限**。

> ⚠ **不要失去访问权限！**
>
> 那个 `eosio.code` 权限旨在**添加**到您现有的活动权限中，而不是替换它。
> 如果您移除当前处于活动状态的权限控制器（账户或密钥），则您将失去对权限的访问权限 
> 您的账户/合同。

账户上带有代码权限的权限结构示例 `yourcontract` 会看起来像：
```text
owner 
  • YOUR_PUBLIC_KEY
↳ active -> 
  • YOUR_PUBLIC_KEY
  • yourcontract@eosio.code
```

