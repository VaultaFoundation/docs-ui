---
title: 授权
---

授权是确定用户是否有权执行交易（通过操作）的过程。 
在区块链应用程序中，这是确保智能合约和数字资产安全的关键方面
它控制。

使用 EOS++ 检查授权可以通过几种方式完成。

## 获取发件人

获取交易发送者的最好方法是将其作为参数传递给操作。

```cpp
ACTION testauth(name user) {
    print("I was called by ", user);
}
```

这是获取交易发件人的最明确方法，也是推荐的方式。

## 需要身份验证

要检查账户是否已签署这笔交易并授予其权限，最简单的方法是使用 `require_auth` 函数。

```cpp
ACTION testauth(name user) {
    require_auth(user);
}
```

## 需要身份验证2

喜欢 `require_auth` 函数， `require_auth2` 函数将检查指定账户是否已签署交易。
但是，它还将检查指定的权限是否已签署交易。

```cpp
ACTION testauth(name user) {
    require_auth2(user, name("owner"));
}
```

这将检查指定的 `user` 账户已经签署了交易，这意味着调用的交易 
此操作已获授权 `user` 账户。

## 有身份验证

上面的 `require_auth` 函数将检查指定账户是否已签署交易并使交易失败
如果没有。但是，如果您想检查指定账户是否已签署交易，但交易未失败
如果没有，你可以使用 `has_auth` 函数。

```cpp
ACTION testauth() {
    name thisContract = get_self();
    if (has_auth(thisContract)) {
        // This contract has signed the transaction
    }
}
```

## 是账户

您可能还想检查一个帐户是否存在。这可以用以下方法完成 `is_account` 函数。

```cpp
ACTION testauth(name user) {
    if(!is_account(user)) {
        // The user account does not exist
    }
}
```
