---
title: 메타마스크 설정
---

'@site /src/Components/ConnectMetamask/ConnectMetamask'에서 ConnectMetaMask 가져오기;

이 버튼 중 하나를 클릭하면 EOS EVM을 메타마스크에 즉시 추가할 수 있습니다.

<커넥트메타마스크/>


## 수동 추가

지원하지 않는 지갑을 사용하는 경우 `wallet_addEthereumChain` 프로토콜, 네트워크를 추가할 수 있습니다
아래 정보를 사용하여 수동으로.


### 메인넷

* `Network Name`: 에오스 에브엠
* `Chain ID`: 17777
* `New RPC URL`: https://api.evm.eosnetwork.com/
* `Currency Symbol`: 에오스
* `Block Explorer URL (Optional)`: https://explorer.evm.eosnetwork.com/
* `Token Bridge`: https://bridge.evm.eosnetwork.com/

### 테스트넷

* `Network Name`: EOS EVM 테스트넷
* `Chain ID`: 15557
* `New RPC URL`: https://api.testnet.evm.eosnetwork.com/
* `Currency Symbol`: 에오스
* `Block Explorer URL (Optional)`: https://explorer.testnet.evm.eosnetwork.com/
* `Token Bridge`: https://bridge.testnet.evm.eosnetwork.com/

