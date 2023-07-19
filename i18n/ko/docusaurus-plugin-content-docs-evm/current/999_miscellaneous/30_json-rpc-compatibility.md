---
title: JSON RPC 호환성
---

모든 JSON-RPC 호출은 Silkworm 노드를 기반으로 구축된 모든 기능을 갖춘 EOS EVM 노드 덕분에 기본적으로 지원됩니다.그러나 현재 단계에서는 다음과 같은 이유로 일부 메서드가 차단되었습니다.

* 일부 메서드는 더 이상 사용되지 않거나 중단되었습니다.
* 일부 방법은 로컬 노드 시나리오에 맞게 설계되었습니다.공개 API에는 노출되지 않지만 자체 EOS EVM 노드를 배포할 때 액세스할 수 있습니다.
* 일부 방법은 복잡한 로직을 수반하므로 노출되기 전에 더 많은 테스트를 수행해야 합니다.

## RPC 목록

노트:
* 아래 나열된 JSON-RPC 호출에는 현재 단계에서 차단된 메서드가 포함되지 않습니다.
* “EOS EVM Node-SlowQuery”는 느리거나 무거운 쿼리를 처리하는 전용 노드를 위해 지정되었습니다.이는 이러한 느린 쿼리로 인해 다른 메서드 요청을 처리하는 일반 노드의 성능이 중단되거나 저하되지 않도록 하기 위한 것입니다.

| RPC 방식 | 목적지 |
| ----------------------------------- | ------------ |
| 넷\ _버전 | EOS EVM 노드 |
| eth\ _블록넘버 | EOS EVM 노드 |
| eth\ _체인ID | 이오스 EVM 노드 |
| eth\ _프로토콜버전 | EOS EVM 노드 |
| eth\ _GasPrice | Tx 래퍼 |
| eth\ _GetBlockbyHash | EOS EVM 노드 |
| eth\ _GetBlockbyNumber | EOS EVM 노드 |
| eth\ _해시별 블록 트랜잭션 카운트 가져오기 | EOS EVM 노드 |
| eth\ _번호별 블록 트랜잭션 수 가져오기 | EOS EVM 노드 |
| eth\ _GetUncleby 블록 해시 및 인덱스 | EOS EVM 노드 |
| eth\ _블록 번호 및 인덱스별 언클 가져오기 | EOS EVM 노드 |
| eth\ _블록해시별 언클 카운트 가져오기 | EOS EVM 노드 |
| eth\ _블록 번호별 언클 카운트 가져오기 | EOS EVM 노드 |
| eth\ _해시로 트랜잭션 가져오기 | EOS EVM 노드 |
| eth\ _GetRawTransaction by Hash | EOS EVM 노드 |
| eth\ _블록 해시와 인덱스로 트랜잭션 가져오기 | EOS EVM 노드 |
| eth\ _블록 해시와 인덱스를 통한 원시 트랜잭션 가져오기 | EOS EVM 노드 |
| eth\ _블록 번호 및 인덱스로 트랜잭션 가져오기 | EOS EVM 노드 |
| eth\ _블록 번호 및 인덱스로 원시 트랜잭션 가져오기 | EOS EVM 노드 |
| eth\ _거래 영수증 받기 | EOS EVM 노드 |
| eth\ _GetBlockReceipts | EOS EVM 노드 |
| eth\ _EstimateGas | EOS EVM 노드 |
| eth\ _GetBalance | EOS EVM 노드 |
| eth\ _GetCode | EOS EVM 노드 |
| eth\ _GetTransactionCount | EOS EVM 노드 |
| eth\ _GetStorageAt | EOS EVM 노드 |
| eth\ _call | EOS EVM 노드 |
| eth\ _콜번들 | EOS EVM 노드 |
| eth\ _액세스 목록 생성 | EOS EVM 노드 |
| eth\ _GetLogs | EOS EVM 노드-슬로우 쿼리 |
| eth\ _SendDrawTransaction | Tx 래퍼 |
| 디버그\ _트레이스 블록 바이 해시 | EOS EVM 노드-슬로우 쿼리 |
| 디버그\ _번호별 블록 추적 | EOS EVM 노드 - 슬로우 쿼리 |
| 디버그\ _트랜잭션 추적 | EOS EVM 노드-슬로우 쿼리 |
| 디버그\ _트레이스콜 | EOS EVM 노드-슬로우 쿼리 |
| 트레이스\ _콜 | EOS EVM 노드-슬로우 쿼리 |
| 트레이스\ _콜매니 | EOS EVM 노드-슬로우 쿼리 |
| 트레이스\ _로트랜잭션 | EOS EVM 노드-슬로우 쿼리 |
| 추적\ _리플레이블록 트랜잭션 | EOS EVM 노드-슬로우 쿼리 |
| 트레이스\ _리플레이트랜잭션 | EOS EVM 노드-슬로우 쿼리 |
| 트레이스\ _블록 | EOS EVM 노드-슬로우 쿼리 |
| 트레이스\ _필터 | EOS EVM 노드-슬로우 쿼리 |
| 트레이스\ _겟 | EOS EVM 노드-슬로우 쿼리 |
| 트레이스\ _트랜잭션 | EOS EVM 노드-슬로우 쿼리 |

## 일괄 요청

요청 객체 배열을 본문으로 JSON-RPC API에 보내는 것은 현재 지원되지 않습니다.이 경우 서버는 400 오류를 반환합니다.이로 인해 문제가 발생하는 경우 이 기능이 지원될 때까지 해결 방법을 시도해 보십시오.

실패한 요청 본문의 예:
```json
[{"method":"eth_chainId","params":[],"id":1,"jsonrpc":"2.0"},{"method":"eth_blockNumber","params":[],"id":2,"jsonrpc":"2.0"}]
```
