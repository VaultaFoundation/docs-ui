---
title: “V1 히스토리 얼터너티브”
sidebar_position: 1
---

최신 EOS v3.1 릴리스는 레거시 V1 History 플러그인에 대한 지원을 공식적으로 종료합니다.따라서 V1 History에 의존하는 통합을 보유한 블록 생산자와 노드 운영자는 대체 솔루션을 찾아야 합니다.

## 프로덕션 환경에 바로 사용할 수 있는 대안

다음과 같은 전투 테스트 및 V1 준수 히스토리 솔루션을 사용할 수 있습니다.
- 하이페리온 히스토리 솔루션
- 로보로브스키 역사 API

# 로보로브스키 히스토리 API

## 개요

로보로브스키 히스토리 API는 V1 히스토리 API를 즉시 대체하도록 설계되었습니다.Trace API 플러그인을 사용하여 히스토리 데이터를 추출한 다음 V1 형식으로 압축한 다음 클라이언트 요청에 반환합니다.

## 누가 로보로브스키 히스토리 API를 운영하나요?

로보로브스키 히스토리 API는 다음과 같이 구현되고 실행됩니다. [그레이매스 주식회사](https://greymass.com/)

## 로보로브스키 히스토리 API가 안전한 이유

로보로브스키 히스토리 API는 다음과 같이 만들어졌기 때문에 안전성이 높습니다. [그레이매스 주식회사](https://greymass.com/) EOS, WAX, TELOS, PROTON, FIO 및 기타 EOS 기반 체인에서 신뢰할 수 있고 안정적인 블록 프로듀서 및 지갑 개발자 (Anchor) 로 활동해 왔습니다.

## 호스팅된 솔루션과 관련된 위험 이해

호스팅된 솔루션을 사용하는 경우 제어할 수 없는 데이터와 프로세스의 정확성에 의존하게 됩니다.따라서 애플리케이션이 온체인 데이터에 크게 의존하는 경우 자체 히스토리 솔루션을 호스팅하는 것이 좋습니다.하지만 Roborovsky는 현재 비공개 소스이므로 자체 노드를 실행하려면 아래 Hyperion을 참조해야 합니다.

## 로보로브스키 히스토리 API 및 V1 히스토리 스탠다드

로보로브스키 히스토리 API는 V1 히스토리 API 표준을 준수합니다.또한 표준 기능 외에 두 가지 기능을 더 추가합니다.

기존 V1 History 플러그인 통합자는 현재 API URL을 Greymass의 URL로 간단히 대체할 수 있으며 완벽하게 작동합니다.

## API 레퍼런스

### 연결 방법

로보로브스키 히스토리 API 연결 엔드포인트는 다음과 같습니다. `https://eos.greymass.com`

### 함수 목록

- 액션 가져오기 (V1 호환)
 - 포스트 `https://eos.greymass.com/v1/history/get_actions`
- 트랜잭션 가져오기 (V1 호환)
 - 포스트 `https://eos.greymass.com/v1/history/get_transaction`
- 트랜잭션 가져오기 (V1에는 없는 새로운 방법)
 - 얻다 `https://eos.greymass.com/v1/history/get_transaction?id=<TXID>`
- 액션 가져오기 (V1에는 없는 새로운 메서드)
 - 얻다 `https://eos.greymass.com/v1/history/get_actions?account_name=<NAME>`

### 성능 수치

지금까지 관찰되고 측정된 바와 같이 Roborovski History API는 초당 최소 50개의 요청을 지원합니다. 이 한도는 낮은 부하로 정의되어 있기 때문에 솔루션은 더 많은 요청을 처리할 수 있지만, 현재로서는 더 높은 구체적인 한도가 알려져 있지 않습니다.



# 하이페리온 히스토리 솔루션

## 개요

Hyperion History는 EOS 기반 블록체인 히스토리 데이터를 인덱싱, 저장 및 검색하기 위한 전체 히스토리 솔루션입니다.노드 운영자가 이를 배포하여 블록체인에 저장된 작업, 트랜잭션 및 블록에 대한 데이터 쿼리 지원을 제공할 수 있습니다.

하이페리온 히스토리 API는 V2 및 V1 (레거시 히스토리 플러그인) 엔드포인트를 모두 제공합니다.따라서 V1 기록을 완벽하게 준수합니다.

## 하이페리온이 안전한 이유

하이페리온은 EOS Rio: https://eosrio.io/hyperion/ 에서 개발 및 유지 관리하며 모든 앤텔로프 공용 네트워크 (EOS, WAX, TELOS, PROTON, FIO 등) 에서 전투 테스트를 거쳤습니다.

* 깃허브: https://github.com/eosrio/Hyperion-History-API
* 문서: https://hyperion.docs.eosrio.io/

## 설치

로 가세요 [하이페리온 문서](https://hyperion.docs.eosrio.io/) 설치 지침을 참조하십시오.


# 메멘토 히스토리 솔루션

[메멘토](https://github.com/Antelope-Memento/antelope_memento) 에서 개발한 블록체인 히스토리 솔루션입니다. [cc32d9](https://github.com/cc32d9) 과 [EOS 암스테르담 블록 프로듀서](https://eosamsterdam.net/).

다음과 같이 구성됩니다. [연대기](https://github.com/EOSChronicleProject/eos-chronicle) 그리고 MySQL 또는 Postgres 데이터베이스에 트랜잭션 추적을 저장하는 데이터베이스 작성기.특정 계정과 관련된 트랜잭션만 내보내도록 크로니클을 구성할 수 있으므로 기록 데이터베이스가 너무 많은 공간을 차지하지 않습니다.

두 가지 유형 [HTTP API](https://github.com/Antelope-Memento/antelope_memento_api) RESTful API (v1 또는 하이페리온과 호환되지 않음) 및 GraphQL API를 사용할 수 있습니다.

A [공개 데모](https://github.com/Antelope-Memento/antelope_memento/blob/main/MEMENTO_PUBLIC_ACCESS.md) 여러 퍼블릭 블록체인에 대해 48시간의 역사를 가지고 있습니다.
