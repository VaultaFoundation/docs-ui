---
title: 리믹스로 개발하기
---

Remix는 스마트 계약을 작성, 컴파일 및 EOS EVM에 배포할 수 있는 웹 기반 IDE입니다.

## 인터페이스 학습

로 가세요 [리믹스](https://remix.ethereum.org/) 그러면 다음과 같은 내용이 표시될 것입니다.

![리믹스 인트로](/images/eos-evm_using-remix_intro.png)

Remix 인터페이스는 크게 두 부분으로 나눌 수 있습니다.

1.**사이드바** - 이 패널은 클릭한 아이콘에 따라 달라집니다.
 - **파일 탐색기** - 여기에서 파일을 만들고, 열고, 저장할 수 있습니다.
 - **검색** - 파일을 검색할 수 있는 곳입니다.
 - **솔리디티 컴파일러** - 여기에서 스마트 계약을 컴파일할 수 있습니다.
 - **트랜잭션 배포 및 실행** - 여기에서 스마트 계약을 배포하고 상호 작용할 수 있습니다.
 - **Solidity 단위 테스트** - 여기에서 스마트 계약에 대한 단위 테스트를 실행할 수 있습니다.
2.**편집자** - 여기에서 스마트 계약 코드를 작성할 수 있습니다.
3.**터미널** - 여기에서 컴파일, 배포 및 테스트 실행과 같은 다양한 작업의 출력을 볼 수 있습니다.

![리믹스 섹션](/images/eos-evm_using-remix_sections.png)

## 작업 공간

리믹스에는 기본적으로 파일을 모아 저장하고 함께 열 수 있는 작업 공간이라는 개념이 있습니다.

를 클릭하여 새 작업 공간을 생성할 수 있습니다. `+` 옆의 사이드바에 있는 아이콘 `WORKSPACES`

![리믹스 작업 공간 생성](/images/eos-evm_using-remix_create-workspace.png)

팝업에서 선택 `Blank` 템플릿 드롭다운에서 작업 영역에 이름을 지정하고 다음을 클릭합니다. `OK`.

![리믹스 작업 영역 생성 팝업](/images/eos-evm_using-remix_blank-template.png)

이제 빈 작업 공간이 생겼으니, 작업할 계약에 대한 새 파일을 생성하세요.

사이드바에서 빈 페이지 아이콘을 클릭하고 파일 이름을 지정합니다. `Todo.sol`.

![새 작업 공간 리믹스](/images/eos-evm_using-remix_new-file.png)

이제 라는 단일 파일이 있는 새 작업 공간이 생겼습니다. `Todo.sol`, 이제 스마트 컨트랙트 작성을 시작할 준비가 되었습니다.

![새 작업 공간 리믹스](/images/eos-evm_using-remix_todosol.png)

## 스마트 컨트랙트 작성하기

먼저 할 일 목록을 만들고 할 일 목록의 항목을 확인할 수 있는 간단한 스마트 계약을 작성해 보겠습니다.

다음 코드를 복사하여 사용자 컴퓨터에 붙여넣습니다. `Todo.sol` 파일:

```solidity
pragma solidity ^0.8.0;

contract Todo {
    struct TodoItem {
        string text;
        bool completed;
    }
   
    TodoItem[] public todos;
    uint256 public todoCount;
   
    function addTodoItem(string memory _text) external {
        todos.push(TodoItem(_text, false));
        todoCount++;
    }
   
    function toggleTodoItem(uint _index) external {
        todos[_index].completed = !todos[_index].completed;
    }
}
```

## 계약 파기

이 계약의 용도와 작동 방식에 대해 간단히 살펴보겠습니다.

### 컴파일러 버전 정의

솔리디티에서 가장 먼저 해야 할 일은 사용할 컴파일러 버전을 정의하는 것입니다.

```solidity
pragma solidity ^0.8.0;
```

우리의 경우에는 버전을 사용하고 있습니다. `0.8.0` 솔리디티 컴파일러의 모든 패치 버전을 사용할 수 있도록 허용합니다. `0.8` 에 의해 
버전 접두사 `^`.

### 구조체 정의

구조체는 사용자 지정 데이터 유형을 정의하는 방법입니다.우리의 경우 우리는 다음을 정의합니다. `TodoItem` 두 가지 속성을 가진 구조체:

- `text` - 할 일 항목의 텍스트를 저장할 문자열
- `completed` - 할 일 항목의 완료 여부를 저장하는 부울

### 상태 변수 정의

상태 변수는 블록체인에 저장되는 변수입니다.계약의 루트 범위에 존재합니다.

계약에서 두 가지 상태 변수를 정의했습니다.

- `todos` - 배열 `TodoItem` 구조체
- `todoCount` - 우리가 가지고 있는 할 일 항목의 수를 기록하는 숫자

### 함수 정의

함수는 계약 외부에서 또는 계약 내에서 호출할 수 있는 로직을 캡슐화하는 방법입니다.

계약 외부에서**호출할 수 있는 함수만 필요하므로 함수는 다음과 같이 정의합니다. `external`.

>❔ **기능 가시성 유형**
> >함수 가시성 유형에는 4가지가 있습니다. `external`, `public`, `internal`, 및 `private`.
>이후 가이드에서 이들 각각에 대해 자세히 설명하겠습니다.

기능은 스마트 계약과 상호 작용하는 주요 방법입니다.계약 외부에서 또는 다음에서 전화를 걸 수 있습니다.
계약 내에서.

계약에서 우리는 두 가지 기능을 정의했습니다.

- `addTodoItem` - 이 함수는 문자열을 인수로 취하고 새 문자열을 추가합니다. `TodoItem` 에 `todos` 배열.
- `toggleTodoItem` - 이 함수는 숫자 인덱스를 인수로 취하여 다음을 전환합니다. `completed` 스테이트 오브 더
  `TodoItem` 그 인덱스에서.

## 스마트 컨트랙트 컴파일

이제 스마트 계약을 작성했으니 EOS EVM에 배포할 수 있도록 컴파일해야 합니다.

를 클릭합니다. `Solidity Compiler` 사이드바의 아이콘.

>❕ **올바른 파일이 열려 있는지 확인하세요**
> >열려 있는 계약이 무엇이든 이를 통해 컴파일할 수 있으므로 반드시 `Todo.sol` 파일 열기.

이제 클릭하십시오 `Compile Todo.sol` 단추.

![리믹스 컴파일](/images/eos-evm_using-remix_compile.png)

계약에 오류가 있는 경우 발견된 각 오류에 대해 사이드바에 빨간색 상자가 표시됩니다.

![리믹스 컴파일 오류](/images/eos-evm_using-remix_compiler-error.png)

## 스마트 컨트랙트 배포

이제 스마트 계약을 컴파일했으니 EOS EVM에 배포할 수 있습니다.

를 클릭합니다. `Deploy & Run Transactions` 사이드바의 아이콘.

그런 다음 클릭하십시오. `ENVIROMENT` 드롭다운 및 선택 `Injected Provider - MetaMask`.

>❕ **먼저 메타마스크를 설정하세요!**
> >아직 설정하지 않았다면 메타마스크 지갑을 설정하고 EOS EVM에 연결했는지 확인하세요.
> >**팔로우 가능 [이 가이드](/evm/10_quick-start/02_setup-metamask.md) 그 방법을 배우기 위해서요.**

![리믹스 디플로이](/images/eos-evm_using-remix_open-deploy.png)

MetaMask가 팝업되고 계정 연결을 요청합니다.

![리믹스 커넥트 메타마스크](/images/eos-evm_using-remix_connect-metamask.png)

이제 클릭할 수 있습니다. `Deploy` 버튼을 눌러 스마트 계약을 EOS EVM에 배포하세요.

그러면 트랜잭션 확인을 요청하는 MetaMask 팝업이 열립니다.

![리믹스 디플로이](/images/eos-evm_using-remix_deploy-button.png)

성공하면 콘솔에 메시지가 표시되고 MetaMask의 알림도 표시됩니다.

![리믹스 배포 성공](/images/eos-evm_using-remix_deployed.png)

>🤕 **오류가 발생하셨나요?**
> >오류가 발생하면 MetaMask와 Remix의 콘솔에서 정보를 얻을 수 있습니다.
>일반적인 문제는 지갑에 거래 대금을 지불하기에 충분한 잔액이 없거나 지갑에 잔액이 충분하지 않다는 것입니다.
>메타마스크 지갑을 올바르게 설정하지 않았습니다.

## 스마트 컨트랙트와 상호작용하기

이제 스마트 계약을 배포했으니 상호 작용할 수 있습니다.

에서 `Deploy & Run Transactions` 패널에 다음과 같은 섹션이 표시됩니다. `Deployed Contracts`.

다음과 같은 계약서가 보일 것입니다. `TODO` 옆에 작은 화살표가 있습니다.화살표를 클릭하여 계약을 확장합니다.

![배포된 계약 리믹스](/images/eos-evm_using-remix_deployed-chevron.png)

이제 계약의 모든 함수 목록과 모든 공개 상태 변수가 표시됩니다.

옆에 있는 입력 필드를 클릭합니다. `addTodoItem` 함수를 입력하고 텍스트를 입력하십시오. 
그런 다음 클릭하십시오 `addTodoItem` 버튼을 누르면 MetaMask를 사용하여 체인에 다른 트랜잭션을 보낼 수 있습니다.

![리믹스 할 일 항목 추가](/images/eos-evm_using-remix_add-todo.png)

할 일 목록에 항목이 추가되었는지 확인하려면 다음을 누릅니다. `todoCount` 버튼을 누르면 값을 읽을 수 있습니다.
의 `todoCount` 상태 변수.그러면 버튼 아래에 결과가 표시됩니다.

또한 채울 수도 있습니다. `0` 에 대한 색인 `todos` 배열 상태 변수를 선택하고 버튼을 누르면 내용을 볼 수 있습니다. 
`todos` 해당 인덱스의 배열

>인덱스는 0부터 시작하므로 배열의 첫 번째 항목이 인덱스에 있습니다. `0`.

![리믹스 할 일 수](/images/eos-evm_using-remix_see-count.png)

마지막으로, 할 일 항목을 작성하여 전환할 수 있습니다. `0` 에 대한 색인 `toggleTodoItem` 기능 및 누르기
버튼.를 눌러 이전처럼 할 일 항목을 가져올 수 있습니다. `todos` 버튼을 다시 누르면 볼 수 있습니다.
그 `completed` 재산이 변경되었습니다.

![리믹스 토글 토도 아이템](/images/eos-evm_using-remix_toggle-todo.png)

## 스마트 컨트랙트 확인

검증은 스마트 계약 개발 프로세스의 중요한 단계입니다.이를 통해 누구나 다음을 확인할 수 있습니다.
블록체인에 배포되는 스마트 계약 코드는 사용자가 작성한 코드와 동일합니다.

에 대한 가이드가 있습니다. [스마트 컨트랙트 확인 방법](/evm/20_smart-contracts/60_verify-a-smart-contract.md), 
하지만 먼저 Remix에서 몇 가지 정보를 얻어야 합니다. 

### 계약 단순화

계약이 다른 계약을 상속하거나 수입하는 경우 계약을 확인하기 전에 계약을 평면화해야 합니다.
Solidity에서 이 작업을 수행하는 것은 쉽습니다. 계약서를 마우스 오른쪽 버튼으로 클릭하기만 하면 됩니다. `File Explorer` Tab 키를 누른 다음 클릭 `Flatten`. 

그러면 작업 공간에 다음과 같은 새 파일이 생성됩니다. `<contract-name>_flattened.sol`. 

### 계약 메타데이터 가져오기

또한 다음이 필요합니다. `compiler` 과 `EVM version` 계약을 컴파일하는 데 사용한 것.이 정보를 찾을 수 있습니다.
에서 `Solidity Compiler` 탭.

![리믹스 컴파일러 버전](/images/eos-evm_using-remix_verify.png)


## 다음 단계

**축하합니다!**

이제 EOS EVM에 첫 번째 스마트 계약을 성공적으로 배포하고 상호 작용했습니다!

스마트 계약의 기본 사항, MetaMask 설정, Remix를 사용하여 개발, 배포 및 상호 작용하는 방법에 대해 배웠습니다.
당신의 스마트 컨트랙트.
