---
title: “토큰 생성”
---


토큰은 가상 수집품 또는 게임 내 통화와 같은 소유 가능한 디지털 자산입니다.데이터 구조에 불과합니다.
블록체인에 저장됩니다.

토큰 계약은 토큰을 구성하는 데이터 구조, 해당 구조의 저장 공간을 정의합니다. 
그리고 토큰을 조작하기 위해 취할 수 있는 조치

널리 사용되는 두 가지 유형의 블록체인 토큰이 있습니다. 
- **대체 가능한 토큰**은 서로 바꿔서 사용할 수 있으며 모든 토큰은 게임의 골드처럼 서로 동일합니다. 
- **대체 불가능한 토큰**은 수집용 카드나 토지와 같이 독특합니다.

이 튜토리얼에서는 *대체 가능한 토큰*인 **골드**라는 게임 내 화폐를 만들어 보겠습니다. 

## 새 계약 생성

먼저 기본 계약 발판을 설정해 보겠습니다.

만들기 `token.cpp` 파일을 작성하고 다음 코드를 추가합니다.

```cpp
#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/singleton.hpp>
using namespace eosio;

CONTRACT token : public contract {

    public:
    using contract::contract;

    // TODO: Add actions
};
```

## 액션 만들기

토큰 계약에는 세 가지 조치가 있습니다. 

```cpp
    ACTION issue(name to, asset quantity){
        
    }
    
    ACTION burn(name owner, asset quantity){
        
    }
    
    ACTION transfer(name from, name to, asset quantity, std::string memo){
        
    }
```

계약에 추가한 다음 각 작업을 자세히 살펴보고 어떤 작업을 수행하는지, 어떤 매개변수를 사용하는지 살펴보겠습니다.

### 이슈

더 `issue` action은 새 토큰을 생성하여 계정 잔액과 총 공급량에 추가합니다. 

두 개의 매개변수가 필요합니다.
- **to**: 토큰이 발행될 계정
- **수량**: 발행할 토큰의 양

### 번

더 `burn` 조치를 취하면 계정 잔액과 총 공급량에서 토큰이 제거됩니다. 

두 개의 매개변수가 필요합니다.
- **소유자**: 토큰을 소각할 계정
- **수량**: 소각할 토큰의 양

### 전송

더 `transfer` action은 한 계정에서 다른 계정으로 토큰을 전송합니다. 

네 가지 매개 변수가 필요합니다.
- **보낸 사람**: 토큰을 보내는 계정
- **to**: 토큰을 받는 계정
- **수량**: 전송할 토큰의 양
- **메모**: 전송 시 포함할 메모

## 기호 및 정밀도 설정

모든 대체 가능한 토큰에는**기호**와**정밀도**가 있습니다.

**기호**는 토큰의 식별자 (예: EOS, BTC 또는 우리의 경우 GOLD) 이고, **정밀도**는 토큰이 지원하는 소수점 자리수입니다.
계약에 상수 변수를 추가하여 다음을 정의할 것입니다. `symbol` 과 `precision` 우리 토큰의.

위에 추가 `issue` 액션:

```cpp
    const symbol TOKEN_SYMBOL = symbol(symbol_code("GOLD"), 4);
    
    ACTION issue ...
```

위의 줄은 다음과 같은 기호를 사용하여 토큰을 생성한다는 것을 의미합니다. `GOLD` 그리고 정밀도 `4`.

다음과 같이 보일 것입니다 `100.0000 GOLD` 또는 `0.0001 GOLD`.

## 데이터 구조 추가

이제 작업을 정의했으니 토큰의 데이터를 저장하는 데 사용할 데이터 구조를 추가해 보겠습니다.

이것을 아래에 넣으십시오. `TOKEN_SYMBOL` 방금 추가하셨습니다.

```cpp
    const symbol TOKEN_SYMBOL = symbol(symbol_code("GOLD"), 4);

    TABLE balance {
        name     owner;
        asset    balance;

        uint64_t primary_key()const { 
            return owner.value; 
        }
    };
    
    using balances_table = multi_index<"balances"_n, balance>;
    
```

방금 만들었습니다. `balance` 에 저장될 데이터를 정의하는 구조체 `balances` 표.
그런 다음 다음을 정의했습니다. `balances_table` type은 행을 저장할 테이블의 정의입니다. `balance` 모델.

나중에 사용할 것입니다. `balances_table` 에 대한 참조를 인스턴스화하는 형식 `balances` 표를 작성하고 해당 참조를 다음과 같이 사용하십시오. 
블록체인에 데이터를 저장하고 블록체인에서 데이터를 검색합니다.

더 `owner` 재산의 유형 `name` (EOS 계정 이름) 이며 토큰을 소유한 계정을 식별하는 데 사용됩니다.
더 `name` type은 문자열을 64비트 정수로 효율적으로 압축하는 방법입니다.a-z, 1-5 및 마침표로 제한되며 
최대 12자 이내여야 합니다.

더 `balance` 재산의 유형 `asset` 계정이 소유한 토큰의 양을 저장하는 데 사용됩니다.
더 `asset` type은 기호, 정밀도 및 양을 포함하는 특수 유형입니다.그것은 가지고 있습니다 `asset.symbol` 재산
그리고 `asset.amount` 속성 (해당 유형) `int64_t`).

더 `primary_key` 구조체의 함수는 인덱싱 목적으로 각 행을 고유하게 식별하는 데 사용됩니다.이 경우, 
우리는 사용하고 있습니다 `owner` 필드를 기본 키로 사용하지만 다음을 사용합니다. `uint64_t` 효율성을 위해 대신 대표성을 발휘하십시오.

다음으로 토큰의 총 공급량을 저장할 또 다른 테이블이 필요합니다.아래에 추가 `balances_table` 방금 추가한 내용:

```cpp
    using supply_table = singleton<"supply"_n, asset>;
```

여기서는 다른 유형의 테이블을 사용하고 있습니다. `singleton`.A `singleton` 범위당 하나의 행만 있는 테이블입니다. 
구성과 같은 것을 저장하는 데 적합합니다.토큰의 총 공급량을 여러분과 같이 저장하는 데 사용할 것입니다. 
계약서에는 하나의 토큰만 있어야 합니다.

저장할 사용자 지정 구조도 정의하지 않았음을 알 수 있습니다. 필요한 것만 필요했기 때문입니다. `asset` 저장할 입력 
총 공급량.

## 액션 채우기

이제 데이터 구조를 정의했으니 작업을 채워 보겠습니다.

### 이슈

먼저 다음과 같이 시작하겠습니다. `issue` 액션을 취하면 새 토큰이 생성되어 계정 잔액에 추가됩니다.

우리는 계약이 배포된 계정에서만 다음을 호출할 수 있기를 원합니다. `issue` 액션, 그래서 추가하겠습니다 
액션을 호출하는 계정이 계약이 배포된 계정과 동일한지 확인하기 위한 어설션

```cpp
    ACTION issue(name to, asset quantity){
        check(has_auth(get_self()), "only contract owner can issue new GOLD");
    }
```

다음으로 토큰을 발행할 계정이 블록체인에 존재하는지 확인하고자 합니다.우린 그걸 원하지 않아요
달콤한 게임 내 골드를 낭비하세요!

```cpp
    ...
    check(is_account(to), "the account you are trying to issue GOLD to does not exist");
```

다음으로, 우리는 다음을 확인하고 싶습니다. `quantity` 매개변수는 양수이고 올바른 값을 가집니다. 
`symbol` 과 `precision`.

```cpp
    ...
    check(quantity.is_valid(), "invalid quantity");
    check(quantity.amount > 0, "must issue a positive quantity");
    check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");
```

슈우!많은 점검이 필요하지만 게임 내 골드를 보호하고 있는지 확인하는 것이 중요합니다!

이제 잔액 테이블을 다루기 시작하겠습니다.

```cpp
    ...
    balances_table balances(get_self(), get_self().value);
```

우리가 가져갔어 `balances_table` 이전에 정의하고 새로 인스턴스화한 유형 `balances_table` 목적.우리는 통과했다 
`get_self()` 첫 번째 매개 변수로서의 함수 ( `code` 매개변수) 는 계약 계정의 이름을 반환합니다.우리는 통과했다 `get_self().value`
두 번째 매개 변수로 ( `scope` 매개변수) 는 다음을 반환합니다. `uint64_t` 계약 계정 이름을 나타냅니다.

> ❔ **범위**: 범위는 테이블의 행을 그룹화하는 방법입니다.다음과 같은 폴더라고 생각할 수 있습니다.
> 테이블의 모든 행을 포함합니다.이 경우 계약 계정의 이름을 범위로 사용하므로 모든
> 에 있는 행 `balances` 테이블은 계약 계정 이름 아래에 함께 그룹화됩니다.만약
> 스코프에 대해 자세히 알아보려면 다음을 확인하세요. [스마트 컨트랙트 시작하기 가이드](/docs/03_smart-contracts/04_state-data.md).

다음으로, 다음 사항을 확인해야 합니다. `to` 계정에 이미 잔액이 있습니다.다음을 사용하여 이 작업을 수행할 수 있습니다. `find` 에 대한 함수
`balances` 표.

```cpp
    ...
    auto to_balance = balances.find(to.value);
```

더 `find` 함수는 기본 키와 일치하는 테이블의 행에 반복자를 반환합니다.만약 `to` 계정은
균형이 안 잡히면 `find` 함수는 테이블 끝에 이터레이터를 반환합니다.기본 키라는 것을 기억하십시오.
왜냐하면 테이블은 `uint64_t`, 그래서 우리는 다음을 사용해야 합니다. `to.value` 얻기 위해 `uint64_t` 의 표현 `to` 계정.

이미 잔액이 있는 경우 기존 잔액에 새 토큰을 추가해야 합니다.다음을 사용하여 이 작업을 수행할 수 있습니다.
`modify` 에 대한 함수 `balances` 표.다음 사항이 있는지 확인해 보겠습니다. `to_balance` 이터레이터가 의 끝과 같지 않음
테이블이 아닌 경우 행을 수정합니다.

```cpp
    ...
    if(to_balance != balances.end()){
        balances.modify(to_balance, get_self(), [&](auto& row){
            row.balance += quantity;
        });
    }
```

더 `modify` 함수는 세 가지 매개 변수를 사용합니다.
- **이터레이터**: 수정하려는 행의 이터레이터
- **payer**: 수정된 행을 저장하는 데 필요한 RAM에 대해 비용을 지불할 계정
- **lambda**: 수정하려는 행에 대한 참조를 제공하는 람다 함수

람다 함수는 실제로 행을 수정하는 곳입니다.이 경우 기존 토큰에 새 토큰을 추가합니다.
밸런스.

아직 잔액이 없는 경우 새 잔액을 생성해야 합니다. `to` 계정.다음을 사용하여 이 작업을 수행할 수 있습니다.
그 `emplace` 에 대한 함수 `balances` 표.

```cpp
    ...
    else{
        balances.emplace(get_self(), [&](auto& row){
            row.owner = to;
            row.balance = quantity;
        });
    }
```

더 `emplace` 함수는 두 개의 매개 변수를 사용합니다.
- **payer**: 새 행을 저장하는 데 필요한 RAM에 대해 비용을 지불할 계정
- **lambda**: 새 행에 대한 참조를 제공하는 람다 함수

람다 함수는 새 행을 실제로 초기화하는 곳입니다.이 경우, 우리는 다음을 설정합니다. `owner` 에 `to`
계정 및 `balance` 에 `quantity`.

마지막으로 토큰의 총 공급량을 업데이트해야 합니다.우리는 다음을 얻음으로써 이것을 할 수 있습니다 `supply` 표.

```cpp
    ...
    supply_table supply(get_self(), get_self().value);
    auto current_supply = supply.get_or_default(asset(0, TOKEN_SYMBOL));
``` 

우리가 가져갔어 `supply_table` 이전에 정의하고 새로운 것을 인스턴스화했습니다. `supply_table` 목적.예전처럼 우리도 합격했습니다
에서 `get_self()` 첫 번째 및 두 번째 매개 변수 모두에 대한 함수 (각각: `code`, 및 `scope`). 

다음으로, 우리는 `get_or_default` 싱글톤에서 함수를 사용하여 토큰의 현재 공급량을 가져오거나 새 토큰을 생성합니다. 
이것이 이 계약에서 발행되는 첫 번째 토큰인 경우더 `get_or_default` 함수는 하나의 매개 변수를 사용합니다. 
값이 이미 존재하지 않는 경우 생성할 값입니다.우리의 경우 해당 기본값은 새로운 값입니다. `asset` 그 우리 
의 값으로 초기화됨 `0` 그리고 `TOKEN_SYMBOL` 앞에서 정의한 상수입니다.이것은 다음과 같이 보일 것입니다 `0.0000 GOLD`.

이제 현재 공급량이 확보되었으므로 새 토큰을 현재 공급량에 추가하고 블록체인에 가치를 저장할 수 있습니다.
둘 다 이후 `current_supply` 과 `quantity` 유형의 영역 `asset`, 우리는 사용할 수 있습니다 `+` 연산자를 사용하여 함께 추가합니다.

> ✔ **자동 오버플로 방지**
> 
> 더 `asset` 클래스는 오버플로/언더플로를 자동으로 처리합니다.오버플로가 있는 경우
> 오류가 발생하고 트랜잭션이 자동으로 중단됩니다.아무 것도 할 필요가 없습니다. 
> 사용시 특별 점검 `asset`.그러나 사용하는 경우 `uint64_t` 또는 기타 기본 유형. 

```cpp
    ...
    auto new_supply = current_supply + quantity;
    supply.set(new_supply, get_self());
```

우리는 를 사용했습니다 `set` 싱글톤에서 기능하여 블록체인에 신규 공급을 저장합니다. 

더 `set` 함수는 두 개의 매개 변수를 사용합니다.
- **가치**: 블록체인에 저장해야 할 새로운 가치
- **payer**: 새 값을 저장하기 위해 RAM에 비용을 지불할 계정

### 번

더 `burn` 액션은 다음과 매우 유사합니다. `issue` 동작.유일한 차이점은 토큰을 차감한다는 것입니다.
그 `owner` 공급을 늘리는 대신 계산하고 공급하십시오.

이전과 같은 검사부터 시작한 다음 논리를 살펴보겠습니다.

```cpp
    ACTION burn(name owner, asset quantity){
        check(has_auth(owner), "only the owner of these tokens can burn them");
        check(quantity.is_valid(), "invalid quantity");
        check(quantity.amount > 0, "must burn a positive quantity");
        check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");
    }
```

우리는 에서 했던 것과 같은 검사를 하고 있습니다. `issue` 액션 (제외) `is_account` 확인해 보세요. 이미 있을 테니까요. 
다음 사항을 확인하기 위한 테스트 `owner` 균형이 잡혀 있습니다 `balances` 표.

```cpp
    ...
    balances_table balances(get_self(), get_self().value);
    auto owner_balance = balances.find(owner.value);
    check(owner_balance != balances.end(), "account does not have any GOLD");
```

이제 다음 사항을 확인해 보겠습니다. `owner` 계정에 소각하기에 충분한 토큰이 있습니다.

```cpp
    ...
    check(owner_balance->balance.amount >= quantity.amount, "owner doesn't have enough GOLD to burn");
```

에 대한 새 잔액을 계산해 보겠습니다. `owner` 계정.

```cpp
    ...
    auto new_balance = owner_balance->balance - quantity;
```

다음 사항을 확인할 필요가 없습니다. `new_balance` 이미 확인했기 때문에 0 미만입니다. `owner` 계정에 충분한 토큰이 있습니다.
태우다.

에서 토큰을 빼자 `owner` 계정.만약 `new_balance` 0이면 그냥 지울 수 있습니다
에서 나온 행 `balances` **RAM**을 저장할 테이블입니다.

```cpp
    ...
    if(new_balance.amount == 0){
        balances.erase(owner_balance);
    }
```

만약 `new_balance` 0이 아닌 경우 행을 수정해야 합니다. `balances` 표.

```cpp
    ...
    else {
        balances.modify(owner_balance, get_self(), [&](auto& row){
           row.balance -= quantity;
        });
    }
```

또한 총 공급량에서 토큰을 제거해야 합니다.

```cpp
    ...
    supply_table supply(get_self(), get_self().value);
    supply.set(supply.get() - quantity, get_self());
```

짜잔, 이제 가상 골드를 태울 수 있습니다.

### 전송

더 `transfer` 액션은 그것보다 조금 더 복잡하다. `issue` 과 `burn` 행동.에서 토큰을 전송해야 합니다.
한 계정에서 다른 계정으로 이동하고 다음 사항을 확인하십시오. `from` 계정에 양도할 토큰이 충분합니다.

무엇보다도, 우리는 다른 계약들이 우리의 토큰과 상호작용할 수 있도록 만들고 싶습니다. 그래야 그들이 그렇게 할 수 있습니다. 
그 위에 무언가를 쌓으세요. 

다시 한 번 검사부터 시작한 다음 논리를 살펴보겠습니다.

```cpp
    ACTION transfer(name from, name to, asset quantity, string memo){
        check(has_auth(from), "only the owner of these tokens can transfer them");
        check(is_account(to), "to account does not exist");
        check(quantity.is_valid(), "invalid quantity");
        check(quantity.amount > 0, "must transfer a positive quantity");
        check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");
    }
```

우리는 이전과 거의 동일한 검사를 수행하고 있지만 이번에는 다음을 확인합니다. `from` 계정 (발신자) 은 
그것은 전송을 승인하는 것이며, 우리는 다음을 확인하고 있습니다. `to` 계정이 존재합니다.

다음으로, 우리는 가져와야 합니다 `balances` 테이블을 작성하고 다음 사항을 확인하십시오. `from` 계정에 잔액이 있습니다.

```cpp
    ...
    balances_table balances(get_self(), get_self().value);
    auto from_balance = balances.find(from.value);
    check(from_balance != balances.end(), "account does not have any GOLD");
```

다음 사항을 확인해 보겠습니다. `from` 계정에 양도할 토큰이 충분합니다.

```cpp
    ...
    check(from_balance->balance.amount >= quantity.amount, "owner doesn't have enough GOLD to transfer");
```

다음 사항을 확인해야 합니다. `to` 계정에 잔액이 있습니다. `balances` 표.

```cpp
    ...
    auto to_balance = balances.find(to.value);
```

만약 `to` 계정에 잔액이 없으면 새 행을 생성해야 합니다. `balances` 표.

```cpp
    ...
    if(to_balance == balances.end()){
        balances.emplace(get_self(), [&](auto& row){
            row.owner = to;
            row.balance = quantity;
        });
    }
```

만약 `to` 계정에 _does_ 잔액이 있는 경우 다음 행을 수정해야 합니다. `balances` 표.

```cpp
    ...
    else {
        balances.modify(to_balance, get_self(), [&](auto& row){
            row.balance += quantity;
        });
    }
```

이제 다음 사항을 확인해야 합니다. `from` 계정에 다음과 같은 금액의 잔액이 있습니다. `quantity` 우리는 전송 중입니다.만약
그렇습니다. 그러면 행을 지울 수 있습니다. `balances` 표를 작성하고 다시 한 번**RAM**을 저장합니다.

```cpp
    ...
    if(from_balance->balance.amount == quantity.amount){
        balances.erase(from_balance);
    }
```

만약 `from` 계정 잔액이 다음보다 큽니다. `quantity` 전송 중이므로 다음을 수행해야 합니다.
에서 행을 수정합니다. `balances` 표.

```cpp
    ...
    else {
        balances.modify(from_balance, get_self(), [&](auto& row){
            row.balance -= quantity;
        });
    }
```

마지막으로, 다른 컨트랙트가 수신할 수 있는 이벤트를 내보내야 합니다.우리는 두 개의 이벤트를 내보낼 것입니다. 하나는 `from` 
수취인으로서의 계정이고 다른 계정은 `to` 계정을 수신자로 지정합니다.이렇게 하면 어느 쪽이든 들을 수 있습니다.
이벤트에 참여하여 해당 계정에 계약이 배포된 경우 이벤트로 조치를 취하십시오.

```cpp
    ...
    require_recipient(from);
    require_recipient(to);
```


## 전체 계약

전체 계약을 복사하여 귀하의 계약서와 일치시키려면 아래에서 찾을 수 있습니다.

<details>
    <summary>전체 코드를 보려면 여기를 클릭하십시오</summary>

```cpp
#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/singleton.hpp>
using namespace eosio;

CONTRACT token : public contract {
   public:
      using contract::contract;

   const symbol TOKEN_SYMBOL = symbol(symbol_code("GOLD"), 4);

   TABLE balance {
      name     owner;
      asset    balance;

      uint64_t primary_key()const { 
         return owner.value; 
      }
   };

   using balances_table = multi_index<"balances"_n, balance>;

   using supply_table = singleton<"supply"_n, asset>;




   ACTION issue(name to, asset quantity){
      check(has_auth(get_self()), "only contract owner can issue new GOLD");
      check(is_account(to), "the account you are trying to issue GOLD to does not exist");
      check(quantity.is_valid(), "invalid quantity");
      check(quantity.amount > 0, "must issue a positive quantity");
      check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");

      balances_table balances(get_self(), get_self().value);

      auto to_balance = balances.find(to.value);

      if(to_balance != balances.end()){
            balances.modify(to_balance, get_self(), [&](auto& row){
               row.balance += quantity;
            });
      }
      else{
            balances.emplace(get_self(), [&](auto& row){
               row.owner = to;
               row.balance = quantity;
            });
      }

      supply_table supply(get_self(), get_self().value);

      auto current_supply = supply.get_or_default(asset(0, TOKEN_SYMBOL));

      supply.set(current_supply + quantity, get_self());
   }

   ACTION burn(name owner, asset quantity){
      check(has_auth(owner), "only the owner of these tokens can burn them");
      check(quantity.is_valid(), "invalid quantity");
      check(quantity.amount > 0, "must burn a positive quantity");
      check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");

      balances_table balances(get_self(), get_self().value);
      auto owner_balance = balances.find(owner.value);
      check(owner_balance != balances.end(), "account does not have any GOLD");
      check(owner_balance->balance.amount >= quantity.amount, "owner doesn't have enough GOLD to burn");

      auto new_balance = owner_balance->balance - quantity;
      check(new_balance.amount >= 0, "quantity exceeds available supply");

      if(new_balance.amount == 0){
         balances.erase(owner_balance);
      }
      else {
         balances.modify(owner_balance, get_self(), [&](auto& row){
               row.balance -= quantity;
         });
      }

      supply_table supply(get_self(), get_self().value);
      supply.set(supply.get() - quantity, get_self());
   }

   ACTION transfer(name from, name to, asset quantity, std::string memo){
      check(has_auth(from), "only the owner of these tokens can transfer them");
      check(is_account(to), "to account does not exist");
      check(quantity.is_valid(), "invalid quantity");
      check(quantity.amount > 0, "must transfer a positive quantity");
      check(quantity.symbol == TOKEN_SYMBOL, "symbol precision and/or ticker mismatch");

      balances_table balances(get_self(), get_self().value);
      auto from_balance = balances.find(from.value);
      check(from_balance != balances.end(), "from account does not have any GOLD");
      check(from_balance->balance.amount >= quantity.amount, "from account doesn't have enough GOLD to transfer");

      auto to_balance = balances.find(to.value);
      if(to_balance == balances.end()){
         balances.emplace(get_self(), [&](auto& row){
               row.owner = to;
               row.balance = quantity;
         });
      }
      else {
         balances.modify(to_balance, get_self(), [&](auto& row){
               row.balance += quantity;
         });
      }

      if(from_balance->balance.amount == quantity.amount){
         balances.erase(from_balance);
      }
      else {
         balances.modify(from_balance, get_self(), [&](auto& row){
               row.balance -= quantity;
         });
      }

      require_recipient(from);
      require_recipient(to);
   }
};
```
</details>


## 그랩 배틀 테스트 소스 코드

EOS 네트워크에서 대체 가능한 대부분의 토큰에 사용되는 소스 코드를 간단히 사용하려면 다음 주소로 이동하십시오.
[에오시오. 토큰](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/4702c8f2d95dd06f0924688560b8457962522216/contracts/eosio.token)
저장소를 찾아서 가져가세요.이 코드 배틀은 테스트를 거쳤을 뿐만 아니라 기본 EOS 토큰을 구동합니다.

다음 사항에 유의하십시오. 표준은 `eosio.token` 계약은 이 튜토리얼과 상당히 다릅니다.좀 더 복잡합니다
계약서를 사용하면 계약과 상호 작용하는 사용자가 자신의 RAM 비용을 지불할 수 있도록 하는 등 고급 기능을 사용할 수 있습니다. 
또는 단일 계약 내에서 여러 토큰을 생성할 수 있습니다. 

다음을 수행해야 합니다. `create` 새 토큰을 넣은 다음 `issue` 해당 토큰은 이전되기 전에 계좌로 이체됩니다. 
또한 다음을 수행해야 합니다. `open` 토큰을 계좌로 이체하기 전의 계좌 잔고


## 챌린지

이 토큰에는 없습니다. `MAXIMUM_SUPPLY`.계약에 최대 공급량을 정의하는 상수를 어떻게 추가할 수 있습니까?
토큰을 확인하고 `issue` 액션이 이 최대 공급량을 초과하지 않습니까?
