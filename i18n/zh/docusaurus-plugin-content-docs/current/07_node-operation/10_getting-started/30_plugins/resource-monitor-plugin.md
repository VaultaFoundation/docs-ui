---
title: resource_monitor_plugin
dont_translate_title: true
---

## 概述

那个 `resource_monitor_plugin` 负责监控计算系统中存储空间的使用情况 `nodeos` 处于活动状态。具体而言，每隔一段时间 `resource-monitor-interval-seconds`，它计算连接到的每个文件系统所占用的空间量 `data-dir`, `state-dir`, `blocks-log-dir`, `snapshots-dir`, `state-history-dir`，以及 `trace-dir`。如果任何受监控文件系统的空间使用量在 `5%` 的阈值由以下指定 `resource-monitor-space-threshold`，将显示一条警告消息，指明文件系统路径和已用空间百分比。如果空间使用量超过此阈值，则行为取决于是否 `resource-monitor-not-shutdown-on-threshold-exceeded` 是否已启用。如果它被禁用， `nodeos` 将优雅地关闭；如果已启用， `nodeos` 将定期发出警告，直到空间使用率降至阈值以下。

那个 `resource_monitor_plugin` 在相应时自动加载 `nodeos` 实例启动。

## 用法

```console
# config.ini
plugin = eosio::resource_monitor_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::resource_monitor_plugin [options]
```

## 配置选项

这些可以从以下任一处指定 `nodeos` 命令行或 `config.ini` 文件:

### 的配置选项 `resource_monitor_plugin`

选项（=默认）| 描述
-|-
`--resource-monitor-interval-seconds arg (=2)` | 连续两次检查资源使用情况之间的时间（以秒为单位）。应该介于 1 到 300 之间
`--resource-monitor-space-threshold arg (=90)` | 用已用空间与总空间的百分比表示的阈值。如果已用空间高于（阈值-5%），则会生成警告。除非启用 resource-mon-on-shutdown-on-threshold 超出阈值，否则如果已用空间超过阈值，则会启动正常关闭。该值应介于 6 和 99 之间
`--resource-monitor-space-absolute-gb arg` | 以千兆字节为单位的剩余空间的绝对阈值；应用于每个受监视的目录。如果剩余空间小于任何受监视目录的值，则认为已超过阈值。覆盖资源监视器空间阈值。
`--resource-monitor-not-shutdown-on-threshold-exceeded` | 用于表示 nodeos 在超过阈值时不会关闭。
`--resource-monitor-warning-interval arg (=30)` | 达到阈值时连续两次警告之间的资源监视间隔数。应该介于 1 到 450 之间

## 插件依赖关系

* 无
