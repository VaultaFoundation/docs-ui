---
title: “ABI 파일 이해”
---

그리고 `ABI` 파일 (또는 애플리케이션 바이너리 인터페이스) 은 스마트 통합 업체 또는 사용자에게 방법을 설명하는 JSON 파일입니다.
계약은 그들과 상호 작용할 수 있습니다.스마트 컨트랙트의 동작 및 데이터 구조와 이를 변환하는 방법을 설명합니다.
JSON으로 또는 JSON으로부터.

ABI 파일은 스마트 계약 소스 코드에서 생성되지만 수동으로 작성할 수도 있습니다 (권장하지는 않음).

이를 이해하면 더 나은 스마트 계약을 작성하고 더 쉽게 디버그할 수 있습니다.


## 예제 ABI

```cpp
CONTRACT mycontract : public contract {
   public:
      using contract::contract;
      TABLE user {
         name     eos_account;
         uint8_t  is_admin;

         uint64_t primary_key() const { 
            return eos_account.value; 
         }
      };

      using user_table = eosio::multi_index<"users"_n, user>;

      ACTION newuser( name eos_account ){}
};
```

위 코드는 다음과 같은 JSON ABI를 생성합니다.

```json
{
    "version": "eosio::abi/1.2",
    "types": [],
    "structs": [
        {
            "name": "newuser",
            "base": "",
            "fields": [
                {
                    "name": "eos_account",
                    "type": "name"
                }
            ]
        },
        {
            "name": "user",
            "base": "",
            "fields": [
                {
                    "name": "eos_account",
                    "type": "name"
                },
                {
                    "name": "is_admin",
                    "type": "uint8"
                }
            ]
        }
    ],
    "actions": [
        {
            "name": "newuser",
            "type": "newuser",
            "ricardian_contract": ""
        }
    ],
    "tables": [
        {
            "name": "users",
            "type": "user",
            "index_type": "i64",
            "key_names": [],
            "key_types": []
        }
    ],
    "ricardian_clauses": [],
    "variants": [],
    "action_results": []
}
```

## ABI 엘리먼트

### 버전

ABI 버전은 호환성을 보장하는 데 사용됩니다.다음 형식의 문자열입니다. `eosio::abi/X.Y`, 어디에 `X` 과 `Y` 정수입니다.

```json
"version": "eosio::abi/1.2",
```

### 유형

유형은 계약에 정의된 사용자 지정 유형입니다.계약 개발을 더 읽기 쉽고 유지 관리하기 쉽게 만드는 데 자주 사용됩니다.

```json
"types": [{
 "new_type_name": "name",
 "type": "name"
}],
```

### 구조체

구조체는 계약에 정의된 사용자 지정 데이터 구조입니다.이들은 종종 데이터베이스 테이블 내에 저장하는 모델로 사용됩니다.


#### 기본 구조

```json
{
  "name": "issue",     // The name
  "base": "",          // Inheritance, parent struct
  "fields": []         // Array of field structures
}
```

#### 필드 구조

```json
{
  "name":"",  // The field's name
  "type":""   // The field's type
}
```

#### 예제 구조체
```json
{
  "name": "newuser",
  "base": "",
  "fields": [
    {
      "name": "eos_account",
       "type": "name"
    }
  ]
}
```

### 액션

액션은 계약의 호출 가능한 함수입니다.이들은 계약 사용자가 상호 작용하는 대상입니다. 
블록체인에서 작업을 수행하고자 할 때

```json
{
  "name": "newuser",           // The name of the action as defined in the contract
  "type": "newuser",           // The name of the implicit parameter struct as described in the action interface
  "ricardian_contract": ""     // An optional ricardian clause to associate to this action describing its intended functionality.
}
```

### 테이블

테이블은 계약의 영구 데이터 구조입니다.이들은 블록체인 내에 저장된 데이터의 위치입니다.

```json
{
  "name": "",       // The name of the table, determined during instantiation.
  "type": "",       // The table's corresponding struct
  "index_type": "", // The type of primary index of this table
  "key_names" : [], // An array of key names, length must equal length of key_types member
  "key_types" : []  // An array of key types that correspond to key names array member, length of array must equal length of key names array.
}
```

채워진 표의 예:

```json
{
  "name": "accounts",
  "type": "account", // Corresponds to previously defined struct
  "index_type": "i64",
  "key_names" : ["primary_key"],
  "key_types" : ["uint64"]
}
```

### 댓글

도구에서 무시할 주석을 ABI 파일에 추가할 수 있습니다.

```json
"___comment" : "Your comment here"
```
