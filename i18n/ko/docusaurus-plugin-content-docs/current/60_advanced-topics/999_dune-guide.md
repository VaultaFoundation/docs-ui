---
title: 지역 개발
---

[노드 실행을 위한 도커 유틸리티 (DUNE)](https://github.com/AntelopeIO/DUNE) 블록체인 개발자와 노드 운영자가 스마트 계약 개발 및 노드 관리 기능과 관련된 상용구 작업을 수행할 수 있도록 하는 클라이언트 도구입니다.

스마트 계약 개발을 시작하기 전에 DUNE에 대해 알아보고 플랫폼에 설치하는 방법을 알아봐야 합니다.

### 설치

DUNE은 다음 플랫폼을 지원합니다.
* 리눅스
* 윈도우
* 맥 OS

지원되는 각 플랫폼에 대한 설치 지침은 에서 확인할 수 있습니다. [DUNE의 깃허브 프로젝트](https://github.com/AntelopeIO/DUNE) 페이지.

 실행 `dune --help` 지원되는 모든 명령 목록을 볼 수 있습니다.

## 지갑

DUNE에서 지갑 관리를 대신 처리합니다. 

새 키를 지갑으로 가져와야 하는 경우:

```shell
dune --import-dev-key <PRIVATE_KEY>
```

## 노드 관리

DUNE을 사용하여 새로운 로컬 EOS 블록체인을 쉽게 만들 수 있습니다.

```shell
dune --start <NODE_NAME>
```

위의 명령은 다음과 같은 새 노드를 생성합니다. `NODE_NAME` 기본 설정으로기본 설정은 새 노드가 API/생산자 노드 역할을 하도록 구성합니다.이 노드에 스마트 계약을 배포하고 테스트를 수행할 수 있습니다.

>❔ **오류**
>>노드 설정 프로세스가 끝날 때 오류가 표시될 수 있습니다.
>그럴 경우 이 가이드를 참조하여 일반적인 오류를 해결하거나 당사로 문의할 수 있습니다.
> [텔레그램 채널](https://t.me/antelopedevs) 도움을 청해.

시스템에서 EOS 노드 목록을 볼 수 있습니다.

```shell
dune --list
```

활성 노드의 RPC API가 활성 상태인지 확인할 수 있습니다.

```shell
dune -- cleos get info
```

노드를 종료하려면:

```shell
dune --stop <NODE_NAME>
```

노드를 완전히 제거하려면:

```shell
dune --remove <NODE_NAME>
```


### 환경 부트스트랩

개발 환경에서는 다음과 같은 몇 가지 시스템 계약을 사용해야 할 수 있습니다.

- `eosio.token` **EOS** 토큰 이체의 경우
- `eosio.msig` 다중 서명 트랜잭션용
- `eosio.system` 리소스 관리와 같은 시스템 수준 작업용

로컬 노드를 쉽게 부트스트랩할 수 있습니다.활성 노드가 실행되면 다음을 사용하여 부트스트랩할 수 있습니다.

```shell
dune --bootstrap-system-full
```


## 계정 관리

계정을 사용하여 스마트 계약과 상호 작용하고 계정 위에 계약을 배포할 수도 있습니다.

새 계정을 만들려면:

```shell
dune --create-account <ACCOUNT_NAME>
```

계정 정보를 가져오려면:

```shell
dune -- cleos get account <ACCOUNT_NAME>
```

## 스마트 계약 개발

샘플 프로젝트를 생성하면 DUNE을 사용하여 스마트 계약을 컴파일, 배포 및 상호 작용하는 방법을 배울 수 있습니다.

프로젝트를 생성할 디렉터리로 이동한 후 다음 명령을 실행합니다.

```shell
dune --create-cmake-app hello .
```

이렇게 하면 다음이 생성됩니다. `hello` cmake 스타일의 EOS 스마트 계약 프로젝트가 있는 디렉토리.

의 내용을 바꾸십시오. `src/hello.cpp` 다음 코드를 사용하십시오.

```cpp
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT hello : public contract {
   public:
      using contract::contract;

      TABLE user_record {
         name user;
         uint64_t primary_key() const { return user.value; }
      };
      typedef eosio::multi_index< name("users"), user_record> user_index;

      ACTION test( name user ) {
         print_f("Hello World from %!\n", user);
         user_index users( get_self(), get_self().value );
         users.emplace( get_self(), [&]( auto& new_record ) {
            new_record.user = user;
         });
      }
};
```

### 컨트랙트 컴파일

프로젝트의 루트에서 다음 명령어를 실행하여 계약을 컴파일합니다.

```shell
dune --cmake-build .
```
계약이 컴파일됩니다.모든 오류가 출력에 표시됩니다. 

### 계약 배포

계약 계정을 만든 다음 배포하세요.

```shell
dune --create-account hello
dune --deploy ./build/hello hello
```

>👀 **코드 권한**
> >기본적으로 DUNE은 다음을 추가합니다. `eosio.code` 계정에 계약을 배포할 때 계정에 대한 권한이를 통해 컨트랙트는 다른 스마트 컨트랙트에서 인라인 액션을 트리거할 수 있습니다.

### 계약과의 상호 작용

로컬 EOS. 노드의 트랜잭션을 블록체인으로 전송하여 스마트 계약과 상호 작용하세요.트랜잭션에는 여러 작업이 포함됩니다.--send-action 명령을 사용하여 단일 작업으로 트랜잭션을 보낼 수 있습니다.

또한 작업을 전송할 테스트 계정을 만들어야 합니다.

```shell
dune --create-account testaccount

# format: dune --send-action <CONTRACT> <ACTION> <PARAMETERS> <SENDER>
dune --send-action hello test '[bob]' testaccount
```

계약 데이터베이스에 행이 추가된 상태에서 트랜잭션이 성공적으로 실행된 것을 볼 수 있을 것입니다.이 명령을 반복하면 해당 행이 계약 데이터베이스에 이미 존재하기 때문에 실패합니다.

### 계약에서 데이터 가져오기

방금 계약 데이터베이스에 행을 추가했습니다.체인에서 해당 데이터를 가져올 수 있습니다.

```shell
# format: dune --get-table <CONTRACT> <SCOPE> <TABLE>
dune --get-table hello hello users
```

하나 이상의 행이 포함된 테이블 결과를 얻을 수 있습니다.하나 이상의 행이 있는 테이블을 받지 못한 경우 위의 상호 작용이 성공했는지 확인하십시오.

## DUNE에서 원시 프로그램 사용

원시 EOS 스택을 활용하려면 다음을 사용할 수 있습니다. `DUNE -- <COMMAND>` 컨테이너 내의 데이터, 애플리케이션 및 기타 모든 것에 액세스할 수 있는 형식을 지정합니다.

예시:
    
```shell
dune -- cleos get info
dune -- nodeos --help
```
