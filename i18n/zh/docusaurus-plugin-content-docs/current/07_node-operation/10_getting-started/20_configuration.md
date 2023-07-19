---
title: 配置
---

## Config.ini

`config.ini` 是控制如何的配置文件 `nodeos` 实例将起作用。例如，在 `config.ini` 你可以指定：

* 您的节点将与哪些节点建立对等关系
* 您的节点将使用的实际插件
* 特定于插件的选项，用于自定义您的节点

因此， `config.ini` 文件对节点的操作有直接影响。大多数节点操作员都会编辑和自定义此文件，为其节点分配特定的角色。

>ℹ️ `nodeos` 可以使用命令行接口 (CLI) 选项进行配置， `config.ini` 文件，或两者兼而有之。另一方面，特定于 NodeOS 的选项只能通过命令行指定。查看所有可用的 CLI 选项以及 `config.ini` 选项，从终端启动 “nodeos--help”。

### CLI 选项与 `config.ini`

所有选项都来自 `config.ini` 也可以将文件指定为 CLI 选项。例如， `plugin = arg` 选项在 `config.ini` 也可以通过 `--plugin arg` 命令行界面选项。但是，情况并非总是恰恰相反：并非每个 CLI 选项都有等效的条目 `config.ini` 文件。例如，执行即时操作的特定于插件的选项，比如 `--delete-state-history` 来自 `state_history_plugin`，无法在中指定 `config.ini` 文件。

>ℹ️ 大多数节点运营商更喜欢 `config.ini` 选项而不是 CLI 选项。这是因为 `config.ini` 将保留配置状态，这与启动时指定的 CLI 选项不同 `nodeos`。

### 自定义 `config.ini`

使用自定义 `config.ini` 文件，通过传递来指定其文件名 `--config arg` 启动时的选项 `nodeos`。自定义文件名是相对于的实际路径的 `config.ini` 文件在中指定 `--config-dir arg` 选项。

### 示例 `config.ini`

<details>
<summary>以下是提供常用值的简单示例：</summary>

```# Specify the Access-Control-Allow-Origin to be returned on each request (eosio::http_plugin)
access-control-allow-origin = *

# The name supplied to identify this node amongst the peers. (eosio::net_plugin)
agent-name = "EOS Test Agent"

# Enable block production, even if the chain is stale. (eosio::producer_plugin)
enable-stale-production = true

# ID of producer controlled by this node (e.g. inita; may specify multiple times) (eosio::producer_plugin)
producer-name = eosio

# Key=Value pairs in the form <public-key>=<provider-spec>
# Where:
#    <public-key>    	is a string form of a vaild EOSIO public key
# 
#    <provider-spec> 	is a string in the form <provider-type>:<data>
# 
#    <provider-type> 	is KEY, KEOSD, or SE
# 
#    KEY:<data>      	is a string form of a valid EOSIO private key which maps to the provided public key
# 
#    KEOSD:<data>    	is the URL where keosd is available and the approptiate wallet(s) are unlocked
# 
#  (eosio::producer_plugin)
signature-provider = EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV=KEY:5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

# Use to indicate that the RPC responses will not use ABIs.
# Failure to specify this option when there are no trace-rpc-abi configuations will result in an Error.
# This option is mutually exclusive with trace-rpc-api (eosio::trace_api_plugin)
trace-no-abis = true

# Plugin(s) to enable, may be specified multiple times
plugin = eosio::producer_plugin
plugin = eosio::producer_api_plugin
plugin = eosio::chain_plugin
plugin = eosio::chain_api_plugin
plugin = eosio::http_plugin
plugin = eosio::state_history_plugin
plugin = eosio::net_plugin
plugin = eosio::net_api_plugin
plugin = eosio::trace_api_plugin
```

</details>

## 插件

本节介绍影响节点行为的最常见插件选项。这些选项始终是特定于插件的。对于配置为作为生产节点、中继节点、API 节点等运行的节点，情况确实如此。

>ℹ️ 以下插件在以下情况下默认处于启用状态 `nodeos` 已启动： `chain_plugin`, `net_plugin`, `producer_plugin`, `resource_monitor_plugin`。因此，没有必要再次加载它们 

### `plugin` 选项

插件对于扩展和修改节点的功能至关重要。你用 `plugin` 在运行中启用给定插件的选项 `nodeos` 实例。

选项类型 | 配置方法 | 语法 | 示例
-|-|-|-
特定于节点的 | CLI 选项 | `--plugin arg` | `--plugin eosio::chain_plugin`
`nodeos` | `config.ini` | `plugin = arg` | `plugin = eosio::chain_plugin`

> ℹ️ `nodeos` 插件不是动态加载的。它们在以下情况下启用 `nodeos` 已启动，无法卸载或重新装弹 `nodeos` 实例正在运行。插件已融入 `nodeos` 二进制。

### `enable-stale-production` 选项

你用 `enable-stale-production` 启用区块生产的选项，即使链已过时。否则，如果链条暂停很长时间，区块生产就会失败。

选项类型 | 配置方法 | 语法 | 示例
-|-|-|-
插件专用 | CLI 选项 | `-e` 要么 `--enable-stale-production`
`producer_plugin` | `config.ini` | `enable-stale-production = true`

### `signature-provider` 选项

你用 `signature-provider` 允许您的节点签署区块和交易的选项。必须将签名提供者指定为密钥对。

选项类型 | 配置方法 | 语法 | 示例
-|-|-|-
插件专用 | CLI 选项 | `-e` 要么 `--enable-stale-production`
`producer_plugin` | `config.ini` | `enable-stale-production = true`

### `trace-no-abis` 选项

你用 `trace-no-abis` 选项，指示 RPC 响应将不使用 ABI。此选项必须在以下情况下指定 `trace-rpc-abi` 选项不用于指定 ABI。

选项类型 | 配置方法 | 语法 | 示例
-|-|-|-
插件专用 | CLI 选项 | `--trace-no-abis`
`trace_api_plugin` | `config.ini` | `trace-no-abis =`

### `access-control-allow-origin` 选项

与 Web 的跨源资源共享 (CORS) 类似， `access-control-allow-origin` 选项允许您控制来自其他来源（域、方案或端口）的访问。对于开发实例，你很可能会发现允许所有带有星号的来源很有用 `*`，但随后将其更改为特定的生产来源。

选项类型 | 配置方法 | 语法 | 示例
-|-|-|-
插件专用 | CLI 选项 | `--access-control-allow-origin arg`
`http_plugin` | `config.ini` | `access-control-allow-origin = arg`

## 核心

跨源资源共享 (CORS) 是一种协议，它使浏览器客户端上的脚本能够与来自不同来源的资源进行交互。这是必要的，因为 JavaScript 通常受到同源策略的限制，该策略限制了它向位于与脚本所在位置不同的来源的 URL 发出请求的能力。例如，如果 JavaScript 应用程序想要对托管在其他域上的 API 进行 AJAX 调用，则由于同源策略，该应用程序将被阻止。

>ℹ️ CORS 对于 Web 去中心化应用程序 (dApps) 很重要，因为没有它，来自远程主机的 RPC API 调用来表示 API 节点可能会被阻止。

### 为什么需要 CORS？

在大多数情况下，在用户浏览器中运行的脚本只需要访问同源中的资源（例如对提供 JavaScript 代码的后端进行 API 调用）。因此，阻止 JavaScript 访问其他源上的资源的限制有利于安全性。

在这种情况下，“其他来源” 是指与 JavaScript 运行位置不同的网址，但方案（HTTP 或 HTTPS）、域名或端口各不相同。

但是，在某些情况下，跨源访问是需要的，甚至是必不可少的。例如，React 单页应用程序 (SPA) 可能需要与托管在不同域上的 API 后端进行通信。例如，CORS 对于网络字体的正常运行也至关重要。

### 识别 CORS 响应

当服务器正确配置为允许跨源资源共享时，响应中会包含特定的标头。这些标头表示对 CORS 的支持，Web 浏览器使用这些标头来确定是否 `XMLHttpRequest` 呼叫应该继续或失败。

可以设置多个标头，但决定资源可访问性的主要标头是 `Access-Control-Allow-Origin`。此标头指定了允许访问资源的来源。例如，要允许从任何来源进行访问，可以将标头设置为：

```Access-Control-Allow-Origin: *
```

或者，也可以将其限制在特定的来源：

```Access-Control-Allow-Origin: https://sample.io
```

>ℹ️ 在区块链应用程序作为 Web dApp 运行的背景下， `nodeos` 提供了 `access-control-allow-origin` 用于控制来自其他来源的访问权限的选项。例如，EOS API 节点可以使用此选项授予对选定远程主机的访问权限。

## 摘要

那个 `config.ini` 文件负责配置 nodeos 实例的功能。它允许用户指定其节点将与其节点建立连接的节点，定义要使用的插件，并通过特定于插件的选项自定义节点的行为。因此，config.ini 文件在决定节点的运行方式方面起着重要作用，节点操作员经常编辑和个性化此文件，为其节点分配特定的角色。
