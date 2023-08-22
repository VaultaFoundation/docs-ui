---
title: API 노드 실행
---

API 노드는 dApp을 포함한 사용자와 EOS 블록체인 간의 인터페이스 역할을 하는 EOS 블록체인 네트워크의 중요한 구성 요소입니다.API 노드는 다음 중 하나를 통해 수신되는 수신 클라이언트 요청을 처리할 때 다음 역할 중 하나를 수행합니다. `chain_api_plugin` 엔드포인트:

- **푸시 API 노드**: HTTP 클라이언트의 트랜잭션을 수락하여 다른 피어에 전달합니다.일반적으로 들어오는 P2P 트랜잭션을 수락하지 않습니다.업스트림 트래픽만 해당.
- **체인 API 노드**: 계정, 권한, 계약 코드/ABI, 계약 테이블 등과 같은 블록체인 데이터에 대한 액세스를 제공하며 API 트랜잭션도 처리합니다.
- **풀 API 노드**: 체인 API 노드와 비슷하지만 HTTP 클라이언트의 트랜잭션을 수락하지 않습니다.이 설정은 일반적이지는 않지만 기술적으로는 가능합니다.

> ℹ️ **블록체인 프리미티브**  
> 체인 API 노드는 또한 체인, 블록, 트랜잭션, 생산자, 프로토콜 기능 등과 같은 블록체인 프리미티브를 읽을 수 있는 권한을 제공합니다. 그러나 이들은 일반적으로 디스크, 메모리, 대역폭 측면에서 특히 더 큰 공간을 차지하기 때문입니다. `get_block`, 다음을 사용하는 레이어 2 기록 솔루션에 더 적합합니다. `state_history` 플러그인.

푸시 API 노드는 일반적으로 HTTP 클라이언트 요청만 수신하고 들어오는 P2P 트랜잭션은 수락하지 않습니다.이렇게 하면 푸시 노드가 클라이언트 요청을 빠르게 처리할 수 있는 처리 시간을 확보할 수 있습니다.반대로 체인 API 노드는 P2P 트랜잭션을 수신하여 로컬 블록체인 상태를 동기화함으로써 클라이언트에 대한 응답 시간을 단축하는 이점을 누릴 수 있습니다.

> ℹ️ **체인 API 엔드포인트**  
> HTTP 클라이언트는 다음 중 하나를 통해 요청을 보냅니다. `chain_api_plugin` 끝점.푸시 요청은 일반적으로 다음을 사용합니다. `send_transaction` 엔드포인트 또는 이와 유사하여 블록체인 데이터를 작성하거나 블록체인 상태를 변경합니다.일반적인 풀 리퀘스트는 다음을 사용합니다. `get_table_rows` 엔드포인트 또는 블록체인 데이터를 읽는 것과 유사합니다.

## API 노드를 사용하는 이유는 무엇인가요?

개발자는 자체 API 노드를 배포하여 EOS 블록체인에 연결하고 스마트 계약 및 dApp에 다음 기능을 적용할 수 있습니다.

- **데이터 액세스**: API 노드를 통해 사용자는 계정 잔액, 거래 세부 정보, 스마트 계약 데이터 및 기타 블록체인 관련 데이터와 같은 정보에 액세스하여 블록체인의 상태와 일부 기록을 쿼리할 수 있습니다.

- **거래 브로드캐스팅**: 사용자나 DApp이 EOS 블록체인에서 거래를 실행하고자 할 때 API 노드에 거래를 제출합니다.그런 다음 노드는 트랜잭션을 네트워크로 브로드캐스트하여 블록체인에 포함되는 데 필요한 모든 블록 생산자에게 전달되도록 합니다.

> ℹ️ **공용 및 사설 노드**  
> API 노드는 퍼블릭 또는 프라이빗일 수 있습니다.퍼블릭 노드는 공개되어 누구나 사용할 수 있는 반면, 프라이빗 노드는 일반적으로 개발자, 애플리케이션 또는 조직이 블록체인과의 상호 작용을 비공개로 관리하기 위해 운영합니다.

- **API 엔드포인트**: API 노드는 클라이언트가 블록체인과 상호작용할 수 있도록 하는 다양한 엔드포인트를 노출합니다.이러한 엔드포인트는 일반적으로 HTTP/HTTPS 기반이며 EOSIO API 사양을 따르므로 개발자가 EOS를 애플리케이션에 쉽게 통합할 수 있습니다.

- **로드 밸런싱**: 블록체인에 액세스하는 클라이언트에 대한 수요가 잠재적으로 높기 때문에 많은 노드 운영자가 로드 밸런싱을 위해 API 노드 클러스터를 사용합니다.이렇게 하면 네트워크가 과부하되지 않고 많은 요청을 처리할 수 있습니다.

## 하드웨어 요구 사항

API 노드의 실제 하드웨어 요구 사항은 트랜잭션 처리량, 클라이언트 요청, 사용 가능한 대역폭 등에 따라 다르지만 가장 큰 요인은 주로 API 노드가 블록 로그 파일을 유지 관리해야 하는지 여부에 따라 달라집니다.API 노드의 실제 요구 사항에 대한 자세한 내용은 다음을 참조하십시오. [하드웨어 요구 사항](../10_getting-started/10_hardware-requirements.md) 섹션, 특히:

* [블록 로그가 있는 API 노드](../10_getting-started/10_hardware-requirements#api-node-with-blocks-log)
* [블록 로그가 없는 API 노드](../10_getting-started/10_hardware-requirements#api-node-without-blocks-log)

> ℹ️ **체인 API 노드는 블록 로그를 유지합니다**  
> Chain API 노드는 블록체인에서 데이터를 가져올 수 있도록 자체 블록 로그 파일을 유지해야 합니다.블록 로그 파일을 유지한다는 것은 노드가 스냅샷이나 제네시스를 통해 블록체인을 재생했다는 것을 의미합니다.이를 통해 API 노드는 블록체인 상태를 로컬에서 읽어 블록체인 상태를 다른 피어와 동기화하고 클라이언트 요청을 신속하게 처리할 수 있습니다.Chain API 노드가 수행하는 일반적인 작업은 dApp 또는 배포된 스마트 계약에서 요청한 테이블 데이터를 가져오는 것입니다.

## 소프트웨어 요구 사항

API 노드를 설정하려면 먼저 앤텔로프를 설치해야 합니다. [도약](https://github.com/AntelopeIO/leap) 소프트웨어.설치할 Leap 버전은 노드를 EOS 테스트넷에 배포할지 EOS 메인넷에 배포할지에 따라 다릅니다.

> ℹ️ **메인넷의 Leap 소프트웨어 vs. 테스트넷**  
> EOS 테스트넷은 일반적으로 최신 Leap 버전을 실행하며, 일반적으로 출시 직후의 최신 버전을 실행합니다.EOS 메인넷은 안정성과 보안을 위해 일반적으로 이전의 안정 릴리스 버전의 Leap 소프트웨어를 사용합니다.

배포하려는 EOS 네트워크에서 다른 API 노드가 실행 중인 버전을 찾으려면 EOS Nation Validate 사이트에서 원하는 EOS 네트워크를 선택하고 해당 네트워크의 API 보고서로 이동하십시오.

* https://validate.eosnation.io/

예를 들어 EOS 메인넷, EOS 정글 테스트넷 또는 EOS Kylin 테스트넷의 최신 API 노드를 보려면 다음 사이트를 각각 방문하십시오.

* https://validate.eosnation.io/eos/reports/api_versions.txt
* https://validate.eosnation.io/jungle4/reports/api_versions.txt
* https://validate.eosnation.io/kylin/reports/api_versions.txt

API 노드의 경우 배포하려는 EOS 네트워크에서 대부분의 다른 API 노드가 사용하는 것과 동일한 Leap 버전을 사용하는 것이 좋습니다.여기에서 특정 버전의 Leap 바이너리를 선택할 수 있습니다.

* https://github.com/AntelopeIO/leap/tags

Leap 소프트웨어를 설치한 후 아래 구성 섹션으로 진행하십시오.

## 구성

API 노드는 푸시 API 노드, 체인 API 노드 또는 풀 API 노드로 구성할 수 있습니다.모든 API 노드는 다음을 활성화해야 합니다. `chain_api_plugin` API 엔드포인트를 노출합니다.아래 표는 모든 API 노드 유형 간의 주요 차이점을 보여줍니다.

API 노드 유형 | 블록 로그 유지 | P2P 트랜잭션 허용 | API 트랜잭션 허용
-|-|-|-
**푸시 API 노드** | 아니요 | 아니요 | 예
**체인 API 노드** | 예 | 예 | 예 | 예
**풀 API 노드** | 예 | 예 | 아니요

> ℹ️ **후드 아래의 플러그인**  
> 클라이언트 요청은 에서 관리하는 RPC API 인터페이스에서 수신됩니다. `http_plugin` 그리고 궁극적으로 에 의해 처리됩니다. `chain_api_plugin`, 에 의해 구현된 기능을 노출합니다. `chain_plugin`.그 이후로 `chain_plugin` 기본적으로 활성화되어 있습니다. 활성화하기만 하면 됩니다. `chain_api_plugin` 명시적으로 이렇게 하면 자동으로 활성화됩니다. `http_plugin`.확인해 보세요. [체인_API_플러그인](../10_getting-started/30_plugins/chain-api-plugin.md) 자세한 내용은 설명서를 참조하십시오.

### 전제 조건 단계

API 노드는 자체적으로 실행됩니다. `nodeos` 예.아직 실행하지 않은 경우 `nodeos` 또는 가지고 있다 `data` 과 `config` 폴더는 아직 남아 있지 않습니다. 이 섹션의 지침을 따르십시오.

* 메인 설정 `nodeos` 배포하려는 EOS 네트워크에 따른 데이터 폴더 변수:

 예를 들어 EOS 메인넷에 배포하는 경우 다음을 선택할 수 있습니다.
  ```ini
  EOSDIR=~/eos/mainnet
  ```
  또는 EOS Jungle 테스트넷에 배포하는 경우 다음을 선택할 수 있습니다.
  ```ini
  EOSDIR=~/eos/jungle_testnet
  ```
  기타

* 기본값 만들기 `config.ini` 파일 - 아래 단계에서 파일을 편집합니다.

  ```sh
  mkdir -p $EOSDIR
  nodeos --print-default-config >$EOSDIR/config.ini
  ```

아래 지침에 따라 API 노드를 푸시 API, 체인 API 또는 풀 API 노드로 구성하십시오.먼저 다음을 사용하여 시작하십시오. [모든 API 노드 구성](#any-api-node-configuration)그런 다음 배포하도록 선택한 API 노드 구성을 계속 진행합니다.

### 모든 API 노드 구성

다음 구성 설정은 모든 API 노드에 적용됩니다.

* 기본값 열기 `config.ini` 예를 들어, 텍스트 편집기를 사용하면 다음과 같습니다.

  ```sh
  vim $EOSDIR/config.ini
  ```

기본값 편집 `config.ini` 다음 필드를 추가/주석 제거/수정하십시오.

* 체인 데이터베이스의 최대 크기를 MB 단위로 설정 - 사용 가능한 RAM보다 작은지 확인하십시오 (아래 값은 16GB RAM의 경우).

  ```ini
  chain-state-db-size-mb = 16384
  ```

> ℹ️ 체인 데이터베이스 최대 크기  
> 체인 데이터베이스의 최대 크기를 과대평가하지 않도록 주의하십시오.지정하는 값 `chain-state-db-size-mb` 메모리 매핑 파일로 디스크에 사전 할당됩니다. `state/shared_memory.bin`.

* 수신되는 http 요청을 수신하도록 로컬 IP 및 포트를 설정합니다.

  ```ini
  http-server-address = 0.0.0.0:8888
  ```

* 출처 간 리소스 공유 (CORS) 값 설정:
  ```ini
  access-control-allow-origin = *
  access-control-allow-headers = Origin, X-Requested-With, Content-Type, Accept
  ```

* 다음 필드를 지정된 값으로 설정하거나 주석 처리를 제거합니다.

  ```ini
  abi-serializer-max-time-ms = 2000
  chain-threads = 8
  contracts-console = true
  eos-vm-oc-compile-threads = 4
  verbose-http-errors = true
  http-validate-host = false
  http-threads = 6
  ```

* p2p 엔드포인트 목록 추가/업데이트:

  ```ini
  p2p-peer-address = <host1>:<port1>
  p2p-peer-address = <host2>:<port2>
  etc.
  ```

  > ℹ️ **피어링**  
  > 피어링에 대한 자세한 내용은 다음을 확인하십시오. [피어링](../10_getting-started/40_peering.md) 가이드, 특히 [동료를 찾는 방법](../10_getting-started/40_peering.md#how-to-locate-peers) 섹션.

 간단히 말해서, 가장 최근의 P2P 엔드포인트 목록을 교체하십시오. `config.ini` 배포하려는 EOS 네트워크에 따라:

 - https://validate.eosnation.io/

 예를 들어 EOS 메인넷, EOS 정글 테스트넷 또는 EOS Kylin 테스트넷의 최신 P2P 엔드포인트를 보려면 다음 사이트를 각각 방문할 수 있습니다.

 - https://validate.eosnation.io/eos/reports/config.txt
 - https://validate.eosnation.io/jungle4/reports/config.txt
 - https://validate.eosnation.io/kylin/reports/config.txt

* 활성화 `chain_api_plugin`:

  ```ini
  plugin = eosio::chain_api_plugin
  ```

### 푸시 API 노드 구성

다음 사항을 반드시 살펴보세요. [모든 API 노드 구성](#any-api-node-configuration) 섹션 먼저.다음 구성 설정은 푸시 API 노드에만 적용됩니다.

기본값 편집 `config.ini` 다음 필드를 추가/주석 제거/수정하십시오.

  ```ini
  p2p-accept-transactions = false
  ```

이제 Push API 노드가 구성되었으므로 다음 단계로 진행하십시오. [배포](#deployment) 섹션.

### 체인 API 노드 구성

다음 사항을 반드시 살펴보세요. [모든 API 노드 구성](#any-api-node-configuration) 섹션 먼저.다음 구성 설정은 모든 풀체인 API 노드에 적용됩니다.

기본값 편집 `config.ini` 다음 필드를 추가/주석 제거/수정하십시오.

* 들어오는 P2P 연결을 수신하려면 외부 IP 및 포트를 선택합니다.

  ```ini
  p2p-server-address = YOUR_EXTERNAL_IP_ADDRESS:9876
  ```

* 다음 필드를 지정된 값으로 설정하거나 주석 처리를 제거합니다.

  ```ini
  enable-account-queries = true
  p2p-listen-endpoint = 0.0.0.0:9876
  p2p-max-nodes-per-host = 100
  sync-fetch-span = 2000
  ```

이제 Chain API 노드가 구성되었으므로 다음 단계로 진행하십시오. [배포](#deployment) 섹션.

### 풀 API 노드 구성

다음 사항을 반드시 살펴보세요. [모든 API 노드 구성](#any-api-node-configuration) 섹션 먼저.다음 구성 설정은 모든 Pull API 노드에 적용됩니다.

기본값 편집 `config.ini` 다음 필드를 추가/주석 제거/수정하십시오.

* 들어오는 P2P 연결을 수신하려면 외부 IP 및 포트를 선택합니다.

  ```ini
  p2p-server-address = YOUR_EXTERNAL_IP_ADDRESS:9876
  ```

* 다음 필드를 지정된 값으로 설정하거나 주석 처리를 제거합니다.

  ```ini
  api-accept-transactions = false
  enable-account-queries = true
  p2p-listen-endpoint = 0.0.0.0:9876
  p2p-max-nodes-per-host = 100
  sync-fetch-span = 2000
  ```

이제 Pull API 노드가 구성되었으므로 다음 단계로 진행하십시오. [배포](#deployment) 섹션.

## 배포

API 노드를 구성한 후 아래 단계에 따라 노드를 배포할 수 있습니다.

### TCP 포트 열기

노드가 방화벽/라우터 뒤에서 실행되는 경우:
1.TCP 포트를 엽니다. `8888` **푸시 API** 노드를 설정하는 경우에만 
 또는
2.TCP 포트를 엽니다. `8888` 과 `9876`, **체인 API** 또는**풀 API** 노드를 설정하는 경우

Docker 컨테이너를 실행 중인 경우 위의 해당 포트도 여십시오.

### 최근 스냅샷 다운로드

다음으로, 노드의 블록체인 상태를 배포 중인 특정 EOS 블록체인과 동기화해야 합니다.이를 수행하는 가장 쉬운 방법은 최근 스냅샷에서 복원하는 것입니다.

> ℹ️ **스냅샷**  
> 스냅샷에 대한 자세한 내용은 다음을 확인하십시오. [스냅샷](../10_getting-started/50_snapshots.md) 안내서.

스냅샷을 다운로드할 수 있는 다양한 유명 사이트가 있습니다.다양한 EOS 네트워크의 최신 스냅샷을 관리하는 좋은 출처 중 하나는**EOS Nation AnteloPeio 스냅샷** 사이트입니다.

* https://snapshots.eosnation.io/

위 사이트를 방문하여 노드를 배포하려는 EOS 네트워크의 최신 스냅샷을 선택하십시오.예를 들어 EOS 메인넷, 정글 테스트넷 또는 Kylin 테스트넷의 경우 사이트의 다음 섹션에서 각각 스냅샷을 선택합니다.

* EOS 메인넷 - v6
* 정글 4 테스트넷 - v6
* 카일린 테스트넷 - v6

아래 지침에 따라 최신 스냅샷을 다운로드하십시오.

* 설치 `zstd` 아카이버 - 압축된 스냅샷을 압축 해제하려면 아카이버가 필요합니다.

  ```sh
  sudo apt install zstd
  ```

* 최신 압축 스냅샷 다운로드:

#### EOS 메인넷용

  ```sh
  wget https://snapshots.eosnation.io/eos-v6/latest -O $EOSDIR/snapshots/latest.bin.zst
  ```

#### 정글 테스트넷용

  ```sh
  wget https://snapshots.eosnation.io/jungle4-v6/latest -O $EOSDIR/snapshots/latest.bin.zst
  ```

#### 카일린 테스트넷의 경우

  ```sh
  wget https://snapshots.eosnation.io/kylin-v6/latest -O $EOSDIR/snapshots/latest.bin.zst
  ```

* 압축된 스냅샷 압축 해제:

  ```sh
  zstd -d $EOSDIR/snapshots/latest.bin.zst
  ```

그 `snapshots` 이제 디렉터리에 압축되지 않은 파일이 포함되어야 합니다. `latest.bin` 스냅숏.

### 최근 스냅샷에서 복원/시작

아래 지침에 따라 가장 최근에 다운로드한 스냅샷에서 노드를 복원/시작하십시오.

> ℹ `blocks` 디렉토리  
> 위의 지침을 반복하면 다음과 같은 문제가 발생할 수 있습니다. ` blocks` 디렉토리가 이미 있습니다. `$EOSDIR` 데이터 디렉터리.스냅샷에 최소한 블록을 포함해야 하는 블록 로그도 사용할 계획이 아니라면 기존 데이터를 모두 저장하는 것이 좋습니다. `blocks` 디렉토리가 제거되었습니다. `rm -rf $EOSDIR/blocks` 스냅샷에서 복원하기 전

* 최신 스냅샷에서 노드 복원/시작:

  ```sh
  nodeos --data-dir $EOSDIR --config-dir $EOSDIR --snapshot $EOSDIR/snapshots/latest.bin >> $EOSDIR/nodeos.log 2>&1 &
  ```

위 명령이 실행됩니다. `nodeos`, 리디렉션 `stdout` 과 `stderr` 에 `nodeos.log`.더 중요한 것은 `--snapshot` 옵션은 최신 스냅샷부터 시작하여 API 노드의 체인 상태를 배포 중인 EOS 네트워크 상태와 동기화합니다.여기에는 계정, 잔액, 계약 코드, 테이블 등이 포함되지만, 블록 로그에서 동기화하지 않는 한 과거 거래 내역은 포함되지 않습니다.하지만 동기화가 완료된 후에는 API 노드가 생성된 되돌릴 수 없는 최신 블록을 계속 수신해야 합니다. 이 블록에는 이제 최근 거래 내역이 포함됩니다.

> ℹ️ **과거 거래 내역**  
> API 노드에 과거 블록체인 기록을 남기려면 블록 로그에서 블록체인을 재생해야 합니다.하지만 이는 흔한 일이 아닙니다.과거 블록체인 히스토리의 경우 히스토리 노드와 같은 API 노드보다 더 나은 솔루션이 있습니다.

## 테스트

먼저, API 노드가 성공적으로 시작되었고 여전히 동기화 중이거나 블록을 수신 중인지 확인하세요.
```sh
tail -f $EOSDIR/nodeos.log
```
```
...
info  2023-08-15T23:16:04.797 nodeos    producer_plugin.cpp:651       on_incoming_block    ] Received block b9dd3609f8194902... #92772000 @ 2023-08-15T23:01:02.000 signed by jumpingfrogs [trxs: 0, lib: 92771671, confirmed: 0, net: 0, cpu: 1, elapsed: 55, time: 98, latency: 902797 ms]
info  2023-08-15T23:16:05.367 nodeos    producer_plugin.cpp:651       on_incoming_block    ] Received block 0966e24d95ef120f... #92773000 @ 2023-08-15T23:09:22.000 signed by ivote4eosusa [trxs: 1, lib: 92772667, confirmed: 0, net: 120, cpu: 1253, elapsed: 175, time: 272, latency: 403367 ms]
...
```

둘째, 스냅샷에서 API 노드가 성공적으로 초기화되었는지 확인하세요.검색: `snapshot` 에서 `nodeos.log` 파일:

```sh
grep -i snapshot $EOSDIR/nodeos.log
```
```
info  2023-08-15T23:15:55.395 nodeos    controller.cpp:603            startup              ] Starting initialization from snapshot and no block log, this may take a significant amount of time
info  2023-08-15T23:15:55.707 nodeos    controller.cpp:610            startup              ] Snapshot loaded, lib: 92757487
info  2023-08-15T23:15:55.707 nodeos    controller.cpp:613            startup              ] Finished initialization from snapshot
...
```

### 로컬 테스트

셋째, 로컬 테스트 `get_info` 끝점으로부터의 `chain_api_plugin` 방금 API 노드를 배포한 블록체인에 대한 정보를 요청하려면:

```sh
cleos get info
curl -L http://localhost:8888/v1/chain/get_info
```

또는 브라우저에서 다음 URL을 방문하십시오.

* http://localhost:8888/v1/chain/get_info

API 노드는 다음 응답을 반환해야 합니다.

```
{
  "server_version": "7e1ad13e",
  "chain_id": "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
  ...
  "head_block_producer": "alohaeostest",
  "virtual_block_cpu_limit": 200000000,
  ...
  "earliest_available_block_num": 92757488,
  "last_irreversible_block_time": "2023-08-17T16:02:05.500"
}
```

### 원격 테스트

마지막으로 일반인도 테스트해야 합니다. `get_info` API 노드를 공공 사용에 사용하려는 경우 엔드포인트:

```sh
cleos -u http://YOUR_EXTERNAL_IP_ADDRESS:8888 get info
curl -L http://YOUR_EXTERNAL_IP_ADDRESS:8888/v1/chain/get_info
```

또는 브라우저에서 다음 URL을 방문하십시오.

* http://YOUR_EXTERNAL_IP_ADDRESS:8888/v1/chain/get_info

> ℹ️ **원격 테스트 팁**  
> 네트워크 외부에서 엔드포인트 요청/URL을 전송/탐색해야 합니다.예를 들어 Wi-Fi 네트워크에서 모바일 장치 연결을 일시적으로 끊고 모바일 데이터/테더링을 사용할 수 있습니다.

API 노드는 위의 마지막 출력과 비슷한 응답을 반환해야 합니다.오류가 발생하는 경우 Wi-Fi 라우터 및 Docker 컨테이너 (있는 경우) 의 포트 포워딩 설정을 확인하세요.

## 요약

이 가이드에서는 EOS 메인넷, EOS Jungle 테스트넷, EOS Kylin 테스트넷 등과 같은 특정 EOS 네트워크에 API 노드를 구성하고 배포했습니다. 이제 해당 네트워크의 일부 기본 자산을 확보하고 API 노드를 사용하여 EOS 스마트 계약을 배포하고 트랜잭션을 전송하거나 블록체인 데이터를 가져오거나 둘 다 수행할 수 있습니다.
