---
title: EVM 토큰
--- 

더 `EOS` 토큰 온 `EOS EVM` 에 있는 것과 똑같은 토큰입니다. `EOS Network`.

이것은 다음을 의미합니다 `EOS` 거래소에서 볼 수 있는 토큰은 사용하는 토큰과 동일합니다. `EOS EVM`.그러나 대부분의 이후 
거래소는 해당 토큰의 네이티브 버전만 지원합니다. EVM에서 사용하려면 토큰을 *브리지*해야 합니다.

## 테스트넷 수도꼭지

EOS 토큰을 가지고 놀고 싶으신가요?아래 버튼을 클릭하여 테스트넷 수도꼭지에서 일부를 가져오세요.

<!-- translation-ignore -->

import FaucetTokens from '@site/src/components/FaucetTokens/FaucetTokens';

<FaucetTokens />

<!-- end-translation-ignore -->

## EOS에서 EOS EVM으로 이어지는 브릿지

### 브릿지 토큰을 직접 

**EOS** 토큰이 있는 경우 `EOS Mainnet` 또는 `Jungle Testnet`, **EOS**를 EVM 주소로 직접 보낼 수 있습니다.
지갑을 열고 **EOS** 토큰을 다음 주소로 보내십시오. `eosio.evm` EVM 주소를 다음과 같이 사용 `memo`.


### 거래소의 브리지 토큰

> ⚠ **고지 사항: **
> 
> 모든 거래소가 스마트 컨트랙트에 토큰을 보내는 것을 지원하는 것은 아닙니다.사용 중인 거래소에 따라 필요할 수 있습니다.
> 먼저 토큰을 자신의 지갑으로 보낸 다음 이전 섹션의 지침을 따르십시오.

중앙 집중식 거래소 (CEX) 에서 EOS EVM 주소로 EOS 토큰을 인출하려면:

1.거래소 앱의 출금 화면으로 이동
2.EOS를 코인으로 선택
3.EOS를 네트워크로 선택
4.들어가기 `eosio.evm` 지갑 주소로
5.EOS EVM 공개 키를 메모로 입력하세요

![EOS EVM Token Flow](/images/EOS-EVM_withdraw_from_CEX_to_wallet.png)




## EOS EVM에서 EOS로 이어지는 브릿지

### 브릿지 토큰을 직접

EVM 주소에서 EOS 계정으로 토큰을 전송하려면 다음을 사용해야 합니다. [EOS EVM 메인넷 브리지](https://bridge.evm.eosnetwork.com/)
또는 [EOS EVM 정글 테스트넷 브리지](https://bridge.testnet.evm.eosnetwork.com/).

1.선택 `Withdraw`
2.지갑을 연결하세요
3.금액 입력
4.보낼 EOS 계정을 입력합니다.
 1.선택적 메모 추가
5.클릭 `Transfer`

### 토큰을 거래소에 연결

> ⚠ **고지 사항: **
>
> 일부 거래소는 아직 EOS에서의 인라인 전송 추적을 지원하지 않아 EOS EVM 전송을 볼 수 없습니다. 
> 거래소에서 이를 지원하는지 확실하지 않은 경우 먼저 토큰을 네이티브 EOS 네트워크에 연결한 다음 보내십시오.
> 귀하의 거래소 계좌로.

위와 동일한 절차를 따를 수 있지만 EOS 계정을 입력하는 대신 거래소 계정 이름을 입력하십시오.

대부분의 EOS 거래소에는 a가 필요합니다 `memo` 필드에 입력해야 하므로 반드시 입력해야 합니다.**그렇지 않으면 토큰이 손실됩니다**.








## 기타 알려진 토큰

| 심볼 | 토큰 이름 | 주소 |
|-----------|-----------------|----------------------------------------------------------------|
| EOS | 래핑된 EOS | 0xC00592A41D32D137DC480D9F6D0dF19B860104f |
