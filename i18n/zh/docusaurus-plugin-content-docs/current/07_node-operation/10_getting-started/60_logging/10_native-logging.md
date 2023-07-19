---
title: 原生日志记录
---

的日志机制 `nodeos` 是通过控制的 `logging.json` 文件也称为日志配置文件。日志配置文件可用于定义 [附加器](#appenders) 然后把它们绑起来 [伐木工人们](#loggers) 和 [日志级别](#logging-levels)。

## 配置 logging.json 文件

这条路在哪里 `logging.json` 是存储的，可以使用 `-l` 要么 `--logconf` 启动时的选项 `nodeos`。默认情况下 `logging.json` 文件位于指定的 `--config-dir`，与目录相同 `config.ini` 文件。

## 附加器

EOS 日志库支持两个 `appender` 类型:

- [GELF](#gelf) （Graylog 扩展日志格式）
- [控制台](#console)

### GELF

这个 `appender` 将日志消息发送到 [`Graylog`] (https://github.com/Graylog2/graylog2-server) 这是一个用于收集、索引和分析日志消息的完全集成的平台。支持的配置选项有：

- `name` -用于标识在记录器中使用的实例的任意名称
- `type` -“gelf”
- `endpoint` -IP 地址和端口号
- `host` -Graylog 主机名，用于识别您的身份 [Graylog](https://github.com/Graylog2/graylog2-server).
- `enabled` -用于启用/禁用附加程序的 bool 值。

示例：

```json
{
    "name": "net",
    "type": "gelf",
    "args": {
        "endpoint": "104.198.210.18:12202”,
        "host": <YOURNAMEHERE IN QUOTES>
    },
    "enabled": true
}
```

### 控制台

这个 `appender` 会将日志消息输出到屏幕。支持的配置选项有：

- `name` -用于标识在记录器中使用的实例的任意名称
- `type` -“控制台”
- `stream` -“std_out” 或 “std_err”
- `level_colors` -将日志关卡映射到一种颜色，请参阅以下两个项目作为其子项目：
 - `level` -可能是其中之一（“调试”、“信息”、“警告”、“错误”、“全部”、“关闭”）
 - `color` -可能是其中之一（“红色”、“绿色”、“棕色”、“蓝色”、“洋红色”、“青色”、“白色”、“console_default”）
- `enabled` -用于启用/禁用附加程序的 bool 值

示例：

```json
{
    "name": "consoleout",
    "type": "console",
    "args": {
    "stream": "std_out",

    "level_colors": [{
        "level": "debug",
        "color": "green"
        },{
        "level": "warn",
        "color": "brown"
        },{
        "level": "error",
        "color": "red"
        }
    ]
    },
    "enabled": true
}
```

## 记录器

EOS 日志库支持以下记录器：

- `default` -默认记录器，始终处于启用状态。
- `producer_plugin` -制作者插件的详细日志记录。
- `http_plugin` -http 插件的详细日志记录。
- `trace_api` -trace_api 插件的详细日志记录。
- `transaction_success_tracing` -从 P2P 网络上的中继节点发出成功判决的详细日志。
- `transaction_failure_tracing` -从 P2P 网络上的中继节点发出失败判决的详细日志。
- `state_history` -状态历史插件的详细日志记录。
- `net_plugin_impl` -网络插件的详细日志记录。
- `blockvault_client_plugin` -blockvault 客户端插件的详细日志记录。

支持的配置选项有：

- `name` -必须与上述名称之一匹配。
- `level` -请参阅下面的日志级别。
- `enabled` -用于启用/禁用记录器的 bool 值。
- `additivity` -对或错
- `appenders` -按名称列出的附加器列表（附加器配置中的名称）

示例：

```json
{
    "name": "net_plugin_impl",
    "level": "debug",
    "enabled": true,
    "additivity": false,
    "appenders": [
        "net"
    ]
}
```

>ℹ️ 每个记录器都可以在中独立配置 `logging.json` 文件。所有记录器的默认日志记录级别（如果没有） `logging.json` 已提供，是 `info`。

## 日志级别

以下是支持的日志记录级别：

- `all`
- `debug`
- `info`
- `warn`
- `error`
- `off`  

样本 `logging.json`:

```json
{
  "includes": [],
  "appenders": [{
      "name": "stderr",
      "type": "console",
      "args": {
        "stream": "std_error",
        "level_colors": [{
            "level": "debug",
            "color": "green"
          },{
            "level": "warn",
            "color": "brown"
          },{
            "level": "error",
            "color": "red"
          }
        ],
        "flush": true
      },
      "enabled": true
    },{
      "name": "stdout",
      "type": "console",
      "args": {
        "stream": "std_out",
        "level_colors": [{
            "level": "debug",
            "color": "green"
          },{
            "level": "warn",
            "color": "brown"
          },{
            "level": "error",
            "color": "red"
          }
        ],
        "flush": true
      },
      "enabled": true
    },{
      "name": "net",
      "type": "gelf",
      "args": {
        "endpoint": "10.10.10.10:12201",
        "host": "host_name"
      },
      "enabled": true
    }
  ],
  "loggers": [{
      "name": "default",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "net_plugin_impl",
      "level": "info",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "http_plugin",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "producer_plugin",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "transaction_success_tracing",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "transaction_failure_tracing",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "state_history",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "trace_api",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "blockvault_client_plugin",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    }
  ]
}
```
