---
title: 구성
---

## Config.ini

`config.ini` 방법을 제어하는 구성 파일입니다. `nodeos` 인스턴스가 작동합니다.예를 들어, 내에서 `config.ini` 다음을 지정할 수 있습니다.

* 노드가 피어링할 노드
* 노드가 사용할 실제 플러그인
* 노드를 사용자 지정할 수 있는 플러그인별 옵션

따라서, `config.ini` 파일은 노드 작동에 직접적인 영향을 미칩니다.대부분의 노드 운영자는 이 파일을 편집하고 사용자 지정하여 노드에 특정 역할을 할당합니다.

>ℹ️ `nodeos` 명령줄 인터페이스 (CLI) 옵션 중 하나를 사용하여 구성할 수 있습니다. `config.ini` 파일 또는 둘 다반면, 노드별 옵션은 명령줄을 통해서만 지정할 수 있습니다.사용 가능한 모든 CLI 옵션을 보려면 `config.ini` 옵션, 터미널에서 “nodeos --help”를 실행하십시오.

### CLI 옵션 vs. `config.ini`

의 모든 옵션 `config.ini` 파일을 CLI 옵션으로 지정할 수도 있습니다.예를 들어, `plugin = arg` 옵션 입력 `config.ini` 를 통해 전달할 수도 있습니다. `--plugin arg` CLI 옵션.그러나 그 반대가 항상 그렇지는 않습니다. 모든 CLI 옵션에 동일한 항목이 있는 것은 아닙니다. `config.ini` 파일.예를 들어, 즉각적인 작업을 수행하는 플러그인 관련 옵션은 다음과 같습니다. `--delete-state-history` 에서 `state_history_plugin`, 에서 지정할 수 없습니다. `config.ini` 파일.

>ℹ️ 대부분의 노드 운영자가 선호 `config.ini` CLI 옵션에 대한 옵션그 이유는 `config.ini` 시작 시 지정된 CLI 옵션과 달리 구성 상태를 유지합니다. `nodeos`.

### 커스텀 `config.ini`

사용자 지정을 사용하려면 `config.ini` file, 다음을 전달하여 파일 이름을 지정하십시오. `--config arg` 실행 시 옵션 `nodeos`.사용자 지정 파일 이름은 실제 경로를 기준으로 합니다. `config.ini` 에 지정된 파일 `--config-dir arg` 옵션.

### 샘플 `config.ini`

<details>
<summary>다음은 공통 값이 제공된 간단한 예제입니다.</summary>

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

## 플러그인

이 섹션에서는 노드 동작에 영향을 미치는 가장 일반적인 플러그인 옵션을 다룹니다.이러한 옵션은 항상 플러그인에 따라 다릅니다.이는 생산 노드, 릴레이 노드, API 노드 등으로 작동하도록 구성된 노드에 해당됩니다.

>ℹ️ 다음 플러그인은 다음과 같은 경우 기본적으로 활성화됩니다. `nodeos` 출시: `chain_plugin`, `net_plugin`, `producer_plugin`, `resource_monitor_plugin`.따라서 다시 로드할 필요가 없습니다. 

### `plugin` 선택권

플러그인은 노드의 기능을 확장하고 수정하는 데 필수적입니다.당신은 을 사용합니다 `plugin` 실행 중 지정된 플러그인을 활성화하는 옵션 `nodeos` 예.

옵션 유형 | 구성 방법 | 구문 | 예제
-|-|-|-
노드별 | CLI 옵션 | `--plugin arg` | `--plugin eosio::chain_plugin`
`nodeos` | `config.ini` | `plugin = arg` | `plugin = eosio::chain_plugin`

> ℹ️ `nodeos` 플러그인은 동적으로 로드되지 않습니다.다음과 같은 경우에 활성화됩니다. `nodeos` 실행되고 있는 동안에는 언로드하거나 다시 로드할 수 없습니다. `nodeos` 인스턴스가 실행 중입니다.플러그인이 내장되어 있습니다. `nodeos` 2진수.

### `enable-stale-production` 선택권

당신은 을 사용합니다 `enable-stale-production` 체인이 오래되더라도 블록 생산을 가능하게 하는 옵션그렇지 않으면 체인이 장기간 일시 중지되면 블록 생산이 실패할 수 있습니다.

옵션 유형 | 구성 방법 | 구문 | 예제
-|-|-|-
플러그인별 | CLI 옵션 | `-e` 또는 `--enable-stale-production`
`producer_plugin` | `config.ini` | `enable-stale-production = true`

### `signature-provider` 선택권

당신은 을 사용합니다 `signature-provider` 노드가 블록과 트랜잭션에 서명할 수 있도록 하는 옵션입니다.서명 제공자를 키 페어로 지정해야 합니다.

옵션 유형 | 구성 방법 | 구문 | 예제
-|-|-|-
플러그인별 | CLI 옵션 | `-e` 또는 `--enable-stale-production`
`producer_plugin` | `config.ini` | `enable-stale-production = true`

### `trace-no-abis` 선택권

당신은 을 사용합니다 `trace-no-abis` RPC 응답에서 ABI를 사용하지 않을 것임을 나타내는 옵션.이 옵션은 다음과 같은 경우에 지정해야 합니다. `trace-rpc-abi` 옵션은 ABI를 지정하는 데 사용되지 않습니다.

옵션 유형 | 구성 방법 | 구문 | 예제
-|-|-|-
플러그인별 | CLI 옵션 | `--trace-no-abis`
`trace_api_plugin` | `config.ini` | `trace-no-abis =`

### `access-control-allow-origin` 선택권

웹용 CORS (크로스 오리진 리소스 공유) 와 마찬가지로 `access-control-allow-origin` 옵션을 사용하면 다른 출처 (도메인, 스킴 또는 포트) 에서의 액세스를 제어할 수 있습니다.개발 인스턴스의 경우 별표가 있는 모든 출처를 허용하는 것이 유용할 것입니다. `*`, 하지만 생산을 위해 특정 원산지로 변경하십시오.

옵션 유형 | 구성 방법 | 구문 | 예제
-|-|-|-
플러그인별 | CLI 옵션 | `--access-control-allow-origin arg`
`http_plugin` | `config.ini` | `access-control-allow-origin = arg`

## 코어

CORS (Cross-Origin Resource Sharing) 는 브라우저 클라이언트의 스크립트가 다양한 출처의 리소스와 상호 작용할 수 있도록 하는 프로토콜입니다.이는 JavaScript가 일반적으로 동일 출처 정책에 의해 제한되어 스크립트 위치와 다른 출처에 있는 URL에 대한 요청을 보내는 기능을 제한하기 때문에 필요합니다.예를 들어 JavaScript 애플리케이션이 다른 도메인에서 호스팅되는 API에 대해 AJAX 호출을 하려는 경우 동일 출처 정책으로 인해 차단될 수 있습니다.

>ℹ️ CORS는 웹 분산형 애플리케이션 (dApp) 에 중요합니다. CORS가 없으면 원격 호스트에서 RPC API가 호출되어 API 노드가 차단될 수 있다고 말하기 때문입니다.

### CORS가 필요한 이유는 무엇입니까?

대부분의 경우 사용자 브라우저에서 실행되는 스크립트는 동일한 출처 내의 리소스에 액세스하기만 하면 됩니다 (예: JavaScript 코드를 제공한 백엔드에 대한 API 호출).따라서 JavaScript가 다른 출처의 리소스에 액세스하지 못하도록 제한하는 것은 보안에 도움이 됩니다.

이 문맥에서 “기타 출처”란 자바스크립트가 실행되는 위치와 다르며 스키마 (HTTP 또는 HTTPS), 도메인 또는 포트가 다른 URL을 말합니다.

하지만 크로스 오리진 액세스가 필요하거나 필수적인 시나리오도 있습니다.예를 들어 React 싱글 페이지 애플리케이션 (SPA) 은 다른 도메인에서 호스팅되는 API 백엔드와 통신해야 할 수 있습니다.예를 들어 CORS는 웹 글꼴이 제대로 작동하는데도 중요합니다.

### CORS 응답 식별

서버가 출처 간 리소스 공유를 허용하도록 올바르게 구성되면 특정 헤더가 응답에 포함됩니다.이러한 헤더는 CORS 지원을 나타내며 웹 브라우저에서 CORS 지원 여부를 결정하는 데 사용됩니다. `XMLHttpRequest` 통화가 진행되거나 실패해야 합니다.

여러 헤더를 설정할 수 있지만 리소스 접근성을 결정하는 기본 헤더는 `Access-Control-Allow-Origin`.이 헤더는 리소스에 액세스할 수 있는 출처를 지정합니다.예를 들어, 모든 출처에서 액세스를 허용하려면 헤더를 다음과 같이 설정할 수 있습니다.

```Access-Control-Allow-Origin: *
```

또는 특정 출처로 제한할 수도 있습니다.

```Access-Control-Allow-Origin: https://sample.io
```

>ℹ️ 웹 DApp으로 실행되는 블록체인 애플리케이션의 맥락에서, `nodeos` 를 제공합니다 `access-control-allow-origin` 다른 출처에서의 액세스를 제어하는 옵션예를 들어 EOS API 노드에서 이 옵션을 사용하여 선택한 원격 호스트에 액세스 권한을 부여할 수 있습니다.

## 요약

더 `config.ini` 파일은 nodeos 인스턴스의 기능을 구성하는 역할을 합니다.이를 통해 사용자는 노드를 연결할 노드를 지정하고, 사용할 플러그인을 정의하고, 플러그인별 옵션을 통해 노드의 동작을 사용자 지정할 수 있습니다.따라서 config.ini 파일은 노드 작동 방식을 결정하는 데 중요한 역할을 하며 노드 운영자는 이 파일을 자주 편집하고 개인화하여 노드에 특정 역할을 할당합니다.
