---
title: 普罗米修斯整合
---

## 概述

EOS 支持 prometheus 插件，该插件允许 Prometheus (https://prometheus.io/) 跟踪和收集各种内部 nodeos 指标的数据。

支持的指标有：

| 指标类型 | 指标描述 |
--------------------------------------
| `Gauge` | 客户数量 |
| `Gauge` | 同行人数 |
| `Gauge` | 掉落的方块数量 |
| `Gauge` | 未应用的事务队列大小（事务数量）|
| `Counter` | 列入黑名单的交易数量（总计）|
| `Counter` | 已生产方块 |
| `Counter` | 产生的交易 |
| `Gauge` | 最后一次不可逆转 |
| `Gauge` | 当前头块数 |
| `Gauge` | 账户的主观账单号码 |
| `Gauge` | 主观计费区块数 |
| `Gauge` | 定期交易 |
| `Gauge` | 每个 api 端点的 api 调用次数 |

您可以通过以下方式启用该插件： `--plugin eosio::prometheus_plugin`。
启用后，该插件会添加 http 端点：/v1/prometheus/metrics，它返回 prometheus 格式的文本字符串。
