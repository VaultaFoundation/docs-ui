---
title: 상태 데이터
---

스마트 계약에는 상태 데이터와 임시 데이터라는 두 가지 유형의 데이터가 있습니다.상태 데이터는 에 저장된 데이터입니다.
블록체인이며 지속적입니다.임시 데이터는 트랜잭션 실행 중에 저장되는 데이터이며, 그렇지 않습니다.
지속성 있는.트랜잭션이 끝나는 순간, 일시적인 데이터는 사라집니다.

블록체인에 데이터를 저장하는 데는 모델과 테이블이라는 두 부분이 있습니다.모델은 다음과 같은 데이터 구조입니다.
저장되며 테이블은 데이터를 보관하는 컨테이너입니다.테이블에는 몇 가지 유형이 있으며, 각각
하나는 자체 사용 사례가 있습니다.

## 데이터 모델

모델은 EOS++ 테이블에 저장할 데이터 구조입니다.직렬화 가능한 C++ 구조체이며 다음을 포함할 수 있습니다. 
직렬화도 가능한 모든 데이터 유형모든 일반 데이터 유형을 직렬화할 수 있으며 직접 만들 수도 있습니다.
직렬화 가능한 데이터 유형 (예: 으로 시작하는 다른 모델) `TABLE` 키워드.

```cpp
TABLE UserModel {
    uint64_t id;
    name eos_account;
    
    uint64_t primary_key() const { return id; }
};
```

모델을 정의하는 것은 C++ 구조체를 정의하는 것과 매우 비슷하지만 몇 가지 차이점이 있습니다.첫 번째 차이점은 바로 당신입니다
를 사용해야 합니다. `TABLE` 키워드 대신 `struct` 키워드.두 번째 차이점은 을 (를) 정의해야 한다는 것입니다. `primary_key`
a를 반환하는 함수 `uint64_t`.이 함수는 다음과 같은 용도로 사용되는 테이블의 기본 키를 결정하는 데 사용됩니다.
테이블을 인덱싱합니다.

기본 키가 테이블의 인덱스인 NoSQL 데이터베이스처럼 생각해 보십시오.기본 키는 다음과 같은 용도로 사용됩니다.
테이블에서 데이터의 위치를 결정하고 테이블에서 데이터를 쉽고 효율적으로 검색하는 데 사용됩니다.

### 기본 키 데이터 유형

기본 키는**반드시**이어야 합니다. `uint64_t` (당신은 또한 사용할 수 있습니다 `name.value`) 로 표시되며 테이블의 각 행에 대해 고유해야 합니다.즉, 할 수 없습니다.
동일한 기본 키를 가진 두 개의 행이 있습니다.동일한 기본 키를 가진 여러 행이 필요한 경우 a를 사용할 수 있습니다.
보조 인덱스.

### 보조 키 데이터 유형

보조 인덱스는 기본 키보다 유연하며 다음 데이터 유형 중 하나일 수 있습니다.

- `uint64_t`
- `uint128_t`
- `double`
- `long double`
- `checksum256`

중복 값도 포함될 수 있습니다. 즉, 동일한 보조 키를 가진 행이 여러 개 있을 수 있습니다.

> 💰 **비용 고려 사항**
> 
> 각 인덱스는 행당 RAM의 비용이 들기 때문에 필요할 때만 보조 인덱스를 사용해야 합니다.테이블을 쿼리할 필요가 없는 경우
> 특정 필드를 기준으로 하면 해당 필드에 대한 색인을 만들지 않아야 합니다.

## 레이어 및 범위

테이블에 데이터를 저장하는 방법을 알아보기 전에 먼저 다음 사항을 살펴보겠습니다. `scope` 과 `payer`.

### 램 플레이어

RAM 지불자는 데이터를 저장하는 데 사용되는 RAM에 대해 지불하는 계정입니다.이 계정 중 하나는
계약을 호출하거나 계약 자체를 호출하고 있습니다.이것은 때때로 게임 이론에 크게 의존하며 복잡할 수 있습니다.
결정.지금은 계약 자체를 RAM 지불자로 사용하기만 하면 됩니다.

또한 RAM에 대한 거래 승인 결제에 속하지 않는 계정을 가질 수 없습니다.

> 💰 **RAM을 조심하세요**
>
> RAM은 EOS 블록체인의 제한된 리소스이므로 다른 사람이 사용할 수 있는 RAM 용량에 주의해야 합니다.
> 귀하의 계약.일반적으로 사용자에게 RAM 비용을 지불하도록 하는 것이 더 좋지만, 이를 위해서는 인센티브를 만들어야 합니다.
> 동등하거나 더 큰 가치를 인정받는 것에 대한 대가로 자신의 RAM을 소비하는 것입니다.


### 범위

테이블의 범위는 테이블의 데이터를 추가로 분리하는 방법입니다.이것은 `uint64_t` 결정하는 데 사용됩니다.
데이터가 어떤 _버킷_에 저장되어 있습니까?

데이터베이스를 다음과 같이 상상해 보면 `JSON` 객체는 다음과 같이 보일 수 있습니다.

```json title="tables.json"
{
    "users": {
        1: [
            {
                "id": 1,
                "eos_account": "bob"
            },
            {
                "id": 2,
                "eos_account": "sally"
            }
        ],
        2: [
            {
                "id": 1,
                "eos_account": "joe"
            }
        ]
    }
}
```

위에서 볼 수 있듯이 서로 다른 범위에서 충돌 없이 동일한 기본 키를 사용할 수 있습니다.이는 다음과 같은 다양한 경우에 유용합니다.
- 사용자별 데이터를 저장하려는 경우
- 게임 인스턴스당 데이터를 저장하려는 경우
- 사용자별 인벤토리를 저장하려는 경우
- 등


## 다중 인덱스 테이블

다중 인덱스 테이블은 EOS 블록체인에 데이터를 저장하는 가장 일반적인 방법입니다.영구 키-값 저장소입니다.
여러 방법으로 인덱싱할 수 있지만 항상 기본 키가 있습니다.NoSQL 데이터베이스 비유로 돌아가서 다음과 같이 생각할 수 있습니다.
다중 인덱스 테이블은 문서 모음으로, 각 인덱스는 컬렉션에서 데이터를 쿼리하거나 가져오는 다른 방법을 사용합니다.

### 테이블 정의

다중 인덱스 테이블을 생성하려면 적어도 하나의 기본 키로 정의된 모델이 있어야 합니다.그런 다음 다중 색인을 만들 수 있습니다.
를 사용한 테이블 `multi_index` 템플릿을 입력하고 테이블/컬렉션의 이름과 사용하려는 모델을 전달합니다.

```cpp
TABLE UserModel ...

using users_table = multi_index<"users"_n, UserModel>;
```

그러면 다음과 같은 테이블이 생성됩니다. `users` 를 사용하는 `UserModel` 모델.그런 다음 이 테이블을 사용하여 저장하고 검색할 수 있습니다.
블록체인의 데이터.


### 테이블 인스턴스화

테이블을 사용하여 작업을 수행하려면 먼저 테이블을 인스턴스화해야 합니다.이렇게 하려면 테이블을 소유한 계약을 전달해야 합니다.
그리고 사용하려는 스코프.

```cpp
ACTION test() {
    name thisContract = get_self();
    users_table users(thisContract, thisContract.value);
```


### 데이터 삽입

이제 인스턴스화된 테이블에 대한 참조가 있으므로 테이블에 데이터를 삽입할 수 있습니다.이 작업을 수행하려면 다음을 사용할 수 있습니다. `emplace`
함수 - 삽입하려는 모델에 대한 참조를 받는 람다/익명 함수를 사용합니다.

```cpp
...

name ramPayer = thisContract;
users.emplace(ramPayer, [&](auto& row) {
    row.id = 1;
    row.eos_account = name("eosio");
});
```

모델을 먼저 정의하고 전체 행에 삽입할 수도 있습니다.

```cpp
UserModel user = {
    .id = 1,
    .eos_account = name("eosio")
};

users.emplace(ramPayer, [&](auto& row) {
    row = user;
});
```

### 데이터 검색

테이블에서 데이터를 검색하려면 다음을 사용합니다. `find` 테이블의 메서드로, 해당 행의 기본 키를 사용합니다.
검색하고 싶습니다.그러면 행에 반복자 (참조) 가 반환됩니다.

```cpp
auto iterator = users.find(1);
```

행을 실제로 찾았는지 확인해야 합니다. 그렇지 않은 경우 반복자는 다음과 같기 때문입니다. `end` 이터레이터,
테이블의 끝을 나타내는 특수 이터레이터입니다.

```cpp
if (iterator != users.end()) {
    // You found the row
}
```

그러면 두 가지 방법으로 행의 데이터에 액세스할 수 있습니다.첫 번째 방법은 를 사용하는 것입니다. `->` 운영자, 당신에게 줄 것입니다
행 데이터에 대한 포인터, 두 번째 방법은 다음을 사용하는 것입니다. `*` 연산자를 사용하면 행의 원시 데이터를 얻을 수 있습니다.

```cpp
UserModel user = *iterator;
uint64_t idFromRaw = user.id;
uint64_t idFromRef = iterator->id;
```


### 데이터 수정

전화를 시도한 경우 `emplace` 기본 키가 이미 존재하기 때문에 두 번 오류가 발생합니다.데이터를 수정하려면
테이블에서는 다음을 사용해야 합니다. `modify` 수정하려는 이터레이터, RAM 페이어에 대한 참조를 받는 메서드,
데이터를 수정할 수 있게 해주는 람다/익명 함수도 있습니다.

```cpp
users.modify(iterator, same_payer, [&](auto& row) {
    row.eos_account = name("foobar");
});
```

> ❔ **동일_지불인이란 무엇입니까? **
> 
> 더 `same_payer` 변수는 RAM 지불자가 다음과 같아야 함을 나타내는 데 사용되는 특수 변수입니다.
> 오리지널 램 플레이어.테이블의 데이터를 수정하고 싶지만 원래 RAM 지불자의 RAM 지불자가 없을 때 유용합니다.
> 권한 부여.삽입된 자체 계약에 있는 테이블의 데이터를 수정하려는 경우가 종종 있습니다. 
> 다른 사용자의 RAM 사용데이터에 어떤 필드도 추가할 수 없지만 기존 필드만 수정하는 경우에는
> 그러면 RAM 사용량에 차이가 없으므로 추가 RAM 비용을 지불하거나 잉여 RAM을 환불할 필요가 없습니다.


### 데이터 제거

테이블에서 데이터를 제거하려면 다음을 사용해야 합니다. `erase` 메서드는 제거하려는 이터레이터에 대한 참조를 가져옵니다.

```cpp
users.erase(iterator);
```


### 보조 인덱스 사용

보조 인덱스를 사용하면 다른 방식으로 테이블을 쿼리할 수 있습니다.예를 들어, 다음을 쿼리하려는 경우
테이블 바이 더 `eos_account` 필드의 경우 해당 필드에 보조 인덱스를 생성해야 합니다.

#### 모델 및 테이블 재정의

보조 인덱스를 사용하려면 먼저 모델에서 이를 정의해야 합니다.다음을 사용하여 이 작업을 수행할 수 있습니다. `indexed_by` 템플릿 및 전달
인덱스의 이름 및 인덱스의 유형에서

```cpp
TABLE UserModel {
    uint64_t id;
    name eos_account;

    uint64_t primary_key() const { return id; }
    uint64_t account_index() const { return eos_account.value; }
};

using users_table = multi_index<"users"_n, UserModel,
    indexed_by<"byaccount"_n, const_mem_fun<UserModel, uint64_t, &UserModel::account_index>>
>;
```

더 `indexed_by` 템플릿은 약간 혼란스러울 수 있으므로 세분화해 보겠습니다.

```cpp
indexed_by<
    <name_of_index>,
    const_mem_fun<
        <model_to_use>, 
        <index_type>,
        <pointer_to_index_function>
    >
>
```

더 `name_of_index` 사용하려는 인덱스의 이름입니다.이것은 무엇이든 될 수 있지만 무언가를 사용하는 것이 가장 좋습니다
인덱스의 용도를 설명합니다.

더 `model_to_use` 인덱스에 사용하려는 모델입니다.이 모델은 일반적으로 사용하는 것과 동일한 모델입니다.
테이블이지만 꼭 그럴 필요는 없습니다.인덱스에 다른 모델을 사용하고 싶지만 여전히 원하는 경우에 유용합니다.
테이블의 데이터에 액세스할 수 있어야 합니다.

더 `index_type` 인덱스의 유형이며 앞에서 설명한 유형으로 제한됩니다.

더 `pointer_to_index_function` 인덱스에 사용할 값을 반환하는 함수에 대한 포인터입니다.이것은
함수는 다음과 같아야 합니다. `const_mem_fun` 함수로, 인덱스에 사용하는 모델의 멤버 함수여야 합니다.

#### 보조 인덱스 사용

이제 보조 인덱스가 생겼으니 이를 사용하여 테이블을 쿼리할 수 있습니다.이렇게 하려면 먼저 테이블에서 인덱스를 가져오고
그런 다음 사용하십시오 `find` 테이블에서 직접 사용하는 대신 인덱스의 메서드를 사용합니다.

```cpp
auto index = users.get_index<"byaccount"_n>();
auto iterator = index.find(name("eosio").value);
```

보조 인덱스를 사용하여 테이블의 데이터를 수정하려면 다음을 사용합니다. `modify` 인덱스에 있는 메서드를 사용하는 대신
테이블 바로 위에.

```cpp
index.modify(iterator, same_payer, [&](auto& row) {
    row.eos_account = name("foobar");
});
```

## 싱글턴 테이블

A `singleton` 테이블은 범위당 하나의 행만 가질 수 있는 특수한 유형의 테이블입니다.이는 다음과 같은 데이터를 저장하는 데 유용합니다.
구성 또는 플레이어 인벤토리와 같은 하나의 인스턴스만 갖고 싶을 수 있습니다.

a 사이의 주요 차이점 `singleton` 테이블과 다중 인덱스 테이블은 다음과 같습니다.
- 싱글톤은 모델에 기본 키가 필요하지 않습니다.
- 싱글톤은 사전 정의된 모델뿐만 아니라 모든 유형의 데이터를 저장할 수 있습니다.

### 테이블 정의

싱글턴 테이블을 정의하려면 다음을 사용합니다. `singleton` 템플릿을 입력하고 테이블 이름과 테이블 유형을 전달합니다.
저장하려는 데이터.

또한 다음을 가져와야 합니다. `singleton.hpp` 헤더 파일.

```cpp
#include <eosio/singleton.hpp>

TABLE ConfigModel {
    bool is_active;
};

using config_table = singleton<"config"_n, ConfigModel>;

using is_active_table = singleton<"isactive"_n, bool>;
```

더 `singleton` 템플릿은 다음과 동일합니다. `multi_index` 템플릿 (보조 인덱스를 지원하지 않는다는 점 제외)

a를 저장하는 하나의 테이블을 정의했습니다. `ConfigModel`, 및 a를 저장하는 또 다른 테이블 `bool`.두 테이블 모두 보관할 수 있습니다. 
정확히 같은 데이터지만 `bool` 테이블은 추가된 오버헤드를 저장할 필요가 없기 때문에 더 효율적입니다.
에 의해 발생 `ConfigModel` 구조체.

### 테이블 인스턴스화

그냥 `multi_index` table, 먼저 테이블을 인스턴스화한 다음 사용할 수 있습니다.

```cpp
name thisContract = get_self();
config_table configs(thisContract, thisContract.value);
```

더 `singleton` table은 생성자에서 두 개의 매개 변수를 사용합니다.첫 번째 매개변수는 테이블의 계약입니다.
가 소유하고, 두 번째 매개변수는 `scope`.

### 데이터 가져오기

데이터를 가져오는 몇 가지 방법이 있습니다. `singleton`. 

#### 성공 또는 실패

기존 데이터가 없는 경우 런타임에 오류가 발생합니다.
이를 방지하려면 다음을 사용할 수 있습니다. `exists` 기존 데이터가 있는지 확인하는 메서드입니다.

```cpp
if (!configs.exists()) {
    // handle error
}
ConfigModel config = configs.get();
bool isActive = config.is_active;
```

#### Get 또는 기본값

이렇게 하면 기본값이 반환되지만**유지되지 않습니다**.

```cpp
ConfigModel config = configs.get_or_default(ConfigModel{
  .is_active = true
});
```

#### 가져오기 또는 생성

그러면 기본값이 반환되고**이 값이 유지됩니다**.

```cpp
ConfigModel config = configs.get_or_create(ConfigModel{
  .is_active = true
});
```

### 데이터 설정

에서 데이터를 유지하려면 `singleton`, 사용할 수 있습니다 `set` 메서드는 설정하려는 데이터를 참조합니다.

```cpp
configs.set(ConfigModel{
    .is_active = true
}, ramPayer);
```

### 데이터 제거

인스턴스화한 후 `singleton`, 쉽게 제거 할 수 있습니다.방금 전화했습니다. `remove` 인스턴스 자체의 메서드.

```cpp
configs.remove();
```


