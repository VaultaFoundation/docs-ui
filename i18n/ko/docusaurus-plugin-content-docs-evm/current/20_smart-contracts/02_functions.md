---
title: 함수
---

<head>
 </head><title>함수 (EVM)</title>

함수는 프로그램에서 로직을 캡슐화하는 방법이지만 스마트 계약의 진입점 역할도 합니다.

## 함수 선언

Solidity의 함수 선언에는 몇 가지 기본 요구 사항이 있습니다.
- 으로 시작해야 합니다. `function` 핵심어
- 이름이 있어야 함
- 매개변수 목록이 있어야 함 (비어 있더라도)
- 신고해야 함 `visibility`
- 몸을 가질 수 있음
- 반품 유형 가능
- 모디파이어 보유 가능
- 다음과 같이 선언 가능 `payable`
- 가변성 수정자가 있어야 함 (해당하는 경우)

간단한 함수 선언을 살펴본 다음 이를 세분화하여 좀 더 고급 주제로 넘어가겠습니다.

```solidity
// function <name>(<parameters>) <visibility> <modifiers?> <returns?> { <body> }

function myFunction(bool _myParam) public {
    // Function body
}
```

## 함수 매개변수

함수 매개 변수는 괄호로 묶인 쉼표로 구분된 유형 및 이름 목록으로 선언됩니다.

```solidity
function myFunction(bool _myParam, uint256 _myOtherParam) public {}
```


>📘 **매개변수 명명 규칙**
>>솔리디티에서는 함수 매개 변수 앞에 밑줄을 붙이는 것이 일반적입니다 (`_`).필수 사항은 아니지만 널리 사용되는 규칙입니다.
>파라미터와 이름이 같은 글로벌 변수를 구분하려는 의도가 있습니다.


## 함수 가시성

솔리디티 내 함수는 네 가지 가시성 중 하나를 가질 수 있습니다.

### 공개

공공 기능은 가시성을 확보하기 위한 필수 요소입니다.계약 내에서, 상속된 계약에서 호출할 수 있습니다.
블록체인의 다른 계약으로부터, 그리고 사용자에 의한 블록체인 외부로부터 

```solidity
function myFunction() public {}
```

### 외부

외부 함수는 다른 계약이나 블록체인 외부의 사용자가 계약 외부에서만 호출할 수 있습니다.

```solidity
function myFunction() external {}
```

>💰 **외부는 공용보다 저렴합니다**
> >계약 외부에서만 호출되는 함수를 작성하는 경우 다음을 사용해야 합니다. `external` 대신에 `public`.
>그 이유는 `external` 함수는 호출하는 것이 더 저렴합니다 `public` 매개 변수를 복사할 필요가 없기 때문에 함수 
>메모리. 

### 내부

내부 함수는 계약 내에서 또는 상속된 계약에서만 호출할 수 있습니다.

```solidity
function myFunction() internal {}
```

### 비공개

프라이빗 함수는 계약 내에서만 호출할 수 있습니다.

```solidity
function myFunction() private {}
```

## 함수 반환 유형

함수는 단일 값 또는 다중 값을 반환할 수 있습니다.반환 유형은 매개변수 목록 뒤에 선언되며 쉼표로 구분됩니다.

반환 값의 이름을 지정할 수도 있습니다. 그러면 함수 본문에 값을 할당할 수 있는 변수가 만들어집니다.

```solidity
function myFunction() public returns (uint256) {
    return 1;
}

function myOtherFunction() public returns (uint256 myValue) {
    myValue = 1;
}
```


## 함수 수정자

수정자는 함수 이전 또는 이후에 실행될 함수에 기능을 추가하는 방법입니다. 
일반적으로 함수에 검사를 추가하거나 함수의 반환 값을 수정하는 데 사용됩니다.

수정자는 다음과 같이 선언됩니다. `modifier` 키워드로, 를 사용하여 함수에 적용할 수 있습니다. `modifier` 함수 선언 뒤의 키워드

모든 수정자는 다음으로 시작하거나 끝나야 합니다. `_;` 성명서.여기서 함수 본문이 실행됩니다.

```solidity
// declaration
modifier myModifier() {
    // Modifier body
    _;
}

// usage
function myFunction() public myModifier {}
```

여러 수정자를 공백으로 구분하여 함께 연결할 수도 있습니다.

```solidity
function myFunction() public myModifier1 myModifier2 {}
```

## 유료 기능

함수는 블록체인의 고유 통화를 결제로 받아들일 수 있습니다.이는 함수를 다음과 같이 선언하여 수행됩니다. `payable`.

EOS EVM의 경우, 이것이 바로 EOS입니다.

```solidity
function myFunction() public payable {
    uint256 amount = msg.value;
}
```

>📘 **메시지 값**
> > `msg.value` 모든 함수에서 사용할 수 있는 글로벌 변수입니다.여기에는 함수에 전송된 고유 통화의 양이 포함됩니다.

## 함수 가변성

함수가 가질 수 있는 가변성에는 세 가지 유형이 있으며, 각 유형은 서로 다른 의미를 갖습니다. 

### 기본값 

함수에 변경 가능성 수정자가 없으면 “쓰기 가능한” 함수로 간주됩니다. 
즉, 함수가 계약 상태를 수정할 수 있으며, 계약 외부에서 호출하면 사용자에게 가스 요금이 부과됩니다.

```solidity
function myFunction() external {}
```

### 보기

함수가 다음과 같이 선언된 경우 `view`이는 함수가 계약 상태를 수정하지는 않지만 수정한다는 것을 의미합니다.
계약에서 상태 변수를 읽습니다.이 기능을 사용하는 사용자에게는 가스 요금이 부과되지 않습니다.

```solidity
function myFunction() external view returns (uint256) {
    return myStateVariable;
}
```

### 퓨어

함수가 다음과 같이 선언된 경우 `pure`이는 함수가 계약 상태를 수정하지 않으며 수정하지 않음을 의미합니다.
계약에서 상태 변수를 읽습니다.이 기능을 사용하는 사용자에게는 가스 요금이 부과되지 않습니다.

```solidity
function myFunction(uint256 a, uint256 b) external pure returns (uint256) {
    return a + b;
}
```

>📘 **퓨어가 왜 유용할까요?**
> >순수 함수는 일반적으로 유틸리티 함수를 외부에 제공하는 데 사용됩니다.예를 들어, 함수를 제공하려는 경우
>계약이 웹에서 로직을 복제하기 위해 내부적으로 사용하는 로직을 기반으로 숫자를 계산합니다.
>응용 프로그램을 사용할 수 있습니다 `pure` 이 작업을 수행하는 함수. 

## 생성자

생성자는 계약이 배포될 때 호출되는 특수 함수입니다.그들은 다음과 같이 선언됩니다. `constructor` 키워드,
한 번만 실행됩니다.

```solidity
constructor() public {
    // Constructor body
}
```
