---
title: 深度思维记录器集成
---

## 概述

那个 `Deep-mind logger` 是其中的一部分 `dfuse` [平台](https://dfuse.eosnation.io/) 这是一款高度可扩展和高性能的 [开源的](https://docs.dfuse.eosnation.io/) 用于搜索和处理区块链数据的平台。

## 如何启用 DeepMind Logger

EOS 集成了 `nodeos` 核心服务守护进程 `deep-mind logger`。从全额中受益 `deep-mind` 必须启动的日志记录功能 `nodeos` 带有标志的实例 `--deep-mind`。开始后，你可以在 `nodeos` 控制台输出由创建的信息详细信息输出 `deep-mind` 记录器。它们将自己与默认值区分开来 `nodeos` 输出行，因为它们以 `DMLOG` 关键字。

的例子 `deep-mind` 记录行，就像你在里面看到的那样 `nodeos` 输出控制台：

```console
DMLOG START_BLOCK 30515

DMLOG TRX_OP CREATE onblock 308f77bf49ab4ddde74d37c7310c0742e253319d9da57ebe51eb7b35f1ffe174 {"expiration":"2020-11-12T10:13:06","ref_block_num":30514,...}

DMLOG CREATION_OP ROOT 0

DMLOG RLIMIT_OP ACCOUNT_USAGE UPD {"owner":"eosio","net_usage":{"last_ordinal":1316982371,"value_ex":0,"consumed":0},"cpu_usage":{"last_ordinal":1316982371,"value_ex":24855,"consumed":101},"ram_usage":27083}

DMLOG APPLIED_TRANSACTION 30515 {"id":"308f77bf49ab4ddde74d37c7310c0742e253319d9da57ebe51eb7b35f1ffe174","block_num":30515,"block_time":"2020-11-12T10:13:05.500",...}

DMLOG RLIMIT_OP STATE UPD {"average_block_net_usage":{"last_ordinal":30514,"value_ex":0,"consumed":0},"average_block_cpu_usage":{"last_ordinal":30514,...}
DMLOG ACCEPTED_BLOCK 30516 {"block_num":30516,"dpos_proposed_irreversible_blocknum":30516,"dpos_irreversible_blocknum":30515,...

...

DMLOG FEATURE_OP ACTIVATE 0ec7e080177b2c02b278d5088611686b49d739925a92d9bfcacd7fc6b74053bd {"feature_digest":"0ec7e080177b2c02b278d5088611686b49d739925a92d9bfcacd7fc6b74053bd","subjective_restrictions":{"enabled":true,"preactivation_required":false,"earliest_allowed_activation_time":"1970-01-01T00:00:00.000"},"description_digest":"64fe7df32e9b86be2b296b3f81dfd527f84e82b98e363bc97e40bc7a83733310","dependencies":[],"protocol_feature_type":"builtin","specification":
[{"name":"builtin_feature_codename","value":"PREACTIVATE_FEATURE"}]}

...

DMLOG FEATURE_OP ACTIVATE 825ee6288fb1373eab1b5187ec2f04f6eacb39cb3a97f356a07c91622dd61d16 {"feature_digest":"825ee6288fb1373eab1b5187ec2f04f6eacb39cb3a97f356a07c91622dd61d16","subjective_restrictions":{"enabled":true,"preactivation_required":true,"earliest_allowed_activation_time":"1970-01-01T00:00:00.000"},"description_digest":"14cfb3252a5fa3ae4c764929e0bbc467528990c9cc46aefcc7f16367f28b6278","dependencies":[],"protocol_feature_type":"builtin","specification":
[{"name":"builtin_feature_codename","value":"KV_DATABASE"}]}

...

DMLOG FEATURE_OP ACTIVATE c3a6138c5061cf291310887c0b5c71fcaffeab90d5deb50d3b9e687cead45071 {"feature_digest":"c3a6138c5061cf291310887c0b5c71fcaffeab90d5deb50d3b9e687cead45071","subjective_restrictions":{"enabled":true,"preactivation_required":true,"earliest_allowed_activation_time":"1970-01-01T00:00:00.000"},"description_digest":"69b064c5178e2738e144ed6caa9349a3995370d78db29e494b3126ebd9111966","dependencies":[],"protocol_feature_type":"builtin","specification":
[{"name":"builtin_feature_codename","value":"ACTION_RETURN_VALUE"}]}
```
