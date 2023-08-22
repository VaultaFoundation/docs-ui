---
title: 피어링
---

# 피어링

EOS 블록체인은 하나 이상의 노드로 구성될 수 있습니다.단일 노드가 완전한 기능을 갖춘 블록체인을 실행할 수는 있지만 확장하거나 성장할 수는 없습니다.EOS 블록체인 기술의 모든 이점을 파악하려면 더 많은 노드가 필요합니다.이 섹션에서는 이를 가능하게 하는 네트워크 기능인 “피어링”에 대해 알아봅니다.이를 통해 단일 노드에서 진정으로 분산되고 지리적으로 분산된 다중 노드 EOS 블록체인으로 점진적으로 성장할 수 있습니다.

## 피어링이란 무엇인가요?

피어링은 EOS 노드가 블록 및/또는 트랜잭션을 수신하고 다른 노드로 전달함으로써 분산된 블록체인 상태를 전파하고 동기화할 수 있도록 합니다.P2P 방식으로 데이터를 송수신하도록 구성된 모든 노드는 “피어”로 간주됩니다.이렇게 하면 중복성이 추가되고 클라이언트 쿼리와 노드 요청에 대한 응답 시간이 빨라집니다.따라서 피어링은 EOS 블록체인의 탈중앙화 운영과 점진적 성장의 핵심입니다.

> ℹ️ EOS 네트워크 프로토콜 
피어링은 EOS Peer-to-Peer (p2p) 네트워크 프로토콜을 통해 활성화되며, 이를 통해 블록체인의 분산된 운영이 가능합니다.자세한 내용은 다음을 확인하십시오. [EOS 네트워크 프로토콜](../../60_advanced-topics/03_network-peer-protocol.md).

## 노드/피어가 필요한 이유는 무엇입니까?

EOS 블록체인에서는 노드가 다양한 방식으로 작동하도록 구성할 수 있습니다.노드가 서로 다른 역할을 수행하도록 하는 유연성 덕분에 최종 사용자는 부하를 더 분산하고 더 원활한 블록체인 경험을 제공할 수 있습니다.EOS의 일부 노드 유형에는 다음이 포함되지만 이에 국한되지는 않습니다.

* **노드 생성**: 체인에 추가할 블록을 생성합니다.
***릴레이 노드**: 블록 및/또는 트랜잭션의 검증/릴레이
***API 노드**: HTTP를 통해 클라이언트의 API 쿼리에 응답합니다.
* **히스토리 노드**: L2 히스토리 솔루션의 체인 데이터를 저장합니다.
* 기타

따라서 피어로 설정된 EOS 노드는 수신한 블록과 트랜잭션을 검증하고 유효한 경우 기본적으로 다른 피어에 전달합니다.클라이언트의 API 요청에 응답하고 블록 및 트랜잭션에 대한 과거 데이터를 제공하도록 노드를 설정할 수도 있습니다. 이러한 관심사를 분리하면 블록체인의 효율성이 향상됩니다.

## 피어 설정 방법

> ℹ️ 피어 설정 
피어 연결 프로세스는 각 피어의 로컬 환경에서 수행되어야 합니다.따라서 피어링에는 EOS 네트워크에서 피어 역할을 할 일부 노드 간의 계획 및 합의가 포함됩니다.

다음을 구성하여 피어링을 설정할 수 있습니다. `net_plugin` 각각의 `nodeos` 노드가 피어 역할을 할 인스턴스가장 중요한 옵션은 다음과 같습니다.

* `p2p-listen-endpoint arg`: 로컬 `host:port` 들어오는 P2P 연결의 경우
* `p2p-server-address arg`: 공개 `host:port` 들어오는 P2P 연결의 경우
* `p2p-peer-address arg`: 로컬 또는 원격 피어 `host:port` 연결 대상

그 `p2p-listen-endpoint` 인수는 로컬 IP 주소 또는 호스트 이름과 로컬 노드 인스턴스가 다른 피어로부터 들어오는 연결을 수락하기 위한 수신 소켓의 포트 번호를 보유합니다. `p2p-server-address` 인수는 다른 피어가 연결할 공용 IP 주소 또는 호스트 이름과 포트 번호를 보유합니다.지정하지 않을 경우 `p2p-server-address` 지정된 값이 기본값입니다. `p2p-listen-endpoint`.그 `p2p-server-address` 옵션은 노드가 내부적으로 사용하는 것과 다른 외부 주소를 제공하는 프록시 또는 방화벽이 있는 시나리오에서 유용할 수 있습니다.

최대 연결 수를 제한하거나, 공개 키별로 특정 피어를 화이트리스트에 추가하고, 트랜잭션을 수락/릴레이하는 등의 다른 옵션을 사용할 수 있습니다. 다음을 확인하십시오. `net_plugin` 의 옵션 `nodeos` 자세한 내용은 여기를 참조하십시오.

### 피어 설정 사용 `config.ini`

로컬 노드를 다른 노드와 피어링하려면 노드에 다음을 지정하십시오. `config.ini` *출시 전* `nodeos` 인스턴스:

```ini
# your listening host:port
p2p-listen-endpoint = <myhost>:<myport>   # e.g. 0.0.0.0:9876
# your public host:port
p2p-server-address = <mypubhost>:<myport> # e.g. p2p.eos99.io:9876

# peers host:port (for each peer to connect to)
p2p-peer-address = <host1>:<port1>  # e.g. peer.leap.sg:9876
p2p-peer-address = <host2>:<port2>  # e.g. p2p.eosphere.io:3571
# etc.
```

### 명령줄 (CLI) 을 사용한 피어 설정

로컬 노드를 다른 노드와 피어링하려면 다음을 실행할 때* nodeos 명령줄 인수에 다음을 지정하십시오. `nodeos` 인스턴스:

```shell
nodeos ... \
  p2p-listen-endpoint = <myhost>:<myport> \
  p2p-server-address = <mypubhost>:<myport> \
  p2p-peer-address = <host1>:<port1> \
  p2p-peer-address = <host2>:<port2> \
  ...
```

이전 섹션 확인 [`config.ini'를 사용한 피어 설정](#peer-setup-using-configini) 다음과 같은 잠재적 가치에 대한 예를 들어 `p2p-listen-endpoint`, `p2p-server-address`, 그리고 `p2p-peer-address`.

## 동료를 찾는 방법

EOS 메인넷 및 다양한 테스트넷의 경우 일부 웹 사이트에서는 노드가 연결할 수 있는 P2P, API 및 기타 엔드포인트 목록을 게시하고 관리합니다.

> ℹ️ 엔드포인트 및 BP.json 
엔드포인트 목록은 일반적으로 표준에서 생성, 검증 및 결합됩니다. `bp.json` 스탠바이 프로듀서를 포함한 블록 프로듀서가 제공하는 파일

EOS 메인넷 및 다양한 EOS 테스트넷의 *모든* 활성 엔드포인트 (P2P, API, History 등) 의 최신 상태를 유지하는 중앙 포털의 경우 EOS Nation Validate 포털을 방문하여 특정 네트워크의**엔드포인트 보고서**를 선택할 수 있습니다.

* EOS 메인넷 엔드포인트: https://validate.eosnation.io/eos/reports/endpoints.html
* 정글 테스트넷 엔드포인트: https://validate.eosnation.io/jungle4/reports/endpoints.html
* 카일린 테스트넷: https://validate.eosnation.io/kylin/reports/endpoints.html

위의 **엔드포인트 보고서** 중 하나를 확인하면 아래로 스크롤하여 관심 있는 특정 엔드포인트로 이동할 수 있습니다. `api_http` 또는 `api_https2` API 엔드포인트의 경우 `p2p` P2P 엔드포인트 등용

### EOS 메인넷의 경우

위의 상위 섹션에 열거된**엔드포인트 보고서** URL 외에도 [동료를 찾는 방법](#how-to-locate-peers), 다음 엔드포인트를 직접 추가할 수 있습니다. `config.ini`:

* P2P 엔드포인트: https://validate.eosnation.io/eos/reports/config.txt

위의 P2P 엔드포인트 목록에는 다음과 비슷한 내용이 표시되어야 합니다.

```ini
# Endpoints config.ini
# Network: EOS
# Validator last update: 2023-06-12 19:32 UTC
# For details on how this is generated see https://validate.eosnation.io/about/
# ==== p2p ====
# alohaeosprod: GB, London
p2p-peer-address = peer.main.alohaeos.com:9876
# argentinaeos: AR, argentina
p2p-peer-address = p2p.eosargentina.io:9876
...
# ivote4eosusa: US, Greenville,SC,USA
p2p-peer-address = eos.p2p.eosusa.io:9882
```

* API 엔드포인트: https://validate.eosnation.io/eos/reports/api_versions.txt

위의 API 엔드포인트 목록에는 다음과 비슷한 내용이 표시되어야 합니다.

```ini
# API Versions Report
# Network: EOS
# Validator last update: 2023-06-12 20:06 UTC
# For details on how this is generated see https://validate.eosnation.io/about/
==== 4.0.1 (leap) ====
aus1genereos api_https2, v4.0.1, https://eos.genereos.io, ...
eosnationftw  api_http, v4.0.1, http://eos.api.eosnation.io, ...
...
==== 3.1.0 (leap) ====
eosamsterdam api_http, v3.1.0, http://mainnet.eosamsterdam.net, ...
eosamsterdam api_https2, v3.1.0, https://mainnet.eosamsterdam.net, ...
...
teamgreymass api_http, v3.1.0, http://eos.greymass.com, ...
teamgreymass api_https2, v3.1.0, https://eos.greymass.com, ...
```

### EOS 테스트넷의 경우

상위 섹션에 나열된 **엔드포인트 보고서** URL 외에도 [동료를 찾는 방법](#how-to-locate-peers), 다음 엔드포인트를 직접 추가할 수 있습니다. `config.ini` 다음 EOS 테스트넷의 경우:

#### EOS 정글 테스트넷

* P2P 엔드포인트: https://validate.eosnation.io/jungle4/reports/config.txt
* API 엔드포인트: https://validate.eosnation.io/jungle4/reports/api_versions.txt

#### EOS 카일린 테스트넷

* P2P 엔드포인트: https://validate.eosnation.io/kylin/reports/config.txt
* API 엔드포인트: https://validate.eosnation.io/kylin/reports/api_versions.txt

## 동료 건강 확인 방법

일부 웹 포털은 퍼블릭 P2P 및 API 엔드포인트의 상태를 확인하기 위한 정기 보고서 및/또는 실시간 모니터링을 제공합니다.또한 일부 실시간 도구를 사용하면 P2P 또는 API 엔드포인트의 근접성 및/또는 응답 시간을 추정할 수 있습니다.

### EOS 네이션 리포트

EOS Nation은 EOS 메인넷과 다양한 EOS 테스트넷 모두에 대해 블록 생성 노드의 상태를 포함한 다양한 엔드포인트의 상태에 대한 광범위한 보고서를 제공합니다.

* EOS 메인넷 보고서: https://validate.eosnation.io/eos/reports/
* 정글 테스트넷 보고서: https://validate.eosnation.io/jungle4/reports/
* 카일린 테스트넷 보고서: https://validate.eosnation.io/kylin/reports/

위 보고서에 나열된 엔드포인트는 30분마다 검증되고 새로 고쳐지므로 해당 보고서에 엔드포인트가 있는 것만으로도 *반응형* 상태임을 나타냅니다.도중 발견된 기타 오류에 대해서는 `bp.json` 검증, 다음 리소스를 확인하십시오.

* EOS 메인넷 오류 보고서: https://validate.eosnation.io/eos/reports/errors.html
* 정글 테스트넷 오류 보고서: https://validate.eosnation.io/jungle4/reports/errors.html
* 카일린 테스트넷 오류 보고서: https://validate.eosnation.io/kylin/reports/errors.html

### 타사 도구

일부 도구를 사용하여 P2P 및/또는 API 엔드포인트 목록의 응답성 또는 응답성 부족을 측정할 수 있습니다.

* [더 가까이](https://medium.com/hackernoon/find-the-best-api-endpoint-for-your-eos-dapp-7b7489cb6449)  
  API 엔드포인트 목록을 수신하고 HTTP 요청-응답 시간을 반환합니다.엔드포인트가 응답하지 않으면 결국 타임아웃이 되어 목록에 표시되지 않습니다.

## 요약

피어링은 모든 EOS 블록체인 네트워크의 탈중앙화 운영에 매우 중요합니다.이를 통해 모든 노드와 피어 간에 블록체인 상태를 동기화하고 분배하여 더 원활하고 빠른 블록체인 경험을 제공할 수 있습니다.모든 EOS 블록체인이 유기적으로 성장하고, 합의에 도달하고, 자체 거버넌스를 달성하고, 블록체인 기술의 많은 이점을 활용하려면 피어링이 필요합니다.
