---
title: 观看转账
---

您可能需要注意EOS网络中发生的所有传输。这对于**交易所**很有用，而且 
需要跟踪资金流入/流出资金的**钱包**。

在EOS中，可以通过多种方式进行转移。最常见的方法是通过 `transfer` 对交易采取行动
直接传输，但也可以在非传输操作触发时以内联操作的形式进行传输。如果你只是
看着方块，那么你就会错过内联动作传输。这可能会影响用户的体验。

> ❔ **什么是内联动作？**
>
> 内联操作是指由其他操作触发的操作。例如，在退出去中心化交易时 
> 交易所，交易所将触发转账操作，将代币发送给用户。此传输操作是内联的
> 动作，就像它发生在 `exchange::withdraw` 行动。这是一次非根级别的动作。

尽管本教程以监视转会为中心，但你可以使用同样的方法来监视任何动作
发生在EOS网络上，来自任何合约。

## 下载代币 ABI

为了监视转账情况，您需要下载代币合约的 ABI。你可以编译 
自己签订合同，或者你可以直接下载 ABI。

### 使用 curl

你可以使用 `curl` 直接从 EOS 主网上获取 ABI。

```shell
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{ "account_name":"eosio.token" }' \
  https://eos.greymass.com/v1/chain/get_abi | jq -r '.abi' > ./eosio.token.abi
```

上面的命令将获取 ABI `eosio.token` 合约的 ABI 并将其保存到一个名为的文件中 `eosio.token.abi`。

### 从文档中复制 ABI

以下是 ABI `eosio.token` 合同。您可以将其直接复制到您的应用程序中。
这是直接从主网上提取的，但不能保证当你时它会是一样的
读这个。

<details>
    <summary>见 JSON ABI</summary>

```json
{
  "version": "eosio::abi/1.1",
  "types": [],
  "structs": [
    {
      "name": "account",
      "base": "",
      "fields": [
        {
          "name": "balance",
          "type": "asset"
        }
      ]
    },
    {
      "name": "close",
      "base": "",
      "fields": [
        {
          "name": "owner",
          "type": "name"
        },
        {
          "name": "symbol",
          "type": "symbol"
        }
      ]
    },
    {
      "name": "create",
      "base": "",
      "fields": [
        {
          "name": "issuer",
          "type": "name"
        },
        {
          "name": "maximum_supply",
          "type": "asset"
        }
      ]
    },
    {
      "name": "currency_stats",
      "base": "",
      "fields": [
        {
          "name": "supply",
          "type": "asset"
        },
        {
          "name": "max_supply",
          "type": "asset"
        },
        {
          "name": "issuer",
          "type": "name"
        }
      ]
    },
    {
      "name": "issue",
      "base": "",
      "fields": [
        {
          "name": "to",
          "type": "name"
        },
        {
          "name": "quantity",
          "type": "asset"
        },
        {
          "name": "memo",
          "type": "string"
        }
      ]
    },
    {
      "name": "open",
      "base": "",
      "fields": [
        {
          "name": "owner",
          "type": "name"
        },
        {
          "name": "symbol",
          "type": "symbol"
        },
        {
          "name": "ram_payer",
          "type": "name"
        }
      ]
    },
    {
      "name": "retire",
      "base": "",
      "fields": [
        {
          "name": "quantity",
          "type": "asset"
        },
        {
          "name": "memo",
          "type": "string"
        }
      ]
    },
    {
      "name": "transfer",
      "base": "",
      "fields": [
        {
          "name": "from",
          "type": "name"
        },
        {
          "name": "to",
          "type": "name"
        },
        {
          "name": "quantity",
          "type": "asset"
        },
        {
          "name": "memo",
          "type": "string"
        }
      ]
    }
  ],
  "actions": [
    {
      "name": "close",
      "type": "close",
      "ricardian_contract": "---\nspec_version: \"0.2.0\"\ntitle: Close Token Balance\nsummary: 'Close {{nowrap owner}}’s zero quantity balance'\nicon: https://raw.githubusercontent.com/cryptokylin/eosio.contracts/v1.7.0/contracts/icons/token.png#207ff68b0406eaa56618b08bda81d6a0954543f36adc328ab3065f31a5c5d654\n---\n\n{{owner}} agrees to close their zero quantity balance for the {{symbol_to_symbol_code symbol}} token.\n\nRAM will be refunded to the RAM payer of the {{symbol_to_symbol_code symbol}} token balance for {{owner}}."
    },
    {
      "name": "create",
      "type": "create",
      "ricardian_contract": "---\nspec_version: \"0.2.0\"\ntitle: Create New Token\nsummary: 'Create a new token'\nicon: https://raw.githubusercontent.com/cryptokylin/eosio.contracts/v1.7.0/contracts/icons/token.png#207ff68b0406eaa56618b08bda81d6a0954543f36adc328ab3065f31a5c5d654\n---\n\n{{$action.account}} agrees to create a new token with symbol {{asset_to_symbol_code maximum_supply}} to be managed by {{issuer}}.\n\nThis action will not result any any tokens being issued into circulation.\n\n{{issuer}} will be allowed to issue tokens into circulation, up to a maximum supply of {{maximum_supply}}.\n\nRAM will deducted from {{$action.account}}’s resources to create the necessary records."
    },
    {
      "name": "issue",
      "type": "issue",
      "ricardian_contract": "---\nspec_version: \"0.2.0\"\ntitle: Issue Tokens into Circulation\nsummary: 'Issue {{nowrap quantity}} into circulation and transfer into {{nowrap to}}’s account'\nicon: https://raw.githubusercontent.com/cryptokylin/eosio.contracts/v1.7.0/contracts/icons/token.png#207ff68b0406eaa56618b08bda81d6a0954543f36adc328ab3065f31a5c5d654\n---\n\nThe token manager agrees to issue {{quantity}} into circulation, and transfer it into {{to}}’s account.\n\n{{#if memo}}There is a memo attached to the transfer stating:\n{{memo}}\n{{/if}}\n\nIf {{to}} does not have a balance for {{asset_to_symbol_code quantity}}, or the token manager does not have a balance for {{asset_to_symbol_code quantity}}, the token manager will be designated as the RAM payer of the {{asset_to_symbol_code quantity}} token balance for {{to}}. As a result, RAM will be deducted from the token manager’s resources to create the necessary records.\n\nThis action does not allow the total quantity to exceed the max allowed supply of the token."
    },
    {
      "name": "open",
      "type": "open",
      "ricardian_contract": "---\nspec_version: \"0.2.0\"\ntitle: Open Token Balance\nsummary: 'Open a zero quantity balance for {{nowrap owner}}'\nicon: https://raw.githubusercontent.com/cryptokylin/eosio.contracts/v1.7.0/contracts/icons/token.png#207ff68b0406eaa56618b08bda81d6a0954543f36adc328ab3065f31a5c5d654\n---\n\n{{ram_payer}} agrees to establish a zero quantity balance for {{owner}} for the {{symbol_to_symbol_code symbol}} token.\n\nIf {{owner}} does not have a balance for {{symbol_to_symbol_code symbol}}, {{ram_payer}} will be designated as the RAM payer of the {{symbol_to_symbol_code symbol}} token balance for {{owner}}. As a result, RAM will be deducted from {{ram_payer}}’s resources to create the necessary records."
    },
    {
      "name": "retire",
      "type": "retire",
      "ricardian_contract": "---\nspec_version: \"0.2.0\"\ntitle: Remove Tokens from Circulation\nsummary: 'Remove {{nowrap quantity}} from circulation'\nicon: https://raw.githubusercontent.com/cryptokylin/eosio.contracts/v1.7.0/contracts/icons/token.png#207ff68b0406eaa56618b08bda81d6a0954543f36adc328ab3065f31a5c5d654\n---\n\nThe token manager agrees to remove {{quantity}} from circulation, taken from their own account.\n\n{{#if memo}} There is a memo attached to the action stating:\n{{memo}}\n{{/if}}"
    },
    {
      "name": "transfer",
      "type": "transfer",
      "ricardian_contract": "---\nspec_version: \"0.2.0\"\ntitle: Transfer Tokens\nsummary: 'Send {{nowrap quantity}} from {{nowrap from}} to {{nowrap to}}'\nicon: https://raw.githubusercontent.com/cryptokylin/eosio.contracts/v1.7.0/contracts/icons/transfer.png#5dfad0df72772ee1ccc155e670c1d124f5c5122f1d5027565df38b418042d1dd\n---\n\n{{from}} agrees to send {{quantity}} to {{to}}.\n\n{{#if memo}}There is a memo attached to the transfer stating:\n{{memo}}\n{{/if}}\n\nIf {{from}} is not already the RAM payer of their {{asset_to_symbol_code quantity}} token balance, {{from}} will be designated as such. As a result, RAM will be deducted from {{from}}’s resources to refund the original RAM payer.\n\nIf {{to}} does not have a balance for {{asset_to_symbol_code quantity}}, {{from}} will be designated as the RAM payer of the {{asset_to_symbol_code quantity}} token balance for {{to}}. As a result, RAM will be deducted from {{from}}’s resources to create the necessary records."
    }
  ],
  "tables": [
    {
      "name": "accounts",
      "index_type": "i64",
      "key_names": [],
      "key_types": [],
      "type": "account"
    },
    {
      "name": "stat",
      "index_type": "i64",
      "key_names": [],
      "key_types": [],
      "type": "currency_stats"
    }
  ],
  "ricardian_clauses": [],
  "error_messages": [],
  "abi_extensions": [],
  "variants": [],
  "action_results": []
}
```

</details>

### 自己编译合约

你可以克隆 [EOS 系统合约](https://github.com/eosnetworkfoundation/eos-system-contracts/) 存储库，
然后使用编译合约 `build.sh` 脚本。

然后你会有一个 `build/contracts` 包含已编译合约的目录。

## 更新您的配置文件

你需要更新你的 `config.ini` 文件包含以下选项：

```shell
# Plugins required for the Trace API
plugin = eosio::chain_plugin
plugin = eosio::http_plugin
plugin = eosio::trace_api_plugin

# Tell the Trace API where ABIs are for the contracts you care about 
trace-rpc-abi=eosio.token=<YOUR_PATH_to_eosio.token.abi>

# You may also manually specify a traces directory
trace-dir=/path/to/traces
```

## 你应该重播吗？

启用 Trace API 后，您只能获得启用插件后生成的区块的跟踪。 
如果您想获取在启用插件之前生成的区块的跟踪，则需要重播该链
从那个街区出发

> 🕔 **想重播 EOS EVM 发布会吗？**
> 
> 如果您的目标是获取在EOS EVM上发生的传输的跟踪，则可以使用在当天或之前拍摄的快照
> 2023-04-05T 02:18:09 世界标准时间这样你就可以获得在 EOS EVM 上发生的转移的痕迹，但不能 
> 浪费时间重播EOS EVM发布之前生成的方块。

## 固态硬盘注意事项

Trace API 的持久数据增长速度类似于 `blocks.log`。您将需要更多的 SSD 存储空间来存储
跟踪，使您能够拥有完整的交易历史记录。

您可以通过删除旧跟踪和压缩日志文件来优化磁盘使用情况。

把这些加到你的 `config.ini` 文件:
```shell
# Remove old traces
trace-minimum-irreversible-history-blocks=<number of blocks to keep>

# Compress log files
trace-minimum-uncompressed-history-blocks=<number of blocks to keep uncompressed>
```

## 使用 Trace API 监视方块

通常，你会使用 `/v1/chain/get_block` 对每个区块进行请求，然后迭代 `actions` 每个数组中的数组
交易在 `transactions` 用于扫描传输的阵列。

<details>
    <summary>参见 curl 命令获取链块</summary>

```shell
curl -X POST \
   -H "Content-Type: application/json" \
   -d '{ "block_num_or_id": 2 }' \
   http://127.0.0.1:8888/v1/chain/get_block | jq
```

</details>

启用 Trace API 后，您现在将使用 `/v1/trace_api/get_block` 取而代之的是，这会给你带来几乎相同的结果格式， 
唯一的不同是 `actions` 数组将不仅包含根操作，还包含已执行的内联操作。 
这描绘了交易执行期间发生的事情的完整画面，而不仅仅是发送到链上的根操作。

<details>
    <summary>参见 curl 命令以获取跟踪块</summary>

```shell
curl -X POST \
   -H "Content-Type: application/json" \
   -d '{ "block_num": 2 }' \
   http://127.0.0.1:8888/v1/trace_api/get_block | jq
```

</details>

关于 Trace API 还有其他一些重要事项需要注意 `get_block` 端点：
-一个动作的 `name` 属性现在被称为 `action`
-一个动作的 `data` 属性现在被称为 `params`
-那个 `block_num_or_id` POST 数据参数现在只是 `block_num`

> 📄 **API 参考**
>
> 有关 Trace API 的更多信息，请参阅 [API 参考](https://docs.eosnetwork.com/apis/leap/latest/trace_api.api)。


### 两种格式的示例

<details>
    <summary>见 chain/get_block</summary>

```json
{
  "timestamp": "2023-06-02T15:10:56.500",
  "producer": "eosio",
  "confirmed": 0,
  "previous": "000000140022c6320e45d8d390e686b6ce6148db4d602884be01776ad8d18c46",
  "transaction_mroot": "430716daff9428cf0327dd9fd08478295a4422bf303b13a74d88379a5e89ff5f",
  "action_mroot": "3ee0e97056c1c592ee755d9d26e178d810dba8c0af57410632fc0e7c4ac9f9a0",
  "schedule_version": 0,
  "new_producers": null,
  "producer_signature": "SIG_K1_KiSmFVmh498vHRj5rzWvFKo1zJDV2vUv5hfQVwpyj1GtYF1wSedAkJ2zihMWMjFWxqZmWVJZtW3wCFLBtAEDTSxjK7deQV",
  "transactions": [
    {
      "status": "executed",
      "cpu_usage_us": 192,
      "net_usage_words": 17,
      "trx": {
        "id": "1c073fe57292a253ea18cd7075c5420301038197806eeda51e94a33ce63be935",
        "signatures": [
          "SIG_K1_KVPDUxX5DbokbpYj9VgNZw3AZHu9HCLcH2CJbMhJuY2MfcufaLcaRz3KAwLJd12JkoR6r1EUN2XeTVjrDtorKFMiMwnd4f"
        ],
        "compression": "none",
        "packed_context_free_data": "",
        "context_free_data": [],
        "packed_trx": "9e067a641300ba187bdd00000000010000e82a01ea3055000000dcdcd4b2e3010000000000000e3d00000000a8ed3232270000000000000e3da08601000000000004454f5300000000a0d8340d75a524c50631323334353600",
        "transaction": {
          "expiration": "2023-06-02T15:11:26",
          "ref_block_num": 19,
          "ref_block_prefix": 3715831994,
          "max_net_usage_words": 0,
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": "eosio.dex",
              "name": "withdraw",
              "authorization": [
                {
                  "actor": "bob",
                  "permission": "active"
                }
              ],
              "data": {
                "account": "bob",
                "quantity": "10.0000 EOS",
                "to": "someexchange",
                "memo": "123456"
              },
              "hex_data": "0000000000000e3da08601000000000004454f5300000000a0d8340d75a524c506313233343536"
            }
          ]
        }
      }
    }
  ],
  "id": "000000157b7f9e05cf80f8861df6e6bda357230ed7c8a29409d5c5d823fc0a1f",
  "block_num": 21,
  "ref_block_prefix": 2264432847
}
```
</details>

<details>
    <summary>请参阅 trace_api/get_block</summary>

```json
{
  "id": "000000157b7f9e05cf80f8861df6e6bda357230ed7c8a29409d5c5d823fc0a1f",
  "number": 21,
  "previous_id": "000000140022c6320e45d8d390e686b6ce6148db4d602884be01776ad8d18c46",
  "status": "irreversible",
  "timestamp": "2023-06-02T15:10:56.500Z",
  "producer": "eosio",
  "transaction_mroot": "430716daff9428cf0327dd9fd08478295a4422bf303b13a74d88379a5e89ff5f",
  "action_mroot": "3ee0e97056c1c592ee755d9d26e178d810dba8c0af57410632fc0e7c4ac9f9a0",
  "schedule_version": 0,
  "transactions": [
    {
      "id": "2529fa879b6a4d7a75f892ab2ee9ace8c322355c2700c713b38c5b4aba023c2b",
      "block_num": 21,
      "block_time": "2023-06-02T15:10:56.500",
      "producer_block_id": null,
      "actions": [
        {
          "global_sequence": 50,
          "receiver": "eosio",
          "account": "eosio",
          "action": "onblock",
          "authorization": [
            {
              "account": "eosio",
              "permission": "active"
            }
          ],
          "data": "008619580000000000ea3055000000000013ce0c73faba187bdd5bce9432d8a5505b8da7a0a88a89d4c063d27b770000000000000000000000000000000000000000000000000000000000000000ceb2eeb65028c5680dfc06486faad42bfd7ff4c6e3b211058eff625d0d1f212f000000000000",
          "return_value": ""
        }
      ],
      "status": "executed",
      "cpu_usage_us": 100,
      "net_usage_words": 0,
      "signatures": [],
      "transaction_header": {
        "expiration": "2023-06-02T15:10:57",
        "ref_block_num": 20,
        "ref_block_prefix": 3554166030,
        "max_net_usage_words": 0,
        "max_cpu_usage_ms": 0,
        "delay_sec": 0
      }
    },
    {
      "id": "1c073fe57292a253ea18cd7075c5420301038197806eeda51e94a33ce63be935",
      "block_num": 21,
      "block_time": "2023-06-02T15:10:56.500",
      "producer_block_id": null,
      "actions": [
        {
          "global_sequence": 51,
          "receiver": "eosio.dex",
          "account": "eosio.dex",
          "action": "withdraw",
          "authorization": [
            {
              "account": "bob",
              "permission": "active"
            }
          ],
          "data": "0000000000000e3da08601000000000004454f5300000000a0d8340d75a524c506313233343536",
          "return_value": ""
        },
        {
          "global_sequence": 52,
          "receiver": "eosio.token",
          "account": "eosio.token",
          "action": "transfer",
          "authorization": [
            {
              "account": "eosio.dex",
              "permission": "active"
            }
          ],
          "data": "0000e82a01ea3055a0d8340d75a524c5a08601000000000004454f530000000006313233343536",
          "return_value": "",
          "params": {
            "from": "eosio.dex",
            "to": "someexchange",
            "quantity": "10.0000 EOS",
            "memo": "123456"
          }
        },
        {
          "global_sequence": 53,
          "receiver": "eosio.dex",
          "account": "eosio.token",
          "action": "transfer",
          "authorization": [
            {
              "account": "eosio.dex",
              "permission": "active"
            }
          ],
          "data": "0000e82a01ea3055a0d8340d75a524c5a08601000000000004454f530000000006313233343536",
          "return_value": "",
          "params": {
            "from": "eosio.dex",
            "to": "someexchange",
            "quantity": "10.0000 EOS",
            "memo": "123456"
          }
        },
        {
          "global_sequence": 54,
          "receiver": "someexchange",
          "account": "eosio.token",
          "action": "transfer",
          "authorization": [
            {
              "account": "eosio.dex",
              "permission": "active"
            }
          ],
          "data": "0000e82a01ea3055a0d8340d75a524c5a08601000000000004454f530000000006313233343536",
          "return_value": "",
          "params": {
            "from": "eosio.dex",
            "to": "someexchange",
            "quantity": "10.0000 EOS",
            "memo": "123456"
          }
        }
      ],
      "status": "executed",
      "cpu_usage_us": 192,
      "net_usage_words": 17,
      "signatures": [
        "SIG_K1_KVPDUxX5DbokbpYj9VgNZw3AZHu9HCLcH2CJbMhJuY2MfcufaLcaRz3KAwLJd12JkoR6r1EUN2XeTVjrDtorKFMiMwnd4f"
      ],
      "transaction_header": {
        "expiration": "2023-06-02T15:11:26",
        "ref_block_num": 19,
        "ref_block_prefix": 3715831994,
        "max_net_usage_words": 0,
        "max_cpu_usage_ms": 0,
        "delay_sec": 0
      }
    }
  ]
}

```
</details>

如你所见，如果你使用的是 `chain/get_block` 要扫描传入传输的端点，你会错过的 
在交易中执行的代币转账操作，可能会丢失用户的资金。

### 监听具体动作

在监听操作时，需要查找三个主要字段。 

-**account**-告诉你正在执行哪个合约
-**action**-告诉您对合约执行了哪个操作
-**params**-包含传递给操作的参数
-**receiver**-告诉你哪个合约正在接收操作

如果你正在监听**EOS**的代币转账，你需要寻找以下操作
**账户**字段是 `eosio.token` 而**action**字段是 `transfer`。

然后，你需要验证里面的信息 `params` 对象。

例如，如果你是 `someexchange` 账户，你需要确保 `to` 字段与您的账户相匹配 
名称，而且备忘录字段可能与您期望的某个标识符匹配。

> ⚠ **警告**
> 
> 那个 `receiver` 字段并不总是与 `account` 字段。如果 `receiver` 字段不同于 
> `account` 字段，那么这是一个允许其他合约触发副作用的通知，而不是一个动作 
> 你应该处理的。

<details>
    <summary>检查转账的 JavaScript 示</summary>

```javascript
const CONTRACT = "eosio.token";
const ACTION = "transfer";
const YOUR_ACCOUNT = "someexchange";

const result = await fetch('https://your.node/v1/trace_api/get_block', {
    method: 'POST',
    body: JSON.stringify({
        block_num: NEXT_BLOCK_NUM
    })
}).then(res => res.json())

for(let transaction of result.transactions) {
    for(let action of transaction.actions) {
        if(
            // This is the smart contract that is being executed
            action.account === CONTRACT
            // This is the action that is being executed
            && action.action === ACTION
            // This is the receiver of this action, if it is not the same as 
            // the contract account, then this is just a notification (DO NOT PROCESS)
            && action.receiver === action.account 
        ) {
            // We now know that this is a transfer action, and it is not 
            // a notification, so we can check the params
            if(action.params.to === YOUR_ACCOUNT) {
                
                // This transfer is for us, so we can do something with it
                const { quantity, memo } = action.params;
                const [amount, symbol] = quantity.split(' ');
                // You should also check that the symbol matches
                // the symbol that you're expecting as well
                if(symbol !== 'EOS') {
                    // This is not the token that we're expecting
                    continue;
                }
                
                
                // ... 
            }
        }
    }
}
```

</details>

## 使用交易 ID 代替监视区块

如果您有交易 ID，则可以直接从 Trace API 中提取事务。

```shell
curl -X POST -H "Content-Type: application/json" \
   -d '{ "id": "YOUR_TRANSACTION_ID" }' \
   http://127.0.0.1:8888/v1/trace_api/get_transaction_trace | jq
```

这将为您提供一个与之完全相同的格式的单一交易跟踪 `get_block` 端点。

> ⚠ **警告**
> 
> 那个 `v1/trace_api/get_transaction_trace` API 将扫描跟踪日志文件中的每个区块，直到找到交易。
> 因此，此 API 效率低下，只能用于测试目的。

<details>
    <summary>查看示例结果</summary>

```json
{
  "id": "d11dc29013e40c5f132b1ae507622eaba6ab01e1e3ac1ecc875b7a80fdc72233",
  "block_num": 21,
  "block_time": "2023-06-02T15:15:33.500",
  "producer_block_id": null,
  "actions": [
    {
      "global_sequence": 51,
      "receiver": "eosio.dex",
      "account": "eosio.dex",
      "action": "withdraw",
      "authorization": [
        {
          "account": "bob",
          "permission": "active"
        }
      ],
      "data": "0000000000000e3da08601000000000004454f530000000000a6823403ea305506313233343536",
      "return_value": ""
    },
    {
      "global_sequence": 52,
      "receiver": "eosio.token",
      "account": "eosio.token",
      "action": "transfer",
      "authorization": [
        {
          "account": "eosio.dex",
          "permission": "active"
        }
      ],
      "data": "0000e82a01ea305500a6823403ea3055a08601000000000004454f530000000006313233343536",
      "return_value": "",
      "params": {
        "from": "eosio.dex",
        "to": "eosio.token",
        "quantity": "10.0000 EOS",
        "memo": "123456"
      }
    },
    {
      "global_sequence": 53,
      "receiver": "eosio.dex",
      "account": "eosio.token",
      "action": "transfer",
      "authorization": [
        {
          "account": "eosio.dex",
          "permission": "active"
        }
      ],
      "data": "0000e82a01ea305500a6823403ea3055a08601000000000004454f530000000006313233343536",
      "return_value": "",
      "params": {
        "from": "eosio.dex",
        "to": "eosio.token",
        "quantity": "10.0000 EOS",
        "memo": "123456"
      }
    }
  ],
  "status": "executed",
  "cpu_usage_us": 187,
  "net_usage_words": 17,
  "signatures": [
    "SIG_K1_JwowShN9caNF4PeX3oMN3PCwKqbfLKz3f1noURuftDSvEd9RiMdY4HGk2kbVJjN47QKcFJSFMh1Yf6uZAfYRxay8iWprzF"
  ],
  "transaction_header": {
    "expiration": "2023-06-02T15:16:03",
    "ref_block_num": 19,
    "ref_block_prefix": 3497594715,
    "max_net_usage_words": 0,
    "max_cpu_usage_ms": 0,
    "delay_sec": 0
  }
}
```
</details>

> 📄 **API 参考**
>
> 有关 Trace API 的更多信息，请参阅 [API 参考](https://docs.eosnetwork.com/apis/leap/latest/trace_api.api).

