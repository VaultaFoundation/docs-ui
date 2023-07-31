---
title: 해부학
---

EOS에서 가장 많이 사용되는 스마트 계약 개발 언어는 C++이며, 때로는 다음과 같이 불리기도 합니다. `EOS++`. 
스마트 컨트랙트 작성에 필요한 C++ 지식은 매우 미미합니다.C, C++, 자바, C# 등을 작성한 적이 있다면
타이프스크립트, 익힐 수 있을 거야 `EOS++` 쉽게.

또한 Rust, Python, Go 및 AssemblyScript와 같은 다른 언어를 지원하기 위한 커뮤니티 노력도 있습니다.
하지만 이 문서에서는 스마트 컨트랙트 작성을 위한 C++에 초점을 맞출 것입니다. 
언어 지원 확대를 위한 커뮤니티 주도의 다른 이니셔티브에 대해 알아보고 싶다면, 
확인해 보세요 [언어 지원](/docs/03_smart-contracts/999_language-support.md) 페이지.


## 프로젝트 구조

프로젝트를 구조화할 때는 많은 자유를 누릴 수 있습니다.하나의 모놀리식을 사용할 수 있습니다. `.cpp` 당신을 위한 파일
전체 프로젝트를 사용하거나 여러 파일로 분할할 수 있습니다.CMake와 같은 빌드 시스템을 사용하여 관리할 수도 있습니다.
프로젝트.

여기에 있는 대부분의 가이드에서는 단일 가이드를 사용할 것입니다. `.cpp` 파일.
이것은 시작하는 가장 간단한 방법이며 스마트 계약을 작성하는 가장 일반적인 방법입니다.

### 단일 파일

아래는 단일 파일 스마트 계약의 예입니다.이것을 컴파일하기 위해 프로젝트에 다른 것이 필요하지 않습니다.
다른 파일은 포함할 필요가 없습니다.

```cpp title="project/singlefile.cpp"
#include <eosio/eosio.hpp>

CONTRACT singlefile : public eosio::contract {
  public:
    using contract::contract;

    ACTION test() {
      // ...
    }
};
```

### 다중 파일

프로젝트를 여러 파일로 분할하려는 경우에도 그렇게 할 수 있습니다.

```cpp title="project/src/library.hpp"
class library {
    struct data {
      uint64_t id;
      std::string value;
    };
};
```

```cpp title="include/multiplefiles.cpp"
#include <eosio/eosio.hpp>
#include "library.hpp"

CONTRACT multiplefiles : public eosio::contract {
  public:
    using contract::contract;

    ACTION test() {
      // ...
    }
};
```


#### 헤더 대 소스

C++에는 두 가지 유형의 파일이 있습니다. 헤더 파일 (`.hpp/.h`) 및 소스 파일 (`.cpp`).

- 헤더 파일은 함수, 클래스, 구조체 및 기타 유형을 선언하는 데 사용됩니다.
- 소스 파일은 헤더 파일에 선언된 함수를 구현하는 데 사용됩니다.

#### 디렉터리 포함

프로젝트를 컴파일할 때 헤더 파일을 찾을 위치를 컴파일러에 알려야 합니다.

일반적으로 헤더 파일은 라는 디렉토리에 넣는 것이 좋습니다. `include`, 및 디렉터리에 있는 소스 파일
전화 `src`.

```text
project/
  include/
    library.hpp
  src/
    multiplefiles.cpp
```

### 다중 파일 프로젝트를 사용하는 경우

대규모 프로젝트를 작성하는 경우 여러 파일로 분할하는 것이 좋습니다.

프로젝트를 깔끔하게 유지한다는 것은 프로젝트를 논리적인 구성 요소로 나누는 것을 의미합니다.예를 들어 다음과 같은 파일이 있을 수 있습니다.
데이터베이스, 비즈니스 로직 파일, 일부 헬퍼 함수용 파일.

이는 또한 대규모 팀이 다음과 같은 버전 제어 시스템으로 작업할 때 서로 마주치는 일을 방지하는 데도 도움이 됩니다. `git`.

## 계약 구조

계약은 객체 지향적입니다.계약을 정의하는 것과 같은 방식으로 계약을 정의합니다. `class`.

```cpp title="project/mycontract.cpp"
#include <eosio/eosio.hpp>

CONTRACT mycontract : public eosio::contract {
    public:
    using contract::contract;
};
```

여기에는 몇 가지 주요 구성 요소가 있습니다. 

### 계약 정의

더 `CONTRACT` 키워드는 컴파일러에게 EOS++ 스마트 계약을 작성하고 있다고 알리는 방법입니다.

그 뒤에는 계약의 이름과 이 계약이 상속하는 기본 클래스가 와야 합니다.

```cpp
CONTRACT mycontract : public eosio::contract {
```

> ❕ **알아두면 좋은 정보**
>
> 일반적으로 계약 이름을 귀하의 이름과 동일하게 유지해야 합니다. `.cpp` 파일 이름.일부 빌드 시스템에서는 이를 적용합니다.
> 당신에게, 그리고 그들이 반환하는 오류가 항상 명확하지는 않습니다.

### 액세스 한정자

액세스 한정자는 계약의 특정 요소에 대한 가시성을 정의하는 데 사용됩니다.
C++에는 세 가지 액세스 한정자가 있습니다. 
- `public`: 요소가 모든 것에 표시됩니다.
- `private`: 요소는 계약 자체에만 표시됩니다.
- `protected`: 요소는 계약 자체와 해당 요소로부터 상속되는 모든 계약에 표시됩니다.

가시성 수정자를 선언하면 그 아래에 있는 모든 항목이 해당 가시성을 갖게 됩니다.

```cpp
public:
  // Everything below this is public
private:
  // Everything below this is private
```


> ⚠ **경고**
> 
> 외부 세계에 대한 계약의 가시성을 정의하는 것은 아닙니다.당신은 당신의 가시성을 정의하고 있습니다
> 계약의 다른 요소에 대한 계약액션 및 테이블과 같은 것들은 항상 공개적으로 액세스할 수 있습니다.
> 계약 이외.


### 계약 사용

EOS++ 스마트 계약을 컴파일하는 데 필요한 줄은 다음과 같습니다. `using contract::contract;` 선.


### 기본 요소

EOS++ 스마트 계약은 두 가지 기본 요소로 구성됩니다.

- **조치**: 계약의 시작점입니다. 
- **테이블**: 계약에서 데이터를 저장하는 방식.

다음 섹션에서 이 두 가지를 더 자세히 설명하겠습니다.
