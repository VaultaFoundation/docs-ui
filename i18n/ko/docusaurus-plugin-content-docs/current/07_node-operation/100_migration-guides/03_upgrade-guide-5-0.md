---
title: Leap 5.0 업그레이드 가이드
---

5.0 업그레이드는 일반 업그레이드 가이드를 따릅니다.찾을 수 있습니다. [이리](./01_general-upgrade-guide.md).

아래 정보는 5.0 업그레이드에만 해당되며 구성 옵션 변경 사항만 간략하게 설명합니다.

## 구성 옵션

### 트랜잭션 시간 Windows 구성 변경

이러한 업데이트는 경험적 데이터와 함께 성능 테스트를 기반으로 합니다.
프로덕션 환경에서 30ms 제한을 초과하는 트랜잭션 사례가 확인되었으므로 권장 사항을 권장합니다. 
시간 창 늘리기.읽기 전용 트랜잭션이 추가됨에 따라 
Leap 4.0에서는 읽기 전용 기능을 최대한 활용하려면 시간 제한을 늘려야 합니다.


- 제거 `max-transaction-time` (새 기본값)
- 설정 `read-only-read-window-time-us` 165,000초 (165ms) 까지 


### 확인 `max-nonprivileged-inline-action-size` 설정되지 않았습니다
Leap 기준 `v5.0.0-rc1`, 노드 운영자는 반드시 다음을 보장해야 합니다. `max-nonprivileged-inline-action-size` 매개변수가 아닙니다 
에서 설정 `config.ini` 허용하다 `nodeos` 시작하려면.



### 새 구성 옵션
- `http-category-address` 명령줄 및 ini 파일의 모든 주소를 구성하는 데 사용할 수 있습니다.이 옵션은 필요에 따라 여러 번 사용할 수 있습니다.
- `database-map-mode` 이제 a를 지원합니다 `mapped_private` 방법.참조 [릴리즈 노트](https://github.com/AntelopeIO/leap/releases/tag/v5.0.0-rc1) 자세한 내용은 여기를 참조하십시오.

### 새 명령줄 옵션
- `sync-peer-limit`동기화할 피어 수를 제한할 수 있습니다.기본값은 3입니다.
- `eos-vm-oc-enable` 새 모드가 있습니다 `auto` 이는 블록을 구축하고, 블록을 적용하고, HTTP 또는 P2P에서 트랜잭션을 실행하고, eosio.* 계정 (eosio, eosio.token, eosio.ibc 및 eosio.evm) 에서 계약을 실행할 때 자동으로 OC를 사용합니다. `eos-vm-oc-enable=auto` 새 기본값입니다.

### 옵션 동작 수정
- `max-transaction-time` 이제 기본값은 `499ms`
- 지정 `--p2p-listen-endpoint` 과 `--p2p-server-address` 여러 번
- `sync-fetch-span` 기본값이 에서 변경됨 `100` 에 `1000`
- `read-only-transaction-threads` 이제 최대 128까지 설정할 수 있습니다.
- `abi-serializer-max-time-ms` 메인 스레드에서 객체를 직렬화하고 HTTP 스레드에서 단일 객체를 역직렬화하는 데 소요되는 시간을 제한하도록 업데이트되었습니다.
- `http-max-response-time-ms` 기본값이 30밀리초에서 15밀리초로 변경되었습니다.
- `disable-replay-opts` 상태 기록 플러그인이 활성화된 경우 자동으로 true로 설정됩니다.CLI 옵션으로도 사용할 수 있습니다.

