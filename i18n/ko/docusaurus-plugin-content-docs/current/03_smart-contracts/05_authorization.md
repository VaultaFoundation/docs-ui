---
title: 권한 부여
---

권한 부여는 사용자에게 트랜잭션을 수행할 권한이 있는지 여부를 (작업을 통해) 결정하는 프로세스입니다. 
블록체인 애플리케이션에서 이는 스마트 계약과 디지털 자산의 안전을 보장하는 핵심 측면입니다.
제어합니다.

EOS++를 통한 권한 확인은 몇 가지 방법으로 수행할 수 있습니다.

## 발신자 가져오기

트랜잭션의 발신자를 얻는 가장 좋은 방법은 트랜잭션을 액션에 인수로 전달하는 것입니다.

```cpp
ACTION testauth(name user) {
    print("I was called by ", user);
}
```

이는 트랜잭션의 발신자를 구하는 가장 명확한 방법이며 이를 수행하는 데 권장되는 방법입니다.

## 인증 필요

계정이 이 거래에 서명하고 권한을 부여했는지 확인하는 가장 쉬운 방법은 다음을 사용하는 것입니다. `require_auth` 기능.

```cpp
ACTION testauth(name user) {
    require_auth(user);
}
```

## 인증 필요 2

처럼 `require_auth` 함수, `require_auth2` 함수는 지정된 계정이 트랜잭션에 서명했는지 확인합니다.
그러나 지정된 권한이 트랜잭션에 서명했는지도 확인합니다.

```cpp
ACTION testauth(name user) {
    require_auth2(user, name("owner"));
}
```

그러면 지정된 사항을 확인할 수 있습니다. `user` 계정이 트랜잭션에 서명했습니다. 즉, 호출되는 트랜잭션을 의미합니다. 
이 작업은 에 의해 승인되었습니다. `user` 계정.

## 인증 있음

위 내용 `require_auth` 함수는 지정된 계정이 트랜잭션에 서명했는지 확인하고 트랜잭션을 실패합니다.
그렇지 않은 경우.단, 지정한 계정이 거래에 서명했지만 거래에 실패하지 않았는지 확인하려는 경우
그렇지 않은 경우 다음을 사용할 수 있습니다. `has_auth` 기능.

```cpp
ACTION testauth() {
    name thisContract = get_self();
    if (has_auth(thisContract)) {
        // This contract has signed the transaction
    }
}
```

## 사용자 계정

계정이 존재하는지 확인하는 것도 좋습니다.이것은 다음을 사용하여 수행할 수 있습니다. `is_account` 기능.

```cpp
ACTION testauth(name user) {
    if(!is_account(user)) {
        // The user account does not exist
    }
}
```
