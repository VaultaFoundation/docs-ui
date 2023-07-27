---
title: 개요
---

EOS EVM은 EOS 네트워크에서 실행되는 스마트 계약을 구현합니다. 앞으로는 이를 다음과 같이 부르겠습니다. 
`EVM Contract`.트랜잭션을 EOS EVM 네트워크로 전송하려면 트랜잭션을 EVM Contract에 전송해야 합니다. 
EOS EVM 계약은 이더리움 EVM과 완벽하게 호환되며, 다음과 같은 몇 가지 작은 차이점이 있을 수 있습니다. 
에서 상담했습니다 [EVM 호환성](/evm/999_miscellaneous/20_evm-compatibility.md) 섹션.

완전한 RPC 호환성을 달성하기 위해 완벽하게 작동하는 이더리움 노드가 사용됩니다.EOS EVM 테스트넷 및 메인넷 
Silkworm 노드 위에 구축된 이더리움 노드를 사용합니다. 이 시점부터 이름을 다음과 같이 부르겠습니다. `EOS EVM Node`.

EOS EVM 클라이언트에서 보낸 모든 RPC 요청, 읽기 및 쓰기는 먼저 프록시 구성 요소에 의해 처리됩니다. 
요청을 다음과 같이 리디렉션합니다.

- EOS EVM RPC 구성 요소에 대한 읽기 및
- 트랜잭션 래퍼 서비스에 대한 쓰기.

### 읽기 요청

JSON-RPC 읽기 요청은 다음과 같은 포크인 EOS EVM RPC 구성 요소에서 지원됩니다. 
[실크/PC](https://github.com/torquem-ch/silkrpc) 거의 모든 이더리움을 지원하는 데몬으로 구현되었습니다. 
JSON-RPC는 EOS EVM 계약에 의해 관리되는 가상 EVM 블록체인을 위한 것입니다.RPC 방법 중 두 가지는 `eth_sendRawTransaction` 
과 `eth_gasPrice` 이 데몬이 처리하는 것이 적절하지 않기 때문에 의도적으로 비활성화됩니다.대신 요청 
두 메서드가 이 두 RPC 메서드를 지원하도록 특별히 설계된 트랜잭션 래퍼 서비스로 라우팅되기 때문입니다.

EOS EVM RPC 구성 요소는 (가상) EVM 블록체인을 위해 실행 클라이언트가 관리하는 데이터베이스를 사용합니다.더 익스큐션 
클라이언트는 EOS EVM 노드 구성 요소이며, 이는 포크입니다. [누에](https://github.com/torquem-ch/silkworm) 작동하도록 수정 
EOS EVM (예: 트러스트리스 브리지) 을 지원하는 데 필요한 EVM 런타임이 변경되었습니다.

EOS EVM 노드는 EOS EVM 계약에 의해 처음 수행된 EVM 트랜잭션 실행을 정확히 재현해야 합니다. 
EOS EVM 계약에서 추출한 데이터를 사용하여 EOS EVM 계약에 의해 관리되는 가상 EVM 블록체인을 재구성해야 합니다. 
이오스 블록체인.이를 용이하게 하기 위해 EOS EVM 노드는 EOS 노드의 ShiP (상태 기록 플러그인) 엔드포인트에 연결됩니다. 
EOS 블록체인의 일부입니다.

이 아키텍처를 통해 필요한 경우 이더리움 클라이언트 Web3 JSON RPC API와 잠재적으로 다른 API를 노출할 수 있습니다.

### 쓰기 요청

앞서 언급한 것처럼, 두 가지 RPC 방법은 `eth_sendRawTransaction` 과 `eth_gasPrice`, EOS EVM RPC에 의해 구현되지 않습니다. 
대신 다음과 같이 구현됩니다. `Transaction Wrapper` (아래 다이어그램에서) `Tx Wrapper`) 구성 요소.따라서, 모두 
*쓰기 요청*은 트랜잭션 래퍼로 전달되며, 트랜잭션 래퍼는 이를 EOS 작업으로 압축하여 EVM Contract로 전송합니다.

트랜잭션 래퍼의 주요 목적은 다음을 통해 원시 EVM 트랜잭션을 가져오는 것입니다. `eth_sendRawTransaction` 및 푸시 
EOS EVM 계약에 가입하세요. 
다음 단계를 통해 이 작업을 수행합니다.

1.다음을 포함하는 EOS 트랜잭션을 구성합니다. `pushtx` rlp로 인코딩된 EVM 트랜잭션을 포함하는 EOS EVM 계약의 조치
2.채굴자 역할을 하는 EOS 계정의 키로 EOS 거래를 체결합니다. `pushtx` 조치를 취하고 EOS 거래의 CPU/순 비용을 지불합니다.
3.서명된 EOS 트랜잭션을 EOS 네트워크에 연결된 EOS 노드의 체인 API를 통해 EOS 블록체인으로 전송합니다.

트랜잭션 래퍼는 또한 지원합니다 `eth_gasPrice` RPC 방식은 읽기 방식이라는 사실에도 불구하고 
구현은 또한 EOS 노드의 체인 API에 대한 액세스에 따라 달라집니다.특히, 단순히 최저 휘발유 가격을 유지합니다. 
적절한 테이블에서 EOS EVM 계약에 구성하고 이를 호출자에게 반환합니다.

![Overall Design of the EOS EVM](/images/EOS-EVM_design_drawio.svg)

이 아키텍처를 사용하면 필요하다고 판단되는 경우 다른 이더리움 노드 구현을 사용할 수 있습니다. 
일부 특정 시나리오의 경우
