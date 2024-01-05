---
title: 비문
---

EVM 체인의 비문은 다음을 사용하여 체인의 역사에 기록된 임의의 데이터입니다. `calldata` 들판.
데이터는 체인의 히스토리에만 저장되고 상태 자체에는 저장되지 않기 때문에 비용이 절감됩니다.
체인에 데이터 전송.

하지만 데이터가 실제로 상태로 저장되지 않기 때문에 스마트 계약 내에서 데이터를 사용하는 것은 불가능합니다.
즉, 데이터가 상태로 기록되기 전까지는 인스크립션은 인덱싱 및 기타 오프체인 용도로만 유용합니다.

## 가스 요금, 처리량, 등록

대부분의 다른 EVM 지원 체인에서는 등록이 가스 요금에 엄청난 상승 압력을 가하고 있습니다.
처리량 저하.하지만 EOS EVM에서는 가스 요금이 고정되어 있으며 체인은 가스 요금을 충분히 처리할 수 있습니다.
처리량에 큰 영향을 주지 않으면서 비문을 로드할 수 있습니다.

### 인스크립션을 테스트하고 싶으세요?

여기의 각 섹션에는 인스크립션 데이터로 메타마스크 트랜잭션을 트리거하는 데 사용할 수 있는 양식이 있습니다.
이를 사용하려면 먼저 메타마스크로 로그인해야 합니다.

<!-- translation-ignore -->

import LoginMetaMask from '@site/src/components/LoginMetaMask/LoginMetaMask';

<LoginMetaMask />

<!-- end-translation-ignore -->

## 비문 형식

비문은 간단합니다. `JSON` 트랜잭션의 호출 데이터에 포함될 수 있는 형식입니다.
형식을 준수해야 합니다. 그렇지 않으면 인덱서와 같은 타사 도구로는 데이터를 처리할 수 없습니다.

> ✔ **다른 필드를 추가할 수 있습니다**
>
> 에 필드를 자유롭게 추가할 수 있습니다. `JSON` 특정 프로젝트에 도움이 될 수 있는 객체
> 하지만 아래의 모든 필드는 필수입니다.

```json
{
  "p": "eorc-20",
  "op": "deploy",
  "tick": "orcs"
}
```

| 키 | 설명 |
| --- |------------------------------------------------|
| `p` | 프로토콜은 툴링이 이벤트를 식별하고 처리하는 데 도움이 됩니다. |
| `op` | 작업 유형: `deploy, mint, transfer, list`      |
| `tick` | 토큰 티커 |


### 배포

```json
{ 
  "p": "eorc-20",
  "op": "deploy",
  "tick": "orcs",
  "max": "420420",
  "lim": "69"
}
```

| 키 | 설명 |
| --- |-------------------------|
| `max` | 토큰의 최대 공급량 |
| `lim` | 비문당 민트 한도 |

<!-- translation-ignore -->

import Inscribe from '@site/src/components/Inscribe/Inscribe';

<Inscribe type="deploy" />

<!-- end-translation-ignore -->


### 민트

```json
{ 
  "p": "eorc-20",
  "op": "mint",
  "tick": "orcs",
  "amt": "69"
}
```

| 키 | 설명 |
| --- |-------------|
| `amt` | 민트 분량 |

<!-- translation-ignore -->

<Inscribe type="mint" />

<!-- end-translation-ignore -->


### 양도

```json
{ 
  "p": "eorc-20",
  "op": "transfer",
  "tick": "orcs",
  "amt": "1"
}
```

| 키 | 설명 |
| --- |-------------|
| `amt` | 송금할 금액 |

<!-- translation-ignore -->

<Inscribe type="transfer" />

<!-- end-translation-ignore -->


## 비문 보내기

체인에 인스크립션을 보낼 때 다음을 지정해야 합니다. `mime-type` 데이터의 내용으로 두거나 그대로 두세요 `data:,` 그래서
기본값은 `text/plain`.

예를 들면 다음과 같습니다.

```
data:,{"p":"eorc-20","op":"deploy","tick":"orcs","max":"420420","lim":"69"}
```

그런 다음 변환해야 합니다. `JSON` 에 `hex` 그리고 사용 `data` 비문을 보낼 트랜잭션의 필드.

이를 사용한 예시 `ethers` 다음과 같을 것입니다:

```js
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://api.evm.eosnetwork.com/');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const json = {
    p: 'eorc-20',
    op: 'deploy',
    tick: 'orcs',
    max: '420420',
    lim: '69',
};

const utfBytes = ethers.utils.toUtf8Bytes(JSON.stringify(json));
const hexData = ethers.utils.hexlify(utfBytes);

const tx = {
    to: '0x123...',
    value: 0,
    data: hexData
};

wallet.sendTransaction(tx).then(...);
```

## 알아야 할 규칙

인덱서에는 비문을 인덱싱할 때 준수해야 하는 내장 규칙이 있습니다.다음 규정을 따르지 않는 모든 비문
규칙은 무시됩니다.

#### 소유자/서명자

- **민트 수신자**는 거래의 서명자입니다.
- **송금 발신자** (또는 `from`) 는 거래의 서명자입니다.
- **송금 수취인**은 `to` 거래 데이터에 정의된 주소

#### 일반 규칙

- 티커를 처음 배포할 때만 티커에 대한 소유권을 주장할 수 있습니다.
- 티커는 대소문자를 구분하지 않습니다 (오크 = ORCS = ORC...)
- 티커의 마지막 글자는 지정된 금액 또는 최대 공급량의 남은 금액을 받게 됩니다.
- 최대 공급량은 최대값을 초과할 수 없습니다. `uint64`
