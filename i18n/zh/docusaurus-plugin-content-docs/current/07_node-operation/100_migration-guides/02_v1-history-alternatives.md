---
title: “V1 历史备选方案”
sidebar_position: 1
---

最新的 EOS v3.1 版本正式终止了对旧版 V1 历史插件的支持。因此，拥有依赖于 V1 History 的集成的区块生产者和节点运营商必须寻求替代解决方案。

## 量产就绪的替代方案

以下经过实战考验且符合 V1 标准的历史记录解决方案可用：
-Hyperion 历史解决方案
-罗博罗夫斯基历史 API

# 罗博罗夫斯基历史 API

## 概述

罗博罗夫斯基历史API被设计为V1历史API的直接替代品。它依靠 Trace API 插件来提取历史数据，然后将其打包为 V1 格式，然后再将其返回给客户端请求。

## 谁在管理罗博罗夫斯基历史 API

Roborovski History API 由以下人员实现和运行 [Greymass Inc.](https://greymass.com/)

## 是什么让 Roborovski 历史记录 API 是安全的

Roborovski History API 具有高度的安全性，因为它是由 [Greymass Inc.](https://greymass.com/) 该公司一直是EOS、WAX、TELOS、PROTON、FIO和其他基于EOS的链的可靠而稳定的区块生产商和钱包开发商（Anchor）公司。

## 了解与托管解决方案相关的风险

如果您依赖托管解决方案，则会依赖您无法控制的数据和流程的正确性。因此，如果您的应用程序严重依赖链上数据，则强烈建议您托管自己的历史记录解决方案。但是，由于Roborovsky目前是封闭源代码，因此如果您想运行自己的节点，则需要在下面看到Hyperion。

## 罗博罗夫斯基历史 API 和 V1 历史标准

罗博罗夫斯基历史 API 符合 V1 历史记录 API 标准。它还在标准功能的基础上增加了两个函数。

现有的V1历史插件集成商只需将其当前的API网址替换为Greymass的网址即可，它将完美运行。

## API 参考文档

### 如何连接

罗博罗夫斯基历史 API 连接端点是 `https://eos.greymass.com`

### 函数列表

-获取操作（兼容 V1）
 -帖子 `https://eos.greymass.com/v1/history/get_actions`
-获取交易（兼容 V1）
 -帖子 `https://eos.greymass.com/v1/history/get_transaction`
-获取交易（新方法，不在 V1 中）
 -得到 `https://eos.greymass.com/v1/history/get_transaction?id=<TXID>`
-获取操作（新方法，不在 V1 中）
 -得到 `https://eos.greymass.com/v1/history/get_actions?account_name=<NAME>`

### 性能数字

根据迄今为止的观察和测量，Roborovski History API 每秒至少支持 50 个请求；此限制被定义为低负载，该解决方案能够处理更多请求，但目前尚不清楚更高的具体限制。



# Hyperion 历史解决方案

## 概述

Hyperion History 是一款完整的历史解决方案，用于索引、存储和检索基于 EOS 的区块链历史数据。它可以由节点运营商部署，为存储在区块链上的操作、交易和区块提供数据查询支持。

Hyperion 历史 API 提供 V2 和 V1（传统历史插件）端点。因此，它完全符合 V1 历史记录。

## 是什么让 Hyperion 安全

Hyperion 由 EOS Rio 开发和维护：https://eosrio.io/hyperion/ 并已在所有羚羊公共网络（EOS、WAX、TELOS、PROTON、FIO 等）上进行了战斗测试。

* Github：https://github.com/eosrio/Hyperion-History-API
* 文档：https://hyperion.docs.eosrio.io/

## 安装

前往 [Hyperion 文档](https://hyperion.docs.eosrio.io/) 获取安装说明。


# Memento 历史记录解决方案

[Memento](https://github.com/Antelope-Memento/antelope_memento) 是由开发的区块链历史解决方案 [cc32d9](https://github.com/cc32d9) 和 [EOS 阿姆斯特丹区块制作人](https://eosamsterdam.net/)。

它包括 [编年史](https://github.com/EOSChronicleProject/eos-chronicle) 以及将交易跟踪存储在 MySQL 或 Postgres 数据库中的数据库编写器。可以将 Chronicle 配置为仅导出与特定账户相关的交易，这样历史数据库就不会占用太多空间。

两种类型的 [HTTP 应用程序](https://github.com/Antelope-Memento/antelope_memento_api) 可用：Restful API（与 v1 或 Hyperion 不兼容）和 GraphQL API。

A [公开演示](https://github.com/Antelope-Memento/antelope_memento/blob/main/MEMENTO_PUBLIC_ACCESS.md) 多个公共区块链有 48 小时的历史记录。
