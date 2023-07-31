---
title: 스마트 컨트랙트 마이그레이션
---

이 가이드에서는 EOS EVM 메인넷과 테스트넷 모두에서 하드햇을 사용하여 EOS EVM에 스마트 계약을 배포하는 방법을 설명합니다.

## 메타마스크 설정

이 버튼 중 하나를 클릭하면 EOS EVM을 메타마스크에 즉시 추가할 수 있습니다.

<!-- translation-ignore -->

import ConnectMetaMask from '@site/src/components/ConnectMetaMask/ConnectMetaMask';

<ConnectMetaMask />

<!-- end-translation-ignore -->


## EOS 토큰 받기

EOS 토큰을 가지고 놀고 싶으신가요?아래 버튼을 클릭하여 테스트넷 수도꼭지에서 일부를 가져오세요.


<!-- translation-ignore -->

import FaucetTokens from '@site/src/components/FaucetTokens/FaucetTokens';

<FaucetTokens />

<!-- end-translation-ignore -->

테스트넷을 사용하는 경우 다음을 사용하여 EOS 토큰을 얻을 수 있습니다. [**테스트넷 수도꼭지**](https://faucet.testnet.evm.eosnetwork.com/).

[EOS 메인넷을 사용하는 경우] 표준 EOS 전송을 사용하여 네이티브 EOS를 전송할 수 있습니다.
- 토큰 전송 대상: `eosio.evm`
- 설정 `memo` 귀하의 EOS EVM 주소로

EOS 토큰을 얻는 더 많은 방법은 다음을 확인하세요. [EVM 토큰](/evm/10_quick-start/03_evm-tokens.md) 페이지.

## 안전모 구성

새로운 하드햇 프로젝트를 설정하고 싶다면 해당 프로젝트로 가보세요. [퀵 스타트](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start)
가이드.


당신의 마음을 열어보세요 `hardhat.config.js` 파일을 작성하고 다음 구성을 추가합니다.


```javascript
const config: HardhatUserConfig = {
    // ...

    networks: {
        eosevm: {
            url: "https://api.evm.eosnetwork.com",
            accounts:[process.env.PRIVATE_KEY],
        },
        eosevm_testnet: {
            url: "https://api.testnet.evm.eosnetwork.com",
            accounts:[process.env.PRIVATE_KEY],
        }
    }
};
```

> 🔑 **프라이빗 키**
> 
> 우리가 사용하고 있다는 점에 유의하십시오 `process.env.PRIVATE_KEY` 코드에 개인 키가 노출되지 않도록 하기 위해서죠.
> 즉, 다음과 같은 것을 사용해야 합니다. `dotenv` 키를 환경에 주입하려면
> 환경에 수동으로 추가하거나 환경 변수를 개인 키로 직접 바꿀 수 있습니다.
> 
> 그러나 실제 키를 이 파일에 넣는 것은 공용 리포지토리에 커밋될 수 있으므로 주의해야 합니다.
> 그리고 개인 키를 누구와도 공유해서는 안 됩니다.

## 계약 배포

이제 계약을 EOS EVM 테스트넷에 배포할 수 있습니다.

```bash
npx hardhat run scripts/deploy.js --network eosevm

// or for testnet
npx hardhat run scripts/deploy.js --network eosevm_testnet
```

배포되면 새 계약의 주소가 표시되며, 이를 붙여넣으면 탐색기에서 볼 수 있습니다. 
검색 필드로.

- [**테스트넷 익스플로러**](https://explorer.testnet.evm.eosnetwork.com/)
- [**메인넷 익스플로러**](https://explorer.evm.eosnetwork.com/)

![deploy hardhat](/images/deploy_hardhat.png)

## 축하합니다!

첫 번째 스마트 계약을 EOS EVM에 성공적으로 배포했습니다!🎉

스마트 계약과 상호 작용하는 프런트 엔드 애플리케이션이 이미 있는 경우 이제 다음을 가리킬 수 있습니다. 
[EOS EVM 엔드포인트](/evm/999_miscellaneous/10_endpoints.md), 예상대로 작동합니다.

꼭 방문하세요 [**호환성**](/evm/999_miscellaneous/20_evm-compatibility.md) 섹션 간의 차이점에 대해 알아보십시오.
EOS EVM과 이더리움, 그리고 web3 애플리케이션이 EOS EVM에서 예상대로 작동하는지 확인하는 방법
