---
title: http_plugin
dont_translate_title: true
---

## 概述

那个 `http_plugin` 对于启用由以下任一提供的 RPC API 功能至关重要 `nodeos` 要么 `keosd` 实例。两者都 `nodeos` 和 `keosd` 支持 `http_plugin` 作为核心插件。

## 用法

```console
# config.ini
plugin = eosio::http_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::http_plugin [options]
 (or)
keosd ... --plugin eosio::http_plugin [options]
```

## 选项

这些可以从命令行指定，也可以通过命令行指定 `config.ini` 文件:

### 的配置选项 `http_plugin`

选项（=默认）| 描述
-|-
`--unix-socket-path arg` | 为 HTTP RPC 创建 unix 套接字的文件名（相对于 data-dir）；设置为空则禁用。
`--http-server-address arg (=127.0.0.1:8888)` | 用于监听传入的 http 连接的本地 IP 和端口；设置为空则禁用。
`--access-control-allow-origin arg` | 指定每次请求时要返回的 Access-Control-Allow-Origin
`--access-control-allow-headers arg` | 指定每次请求要返回的 Access-Control-Allow-Headers
`--access-control-max-age arg` | 指定每次请求要返回的 Access-Control-Max-Age。
`--access-control-allow-credentials` | 指定是否应在每次请求中返回 Access-Controll-Allow-Centrols: true。
`--max-body-size arg (=2097152)` | 允许传入 RPC 请求的最大正文大小（以字节为单位）
`--http-max-bytes-in-flight-mb arg (=500)` | http_plugin 在处理 http 请求时应使用的最大大小（以兆字节为单位）。-1 表示无限制。超过时会有 429 错误响应。
`--http-max-in-flight-requests arg (=-1)` | http_plugin 在处理 http 请求时应使用的最大请求数。超过时会有 429 个错误响应。
`--http-max-response-time-ms arg (=30)` | 处理请求的最长时间，-1 表示无限制
`--verbose-http-errors` | 将错误日志附加到 HTTP 响应中
`--http-validate-host arg (=1)` | 如果设置为 false，则任何传入的 “主机” 标头都被视为有效
`--http-alias arg` | 此外，可以多次指定传入 HTTP 请求的 “主机” 标头的可接受值。默认情况下包括 http/s_server_address。
`--http-threads arg (=2)` | http 线程池中的工作线程数
`--http-keep-alive arg (=1)` | 如果设置为 false，则即使客户端请求，也不要保持 HTTP 连接处于活动状态。

## 依赖关系

无
