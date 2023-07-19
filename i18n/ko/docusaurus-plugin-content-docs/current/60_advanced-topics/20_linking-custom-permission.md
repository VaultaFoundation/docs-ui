---
title: “사용자 지정 권한 생성 및 연결”
---

## 소개

EOS 블록체인에서 계정에 대한 다양한 사용자 지정 권한을 생성할 수 있습니다.사용자 지정 권한은 나중에 계약 활동에 연결될 수 있습니다.이 권한 시스템을 통해 스마트 계약은 유연한 승인 체계를 가질 수 있습니다.

이 자습서에서는 사용자 지정 권한을 생성하고 이후에 권한을 작업에 연결하는 방법을 설명합니다.단계가 완료되면 새로 연결된 권한에 대한 승인이 제공되지 않는 한 계약의 실행이 금지됩니다.이를 통해 계정과 다양한 작업을 보다 세부적으로 제어할 수 있습니다.

큰 힘에는 큰 책임이 따릅니다.이 기능은 계약 및 해당 사용자의 보안에 몇 가지 문제를 야기합니다.사용하기 전에 개념과 단계를 이해해야 합니다.

[[정보 | 학부모 허가]]
| 사용자 지정 권한을 생성하면 항상 상위 권한에 따라 권한이 생성됩니다.

사용자 지정 권한이 생성된 상위 권한의 권한이 있는 경우 언제든지 해당 사용자 지정 권한이 필요한 작업을 실행할 수 있습니다.

## 1단계.사용자 지정 권한 생성

먼저, 에 새 권한 수준을 만들어 보겠습니다. `alice` 계정:

```shell
dune -- cleos set account permission alice upsert YOUR_PUBLIC_KEY owner -p alice@owner
```

몇 가지 참고할 사항:

1.**upsert**라는 새 권한이 생성되었습니다.
2.**upsert** 권한은 개발 공개 키를 권한 증명으로 사용합니다.
3.이 권한은 에서 생성되었습니다. `alice` 계정

이 권한에 대해 공개 키 이외의 권한 (예: 기타 계정 세트) 을 지정할 수도 있습니다. 

## 2단계.권한 부여를 사용자 지정 권한에 연결

권한 부여를 연결하여 호출합니다. `upsert` 새로 생성된 권한을 가진 작업:

```shell
dune -- cleos set action permission alice addressbook upsert upsert
```

이 예에서는 승인을 다음과 연결합니다. `upsert` 주소록 계약에서 이전에 생성된 조치.

## 3단계.테스트 해보기

를 사용하여 액션을 호출해 보겠습니다. `active` 허가:

```shell
dune -- cleos push action addressbook upsert '["alice", "alice", "liddel", 21, "Herengracht", "land", "dam"]' -p alice@active
```

아래와 같은 오류가 표시될 것입니다.

```text
Error 3090005: Irrelevant authority included
Please remove the unnecessary authority from your action!
Error Details:
action declares irrelevant authority '{"actor":"alice","permission":"active"}'; minimum authority is {"actor":"alice","permission":"upsert"}
```

이제, 이번에는**upsert** 권한을 사용해 보세요. 방금 만든 **upsert** 권한을 명시적으로 선언하세요: (예: `-p alice@upsert`)

```text
dune -- cleos push action addressbook upsert '["alice", "alice", "liddel", 21, "Herengracht", "land", "dam"]' -p alice@upsert
```

이제 작동합니다.

```text
dune -- cleos push action addressbook upsert '["alice", "alice", "liddel", 21, "Herengracht", "land", "dam"] -p alice@upsert
executed transaction:

2fe21b1a86ca2a1a72b48cee6bebce9a2c83d30b6c48b16352c70999e4c20983  144 bytes  9489 us
#   addressbook <= addressbook::upsert          {"user":"alice","first_name":"alice","last_name":"liddel","age":21,"street":"Herengracht","city":"land",...
#   addressbook <= addressbook::notify          {"user":"alice","msg":"alice successfully modified record to addressbook"}
#         eosio <= addressbook::notify          {"user":"alice","msg":"alice successfully modified record to addressbook"}
#     abcounter <= abcounter::count             {"user":"alice","type":"modify"}
```
