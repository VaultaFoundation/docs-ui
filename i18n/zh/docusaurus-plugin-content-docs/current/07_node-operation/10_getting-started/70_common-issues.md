---
title: 常见问题
---

## 1。数据库脏旗设置错误

那个 `Database dirty flag set (likely due to unclean shutdown): replay required` 不停止时会出现错误 `nodeos` 优雅地。如果你遇到这个错误，你唯一的办法就是开始重播 `nodeos` 和 `--replay-blockchain`。
停下来 `nodeos` 优雅地，发一个 `SIGTERM`, `SIGQUIT` 要么 `SIGINT` 然后等待进程关闭。

## 2。内存与数据不匹配错误

如果你遇到错误，比如 `St9exception: content of memory does not match data expected by executable` 什么时候 `nodeos` 启动，尝试重启 `nodeos` 使用以下选项之一（你可以使用 `nodeos --help` 以获取完整的选项列表）。

eosio 的命令行选项:: chain_plugin:

| 选项 | 描述 |
|------------------------------------------------------------
| `--force-all-checks`       | 在重玩不可逆方块时不要跳过任何可以跳过的检查 |
| `--replay-blockchain`      | 清除链状态数据库并重播所有区块 |
| `--hard-replay-blockchain` | 清除链状态数据库，从区块日志中恢复尽可能多的方块，然后重播这些方块 |
| `--delete-all-blocks`      | 清除链状态数据库和区块日志 |

## 3。无法增长数据库错误

为了解决 `Could not grow database file to requested size` 错误，启动 `nodeos` 和 `--shared-memory-size-mb 1024` 选项。一个 1 GB 的共享内存文件允许大约 50 万笔交易。

## 4. 3070000：WASM 异常错误

如果你遇到错误，比如 `Publishing contract... Error 3070000: WASM Exception Error Details: env.set_proposed_producers_ex unresolveable` 当你尝试部署时 `eosio.bios` 合同或 `eosio.system` 合约要尝试启动 EOS 区块链（本地或测试网），你必须激活 `PREACTIVATE_FEATURE` 协议优先。
