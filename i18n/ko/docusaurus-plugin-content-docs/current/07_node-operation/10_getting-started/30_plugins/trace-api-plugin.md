---
title: trace_api_plugin
dont_translate_title: true
---

참조 [트레이스 API 레퍼런스](https://docs.eosnetwork.com/apis/leap/latest/trace_api.api/).

## 개요

더 `trace_api_plugin` 특정 블록에서 폐기된 작업 및 관련 메타데이터를 검색할 수 있는 소비자 중심 API를 제공합니다.이 기능을 활성화하기 위해 플러그인은 직렬화된 블록 트레이스 데이터를 파일 시스템에 저장합니다. 이 데이터는 이후에 HTTP RPC 요청을 통해 액세스할 수 있습니다.

## 목적

블록 탐색기 및 거래소와 같은 애플리케이션을 EOS 블록체인과 통합할 때 블록체인에서 처리된 모든 작업에 대한 포괄적인 기록이 필요한 경우가 많습니다.여기에는 스마트 계약 및 예정된 거래를 실행하여 생성되는 작업이 포함됩니다.더 `trace_api_plugin` 이 요구 사항을 해결하도록 설계되었습니다.

의 주요 목표는 `trace_api_plugin` 다음과 같은 기능을 제공하는 것입니다.

* 취소된 작업 및 관련 메타데이터가 포함된 기록 제공.
* 블록 검색을 위한 소비자 중심의 장기 API의 가용성.
* EOS 노드 내 리소스 관리 향상, 파일 시스템 스토리지, 디스크 공간 및 메모리와 같은 리소스의 지속 가능한 사용 보장.

그 동안 `state_history_plugin` 주요 초점인 구조 체인 데이터, 작업 데이터 및 상태 델타에 액세스할 수 있는 바이너리 스트리밍 인터페이스를 제공합니다. `trace_api_plugin` 파일 시스템, 디스크 공간 및 메모리 사용률을 비롯한 노드 리소스의 유지 관리를 개선하는 것입니다.

## 사용법

```console
# config.ini
plugin = eosio::trace_api_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::trace_api_plugin [options]
```

## 구성 옵션

다음 중 하나에서 지정할 수 있습니다. `nodeos` 명령줄 또는 `config.ini` 파일:

### 에 대한 구성 옵션 `trace_api_plugin`

옵션 (=기본값) | 설명
-|-
`--trace-dir arg (="traces")` | 추적 디렉토리의 위치 (절대 경로 또는 응용 프로그램 데이터 디렉토리에 대한 상대 경로)
`--trace-slice-stride arg (=10000)` | 트레이스 데이터의 각 “슬라이스”가 파일 시스템에 포함할 블록 수
`--trace-minimum-irreversible-history-blocks arg (=-1)` | “슬라이스” 파일이 자동으로 제거되기 전에 검색을 위해 LIB를 넘어서 보관해야 하는 블록 수입니다.값이 -1이면 “슬라이스” 파일의 자동 제거가 해제됨을 나타냅니다.
`--trace-minimum-uncompressed-irreversible-history-blocks arg (=-1)` | LIB를 초과하여 압축되지 않았는지 확인해야 할 블록 수입니다.압축된 “슬라이스” 파일은 여전히 액세스할 수 있지만 검색 시 성능이 저하될 수 있습니다. 값이 -1이면 “슬라이스” 파일의 자동 압축이 해제됩니다.
`--trace-rpc-abi arg` | 트레이스 RPC 응답을 디코딩할 때 사용되는 ABIABI가 하나 이상 지정되어 있거나 trace-no-abis 플래그를 사용해야 합니다.ABI는 ^계정-이름^=^abi-def^ 형식으로 “키=값” 쌍으로 지정됩니다. 여기서 ^abi-def^는 다음과 같을 수 있습니다. 여기서 ^abi-def^는 유효한 JSON으로 인코딩된 ABI를 포함하는 파일의 절대 경로이며 상대 경로에서 가져온 상대 경로입니다. `data-dir` 유효한 JSON 인코딩 ABI를 포함하는 파일로
`--trace-no-abis` | RPC 응답에서 ABI를 사용하지 않을 것임을 나타내는 데 사용합니다.trace-rpc-abi 구성이 없을 때 이 옵션을 지정하지 않으면 오류가 발생합니다.이 옵션은 trace-rpc-api와 상호 배타적입니다.

## 종속성

* [`체인_플러그인`](./chain-plugin.md)
* [`http_plugin`](./http-plugin.md)

### 로드 종속성 예제

다음 플러그인은 명령줄에서 지정하지 않은 경우 기본 설정으로 로드되거나 `config.ini`:

```console
# config.ini
plugin = eosio::chain_plugin
[options]
plugin = eosio::http_plugin 
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [options]  \
           --plugin eosio::http_plugin [options]
```

## 구성 예제

여기는 `nodeos` 에 대한 구성 예제 `trace_api_plugin` 일부 Antelope 참조 계약을 추적할 때:

```sh
nodeos --data-dir data_dir --config-dir config_dir --trace-dir traces_dir
--plugin eosio::trace_api_plugin 
--trace-rpc-abi=eosio=abis/eosio.abi 
--trace-rpc-abi=eosio.token=abis/eosio.token.abi 
--trace-rpc-abi=eosio.msig=abis/eosio.msig.abi 
--trace-rpc-abi=eosio.wrap=abis/eosio.wrap.abi
```

## 정의

이 섹션에서는*슬라이스*, *추적 로그* 내용 및 *clog 형식*에 대한 개요를 제공합니다.이러한 개념을 숙지하면 효과적으로 사용할 수 있습니다. `trace_api_plugin` 옵션.

### 슬라이스

다음과 같은 맥락에서 `trace_api_plugin`, *슬라이스*는 주어진 시작 블록 높이 (포함) 와 주어진 끝 블록 높이 (제외) 사이의 모든 관련 트레이스 데이터의 모음으로 정의됩니다.예를 들어, 0에서 10,000까지의 슬라이스는 블록 번호가 0보다 크고 10,000보다 작은 모든 블록의 모음입니다.추적 디렉토리에는 슬라이스 컬렉션이 들어 있습니다.각 슬라이스는*추적 데이터* 로그 파일과 *추적 색인* 메타데이터 로그 파일로 구성됩니다.

 *  `trace_<S>-<E>.log`
  *  `trace_index_<S>-<E>.log`

여기서 `<S>` 과 `<E>` 보폭으로 이어지는 0으로 채워진 슬라이스의 시작 및 끝 블록 번호입니다.예를 들어 시작 블록이 5이고 마지막 블록이 15이고 스트라이드가 10이면 결과는 `<S>` 입니다 `0000000005` 과 `<E>` 입니다 `0000000015`.

#### 로그: `trace_<S>-<E>.log`

트레이스 데이터 로그는 실제 바이너리 직렬화된 블록 데이터를 저장하는 추가 전용 로그입니다.콘텐츠에는 작업별 ABI로 보강된 RPC 요청을 처리하는 데 필요한 트랜잭션 및 작업 추적 데이터가 포함됩니다.두 가지 블록 유형이 지원됩니다.
 
 * `block_trace_v0`
  * `block_trace_v1`

데이터 로그는 로그에 저장된 데이터에 대한 버전 관리 정보가 포함된 기본 헤더로 시작됩니다. `block_trace_v0` 블록 ID, 블록 번호, 이전 블록 ID, 프로덕션 타임스탬프, 블록에 서명한 생산자, 실제 트레이스 데이터를 포함합니다. `block_trace_v1` 블록에 포함된 트랜잭션 목록 및 작업 목록에 대한 머클 루트 해시와 생성 이후 생산 스케줄 수를 모두 추가합니다.

로그에는 체인의 정상적인 운영의 일환으로 블록체인에서 분리된 블록이 포함될 수 있습니다.파일의 다음 항목은 항상 블록 번호가 이전 항목보다 1이 높거나 포킹으로 인해 같거나 더 작게 표시됩니다.모든 추적 항목에는 추적 인덱스에 대한 해당 슬라이스 파일에 해당 항목이 있습니다.참고로, 에서 nodeos를 실행하면 블록이 분기되는 것을 피할 수 있습니다. `read-mode=irreversible`.

#### 로그: `trace_index_<S>-<E>.log`

트레이스 인덱스 로그 또는 메타데이터 로그는 일련의 바이너리-직렬화된 유형을 저장하는 추가 전용 로그입니다.현재 두 가지 유형이 지원됩니다.

 * `block_entry_v0`
  * `lib_entry_v0`

인덱스 로그는 로그에 저장된 데이터에 대한 버전 관리 정보가 포함된 기본 헤더로 시작됩니다. `block_entry_v0` 데이터 로그 내 해당 블록 위치에 대한 오프셋과 함께 블록 ID 및 블록 번호를 포함합니다.이 항목은 두 항목의 오프셋을 찾는 데 사용됩니다. `block_trace_v0` 과 `block_trace_v1` 블록. `lib_entry_v0` 알려진 최신 LIB 항목이 포함되어 있습니다.리더 모듈은 LIB 정보를 사용하여 사용자에게 되돌릴 수 없는 상태를 보고합니다.

### 클로그 형식

압축된 추적 로그 파일에는 `.clog` 파일 확장자 (참조) [로그 파일 압축](#compression-of-log-files) 아래).clog는 검색 가능한 압축 지점의 인덱스가 끝에 추가된 일반 압축 파일입니다.클로그 형식 레이아웃은 다음과 같습니다.

![](/images/clog-format.png)

데이터는 일정한 간격으로 풀 플러시*탐색 포인트*가 배치된 원시 zlib 형식으로 압축됩니다.압축 해제기는 이전 데이터를 읽지 않고도 이러한 *탐색 지점*에서 시작할 수 있으며 데이터 내에 검색 지점이 나타나면 문제 없이 탐색 지점을 탐색할 수도 있습니다.

> ℹ️ 트레이스 로그 크기 축소  
> 데이터를 압축하면 트레이스 로그의 공간 증가를 20배 줄일 수 있습니다!예를 들어, 512개의 탐색 포인트가 있고 EOS 공용 네트워크의 테스트 데이터 세트를 사용하는 경우, 데이터 압축을 통해 트레이스 디렉터리의 증가량을 하루 최대 50GiB에서 최대 2.5GiB로 줄일 수 있습니다.추적 로그 내용의 중복성이 높기 때문에 압축은 여전히 다음과 비슷합니다. `gzip -9`.또한 압축 해제된 데이터는 서비스 저하 없이 Trace RPC API를 통해 즉시 사용할 수 있습니다.

#### 탐색 포인트의 역할

파일이 압축되는 동안 탐색 포인트 인덱스는 원래의 압축되지 않은 오프셋을 새로운 압축 오프셋과 함께 기록하여 원래 인덱스 값 (압축되지 않은 오프셋) 을 압축되지 않은 오프셋 이전의 가장 가까운 탐색 포인트에 매핑할 수 있도록 매핑을 생성합니다.이렇게 하면 스트림에서 나중에 나타나는 압축되지 않은 파일의 일부에 대한 검색 시간이 크게 줄어듭니다.

## 자동 유지 관리

의 주요 설계 목표 중 하나는 `trace_api_plugin` 파일 시스템 리소스의 수동 관리 및 유지 관리를 최소화하는 것입니다.이를 위해 플러그인을 사용하면 트레이스 로그 파일을 자동으로 제거하고 데이터 압축을 통해 디스크 공간을 자동으로 줄일 수 있습니다.

### 로그 파일 제거

에서 생성한 이전 추적 로그 파일을 제거할 수 있도록 하려면 `trace_api_plugin`, 다음 옵션을 사용할 수 있습니다. 

```sh
  --trace-minimum-irreversible-history-blocks N (=-1) 
```

만약 논쟁이 `N` 0 이상이면 플러그인은 유지만 됩니다. `N` 현재 LIB 블록 이전의 디스크 블록블록 번호가 이전보다 작은 모든 추적 로그 파일 `N` 블록은 자동 제거될 예정입니다.

### 로그 파일 압축

더 `trace_api_plugin` 또한 추적 로그 파일에 데이터 압축을 적용하여 디스크 공간을 최적화하는 옵션을 지원합니다.

```sh
  --trace-minimum-uncompressed-irreversible-history-blocks N (=-1)
```

만약 논쟁이 `N` 가 0 이상인 경우 플러그인은 자동으로 백그라운드 스레드를 설정하여 추적 로그 파일의 되돌릴 수 없는 부분을 압축합니다.현재 LIB 블록 이후의 이전 N개의 비가역 블록은 압축되지 않은 상태로 유지됩니다.

> ℹ️ 트레이스 API 유틸리티  
> 추적 로그 파일은 다음을 사용하여 수동으로 압축할 수도 있습니다. [트레이스_API_유틸리티](https://docs.eosnetwork.com/manuals/leap/latest/utilities/trace_api_util) 유용.

를 통해 리소스 사용을 효과적으로 관리할 수 없는 경우 `trace-minimum-irreversible-history-blocks` 과 `trace-minimum-uncompressed-irreversible-history-blocks` 옵션을 선택하면 정기적인 수동 유지 관리가 필요할 수 있습니다.이 경우 사용자는 외부 시스템 또는 반복 프로세스를 통해 리소스를 관리하도록 선택할 수 있습니다.

## 수동 유지 관리

더 `trace-dir` 옵션은 추적 로그 파일이 저장되는 파일 시스템의 디렉토리를 정의합니다. `trace_api_plugin`.이러한 파일은 LIB 블록이 지정된 슬라이스를 넘어가면 안정적이며 언제든지 삭제하여 파일 시스템 공간을 확보할 수 있습니다.배포된 Antelope 시스템은 파일이 나타내는 데이터가 무엇인지 또는 실행 중인지 여부에 관계없이 이 디렉터리에서 이러한 파일의 일부 또는 전부를 제거하는 프로세스 외부 관리 시스템을 허용합니다. `nodeos` 인스턴스 액세스 여부명목상으로는 사용할 수 있지만 수동 유지 관리로 인해 더 이상 사용할 수 없는 데이터는 적절한 API 엔드포인트에서 HTTP 404 응답으로 이어집니다.

> ℹ️ 노드 운영자용  
> 노드 운영자는 다음을 통해 노드에서 사용 가능한 과거 데이터의 수명을 완전히 제어할 수 있습니다. `trace-api-plugin` 그리고 `trace-minimum-irreversible-history-blocks` 과 `trace-minimum-uncompressed-irreversible-history-blocks` 외부 파일 시스템 리소스 관리자와 함께 사용할 수 있는 옵션
