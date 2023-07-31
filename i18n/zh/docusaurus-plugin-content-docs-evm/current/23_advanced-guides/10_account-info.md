---
title: 列出代币和历史记录
---

有时，您需要获取一个账户的代币余额和交易历史列表。这是一个常见的用例 
适用于各种区块链应用程序。 

我们用 [`blockscout`](https://docs.blockscout.com/) 作为我们的资源管理器，它有各种 API 可用于
获取有关区块链的各种信息。

## 我们的托管服务器

您可以将我们的托管服务器用于这些 API 中的任何一个。 

```
MAINNET:
https://explorer.evm.eosnetwork.com/

TESTNET:
https://explorer.testnet.evm.eosnetwork.com/
```

## 获取代币余额

要获取一个账户的代币余额列表，我们可以使用账户模块 API `tokenlist` 端点。


```
/api?module=account&action=tokenlist&address={address}
```

如果您想了解有关此端点的更多信息，可以阅读 [Blockscou](https://docs.blockscout.com/for-users/api/rpc-endpoints/account#get-list-of-tokens-owned-by-address)。

## 获取交易记录

要获取账户的交易清单，我们可以使用账户模块 API `txlist` 端点。

```
/api?module=account&action=txlist&address={address}&startblock=555555&endblock=666666&page=1&offset=5&sort=asc
```

如果您想了解有关此端点的更多信息，可以阅读 [Blockscou](https://docs.blockscout.com/for-users/api/rpc-endpoints/account#get-transactions-by-address).
