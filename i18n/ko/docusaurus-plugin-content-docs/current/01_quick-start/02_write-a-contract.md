---
title: 스마트 컨트랙트 작성
--- 

이 가이드에서는 블록체인에 문자열을 저장할 수 있는 간단한 스마트 계약을 만들 것입니다.
우리는**를 사용할 것입니다[웹 IDE](https://eos-web-ide.netlify.app/)** 스마트 컨트랙트를 작성하고 EOS 테스트넷에 배포하기 위함입니다.

## 스마트 계약이란?

스마트 계약은 블록체인에서 실행되는 기능과 같다고 생각할 수 있습니다.**결정적**이어야 합니다. 즉 
동일한 입력이 주어지면 항상 동일한 출력을 생성합니다.이는 네트워크의 모든 노드가 다음을 수행하는 데 필요합니다.
함수의 출력에 동의할 수 있습니다.

## 웹 IDE란 무엇인가요?

웹 IDE는 브라우저에서 실행되는 통합 개발 환경입니다.이를 통해 작성, 컴파일 및
브라우저를 벗어나거나 소프트웨어를 설치할 필요 없이 스마트 계약을 블록체인에 배포하세요.

## 이제 그만 얘기해 봅시다!

열어 [이오스 웹 IDE](https://eos-web-ide.netlify.app/) 브라우저에서.당신은 선물을 받게 될 것입니다
스마트 컨트랙트의 기본 구조를 보여주는 더미 컨트랙트.

편집기에서 모든 내용을 지우고 다음 코드를 복사하여 붙여넣으세요.

```cpp
#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT mycontract : public contract {
  public:
    using contract::contract;

    TABLE StoredData {
      uint64_t id;
      std::string text;
      
      uint64_t primary_key() const { return id; }
    };
    
    using storage_table = eosio::multi_index<"mytable"_n, StoredData>;

    ACTION save( uint64_t id, std::string text ) {
      storage_table _storage( get_self(), get_self().value );
      _storage.emplace( get_self(), [&]( auto& row ) {
        row.id = id;
        row.text = text;
      });
    }
};
```

코드를 살펴보고 코드가 무엇을 하는지 알아낼 수 있는지 확인해 보세요. 

코드를 이해하는 데 문제가 있어도 걱정하지 마세요. [스마트 컨트랙트 기초](/docs/03_smart-contracts/01_contract-anatomy.md)
섹션에서 스마트 계약의 다양한 부분과 작동 방식에 대해 자세히 알아보세요.

이제 화면이 다음과 같이 보일 것입니다.

![이오스 웹 IDE](/images/native-web-ide-basics.png)
