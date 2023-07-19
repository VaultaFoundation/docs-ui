---
title: 링크드 액션 패턴
---

계약과 상호 작용하는 사용자가 다른 계약을 사용했는지 확인하고 싶을 때가 있습니다.
그들이 당신의 것을 사용하기 전에 계약을 맺으세요.예를 들어, 그들이 가지고 있는지 확인하고 싶을 수도 있습니다.
토큰이 계약을 사용하기 전에 계약 계정으로 토큰을 전송했습니다.

토큰과 관련하여 이를 흔히 “입금 패턴”이라고 하지만 토큰을 입금하는 것은
이 패턴을 사용해야 하는 유일한 경우는 아니기 때문에 “연결된 액션 패턴”이라는 용어가 붙었습니다.

예금 패턴을 예로 들어 이 거래가 어떤 모습일지 살펴보겠습니다.
```- Transaction
    1. eosio.token::transfer (Token Transfer) 
        -[inline] mycontract::on_transfer (Notifiable Action Receiver) 
    2. mycontract::record (Regular Action)
```

위 표는 트랜잭션의 작업 실행 순서를 보여줍니다.

트랜잭션에는 토큰 전송과 “기록” 작업만 있지만
또한 토큰 전송에 의해 트리거되는 이벤트 수신기 함수입니다.
계약은 토큰 전송과 기록 작업 사이에 캐치 앤 풋을 수행합니다.

이 패턴으로 해결되는 일반적인 문제는 다음과 같은 사항을 확인해야 한다는 것입니다.
레코드 작업을 허용하기 전에 토큰 전송이 발생했습니다. 

패턴을 사용하지 않고 이에 대한 몇 가지 코드를 살펴보겠습니다.


#### 토큰 전송 작업
```cpp
ACTION transfer(name from, name to, asset quantity, string memo){
    // ...
    require_recipient( from );
    require_recipient( to );
    // ...
}
```

#### 이벤트 수신기 및 기록 작업
```cpp
#include <eosio/asset.hpp>

[[eosio::on_notify("eosio.token::transfer")]]
void on_transfer(name from, name to, asset quantity, string memo){
    // ...
}

ACTION record(name from, uint64_t internal_id, uint8_t status){
    // ...
}
```

위에서 볼 수 있듯이 자금을 이체하는 사용자에 대한 몇 가지 추가 정보를 추가하려는 것입니다.
계약에 적용되지만 토큰 전송 작업에서는 그렇게 할 수 없습니다. 왜냐하면 우리가 사용할 수 있는 것은 다음과 같기 때문입니다. 
그 `memo` 필드는 문자열입니다.

>⚠ **성능 고려 사항**
> >데이터를 얻기 위해 문자열 조작 및 변환을 할 수 있다고 짐작하셨을 것입니다.
>당신은 에 필요합니다 `memo` 필드이지만 권장되지 않습니다.더 `memo` 필드는 256으로 제한되지 않습니다.
>대부분의 토큰 계약에는 문자가 있지만 스마트 계약 내에서 문자열을 조작하는 것은 다음 중 하나입니다. 
>할 수 있는 가장 비용이 많이 드는 작업입니다.

대신 Linked-action 패턴을 사용하여 토큰 전송이 이루어졌는지 확인할 수 있습니다.
우리가 허용하기 전에 `record` 조치를 취하고 필요한 추가 정보를 전달할 수도 있습니다.
에 `record` 동작.

업데이트해 보겠습니다. `on_transfer` 이벤트 수신기 및 `record` 그들 사이를 연결하기 위한 행동
연결된 작업 패턴 사용


먼저 다음을 추가하겠습니다. `multi_index` 전달해야 하는 정보를 저장하기 위한 계약서
두 행동 사이.

```cpp
TABLE transfer_info {
    name from;
    asset quantity;
    
    uint64_t primary_key() const { return from.value; }
};

using _transfers = multi_index<"transfers"_n, transfer_info>;

[[eosio::on_notify("eosio.token::transfer")]]
void on_transfer(name from, name to, asset quantity, string memo){
    _transfers transfers( get_self(), get_self().value );
    transfers.emplace( get_self(), [&]( auto& row ) {
        row.from = from;
        row.quantity = quantity;
    });
}
```

>⚠ **경고**
>>더 많은 검사를 받아야 합니다. `on_transfer` 이 예제에서 보여드린 것보다 말이죠.이 가이드는 그렇지 않습니다
>보안에 대해서는 명확성을 위해 이러한 검사를 생략하고 있지만 토큰 이벤트 수신기를 배포해서는 안 됩니다.
>이런 식으로 생산하고 있습니다.

그런 다음, 우리의 `record` 조치를 취하면 전송이 존재하는지 확인할 수 있으며, 존재하는 경우 다음을 수행할 수 있습니다.
테이블에서 삭제하여 RAM을 비우고 로직을 수행하십시오.

그렇지 않은 경우 간단히 오류를 표시하고 사용자에게 토큰을 전송해야 한다고 알릴 수 있습니다.
사용하기 전에 계약서에 제출하십시오.


```cpp

ACTION record(name from, uint64_t internal_id, uint8_t status){
    // ...
    _transfers transfers( get_self(), get_self().value );
    auto transfer = transfers.find( from.value );
    check( transfer != transfers.end(), "Must transfer tokens to contract before using it" );
    transfers.erase( transfer );
    
    // Do your logic here
}
```

## RAM 남용 문제

위의 패턴은 잘 작동하지만 문제가 있습니다.사용자가 계약에 토큰을 양도하는 경우
하지만 절대 전화하지 마세요 `record` 조치, 전송 정보를 저장하는 데 사용된 RAM은 절대 작동하지 않습니다.
해방되십시오.

RAM을 지불하는 계약이 계약이므로 계정에서 소량의 토큰을 보낼 수 있습니다.
RAM을 소비하고 계약을 지나치게 비싸게 만드는 것과 같습니다.

다음을 추가하여 이 문제를 해결할 수 있습니다. `check` 에 `on_transfer` 수량을 확인하는 이벤트 수신기
전송 정보를 저장하기 전의 임계값을 초과했습니다.

```cpp
[[eosio::on_notify("eosio.token::transfer")]]
void on_transfer(name from, name to, asset quantity, string memo){
    check(quantity.amount > 100, "Must transfer more than 100 tokens");
    
    ...    
}
```

또는 이러한 비용을 소비하고 테이블을 주기적으로 정리하여 RAM을 비울 수도 있습니다.
더 이상 필요하지 않습니다.

```cpp
ACTION cleanup(){
    _transfers transfers( get_self(), get_self().value );
    auto transfer = transfers.begin();
    
    uint8_t count = 0;
    while( transfer != transfers.end() && count < 100 ) {
        transfer = transfers.erase( transfer );
        count++;
    }
}
```

RAM 사용량을 줄이려면 이 작업을 정기적으로 직접 호출해야 한다는 점에 유의하세요.
그러나 금전적 가치와 관련이 없는 연계 행동 패턴의 경우에는 이 방법이 좋습니다.
RAM 사용량을 줄이는 방법.

## 챌린지

위의 코드를 변경하여 NFT 전송을 캡처하고 작업을 연결하도록 하려면 어떻게 해야 합니까?
소유자와 올바른 NFT만이 트리거할 수 있습니다. `record` 액션?


