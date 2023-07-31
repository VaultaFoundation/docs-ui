---
title: chain_plugin
dont_translate_title: true
---

## 概述

那个 `chain_plugin` 是处理和整合 EOS 节点上链数据所必需的必备插件。它实现了由提供的核心功能 [链式 API 插件](../chain_api_plugin/index.md)。

## 用法

```console
# config.ini
plugin = eosio::chain_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [operations] [options]
```

## 操作

这些只能从中指定 `nodeos` 命令行：

### 的命令行选项 `chain_plugin`

选项（=默认）| 描述
-|-
`--genesis-json arg` | 要从中读取创世纪状态的文件
`--genesis-timestamp arg` | 覆盖 Genesis State 文件中的初始时间戳
`--print-genesis-json` | 以 JSON 的形式从 blocks.log 中提取 genesis_state，打印到控制台，然后退出
`--extract-genesis-json arg` | 以 JSON 形式从 blocks.log 中提取 genesis_state，写入指定文件，然后退出
`--print-build-info` | 以 JSON 形式将构建环境信息打印到控制台并退出
`--extract-build-info arg` | 以 JSON 格式提取构建环境信息，写入指定文件并退出
`--force-all-checks` | 在重玩方块时不要跳过任何验证检查（对于重播来自不可信来源的方块很有用）
`--disable-replay-opts` | 禁用专门针对重播的优化
`--replay-blockchain` | 清除链状态数据库并重播所有区块
`--hard-replay-blockchain` | 清除链状态数据库，从区块日志中恢复尽可能多的方块，然后重播这些区块
`--delete-all-blocks` | 清除链状态数据库和区块日志
`--truncate-at-block arg (=0)` | 在此区块号处停止硬重播/区块日志恢复（如果设置为非零数字）
`--terminate-at-block arg (=0)` | 在达到此区块号后终止（如果设置为非零数字）
`--snapshot arg` | 要从中读取快照状态的文件

## 选项

这些可以从以下任一处指定 `nodeos` 命令行或 `config.ini` 文件:

### 的配置选项 `chain_plugin`

选项（=默认）| 描述
-|-
`--blocks-dir arg (="blocks")` | blocks 目录的位置（绝对路径或相对于应用程序数据目录的路径）
`--blocks-log-stride arg` | 当头块编号是步幅的倍数时拆分区块日志文件当达到步幅时，当前区块日志和索引将被重命名为 '^blocks-retained-dir^/blocks-^start num^-end num^.log/index'，并将使用最新的区块创建新的当前区块日志和索引。遵循此格式的所有文件都将用于构造扩展块日志。
`--max-retained-block-files arg` | 要保留的最大块文件数，以便可以查询这些文件中的块。达到该数字后，最旧的块文件将被移至存档目录，如果存档目录为空，则将其删除。用户不应操纵保留的区块日志文件。
`--blocks-retained-dir arg` | 块保留目录的位置（绝对路径或相对于块目录的路径）。如果该值为空，则将其设置为 blocks dir 的值。
`--blocks-archive-dir arg` | 区块存档目录的位置（绝对路径或相对于块目录的路径）。如果该值为空，则超出保留限制的区块文件将被删除。存档目录中的所有文件完全由用户控制，也就是说，nodeos 将不再访问它们。
`--state-dir arg (="state")` | 状态目录的位置（绝对路径或相对于应用程序数据目录的路径）
`--protocol-features-dir arg (="protocol_features")` | protocol_features 目录的位置（绝对路径或相对于应用程序配置目录的路径）
`--checkpoint arg` | 成对的 [BLOCK_NUM, BLOCK_ID] 应作为检查点强制执行。
`--wasm-runtime runtime (=eos-vm-jit)` | 覆盖默认的 WASM 运行时（“eos-vm-jit”，“eos-vm”）“eos-vm-jit”：在执行之前将 WebAssembly 代码编译为原生 x86 代码的 WebAssembly 运行时。“eos-vm”：WebAssembly 解释器。
`--profile-account arg` | 将对其代码进行分析的账户的名称
`--abi-serializer-max-time-ms arg (=15)` | 覆盖默认允许的最大 ABI 序列化时间（以毫秒为单位）
`--chain-state-db-size-mb arg (=1024)` | 链状态数据库的最大大小（以 MiB 为单位）
`--chain-state-db-guard-size-mb arg (=128)` | 当链状态数据库中剩余的可用空间降至此大小（以 MiB 为单位）以下时，安全地关闭节点。
`--signature-cpu-billable-pct arg (=50)` | 实际签名恢复 CPU 占账单的百分比。整数百分比，例如 50 表示 50%
`--chain-threads arg (=2)` | 控制器线程池中的工作线程数
`--contracts-console` | 将合约的输出打印到控制台
`--deep-mind` | 打印有关连锁经营的更深层次信息
`--actor-whitelist arg` | 账户已添加到演员白名单（可以多次指定）
`--actor-blacklist arg` | 账户已添加到演员黑名单（可以多次指定）
`--contract-whitelist arg` | 合约账户已添加到合约白名单（可以多次指定）
`--contract-blacklist arg` | 合约账户已添加到合约黑名单（可以多次指定）
`--action-blacklist arg` | Action（格式为 code:: action）已添加到操作黑名单（可以多次指定）
`--key-blacklist arg` | 已将公钥添加到权限中不应包含的密钥黑名单（可以多次指定）
`--sender-bypass-whiteblacklist arg` | 此列表中的账户发送的延期交易未应用任何主观白名单/黑名单检查（可以多次指定）
`--read-mode arg (=head)` | 数据库读取模式（“头部”、“不可逆转”、“推测性”）。在 “head” 模式下：数据库包含直到头部区块的状态变化；节点收到的交易如果有效，则会被中继。在 “不可逆转” 模式下：数据库包含直到最后一个不可逆区块的状态变化；通过 P2P 网络接收的交易不会中继，也无法通过链 API 推送交易。在 “投机” 模式下：（已弃用：推荐使用头部模式）数据库包含区块链中直到头部区块的交易状态变化，以及一些尚未包含在区块链中的交易；节点收到的交易如果有效，则会被中继。
`--api-accept-transactions arg (=1)` | 允许对 API 交易进行评估和中继（如果有效）。
`--validation-mode arg (=full)` | 链验证模式（“完整” 或 “轻型”）。在 “完整” 模式下，所有传入的区块都将得到完全验证。在 “轻型” 模式下，所有传入的区块头都将经过全面验证；这些经过验证的区块中的交易将受到信任
`--disable-ram-billing-notify-checks` | 如果合约在通知处理程序的上下文中向另一个账户收取更多 RAM（即当接收者不是操作代码时），则禁用该支票，该检查主观上会使交易失败。
`--maximum-variable-signature-length arg (=16384)` | 主观上将可变长度签名中可变组件的最大长度限制为这个大小（以字节为单位）
`--trusted-producer arg` | 表示由其签名的区块头将得到完全验证的生产者，但这些经过验证的区块中的交易将受到信任。
`--database-map-mode arg (=mapped)` | 数据库映射模式（“映射”、“堆” 或 “锁定”）。在 “映射” 模式下，数据库是将内存映射为文件。在 “堆” 模式下，数据库预加载到可交换内存中，如果可用，将使用大页面。在 “锁定” 模式下，数据库是预加载的，锁定在内存中，如果可用，将使用大页面。
`--eos-vm-oc-cache-size-mb arg (=1024)` | EOS VM OC 代码缓存的最大大小（以 MiB 为单位）
`--eos-vm-oc-compile-threads arg (=1)` | 用于 EOS VM OC 分层的线程数
`--eos-vm-oc-enable` | 启用 EOS VM OC 分层运行时
`--enable-account-queries arg (=0)` | 启用查询功能，通过各种元数据查找账户。
`--max-nonprivileged-inline-action-size arg (=4096)` | 非特权账户内联操作的最大允许大小（以字节为单位）
`--transaction-retry-max-storage-size-gb arg` | 允许为 “事务重试” 功能分配的最大大小（以 GiB 为单位）。设置为 0 以上可启用此功能。
`--transaction-retry-interval-sec arg (=20)` | 如果在区块中看不到传入的交易，将传入的交易重新发送到网络的频率（以秒为单位）。
`--transaction-retry-max-expiration-sec arg (=120)` | 重试交易允许的最大交易到期时间，将重试不超过此值的交易。
`--transaction-finality-status-max-storage-size-gb arg` | 允许为 “交易终结状态” 功能分配的最大大小（以 GiB 为单位）。设置为 0 以上可启用此功能。
`--transaction-finality-status-success-duration-sec arg (=180)` | 持续时间（以秒为单位）成功交易的 Finality 状态将从首次识别后一直可用。
`--transaction-finality-status-failure-duration-sec arg (=180)` | 持续时间（以秒为单位）失败交易的 Finality 状态将从首次被识别后一直可用。
`--integrity-hash-on-start` | 启动时记录状态完整性哈希
`--integrity-hash-on-stop` | 关闭时记录状态完整性哈希
`--block-log-retain-blocks arg` | 如果设置为大于 0，则定期修剪区块日志，仅存储已配置的最近区块数量。如果设置为 0，则不会将任何块写入块日志；启动后会删除块日志文件。

## 依赖关系

无
