---
title: 주장
---

모든 프로그램과 마찬가지로 버그가 발생할 수 있으며 사용자 입력을 검증해야 합니다.EOS++는 이를 위한 명확한 방법을 제공합니다.

## 상태 되돌리기

어설션은 조건이 참인지 확인하는 방법이며, 그렇지 않으면 트랜잭션이 실패합니다.거래가 있을 때
실패하면 트랜잭션에서 발생한 모든 상태 변경이 롤백됩니다.이는 다음과 같은 모든 변경 사항을 의미합니다. 
영구 데이터/테이블은 마치 트랜잭션이 발생하지 않은 것처럼 되돌아갑니다.

## 확인

더 `check` 함수는 EOS++에서 조건을 검증하는 방법입니다. 
함수는 지정된 조건이 참인지 확인하고, 그렇지 않으면 트랜잭션이 실패합니다.

```cpp
check(1 == 1, "1 should equal 1");
```

를 위한 인터페이스 `check` 함수는 단순히 조건과 a를 취합니다. `string` 메시지.조건이 거짓인 경우 메시지
오류로 발생하고 트랜잭션이 되돌아갑니다.

## 비문자열 로깅

이후 `check` 함수에 a가 걸립니다 `string` 메시지, 문자열이 아닌 것을 기록하는 방법이 궁금할 수 있습니다. 
이는 기록하려는 데이터 유형에 따라 다르지만 다음은 몇 가지 일반적인 예입니다.

#### 로깅 `name`

```cpp
name thisContract = get_self();
check(false, "This contract is: " + thisContract.to_string());
```

#### 로깅 `asset`

```cpp
asset myAsset = asset(100, symbol("EOS", 4));
check(false, "My asset is: " + myAsset.to_string());
```

#### 로깅 정수

```cpp
int myInt = 100;
check(false, "My int is: " + std::to_string(myInt));
```




