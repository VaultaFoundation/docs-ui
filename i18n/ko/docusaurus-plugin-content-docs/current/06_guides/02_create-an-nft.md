---
title: NFT 생성
---

NFT는 **대체 불가능한 토큰**입니다.즉, 존재할 수 없는 고유한 토큰입니다.
다른 토큰과 교환되었습니다. 

수집용 아이템 (유명인이 소유한 펜, 경기에서 우승한 공 등) 을 예로 들어 보겠습니다.이들 각각은
항목은 고유하며 값이 다음과 같기 때문에 다른 항목과 교환할 수 없습니다.
그 자체로 말이죠.

>👀 **그냥 NFT를 만들고 싶으신가요?**
> >이 튜토리얼에서는 이더리움의 ERC721 추종을 따르는 NFT를 만드는 방법에 대해 알아보겠습니다.
>표준이므로 명확한 표준을 사용하여 일부 EOS 개발을 자세히 살펴볼 수 있습니다.
> >**하지만**, 다음 NFT를 생성하려는 경우 [**아토믹 에셋**](https://github.com/pinknetworkx/atomicassets-contract) 어떤 표준인지
>EOS 네트워크에서 더 일반적이며 다음을 방문하십시오. [아토믹 에셋 NFT 크리에이터](https://eos.atomichub.io/creator)
>코드를 배포하지 않고도 AtomiChub 마켓플레이스에 즉시 등록되는 NFT를 쉽게 생성할 수 있습니다.

## NFT 표준이란 무엇입니까?

NFT 표준은 모든 NFT가 따라야 하는 일련의 규칙입니다.이를 통해 NFT는
다른 NFT 및 마켓플레이스 및 지갑과 같은 애플리케이션과 상호 운용 가능
그들과 상호 작용하는 방법을 이해하십시오.

## ERC721 스탠다드란 무엇입니까?

더 [ERC721 스탠다드](https://eips.ethereum.org/EIPS/eip-721) 이더리움 커뮤니티에서 만든 NFT 표준입니다.그것
가장 일반적인 NFT 표준이며 이더리움 네트워크의 많은 NFT에서 사용됩니다.만약 당신이
보어드 에이프는 본 적이 없는데 ERC721 NFT입니다.

![보어드 에이프 클럽 예제](/images/boredapeclub.jpg)

## 새 계약 생성

신규 생성 `nft.cpp` 파일을 작성하고 다음 코드를 추가합니다.

```cpp
#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/singleton.hpp>
using namespace eosio;

CONTRACT nft : public contract {

    public:
    using contract::contract;
    
    // TODO: Add actions
};
```

## 액션 만들기

우리가 보면 [ERC721 스탠다드](https://eips.ethereum.org/EIPS/eip-721), 우리는 그것을 볼 수 있습니다
구현해야 할 몇 가지 조치가 있습니다.전반적으로 표준은 매우 간단하지만
일부 개념은 반드시 EOS 고유의 개념은 아닙니다.예를 들어, 개념이 없습니다. 
의 `approvals` EOS에서 토큰을 다른 계정으로 직접 보낼 수 있기 때문에 (를 통해) `on_notify` 이벤트), 이더리움과 달리.

표준을 가능한 한 원본에 가깝게 유지하기 위해 다음을 구현합니다.
이 튜토리얼의 이러한 비원어적 개념.

우리가 시행할 조치는 다음과 같습니다.

```cpp
    ACTION mint(name to, uint64_t token_id){
    
    }
    
    ACTION transfer(name from, name to, uint64_t token_id, std::string memo){
    
    }
    
    [[eosio::action]] uint64_t balanceof(name owner){
    
    }
    
    [[eosio::action]] name ownerof(uint64_t token_id){
    
    }
    
    ACTION approve(name to, uint64_t token_id){
    
    }
    
    ACTION approveall(name from, name to, bool approved){
    
    }
    
    [[eosio::action]] name getapproved(uint64_t token_id){
    
    }
    
    [[eosio::action]] bool approved4all(name owner, name approved_account){
    
    }
    
    [[eosio::action]] std::string gettokenuri(uint64_t token_id){
    
    }
    
    ACTION setbaseuri(std::string base_uri){
    
    }
```

계약에 추가한 다음 각 작업을 자세히 살펴보고 어떤 작업을 수행하는지, 어떤 매개변수를 사용하는지 살펴보겠습니다.

반환 값이 있는 작업은 다음과 같이 표시되는 것을 볼 수 있습니다. `[[eosio::action]]` 대신에
의 `ACTION`. 

>❔ **액션 매크로**
> > `ACTION` a라고 불리는 것입니다. `MACRO`, 대체될 코드를 작성하는 방법입니다.
>컴파일 시 다른 코드와 함께.이 경우, `ACTION` 매크로는 다음과 같이 대체됩니다.
> ```cpp
> [[eosio::action]] void
>
```
>사용할 수 없는 이유 `ACTION` 값을 반환하는 액션에 대한 매크로는
>그것은 다음을 추가합니다 `void` 함수의 키워드입니다. 즉, 아무 것도 반환하지 않습니다.

## 액션 파라미터 파헤치기

매개 변수에 대한 더 자세한 설명과 간단한 설명을 원하는 경우
각 작업을 수행하려면 아래 섹션을 확장하십시오.

<details>
 <summary>보려면 여기를 클릭하십시오</summary>

### 민트

더 `mint` 액션은 새 NFT를 만드는 데 사용됩니다.

두 개의 매개변수가 필요합니다.
- `to` - NFT를 소유할 계정
- `token_id` - NFT의 ID

### 전송

더 `transfer` 액션은 한 계정에서 다른 계정으로 NFT를 이전하는 데 사용됩니다.

네 가지 매개 변수가 필요합니다.
- `from` - 현재 NFT를 소유하고 있는 계정
- `to` - NFT를 소유할 계정
- `token_id` - NFT의 ID
- `memo` - 거래에 포함될 메모

## 밸런스 오브

더 `balanceof` 액션은 계정 잔액을 가져오는 데 사용됩니다.

매개 변수 하나가 필요합니다.
- `owner` - 잔액을 받고 싶은 계좌

a를 반환합니다. `uint64_t` 이것이 계좌의 잔액입니다.

## 소유자

더 `ownerof` 액션은 NFT의 소유자를 얻는 데 사용됩니다.

매개 변수 하나가 필요합니다.
- `token_id` - NFT의 ID

a를 반환합니다. `name` NFT를 소유한 계정입니다.

### 승인

더 `approve` 액션은 귀하를 대신하여 NFT를 양도할 계정을 승인하는 데 사용됩니다.

두 개의 매개변수가 필요합니다.
- `to` - NFT 전송 승인을 받을 계정
- `token_id` - NFT의 ID

## 모두 승인

더 `approveall` 액션은 귀하를 대신하여 모든 NFT를 이전하기 위해 계정을 승인하는 데 사용됩니다.

세 가지 매개 변수가 필요합니다.
- `from` - 현재 NFT를 소유하고 있는 계정
- `to` - NFT 이체가 승인될 계정
- `approved` - 계정 승인 여부를 결정하는 부울

## 승인 받기

더 `getapproved` 액션은 귀하를 대신하여 NFT를 이전하도록 승인된 계정을 가져오는 데 사용됩니다.

매개 변수 하나가 필요합니다.
- `token_id` - NFT의 ID

a를 반환합니다. `name` NFT를 전송하도록 승인된 계정입니다.

## #은 모두 승인됨

더 `approved4all` 액션은 계정이 귀하를 대신하여 모든 NFT를 이전하도록 승인되었는지 확인하는 데 사용됩니다.

두 개의 매개변수가 필요합니다.
- `owner` - 현재 NFT를 소유하고 있는 계정
- `approved_account` - NFT 이전 승인 여부를 확인하려는 계정

a를 반환합니다. `bool` 어느 것이 `true` 계정이 NFT를 이전하도록 승인된 경우, 그리고 `false` 그렇지 않은 경우.

## 토큰누리

더 `gettokenuri` 작업은 NFT 메타데이터의 URI를 가져오는 데 사용됩니다.

매개 변수 하나가 필요합니다.
- `token_id` - NFT의 ID

a를 반환합니다. `std::string` NFT 메타데이터의 URI입니다.

## 세트 베이스 URI

더 `setbaseuri` 액션은 NFT 메타데이터의 기본 URI를 설정하는 데 사용됩니다.

매개 변수 하나가 필요합니다.
- `base_uri` - NFT 메타데이터의 기본 URI</details>


## 데이터 구조 추가

이제 작업을 마쳤으니 NFT를 저장할 데이터 구조를 추가해야 합니다.

우리는 a를 사용할 것입니다 `singleton` NFT를 저장하는 데 사용됩니다. 

>❔ **싱글턴**
> >A `singleton` 과 달리 범위당 하나의 행만 가질 수 있는 테이블입니다. `multi_index` 어느 
>범위당 여러 행을 가질 수 있으며 a를 사용합니다. `primary_key` 각 행을 식별합니다.
>싱글톤은 이더리움의 스토리지 모델에 조금 더 가깝습니다. 

계약 시 액션 위에 다음 코드를 추가하세요.

```cpp
    using _owners = singleton<"owners"_n, name>;
    using _balances = singleton<"balances"_n, uint64_t>;
    using _approvals = singleton<"approvals"_n, name>;
    using _approvealls = singleton<"approvealls"_n, name>;
    using _base_uris = singleton<"baseuris"_n, std::string>;
    
    ACTION mint...
```

다음과 같은 싱글턴 테이블을 만들었습니다.
- `_owners` - 토큰 ID에서 NFT 소유자로의 매핑
- `_balances` - 소유자별로 소유한 NFT 수량에 대한 매핑
- `_approvals` - 토큰 ID에서 해당 NFT를 전송하도록 승인된 계정으로의 매핑
- `_approvealls` - 소유자를 모든 NFT를 이전하도록 승인된 계정으로의 매핑
- `_base_uris` - NFT 메타데이터의 기본 URI를 저장하는 구성 테이블

>❔ **테이블 네이밍**
> > `singleton<"<TABLE NAME>"_n, <ROW TYPE>>`
> >싱글톤 정의를 보면 큰따옴표 안에 테이블 이름이 있습니다.
>EOS 테이블의 이름도 계정 이름 규칙을 따라야 합니다. 즉, 다음과 같아야 합니다.
>12자 이하이며, 다음 문자만 포함할 수 있습니다. `a-z`, `1-5`, 및 `.`.

이제 NFT에 대한 데이터를 저장할 테이블과 구조를 만들었으니
각 동작에 대한 로직을 채우기 시작할 수 있습니다.


## 일부 도우미 함수 추가

코드를 더 읽기 쉽고 쉽게 만들 수 있는 도우미 함수가 필요합니다.
용도.계약서에 표 정의 바로 아래에 다음 코드를 추가하세요.

```cpp
    using _base_uris = singleton<"baseuris"_n, std::string>;
    
    // Helper function to get the owner of an NFT
    name get_owner(uint64_t token_id){
        
        // Note that we are using the "token_id" as the "scope" of this table.
        // This lets us use singleton tables like key-value stores, which is similar
        // to how Ethereum contracts store data.
        
        _owners owners(get_self(), token_id);
        return owners.get_or_default(name(""));
    }
    
    // Helper function to get the balance of an account
    uint64_t get_balance(name owner){
        _balances balances(get_self(), owner.value);
        return balances.get_or_default(0);
    }
    
    // Helper function to get the account that is approved to transfer an NFT on your behalf
    name get_approved(uint64_t token_id){
        _approvals approvals(get_self(), token_id);
        return approvals.get_or_default(name(""));
    }
    
    // Helper function to get the account that is approved to transfer all of your NFTs on your behalf
    name get_approved_all(name owner){
      _approvealls approvals(get_self(), owner.value);
      return approvals.get_or_default(name(""));
   }
    
    // Helper function to get the URI of the NFT's metadata
    std::string get_token_uri(uint64_t token_id){
        _base_uris base_uris(get_self(), get_self().value);
        return base_uris.get_or_default("") + "/" + std::to_string(token_id);
    }
```

도우미 함수를 사용하면 이전에 만든 테이블에서 데이터를 더 쉽게 가져올 수 있습니다.
다음에 구현할 작업에서 이러한 함수를 사용할 것입니다.

특히 일부 함수는 여러 곳에서 사용되므로 다음과 같은 것이 합리적입니다.
그들을 위한 도우미 함수를 만드세요.예를 들어, `get_owner` 함수가 사용됨
에서 `mint`, `transfer`, 및 `approve` 행동.헬퍼 함수를 만들지 않은 경우
이를 위해서는 각 작업에서 동일한 코드를 작성해야 합니다.

## 액션 채우기

각 작업을 살펴보고 이에 대한 로직을 구현해 보겠습니다.다음 사항에 세심한 주의를 기울이세요
각 코드 줄의 기능을 설명하기 위해 주석을 달아주세요.

### 민트

더 `mint` 액션은 새 NFT를 만드는 데 사용됩니다.

```cpp
    ACTION mint(name to, uint64_t token_id){
        // We only want to mint NFTs if the action is called by the contract owner
        check(has_auth(get_self()), "only contract can mint");
        
        // The account we are minting to must exist
        check(is_account(to), "to account does not exist");
        
        // Get the owner singleton
        _owners owners(get_self(), token_id);
        
        // Check if the NFT already exists
        check(owners.get_or_default().value == 0, "NFT already exists");
        
        // Set the owner of the NFT to the account that called the action
        owners.set(to, get_self());
        
        // Get the balances table
        _balances balances(get_self(), to.value);
        
        // Set the new balances of the account
        balances.set(balances.get_or_default(0) + 1, get_self());
    }
```


### 전송

더 `transfer` 액션은 한 계정에서 다른 계정으로 NFT를 이전하는 데 사용됩니다.

```cpp
    ACTION transfer(name from, name to, uint64_t token_id, std::string memo){
        // The account we are transferring from must authorize this action
        check(has_auth(from), "from account has not authorized the transfer");
        
        // The account we are transferring to must exist
        check(is_account(to), "to account does not exist");
        
        // The account we are transferring from must be the owner of the NFT
        // or allowed to transfer it through an approval
        bool ownerIsFrom = get_owner(token_id) == from;
        bool fromIsApproved = get_approved(token_id) == from;
        check(ownerIsFrom || fromIsApproved, "from account is not the owner of the NFT or approved to transfer the NFT");       
        
        // Get the owner singleton
        _owners owners(get_self(), token_id);
        
        // Set the owner of the NFT to the "to" account
        owners.set(to, get_self());
        
        // Set the new balance for the "from" account
        _balances balances(get_self(), from.value);
        balances.set(balances.get_or_default(0) - 1, get_self());
        
        // Set the new balance for the "to" account
        _balances balances2(get_self(), to.value);
        balances2.set(balances2.get_or_default(0) + 1, get_self());
        
        // Remove the approval for the "from" account
        _approvals approvals(get_self(), token_id);
        approvals.remove();
        
        // Send the transfer notification
        require_recipient(from);
        require_recipient(to);
    }
```

## 밸런스 오브

더 `balanceof` 액션은 계정 잔액을 가져오는 데 사용됩니다.

```cpp
    [[eosio::action]] uint64_t balanceof(name owner){
        return get_balance(owner);
    }
```

>⚠ **반환 값 및 구성 가능성**
> >반환 값은 블록체인 외부에서만 사용할 수 있으며 현재는 사용할 수 없습니다.
>EOS에서 스마트 컨트랙트를 구성할 수 있습니다.EOS 지원 [**인라인 액션**](/docs/03_smart-contracts/02_actions.md#inline-actions) 사용할 수 있는
>다른 스마트 계약을 호출할 수는 있지만 값을 반환할 수는 없습니다.

## 소유자

더 `ownerof` 액션은 NFT의 소유자를 얻는 데 사용됩니다.

```cpp
    [[eosio::action]] name ownerof(uint64_t token_id){
        return get_owner(token_id);
    }
```

### 승인

더 `approve` 액션은 귀하를 대신하여 NFT를 양도할 계정을 승인하는 데 사용됩니다.

```cpp
    ACTION approve(name to, uint64_t token_id){
        // get the token owner
        name owner = get_owner(token_id);
        
        // The owner of the NFT must authorize this action
        check(has_auth(owner), "owner has not authorized the approval");
    
        // The account we are approving must exist
        check(is_account(to), "to account does not exist");
        
        // Get the approvals table
        _approvals approvals(get_self(), token_id);
        
        // Set the approval for the NFT
        approvals.set(to, get_self());
    }
```

## 모두 승인

더 `approveall` 액션은 계정을 승인하여 모든 계정을 이전하는 데 사용됩니다.
NFT가 여러분을 대신해 드립니다.

```cpp
    ACTION approveall(name from, name to, bool approved){
        // The owner of the NFTs must authorize this action
        check(has_auth(from), "owner has not authorized the approval");
        
        // The account we are approving must exist
        check(is_account(to), "to account does not exist");
        
        // Get the approvals table
        _approvealls approvals(get_self(), from.value);
        
        if(approved){
            // Set the approval for the NFT
            approvals.set(to, get_self());
        } else {
            // Remove the approval for the NFT
            approvals.remove();
        }
    }
```

## 승인 받기

더 `getapproved` 작업은 양도가 승인된 계정을 가져오는 데 사용됩니다.
NFT가 여러분을 대신해 드립니다.

```cpp
    [[eosio::action]] name getapproved(uint64_t token_id){
        return get_approved(token_id);
    }
```

## 4개 모두 승인됨

더 `approved4all` 액션은 계정 이전 승인 여부를 확인하는 데 사용됩니다.
귀하를 대신하여 모든 NFT를 제공합니다.

```cpp
    [[eosio::action]] bool approved4all(name owner, name approved_account){
      return get_approved_all(owner) == approved_account;
   }
```

>⚠ **액션 이름 제한**
> >계정 이름에도 테이블 이름과 동일한 제한이 있으므로 다음을 포함할 수만 있습니다.
>캐릭터들 `a-z`, `1-5`, 및 `.`.이 때문에 표준을 사용할 수 없습니다. `isApprovedForAll`
>우리가 사용하고 있는 액션의 이름 `approved4all` 대신.

## 토큰누리

더 `tokenuri` 액션은 NFT의 URI를 가져오는 데 사용됩니다.

```cpp
    [[eosio::action]] std::string tokenuri(uint64_t token_id){
        return get_token_uri(token_id);
    }
```

## 세트 베이스 URI

더 `setbaseuri` 액션은 NFT의 기본 URI를 설정하는 데 사용됩니다.

```cpp
    ACTION setbaseuri(std::string base_uri){
        // The account calling this action must be the contract owner
        require_auth(get_self());
        
        // Get the base URI table
        _base_uris base_uris(get_self(), get_self().value);
        
        // Set the base URI
        base_uris.set(base_uri, get_self());
    }
```



## 모든 것을 하나로 모으기

이제 모든 작업을 정리했으니 모든 작업을 한 곳에 모을 수 있습니다. `nft.cpp` 파일.

아래의 전체 계약을 살펴보기 전에 직접 계약을 구축하고 배포하고 상호 작용해 보는 것이 좋습니다.
먼저 자신이 관리하는 계정에 일부 NFT를 발행한 다음 다른 계정으로 이전해 볼 수 있습니다.

또한 다른 계정을 승인하여 NFT를 대신 이전하여 승인 메커니즘을 테스트할 수도 있습니다. 
그런 다음 승인된 계정을 사용하여 다른 계정으로 이체합니다.

<details>
 <summary>전체 계약을 보려면 여기를 클릭하십시오</summary>

```cpp
#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/singleton.hpp>
using namespace eosio;

CONTRACT nft : public contract {

   public:
   using contract::contract;

   // Mapping from token ID to owner
   using _owners = singleton<"owners"_n, name>;
   
   // Mapping owner address to token count
   using _balances = singleton<"balances"_n, uint64_t>;
   
   // Mapping from token ID to approved address
   using _approvals = singleton<"approvals"_n, name>;
   
   // Mapping from owner to operator approvals
   using _approvealls = singleton<"approvealls"_n, name>;
   
   // Registering the token URI
   using _base_uris = singleton<"baseuris"_n, std::string>;

   // Helper function to get the owner of an NFT
   name get_owner(uint64_t token_id){
      _owners owners(get_self(), token_id);
      return owners.get_or_default(name(""));
   }
   
   // Helper function to get the balance of an account
   uint64_t get_balance(name owner){
      _balances balances(get_self(), owner.value);
      return balances.get_or_default(0);
   }
   
   // Helper function to get the account that is approved to transfer an NFT on your behalf
   name get_approved(uint64_t token_id){
      _approvals approvals(get_self(), token_id);
      return approvals.get_or_default(name(""));
   }
   
   // Helper function to get the account that is approved to transfer all of your NFTs on your behalf
   name get_approved_all(name owner){
      _approvealls approvals(get_self(), owner.value);
      return approvals.get_or_default(name(""));
   }
   
   // Helper function to get the URI of the NFT's metadata
   std::string get_token_uri(uint64_t token_id){
      _base_uris base_uris(get_self(), get_self().value);
      return base_uris.get_or_default("") + "/" + std::to_string(token_id);
   }
   
   ACTION mint(name to, uint64_t token_id){
      // We only want to mint NFTs if the action is called by the contract owner
      check(has_auth(get_self()), "only contract can mint");

      // The account we are minting to must exist
      check(is_account(to), "to account does not exist");

      // Get the owner singleton
      _owners owners(get_self(), token_id);

      // Check if the NFT already exists
      check(owners.get_or_default().value == 0, "NFT already exists");

      // Set the owner of the NFT to the account that called the action
      owners.set(to, get_self());

      // Get the balances table
      _balances balances(get_self(), to.value);

      // Set the new balances of the account
      balances.set(balances.get_or_default(0) + 1, get_self());
   }
   
   ACTION transfer(name from, name to, uint64_t token_id, std::string memo){
      // The account we are transferring from must authorize this action
      check(has_auth(from), "from account has not authorized the transfer");

      // The account we are transferring to must exist
      check(is_account(to), "to account does not exist");

      // The account we are transferring from must be the owner of the NFT
      // or allowed to transfer it through an approval
      bool ownerIsFrom = get_owner(token_id) == from;
      bool fromIsApproved = get_approved(token_id) == from;
      check(ownerIsFrom || fromIsApproved, "from account is not the owner of the NFT or approved to transfer the NFT");       

      // Get the owner singleton
      _owners owners(get_self(), token_id);

      // Set the owner of the NFT to the "to" account
      owners.set(to, get_self());

      // Set the new balance for the "from" account
      _balances balances(get_self(), from.value);
      balances.set(balances.get_or_default(0) - 1, get_self());

      // Set the new balance for the "to" account
      _balances balances2(get_self(), to.value);
      balances2.set(balances2.get_or_default(0) + 1, get_self());

      // Remove the approval for the "from" account
      _approvals approvals(get_self(), token_id);
      approvals.remove();

      // Send the transfer notification
      require_recipient(from);
      require_recipient(to);
   }
   
   [[eosio::action]] uint64_t balanceof(name owner){
      return get_balance(owner);
   }
   
   [[eosio::action]] name ownerof(uint64_t token_id){
      return get_owner(token_id);
   }
   
   ACTION approve(name to, uint64_t token_id){
      // get the token owner
      name owner = get_owner(token_id);
      
      // The owner of the NFT must authorize this action
      check(has_auth(owner), "owner has not authorized the approval");
   
      // The account we are approving must exist
      check(is_account(to), "to account does not exist");
      
      // Get the approvals table
      _approvals approvals(get_self(), token_id);
      
      // Set the approval for the NFT
      approvals.set(to, get_self());
   }
   
   ACTION approveall(name from, name to, bool approved){
      // The owner of the NFTs must authorize this action
      check(has_auth(from), "owner has not authorized the approval");
      
      // The account we are approving must exist
      check(is_account(to), "to account does not exist");
      
      // Get the approvals table
      _approvealls approvals(get_self(), from.value);
      
      if(approved){
         // Set the approval for the NFT
         approvals.set(to, get_self());
      } else {
         // Remove the approval for the NFT
         approvals.remove();
      }
   }
   
   [[eosio::action]] name getapproved(uint64_t token_id){
      return get_approved(token_id);
   }
   
   [[eosio::action]] bool approved4all(name owner, name approved_account){
      return get_approved_all(owner) == approved_account;
   }
   
   [[eosio::action]] std::string gettokenuri(uint64_t token_id){
      return get_token_uri(token_id);
   }
   
   ACTION setbaseuri(std::string base_uri){
      // The account calling this action must be the contract owner
      require_auth(get_self());
      
      // Get the base URI table
      _base_uris base_uris(get_self(), get_self().value);
      
      // Set the base URI
      base_uris.set(base_uri, get_self());
   }
};
```
</details>

## 교육 목적임

이 계약을 EOS 네트워크에 배포하고 토큰을 발행하면 거기서
판매를 지원하는 마켓플레이스가 없을 것입니다 (이 가이드를 작성할 당시에는).이것은 단지 교육 목적으로만 사용됩니다.

## 챌린지

이 NFT 계약은 NFT를 소각할 방법이 없습니다.추가 `burn` 토큰 소유자가 자신의 NFT를 소각할 수 있도록 하는 조치.
