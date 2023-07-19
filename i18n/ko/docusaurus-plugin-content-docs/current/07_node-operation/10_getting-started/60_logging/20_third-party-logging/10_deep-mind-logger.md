---
title: 딥마인드 로거 통합
---

## 개요

더 `Deep-mind logger` 의 일부입니다 `dfuse` [플랫폼](https://dfuse.eosnation.io/) 확장성과 성능이 매우 뛰어남 [오픈 소스](https://docs.dfuse.eosnation.io/) 블록체인 데이터 검색 및 처리를 위한 플랫폼.

## 딥마인드 로거를 활성화하는 방법

EOS는 다음을 통합합니다 `nodeos` 핵심 서비스 데몬 포함 `deep-mind logger`.전체 혜택을 받으려면 `deep-mind` 로깅 기능을 시작해야 합니다. `nodeos` 플래그가 있는 인스턴스 `--deep-mind`.시작 후, 견학할 수 있습니다 `nodeos` 콘솔 출력은 다음에 의해 생성된 정보 세부 정보 출력입니다. `deep-mind` 로거.그들은 기본값과 구별됩니다. `nodeos` 출력 라인은 다음과 같이 시작하기 때문입니다. `DMLOG` 키워드.

예시: `deep-mind` 에서 볼 수 있는 것과 같은 로그 라인 `nodeos` 출력 콘솔:

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
