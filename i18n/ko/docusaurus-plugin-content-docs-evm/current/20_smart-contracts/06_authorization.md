---
title: 권한 부여
---

권한 부여는 사용자에게 트랜잭션을 수행할 권한이 있는지 여부를 결정하는 프로세스입니다.
블록체인 애플리케이션에서 이는 스마트 계약과 디지털 자산의 안전을 보장하는 핵심 측면입니다.
제어합니다.

솔리디티에는 다음과 같은 특수 변수가 있습니다. `msg.sender` 함수를 호출하는 사용자의 주소를 나타냅니다.
이 주소는 사용자에게 작업을 수행할 권한이 있는지 여부를 결정하는 데 사용할 주소입니다.

## 권한 부여 패턴

솔리디티에는 두 가지 일반적인 권한 부여 패턴이 있습니다.

### 필요

더 `require` 패턴은 권한 부여를 구현하는 가장 간단한 방법입니다.조건이 충족되지 않으면 오류가 발생하는 한 줄의 코드입니다.

```solidity
function withdraw(uint256 amount) public {
    require(msg.sender == someExpectedAddress, "only the owner can withdraw");
    // withdraw funds
}
```

### 수정자

수정자 패턴은 여러 함수에서 권한 부여 로직을 재사용하는 방법입니다.적용되는 함수보다 먼저 호출되는 함수입니다.

```solidity
contract MyContract {
    address public owner = <some address>;

    modifier onlyOwner() {
        require(msg.sender == owner, "only the owner can call this function");
        _;
    }

    function withdraw(uint256 amount) public onlyOwner {
        // withdraw funds
    }
}
```

## 모범 사례

OpenZeppelin은 대부분의 솔리디티 프로젝트에 사용되는 빌딩 블록을 제공하는 회사입니다.그들은 가지고 있습니다
프로젝트에서 권한 부여를 구현하는 데 사용할 수 있는 일련의 계약을 제공하는 “액세스 제어” 라이브러리입니다.

이러한 라이브러리는 커뮤니티에서 테스트 및 감사를 거쳤으므로 직접 구축하는 것보다 사용하는 것이 좋습니다.
수천 개의 프로젝트에서

오픈제플린을 읽어 보세요 [액세스 제어 문서](https://docs.openzeppelin.com/contracts/4.x/access-control) 에
계약 사용 방법을 더 잘 이해하세요.


