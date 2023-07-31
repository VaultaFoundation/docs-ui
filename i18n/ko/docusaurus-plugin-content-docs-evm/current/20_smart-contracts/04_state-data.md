---
title: 상태 데이터
---

스마트 계약에는 상태 데이터와 임시 데이터라는 두 가지 유형의 데이터가 있습니다.상태 데이터는 에 저장된 데이터입니다.
블록체인이며 지속적입니다.임시 데이터는 트랜잭션 실행 중에 저장되는 데이터이며, 그렇지 않습니다.
지속성 있는.트랜잭션이 끝나는 순간, 일시적인 데이터는 사라집니다.

솔리디티에서 상태 데이터는 계약 수준에서 선언되고 임시 데이터는 함수 또는 수정자 내에서 선언됩니다.

```solidity
contract MyContract {
    // State data
    uint256 public myStateData = 1;

    // Transient data
    function myFunction() public {
        uint256 myTransientData = 2;
    }
}
```

모든 유형의 데이터를 상태 데이터로 정의할 수 있습니다.

## 상태 데이터 액세스 및 수정

계약의 모든 기능 내에서 상태 데이터에 액세스하고 수정할 수 있습니다.상태 데이터에도 직접 액세스할 수 있습니다.
블록체인과 컨트랙트 외부에서 오지만, 명시적으로 함수를 작성하지 않으면 수정할 수 없습니다.

```solidity
contract MyContract {
    uint256 public myStateData = 1;

    function changeState() public {
        myStateData = 2;
    }
    
    function useState() public {
        uint256 myValue = myStateData;
    }
}
```

위의 예에서는 다음 값을 수정하고 있습니다. `myStateData` 내부에서 `myFunction` 기능.우리도 가지고 있습니다
선언 `myStateData` 같이 `public`즉, 계약 외부에서 직접 액세스할 수 있습니다.

## 비용

상태 데이터는 블록체인에 저장되므로 읽고 쓰는 데 가스가 듭니다.상태 읽기 및 쓰기 비용
데이터는 스마트 컨트랙트에서 가장 높은 비용 중 하나입니다.항상 주 데이터의 양을 최소화하도록 노력해야 합니다.
저장 및 해당 항목을 읽고 쓰는 횟수.

EVM 코드의 운영 비용을 알아보려면 다음을 확인해야 합니다. [EVM 코드](https://www.evm.codes/?fork=shanghai) 어느
EVM opcode의 가스 비용을 이해하는 데 유용한 자료입니다.

상태 데이터 읽기 및 쓰기와 관련된 코드는 다음과 같습니다. `SLOAD` 과 `SSTORE` (주).이에 비해 트랜지언트에 대한 옵코드는
데이터는 `MLOAD` 과 `MSTORE` (메모리).

## 모범 사례

Solidity가 상태 데이터를 저장하는 방식에는 다음과 같은 개념이 있습니다. `slots`.각각 `slot` 256비트 (32바이트) 이며 저장할 수 있습니다.
다중 변수.256비트보다 작은 변수가 여러 개 있는 경우 동일한 슬롯에 저장됩니다.

예를 들어, 두 개가 있는 경우 `uint128` 변수는 동일한 슬롯에 저장됩니다.있는 경우 `uint128` 그리고 a
`uint256`, 별도의 슬롯에 보관됩니다.

따라서 256비트보다 작은 변수를 나란히 그룹화하는 것이 가장 좋습니다.
256비트보다 큰 변수를 자체 슬롯에 보관하기 위함입니다.

```solidity
contract MyContract {
    // slot 1
    uint32 public myStateData1;
    uint32 public myStateData2;
    uint64 public myStateData3;
    uint128 public myStateData4;
    
    // slot 2
    uint256 public myStateData5;
    
    // slot 3
    uint128 public myStateData6;
    uint64 public myStateData7;
    uint32 public myStateData8;
    
    // slot 4
    uint64 public myStateData9;
}
```

위의 코드를 예로 들어 보겠습니다.안에 있는 모든 것 `slot 1` 256 비트와 같으므로 동일한 슬롯에 저장됩니다.
하지만 `slot 2` 변수의 크기가 256비트이므로 하나의 변수만 포함할 수 있습니다.

이러한 규칙은 구조체에도 적용됩니다.꽉 채워진 구조체는 느슨하게 채워진 구조체보다 더 효율적입니다.

```solidity
// Good
struct MyStruct {
    uint32 a;
    uint32 b;
    uint64 c;
    uint128 d;
    uint256 e;
}

// Bad
struct MyStruct {
    uint32 a;
    uint64 b;
    uint256 c;
    uint32 d;
    uint128 e;
}
```
