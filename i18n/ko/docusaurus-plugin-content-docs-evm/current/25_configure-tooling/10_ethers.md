---
title: 에테르
---



[에테르](https://github.com/ethers-io/ethers.js) 지금까지 가장 많이 사용되는 EVM용 자바스크립트 SDK입니다.

EOS EVM과 함께 Ethers를 사용하는 것은 다른 EVM 호환 체인과 함께 사용하는 것과 같습니다.
한 가지 주의할 점은 이 문서를 작성하는 시점에서 RPC 엔드포인트는 배치 요청을 지원하지 않으므로 비활성화해야 한다는 것입니다.
제공자 생성 시 일괄 처리:

```javascript
import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider("https://api.evm.eosnetwork.com/", undefined, {
    batchMaxCount: 1
});
```
