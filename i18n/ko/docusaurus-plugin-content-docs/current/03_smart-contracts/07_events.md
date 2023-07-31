---
title: 이벤트
---

이벤트는 스마트 컨트랙트가 액션의 부작용으로 서로 소통하는 방법입니다.

이벤트의 가장 일반적인 사용 현황은 트래킹입니다. `eosio.token` (`EOS`) 양도 가능하지만 다음과 같은 용도로 사용할 수 있습니다.
계약 간의 모든 유형의 커뮤니케이션.

아래에서 바로 그 예를 사용하겠지만, 먼저 이벤트의 기본 사항을 다루겠습니다.

## 이벤트의 양면

물론 모든 이벤트에는 발신자와 수신자의 양면이 있습니다.

한쪽에는 `contract::action` 이벤트를 내보내는 것이고 다른 쪽에는 다음과 같은 계약이 있습니다.
그 이벤트를 듣고 있어요.

## 이벤트 리시버

이벤트 수신기는 액션이 아니라 다른 액션이 계약에 태그를 지정할 때 호출되는 함수입니다.
수령인으로서. 

```cpp
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT receiver : public contract {
public:
    using contract::contract;

    [[eosio::on_notify("*::transfer")]] 
    void watchtransfer(name from, name to, asset quantity, std::string memo) {
        // Your logic here
    }
};
```

더 `on_notify` 속성은 문자열을 인수로 사용합니다.이 문자열은 결정하는 데 사용되는 필터입니다.
어떤 액션이 트리거될지 `watchtransfer` 기능.필터는 다음과 같은 형태입니다. `contract::action`, 어디에 `contract`
이벤트를 보내는 계약의 이름이고 `action` 해당 계약 내 작업의 이름은 다음과 같습니다.
이벤트를 트리거했습니다.

더 `*` 문자는 모든 계약 또는 조치와 일치하는 와일드카드입니다.따라서 위의 예에서는 `watchtransfer` 기능
계약이 전송될 때마다 호출됩니다. `transfer` 에 대한 조치 `receiver` 계약. 
와일드카드는 필터의 계약 측과 작업 측 모두에서 지원되므로 와일드카드를 사용하여 모든 계약, 작업 또는 둘 다를 일치시킬 수 있습니다.

예시:
- `*::*` - 모든 계약 및 모든 조치와 일치
- `yourcontract::*` - 어떤 액션이든 매칭 가능 `yourcontract`
- `*::transfer` - 어떤 것과도 일치 `transfer` 모든 계약에 대한 조치
- `yourcontract::transfer` - 해당 항목만 일치 `transfer` 액션 온 `yourcontract`

> ❔ **누가 이벤트를 보낼 수 있나요?**
> 
> 모든 계약에서 이벤트를 전송할 수 있지만 이벤트에 지정된 계약만 전송할 수 있습니다. `on_notify` 속성
> 알림을 받게 됩니다.그러나 각 알림은 다음과 같은 경우에도 트랜잭션에 소량의 CPU 사용량을 추가합니다.
> 이벤트를 듣고 있는 수신자가 없습니다.


## 이벤트 발신자

이벤트 발신자는 특별 계약에 지정된 모든 계약에 이벤트를 발생시키는 행위입니다. 
`require_recipient` 기능.

```cpp
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT token : public contract {
public:
    using contract::contract;

    ACTION transfer(name from, name to, asset quantity, std::string memo) {
        require_recipient(from);
        require_recipient(to);
    }
};
```

더 `transfer` 위의 작업은 두 가지 모두에 이벤트를 내보냅니다. `from` 과 `to` 계정 (실제로는 다음과 같습니다. `eosio.token` 계약 업무).
따라서 귀하의 계약이 다음 중 하나인 경우 `from` 또는 `to` 계정, 그럼 들어볼 수 있어요 `transfer` 행사.계정이**아닌**인 경우
어느 쪽이든, 당신은 그 이야기를 들을 방법이 없습니다. `transfer` 블록체인 내에서의 이벤트.


> ❔ **누가 이벤트를 받을 수 있나요?**
>
> 모든 계정에서 이벤트를 받을 수 있지만, 이벤트에 지정된 계정만 받을 수 있습니다. `require_recipient` 기능
> 알림을 받게 됩니다.하지만 이벤트를 받는 계정에 스마트 컨트랙트가 배포되어 있지 않은 경우 
> 그러면 이벤트를 처리할 로직이 없을 수 있으므로 이벤트는 무시됩니다.

## 리소스 사용

이벤트는 강력한 도구이지만, 강력한 힘을 발휘하려면 대가가 따르는 경우가 많습니다.
이벤트 수신자는 원래 이벤트 발신자의 CPU 및 NET 리소스를 사용할 수 있습니다.

이는 이벤트 발신자가 수신자의 CPU 및 NET 리소스에 대한 비용을 지불하는 사람이기 때문이지만, 종종 
수신기가 사용할 CPU 및 NET 리소스의 양을 제어할 수 없거나 심지어 알 수도 없습니다.



