---
title: “创建和关联自定义权限”
---

## 简介

在EOS区块链上，您可以为账户创建各种自定义权限。稍后可以将自定义权限链接到合约的操作。该权限系统使智能合约能够拥有灵活的授权方案。

本教程说明了自定义权限的创建，以及如何将该权限关联到操作。完成这些步骤后，除非提供了新链接的权限的授权，否则将禁止执行合同的操作。这使您可以更精细地控制账户及其各种操作。

权力越大，责任越大。此功能对您的合同及其用户的安全性构成了一些挑战。在使用概念和步骤之前，请确保您了解这些概念和步骤。

[[信息 |家长权限]]
| 创建自定义权限时，该权限将始终在父权限下创建。

如果您拥有创建自定义权限所依据的父权限的权限，则可以随时执行需要该自定义权限的操作。

## 第 1 步。创建自定义权限

首先，让我们在上创建一个新的权限级别 `alice` 账户:

```shell
dune -- cleos set account permission alice upsert YOUR_PUBLIC_KEY owner -p alice@owner
```

需要注意的几点：

1.创建了一个名为 **upsert** 的新权限
2.**upsert** 权限使用开发公钥作为权威证明
3.此权限创建于 `alice` 帐户

您还可以为此权限指定公钥以外的权限，例如，一组其他账户。 

## 第 2 步。将授权链接到您的自定义权限

关联授权以调用 `upsert` 使用新创建的权限执行操作：

```shell
dune -- cleos set action permission alice addressbook upsert upsert
```

在此示例中，我们将授权链接到 `upsert` 之前在通讯簿合同中创建的操作。

## 第 3 步。测试一下

让我们试着用一个来调用这个动作 `active` 许可：

```shell
dune -- cleos push action addressbook upsert '["alice", "alice", "liddel", 21, "Herengracht", "land", "dam"]' -p alice@active
```

你应该会看到如下错误：

```text
Error 3090005: Irrelevant authority included
Please remove the unnecessary authority from your action!
Error Details:
action declares irrelevant authority '{"actor":"alice","permission":"active"}'; minimum authority is {"actor":"alice","permission":"upsert"}
```

现在，试试**upsert**权限，这次是明确声明我们刚刚创建的**upsert**权限：（例如 `-p alice@upsert`)

```text
dune -- cleos push action addressbook upsert '["alice", "alice", "liddel", 21, "Herengracht", "land", "dam"]' -p alice@upsert
```

现在它起作用了：

```text
dune -- cleos push action addressbook upsert '["alice", "alice", "liddel", 21, "Herengracht", "land", "dam"] -p alice@upsert
executed transaction:

2fe21b1a86ca2a1a72b48cee6bebce9a2c83d30b6c48b16352c70999e4c20983  144 bytes  9489 us
#   addressbook <= addressbook::upsert          {"user":"alice","first_name":"alice","last_name":"liddel","age":21,"street":"Herengracht","city":"land",...
#   addressbook <= addressbook::notify          {"user":"alice","msg":"alice successfully modified record to addressbook"}
#         eosio <= addressbook::notify          {"user":"alice","msg":"alice successfully modified record to addressbook"}
#     abcounter <= abcounter::count             {"user":"alice","type":"modify"}
```
