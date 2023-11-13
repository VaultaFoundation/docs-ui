---
title: 通用升级指南
---

本指南将引导您完成升级节点所需的步骤。
请记住，这是一份通用指南，某些版本可能需要额外的步骤
有待采纳。如果某个版本有特定的升级指南，则应改为遵循该指南（尽管可能如此） 
有关一般步骤，请参阅本指南）。

## 规划升级

-**请勿**在生产节点上测试升级，请先使用测试节点
-支持的操作系统有：
 -**Ubuntu 20.04 Focal**
 -**Ubuntu 22.04 Jammy**
-**请勿**使用已过时的插件
-**启用所有**新必需的插件
-**备份你的节点


## 升级你的节点

按顺序执行以下步骤。如果您有任何疑问，请在 [电报群](https://t.me/AntelopeIO)。

### 1。下载/生成二进制文件

如果您想从源代码构建和安装，可以按照中的说明进行操作 [自述文件](https://github.com/AntelopeIO/leap#build-and-install-from-source)。

如果你想使用二进制文件，可以从中下载它们 [发布页面](https://github.com/AntelopeIO/leap/releases)。

### 2。拍张快照

在安装新的二进制文件或停止节点之前，你应该制作快照。 
这将允许你在出现问题时快速恢复，并使用它来重播节点。

要制作快照，请在生产者节点上运行以下命令**：

```bash
curl -X POST http://127.0.0.1:8888/v1/producer/create_snapshot
```

等到 curl 返回 `JSON` 包含新创建的快照文件的文件名的响应。

您也可以从可信来源获取快照，例如 [EOS Nation](https://snapshots.eosnation.io/)，但是让
确保你有正确的网络快照和快照版本。


### 3。停止你的节点

现在您已经创建了快照，可以停止节点了。

### 4。移除旧文件

移除 `data/state/shared_memory.bin` 文件。

> ❔ **我的在哪里 `data` 目录？**
>
> 那个 `data` 目录将是传递给的路径 `nodeos --data-dir` 争论，或 `$HOME/local/share/eosio/nodeos/data/state` 默认情况下

<details>
  <summary>如果你需要历史记录 (ShiP)</summary>

**警告**：重播可能需要数周时间。

你可能还需要删除 `data/blocks` 目录
如果您要升级的版本具有不同的块日志格式。
如果块日志不兼容，则需要从网络同步或下载
来自可信来源的兼容封禁日志。

每份单独的升级指南都会告诉你区块日志的格式是否为
不兼容。

此外，你还需要删除 `SHiP`。
如果你的封禁日志与你要升级的版本兼容，
你可以简单地从该封禁日志中在本地重播，而不必从网络上同步。

以下是一些加快重播速度的技巧：
-提高 `-–sync-fetch-span` 重播时（为了稳定起见，重播后恢复为默认值！）
-使用具有完整值的对等体 `blocks.log` 只有
-保留你的 `p2p-peer-address` 列表很短，只列出最近的节点
-您可以从位于同一数据中心的单个对等体快速同步，即使它不在同一版本上
 -你可以在同一台机器上做同样的事情，但你需要新的 `/blocks` 和 `/state` 目录 + 更多 NVMe 空间
-你可以复制 `blocks.log` 来自另一台机器（如果兼容）

#### 具有 blocks.log 文件扩展到创世的对等节点列表：
```bash
EOS:
eos.seed.eosnation.io:9876
peer1.eosphere.io:9876
peer2.eosphere.io:9876
p2p.genereos.io:9876

EOS Jungle4 Testnet:
peer1-jungle4.eosphere.io:9876
jungle4.seed.eosnation.io:9876
jungle4.genereos.io:9876
jungle.p2p.eosusa.io:9883
```

</details>

### 5。删除旧的配置选项和插件并添加任何新的配置选项和插件

每个版本都可能有过时的、生命周期结束的插件或新的插件。
通过这些更改，您可能需要删除旧的配置选项和插件，或者添加新的插件
通常包括新的配置选项。

如果您要升级的版本有这些更改，则可以在发行说明中找到这些更改，或者
在左侧列表（或移动设备上的汉堡菜单）中特定于该版本的指南中。

### 6。更新您的二进制文件

首先，删除你的旧二进制文件：

```bash
sudo apt-get remove -y leap
# or 
sudo dpkg --remove <old-pkg-name>
```

然后，安装新的二进制文件：

```bash 
sudo apt-get install -y ./leap[-_][0-9]*.deb
# or
sudo dpkg -i <filename>.deb
```

### 7。启动你的节点

使用您在步骤 2 中创建/下载的快照启动节点。

要了解如何启动快照以及有关快照的更多信息，请阅读 [快照指南](../10_getting-started/50_snapshots.md).





