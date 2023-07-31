---
title: net_plugin
dont_translate_title: true
---

## 概述

那个 `net_plugin` 提供经过身份验证的点对点 (p2p) 协议，用于节点的持续同步。它还实现了由提供的核心功能 [Net API 插件](./net-api-plugin.md)。

## 用法

```console
# config.ini
plugin = eosio::net_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::net_plugin [options]
```

## 选项

这些可以从命令行指定，也可以通过命令行指定 `config.ini` 文件:

### 的配置选项 `net_plugin`

选项（=默认）| 描述
-|-
`--p2p-listen-endpoint arg (=0.0.0.0:9876)` | 用于监听传入的 p2p 连接的实际主机:port。
`--p2p-server-address arg` | 用于识别此节点的外部可访问的主机:port。默认为 p2p-listen-endpoint。
`--p2p-peer-address arg` | 要连接的对等节点的公共终端节点。根据需要使用多个 p2p 对等地址选项来组成网络。语法：host: port [: ^trx^\ |^blk^] 可选的 “trx” 和 “blk” 向节点表示只应发送交易 “trx” 或区块 “blk”。示例：p2p.eos.io: 9876 p2p.trx.eos.io: 9876: trx p2p.blk.eos.io: 9876: blk
`--p2p-max-nodes-per-host arg (=1)` | 来自任何单个 IP 地址的最大客户端节点数
`--p2p-accept-transactions arg (=1)` | 允许对通过 p2p 网络接收的交易进行评估和中继（如果有效）。
`--p2p-auto-bp-peer arg` | 区块生产者节点的账户和公共 p2p 端点，当区块生产者节点处于生产者计划附近时，该节点将自动连接到该节点。语法：账户，主机：port 示例，eosproducer1，p2p.eos.io: 9876 eosproducer2，p2p.trx.eos.io: 9876: t rx eosproducer3，p2p.blk.eos.io: 9876: b lk
`--agent-name arg (=EOS Test Agent)` | 为在对等节点中识别此节点而提供的名称。
`--allowed-connection arg (=any)` | 可以是 “任何”、“制作人”、“指定” 或 “无”。如果为 “指定”，则必须至少指定一次对等密钥。如果只有 “生产者”，则不需要对等密钥。“生产者” 和 “指定” 可以合并。
`--peer-key arg` | 允许连接的对等方的可选公钥。可以多次使用。
`--peer-private-key arg` | [PublicKey，WIF 私钥] 的元组（可以多次指定）
`--max-clients arg (=25)` | 接受连接的最大客户端数量，使用 0 表示无限制
`--connection-cleanup-period arg (=30)` | 在清理无效连接之前等待的秒数
`--max-cleanup-time-msec arg (=10)` | 每次清理调用的最大连接清理时间（以毫秒为单位）
`--p2p-dedup-cache-expire-time-sec arg (=10)` | 跟踪交易以进行重复优化的最长时间
`--net-threads arg (=4)` | net_plugin 线程池中的工作线程数
`--sync-fetch-span arg (=100)` | 同步期间要从任何单个对等方块中检索的块数
`--use-socket-read-watermark arg (=0)` | 启用实验性套接字读取水印优化
`--peer-log-format arg (=["${_name}" - ${_cid} ${_ip}:${_port}] )` | 记录有关对等方的消息时用于格式化的字符串。变量用 $ {^变量名^} 进行转义。可用变量：_name 自我报告的名称 _cid 分配的连接 ID _id 自我报告的 ID（64 个十六进制字符）_sid _peer.id 的前 8 个字符 _peer.ip 对等方的远程 IP 地址 _port 远程端口号 _lip 连接到对等体的本地 IP 地址 _lport 本地端口号
`--p2p-keepalive-interval-ms arg (=10000)` | 对等体心跳保持活动消息间隔（以毫秒为单位）

## 依赖关系

无
