---
title: 고급 주제
sidebar_class_name: sidebarhidden
---


## 코어

더 `EOS Core` 의 기본 구성 요소를 제공합니다. `system` 층.그러나 스마트 계약으로 구현되지 않기 때문에 동일한 수준의 유연성을 제공하지는 않습니다.그럼에도 불구하고 `core` 구현도 오픈 소스이므로 사용자 지정 비즈니스 요구 사항에 맞게 수정할 수 있습니다.

핵심 프로토콜은 다음과 같습니다.

1. [컨센서스 프로토콜](01_consensus-protocol.md)
2. [트랜잭션 프로토콜](02_transactions-protocol.md)
3. [네트워크 또는 피어투피어 프로토콜](03_network-peer-protocol.md)

## 시스템

EOS 블록체인은 블록체인에 구축된 블록체인의 특징과 특성이 유연하다는 점에서 독특합니다. 즉, 각 비즈니스 사례 요구 사항에 맞게 완전히 변경하거나 수정할 수 있습니다.합의, 수수료 일정, 계정 생성 및 수정, 토큰 경제성, 블록 생산자 등록, 투표, 다중 서명 등과 같은 핵심 블록 체인 기능은 EOS 블록 체인에 구축된 블록 체인에 배포되는 스마트 계약 내에서 구현됩니다.이러한 스마트 계약은 다음과 같이 불립니다. `system contracts` 그리고 레이어는 `EOS system` 레이어, 또는 간단히 `system` 층.

EOS 네트워크 재단은 이를 구현하고 유지합니다. `system contracts` 참조 구현으로만 사용되며, EOS 기반 블록체인의 기본 기능을 캡슐화합니다.더 `system contracts` 아래에 나열되어 있습니다.

* [eosio.bios](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.bios) - 더 `eosio.bios` 계약은 블록체인을 초기화하는 데 사용되는 특별 계약입니다.
* [지오시오 시스템](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.system) - 더 `eosio.system` 계약은 기본 EOS 블록 체인 기능을 구현하는 핵심 계약입니다.
* [eosio.msig](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.msig) - 더 `eosio.msig` 계약은 다중 서명 기능을 구현합니다.
* [에오시오. 토큰](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.token) - 더 `eosio.token` 계약은 시스템 토큰 기능을 구현합니다.
* [에오시오 랩](https://github.com/eosnetworkfoundation/eos-system-contracts/tree/main/contracts/eosio.wrap) - 더 `eosio.wrap` 계약은 거버넌스 기능을 구현합니다.
