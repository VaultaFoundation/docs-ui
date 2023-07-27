---
title: 액션
---

액션은 스마트 컨트랙트에서 호출할 수 있는 함수입니다.이는 일부 기능의 진입점입니다.
외부 세계에 노출시키고 싶은 것이죠.

다른 스마트 계약을 포함한 모든 계정에서 작업을 호출할 수 있습니다.

## 액션 정의

액션을 정의하는 방법은 두 가지가 있는데, 하나는 좀 더 상세하지만 액션의 반환 유형을 지정할 수 있게 해줍니다.
다른 하나는 항상 돌아오는 속기입니다. `void`.

### 심플 액션

작업의 반환 유형을 지정할 필요가 없는 경우 다음을 사용할 수 있습니다. `ACTION` 키워드는 
의 약칭입니다 `[[eosio::action]] void`.

```cpp
ACTION youraction(){
    // Your logic here
}
```

### 반환 유형 지정

작업의 반환 유형을 지정하려면 다음을 사용해야 합니다. `[[eosio::action]]` 속성 뒤에 오는 속성
반품 유형.

```cpp
[[eosio::action]] uint64_t youraction(){
    // Your logic here
    return 1337;
}
```

> ⚠ **반환 값 및 구성 가능성**
>
> 반환 값은 블록체인 외부에서만 사용할 수 있으며 현재는 사용할 수 없습니다.
> EOS에서 스마트 컨트랙트를 구성할 수 있습니다. 


## 인라인 액션

인라인 작업은 계약 내에서 다른 계약의 조치를 호출하는 방법입니다. 
이는 다른 계약 위에 기능을 구축하려는 경우에 유용합니다.

아래에서 두 가지 간단한 계약을 통해 이를 설명해 보겠습니다.

```cpp title="sender.cpp"
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT sender : public contract {
public:
    using contract::contract;

    ACTION sendinline(name user) {
        action(
            permission_level{get_self(), name("active")},
            name("contract2"),
            name("receiver"),
            std::make_tuple(user)
        ).send();
    }
};
```

> ❔ **계약 계정**
> 
> 더 `get_self()` 함수는 계약이 배포되는 계정의 이름을 반환합니다.유용합니다
> 배포하기 전까지 이 계약이 어디에 배포될지 모르는 경우 또는 계약이 배포될 수 있는지 여부를 알 수 없는 경우
> 여러 계정을 사용하고 있어야 합니다.

```cpp title="receiver.cpp"
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT receiver : public contract {
public:
    using contract::contract;

    ACTION received(name user) {
        print("I was called by ", user);
    }
};
```

| 계약 | 에 계정 배포 대상 |
| -------- |---------------------|
| `sender`   | `contract1`         |
| `receiver` | `contract2`         |

이 두 계약을 배포한 경우 다음을 호출할 수 있습니다. `contract1::sendinline` 그러면 액션이 호출됩니다.
`contract2::receiver` 동작.

또한 매개변수를 전달합니다. `user` 에 `contract2::receiver` 동작. 

### 인라인 액션 발신자의 인터페이스

더 `action` 생성자는 네 가지 인수를 사용합니다.

```cpp
action(
    <permission_level>, 
    <contract>, 
    <action>, 
    <data>
).send();
```

- `permission_level` - 액션을 호출할 때 사용할 권한 수준
- `contract (name type)` - 액션이 배포되는 계정
- `action (name type)` - 호출될 액션의 이름
- `data` - 액션에 전달될 데이터 (튜플)

> ❔ **이름 기능**
> 
> 더 `name()` 함수는 a를 변환하는 데 사용됩니다 `string` a로 `name` 유형.합격하고 싶을 때 유용합니다.
> 계정이나 작업의 이름은 문자열이지만 호출하는 함수에는 `name` 유형.

### 권한 수준 생성

더 `permission_level` 인수는 액션을 호출할 권한 수준을 지정하는 데 사용됩니다.
이는 액션이 배포되는 계약이거나 해당 계정의 권한일 수 있습니다. 
계약은 has 에 배포됩니다.

더 `permission_level` 생성자는 두 개의 인수를 취합니다.

```cpp
permission_level(
    <account (name type)>, 
    <permission (name type)>
)
```

> ⚠ **계약은 새 발신자입니다**
>
> 인라인 작업을 호출하면 작업을 호출하는 계약이 새 발신자가 됩니다.
> 보안상의 이유로 원래 승인은 새 계약에 전달되지 않습니다.
> 새 계약이 원래 발신자를 대신하여 조치 (예: 토큰 전송) 를 요청할 수 있다는 점

### 튜플 만들기

더 `data` 인수는 호출하는 액션의 매개 변수를 지정하는 데 사용됩니다.

튜플은 여러 인수를 그룹화하는 방법일 뿐입니다.를 사용하여 튜플을 만들 수 있습니다. `std::make_tuple` 기능.

```cpp
std::make_tuple(<arg1>, <arg2>, <arg3>, ...);
```

### 코드 권한

라는 특별한 계정 권한이 있습니다. `eosio.code` 이를 통해 계약에서 인라인 작업을 호출할 수 있습니다.
이 허가가 없으면 귀하의 계약은 다른 계약에 대해 조치를 취할 수 없습니다.

이 권한은 다음에 있습니다. `active` 권한 수준, 즉 다른 계약에서 다음을 사용할 수 있습니다. `require_auth`
함수는 계약에 조치를 호출할 권한이 있는지 확인할 수 있습니다.

코드 권한을 추가하려면 계정의 활성 권한을 업데이트하여 제어할 수 있어야 합니다.
`<YOURACCOUNT>@eosio.code` **현재 유효한 권한과 함께**.

> ⚠ **액세스 권한을 잃지 마세요!**
>
> 더 `eosio.code` 권한은 기존 활성 권한에**추가**되어야 하는 것이지 대체하는 것이 아닙니다.
> 현재 활성 권한 컨트롤러 (계정 또는 키) 를 제거하면 다음 항목에 대한 액세스 권한을 잃게 됩니다. 
> 귀하의 계정/계약.

계정에 코드 권한이 있는 권한 구조의 예 `yourcontract` 다음과 같이 보일 것입니다:
```text
owner 
  • YOUR_PUBLIC_KEY
↳ active -> 
  • YOUR_PUBLIC_KEY
  • yourcontract@eosio.code
```

