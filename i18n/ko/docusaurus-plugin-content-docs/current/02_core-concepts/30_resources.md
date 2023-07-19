---
title: 리소스
---

EOS 블록체인은 세 가지 시스템 리소스에 의존합니다. `CPU`, `NET` 과 `RAM`.모든 EOS 계정에는 시스템이 필요합니다 
블록체인에 배포된 스마트 계약과 상호 작용하기 위한 리소스

## 램

RAM은 컴퓨터와 마찬가지로 제한된 리소스입니다.블록체인이 데이터를 저장하는 데 사용하는 빠른 메모리 저장 공간입니다.
결국 하드 드라이브에 영구적으로 남아 있는 컴퓨터와 달리 EOS 블록체인은 모든 데이터를 RAM에 저장합니다.

따라서 RAM은 매우 제한적이고 수요가 많은 리소스입니다.블록체인에 저장된 모든 상태 데이터
RAM에 저장해야 합니다.여기에는 계정 잔고, 계약 코드 및 계약 데이터가 포함됩니다.

사용자가 EOS 블록체인에서 RAM을 구매하고 판매할 수 있습니다.RAM 가격은 Bancor 알고리즘에 의해 결정됩니다.
이는 시스템 계약에서 구현됩니다.RAM 가격은 사용 가능한 RAM 용량에 따라 결정됩니다.적을수록
무료 RAM을 사용할 수 있으면 RAM을 구입하는 것이 더 비쌉니다.

더 이상 사용하지 않는 RAM을 시스템 계약에 다시 판매하여 EOS를 되찾고 다른 사용자를 위해 RAM을 확보할 수도 있습니다.


### RAM 구매

더 `eosio` 시스템 계약은 다음을 제공합니다. `buyram` 과 `buyrambytes` RAM 구매 조치.더 `buyram` 액션은 EOS에서 RAM을 구매하는 반면 `buyrambytes` 액션은 RAM을 바이트 단위로 구입합니다.

모든 지갑에서 RAM을 빠르게 구매할 수 있는 방법을 원하면**원하는 양의 EOS를 다음 주소로 보낼 수 있습니다. `buyramforeos` 계정**을 선택하면 동등한 양의 RAM이 다시 전송됩니다.

<details>
 <summary>RAM 가격이 어떻게 계산되는지 알고 싶으십니까?</summary>

스마트 콘트랙트가 데이터를 저장하는 데 필요한 RAM은 사용된 블록체인 상태에서 계산됩니다.

개발자로서 스마트 계약에 필요한 RAM의 양을 이해하려면 스마트 계약이 인스턴스화하고 사용하는 다중 인덱스 테이블의 기반이 되는 데이터 구조에 주의를 기울여야 합니다.단일 다중 인덱스 테이블의 기반이 되는 데이터 구조는 테이블의 행을 정의합니다.데이터 구조의 각 데이터 멤버는 테이블의 행 셀에 해당합니다.
하나의 다중 인덱스 행이 블록체인에 저장해야 하는 RAM의 양을 추정하려면 각 데이터 멤버의 유형 크기와 정의된 각 인덱스에 대한 메모리 오버헤드 (있는 경우) 를 더해야 합니다.다중 인덱스 테이블, 인덱스 및 데이터 유형에 대해 EOS 코드에 정의된 오버헤드는 아래에서 확인할 수 있습니다.

<br />

* [멀티 인덱스 RAM 바이트 오버헤드](https://github.com/AntelopeIO/leap/blob/f6643e434e8dc304bba742422dd036a6fbc1f039/libraries/chain/include/eosio/chain/contract_table_objects.hpp#L240)
* [인덱스 RAM 바이트당 행당 오버헤드](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L109)
* [고정 오버헤드 공유 벡터 RAM 바이트](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L108)
* [계정당 오버헤드 RAM 바이트](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L110)
* [세트 코드 RAM 바이트 멀티플라이어](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L111)
* [RAM 사용량 업데이트 기능](https://github.com/AntelopeIO/leap/blob/9f0679bd0a42d6c24a966bb79de6d8c0591872a5/libraries/chain/apply_context.cpp#L725)

</details>


## CPU & 넷

CPU와 NET은 모두 모든 EOS 계정이 블록체인과 상호 작용하는 데 필요한 중요한 리소스입니다.

## 컵

CPU는 블록체인 계정에 처리 능력을 제공하는 시스템 리소스입니다.에서 트랜잭션이 실행될 때 
블록체인은 CPU와 NET 리소스를 소비합니다.거래가 성공적으로 완료되도록 하려면 지급인 계정이 있어야 합니다. 
충분한 CPU가 할당되어 있습니다. 

계정에서 사용할 수 있는 CPU의 양은 마이크로초 단위로 측정됩니다.


<details>
 <summary>CPU가 어떻게 계산되는지 알고 싶으신가요?</summary>

블록체인에 의해 실행되는 트랜잭션에는 하나 이상의 작업이 포함됩니다.각 트랜잭션은 일정 양의 CPU를 소비해야 합니다.
최소 및 최대 트랜잭션 CPU 사용량 값으로 사전 정의된 한도 내에서EOS 블록체인의 경우 이러한 제한
블록체인의 구성에서 설정됩니다.다음 명령을 실행하여 이러한 제한을 확인하고 문의하십시오.
그 `min_transaction_cpu_usage` 그리고 `max_transaction_cpu_usage` 마이크로초 단위로 표시됩니다.

<br />

트랜잭션을 실행하는 계정의 경우 블록체인은 각 트랜잭션이 실행되기 전에 각 블록의 나머지 리소스를 계산하고 업데이트합니다.트랜잭션이 실행될 준비가 되면 블록체인은 지불자 계정에 트랜잭션 실행을 감당할 수 있는 충분한 CPU가 있는지 여부를 결정합니다.현재 블록을 적극적으로 구축하는 노드는 필요한 CPU를 계산하기 위해 트랜잭션 실행 시간을 측정합니다.계정에 충분한 CPU가 있으면 트랜잭션이 실행되고, 그렇지 않으면 트랜잭션이 거부됩니다.기술 세부 정보는 다음 링크를 참조하십시오.

* [CPU 구성 변수입니다.](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L66)
* [트랜잭션 초기화](https://github.com/AntelopeIO/leap/blob/e55669c42dfe4ac112e3072186f3a449936c0c61/libraries/chain/controller.cpp#L1559)
* [트랜잭션 CPU 빌링](https://github.com/AntelopeIO/leap/blob/e55669c42dfe4ac112e3072186f3a449936c0c61/libraries/chain/controller.cpp#L1577)
* [트랜잭션의 CPU 사용량 확인](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/transaction_context.cpp#L381)

</details>

### 넷

NET은 트랜잭션에서 사용하는 네트워크 대역폭을 기반으로 소비되는 리소스입니다.

<details>
 <summary>NET이 어떻게 계산되는지 알고 싶으신가요?</summary>

각 트랜잭션은 사전 정의된 최대 트랜잭션 NET 사용량을 초과할 수 없는 양의 NET을 소비해야 합니다.EOS 블록체인의 경우 이 한도는 블록체인 구성에 설정됩니다.다음 명령을 실행하여 이 제한을 확인하고 다음을 참조하십시오. `max_transaction_net_usage` 바이트로 표현됩니다.

<br />

트랜잭션을 실행하는 계정의 경우 블록체인은 각 트랜잭션이 실행되기 전에 각 블록의 남은 리소스를 계산하고 업데이트합니다.트랜잭션이 실행될 준비가 되면 블록체인은 지불자 계정에 트랜잭션 실행을 커버할 수 있는 충분한 NET이 있는지 여부를 결정합니다.필요한 NET은 블록체인에 저장될 때 패킹된 트랜잭션의 크기인 트랜잭션 크기를 기준으로 계산됩니다.계정에 충분한 NET 리소스가 있는 경우 트랜잭션을 실행할 수 있으며, 그렇지 않으면 트랜잭션이 거부됩니다.기술 세부 정보는 다음 출처를 참조하십시오.

<br />

* [NET 구성 변수는 다음과 같습니다.](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/include/eosio/chain/config.hpp#L57)
* [트랜잭션 초기화](https://github.com/AntelopeIO/leap/blob/e55669c42dfe4ac112e3072186f3a449936c0c61/libraries/chain/controller.cpp#L1559)
* [트랜젝션 넷 빌링](https://github.com/AntelopeIO/leap/blob/e55669c42dfe4ac112e3072186f3a449936c0c61/libraries/chain/controller.cpp#L1577)
* [트랜잭션의 NET 사용량 확인](https://github.com/AntelopeIO/leap/blob/a4c29608472dd195d36d732052784aadc3a779cb/libraries/chain/transaction_context.cpp#L376)

</details>



### 전원 켜기

시스템 작업을 사용하여 EOS 계정에서 CPU 및 NET의 전원을 켤 수 있습니다.이 경우 EOS 비용이 들며 CPU와 NET의 양이 늘어납니다.
이는 지정된 기간 동안 소비하는 EOS 금액에 비례합니다.

다음과 같은 무료 서비스도 있습니다. [이오스 파워업](https://eospowerup.io) 한 번 무료로 CPU와 NET에 전원을 공급할 수 있습니다. 
하루.

<details>
 <summary>수동으로 전원을 켜는 방법에 대한 자세한 정보 보기</summary>

계정 전원을 켜는 것은 PowerUp 리소스 모델에서 CPU 및 NET 리소스를 임대하는 기술입니다.스마트 계약은 블록체인에 이 모델을 구현하고 이러한 리소스를 사용자가 선택한 계정에 할당합니다.계정 전원을 켜는 작업은 다음과 같습니다. `powerup`.매개 변수로 사용됩니다.

<br />

* 더 `payer` 수수료는 유효한 EOS 계정이어야 합니다.
* 더 `receiver` 리소스 중 유효한 EOS 계정이어야 합니다.
* 더 `days` 항상 일치해야 하는 `state.powerup_days` 에 지정되어 있습니다 [파워업 구성 설정](https://github.com/eosnetworkfoundation/eos-system-contracts/blob/7cec470b17bd53b8c78465d4cbd889dbaf1baffb/contracts/eosio.system/include/eosio.system/eosio.system.hpp#L588).
* 더 `net_frac`, 그리고 `cpu_frac` 필요한 리소스의 비율입니다.백분율을 계산하는 가장 쉬운 방법은 10^15 (100%) 에 원하는 백분율을 곱하는 것입니다.예를 들어 10^15* 0.01 = 10^13을 예로 들 수 있습니다.
* 더 `max_payment`, 는 EOS로 표시되어야 하며 최대 금액은 `payer` 기꺼이 지불할 의향이 있습니다.

<br />

```sh
cleos push action eosio powerup '[user, user, 1, 10000000000000, 10000000000000, "1000.0000 EOS"]' -p user
```

<br />

받은 NET 및 CPU 무게와 수수료 금액을 보려면 다음을 확인하십시오. `eosio.reserv::powupresult` 액션에 의해 반환되며, 이는 아래와 비슷해야 합니다.

<br />

```console
executed transaction: 82b7124601612b371b812e3bf65cf63bb44616802d3cd33a2c0422b58399f54f  144 bytes  521 us
#         eosio <= eosio::powerup               {"payer":"user","receiver":"user","days":1,"net_frac":"10000000000000","cpu_frac":"10000000000000","...
#   eosio.token <= eosio.token::transfer        {"from":"user","to":"eosio.rex","quantity":"999.9901 EOS","memo":"transfer from user to eosio.rex"}
#  eosio.reserv <= eosio.reserv::powupresult    {"fee":"999.9901 EOS","powup_net_weight":"16354","powup_cpu_weight":"65416"}
#          user <= eosio.token::transfer        {"from":"user","to":"eosio.rex","quantity":"999.9901 EOS","memo":"transfer from user to eosio.rex"}
#     eosio.rex <= eosio.token::transfer        {"from":"user","to":"eosio.rex","quantity":"999.9901 EOS","memo":"transfer from user to eosio.rex"}
```

<br />

EOS 블록체인의 PowerUp 리소스 모델은 다음과 같이 초기화됩니다. `"powerup_days": 1,`.이 설정을 사용하면 최대 24시간 동안 CPU와 NET을 대여할 수 있습니다.24시간 간격 내에 리소스를 사용하지 않으면 대여한 CPU와 NET이 만료됩니다.

<br />

#### 만료된 주문 처리

만기된 대출 자원은 시스템에 의해 자동으로 회수되지 않습니다.만료된 대출은 처리해야 하는 대기열에 남아 있습니다.

<br />

에 대한 모든 통화 `powerup` 작업은 이 대기열도 처리합니다 (한 번에 두 개의 만료된 대출로 제한됨).따라서 만료된 대출은 자동으로 적시에 처리됩니다.경우에 따라 대기열에 있는 만료된 대출을 수동으로 처리하여 리소스를 시스템에 다시 전달하여 가격을 낮춰야 할 수도 있습니다.따라서 어떤 계좌라도 전화를 걸면 만기된 대출을 임의수까지 처리할 수 있습니다. `powerupexec` 동작.

<br />

주문 테이블을 보려면 `powup.order` 다음 명령을 실행합니다.

<br />

```sh
cleos get table eosio 0 powup.order
```

<br />

```json
{
  "rows": [{
      "version": 0,
      "id": 0,
      "owner": "user",
      "net_weight": 16354,
      "cpu_weight": 65416,
      "expires": "2020-11-18T13:04:33"
    }
  ],
  "more": false,
  "next_key": ""
}
```

<br />

예시 `powerupexec` 전화:

<br />

```sh
cleos push action eosio powerupexec '[user, 2]' -p user
```

<br />

```console
executed transaction: 93ab4ac900a7902e4e59e5e925e8b54622715328965150db10774aa09855dc98  104 bytes  363 us
#         eosio <= eosio::powerupexec           {"user":"user","max":2}
warning: transaction executed locally, but may not be confirmed by the network yet         ]
```

</details>


### 주관적 청구

네트워크 스팸을 방지하기 위해 블록 생산자는 주관적인 CPU 및 NET 청구를 활성화하도록 선택할 수 있습니다.즉, 다음과 같은 경우
트랜잭션이 실패해도 트랜잭션을 실행하는 데 사용된 CPU 및 NET은 여전히 트랜잭션을 보낸 계정에 청구됩니다.

이렇게 하면 계정이 실패한 트랜잭션을 네트워크로 스팸으로 보내는 것을 방지할 수 있습니다.하지만 이 청구서는 적용되지 않습니다. 
블록체인에 기록되며, 계정에서 지불한 리소스를 실제로 소비하지 않습니다.소비될 뿐입니다.
거래를 처리한 블록 생산자가 가상으로 진행합니다.

주관적 결제에 대한 자세한 내용은 에서 확인할 수 있습니다. [주관적 청구 및 분실 거래 소개](https://eosnetwork.com/blog/api-plus-an-introduction-to-subjective-billing-and-lost-transactions/) 기사.



