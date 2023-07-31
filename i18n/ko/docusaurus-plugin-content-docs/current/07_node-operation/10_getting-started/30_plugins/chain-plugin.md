---
title: chain_plugin
dont_translate_title: true
---

## 개요

더 `chain_plugin` EOS 노드에서 체인 데이터를 처리하고 통합하는 데 필요한 필수 플러그인입니다.에서 제공하는 핵심 기능을 구현합니다. [체인 API 플러그인](./chain-api-plugin.md).

## 사용법

```console
# config.ini
plugin = eosio::chain_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [operations] [options]
```

## 운영

다음에서만 지정할 수 있습니다. `nodeos` 명령줄:

### 명령줄 옵션 `chain_plugin`

옵션 (=기본값) | 설명
-|-
`--genesis-json arg` | 제네시스 스테이트를 읽을 파일
`--genesis-timestamp arg` | 제네시스 스테이트 파일의 초기 타임스탬프 재정의
`--print-genesis-json` | blocks.log 에서 genesis_state를 JSON으로 추출하고 콘솔에 출력한 다음 종료합니다.
`--extract-genesis-json arg` | blocks.log 에서 genesis_state를 JSON으로 추출하고 지정된 파일에 쓴 다음 종료합니다.
`--print-build-info` | 빌드 환경 정보를 JSON으로 콘솔에 출력하고 종료합니다.
`--extract-build-info arg` | 빌드 환경 정보를 JSON으로 추출하고 지정된 파일에 쓰고 종료
`--force-all-checks` | 블록을 재생하는 동안 유효성 검사를 건너뛰지 마십시오 (신뢰할 수 없는 출처의 블록을 재생하는 데 유용함).
`--disable-replay-opts` | 특별히 리플레이를 대상으로 하는 최적화 비활성화
`--replay-blockchain` | 체인 상태 데이터베이스 지우기 및 모든 블록 재생
`--hard-replay-blockchain` | 체인 상태 데이터베이스를 지우고 블록 로그에서 최대한 많은 블록을 복구한 다음 해당 블록을 재생합니다.
`--delete-all-blocks` | 체인 상태 데이터베이스 및 블록 로그 지우기
`--truncate-at-block arg (=0)` | 이 블록 번호에서 하드 리플레이 중지/블록 로그 복구 중지 (0이 아닌 숫자로 설정된 경우)
`--terminate-at-block arg (=0)` | 이 블록 번호에 도달한 후 종료 (0이 아닌 숫자로 설정된 경우)
`--snapshot arg` | 스냅샷 상태를 읽을 파일

## 옵션

다음 중 하나에서 지정할 수 있습니다. `nodeos` 명령줄 또는 `config.ini` 파일:

### 에 대한 구성 옵션 `chain_plugin`

옵션 (=기본값) | 설명
-|-
`--blocks-dir arg (="blocks")` | 블록 디렉토리의 위치 (절대 경로 또는 응용 프로그램 데이터 디렉토리에 대한 상대 경로)
`--blocks-log-stride arg` | 헤드 블록 번호가 스트라이드의 배수일 때 블록 로그 파일을 분할합니다. 스트라이드에 도달하면 현재 블록 로그와 인덱스의 이름이 '^blocks-retained-dir^/blocks-^-^start num^-^end num^.log/index'로 변경되고 최신 블록으로 현재 블록 로그와 색인이 새로 생성됩니다.이 형식을 따르는 모든 파일은 확장된 블록 로그를 구성하는 데 사용됩니다.
`--max-retained-block-files arg` | 해당 파일의 블록을 쿼리할 수 있도록 파일이 유지할 최대 블록 수입니다.이 수에 도달하면 가장 오래된 블록 파일이 아카이브 디렉터리로 이동하거나 아카이브 디렉터리가 비어 있으면 삭제됩니다.보관된 블록 로그 파일은 사용자가 조작해서는 안 됩니다.
`--blocks-retained-dir arg` | 블록 보존 디렉토리의 위치 (절대 경로 또는 블록 디렉토리에 대한 상대 경로)값이 비어 있으면 블록 디렉토리의 값으로 설정됩니다.
`--blocks-archive-dir arg` | 블록 아카이브 디렉토리의 위치 (절대 경로 또는 블록 디렉토리에 대한 상대 경로).값이 비어 있으면 보존 제한을 초과한 블록 파일이 삭제됩니다.아카이브 디렉터리의 모든 파일은 완전히 사용자가 제어할 수 있습니다. 즉, 더 이상 노드에서 액세스할 수 없습니다.
`--state-dir arg (="state")` | 상태 디렉토리의 위치 (절대 경로 또는 응용 프로그램 데이터 디렉토리에 대한 상대 경로)
`--protocol-features-dir arg (="protocol_features")` | 프로토콜_features 디렉터리의 위치 (절대 경로 또는 애플리케이션 구성 디렉터리에 대한 상대 경로)
`--checkpoint arg` | 체크포인트로 적용해야 하는 [BLOCK_NUM, BLOCK_ID] 쌍.
`--wasm-runtime runtime (=eos-vm-jit)` | 기본 WASM 런타임 재정의 (“eos-vm-jit”, “eos-vm”) “eos-vm-jit”: 실행 전에 웹어셈블리 코드를 네이티브 x86 코드로 컴파일하는 웹어셈블리 런타임입니다.“eos-vm”: 웹어셈블리 인터프리터.
`--profile-account arg` | 코드가 프로파일링될 계정의 이름
`--abi-serializer-max-time-ms arg (=15)` | 허용되는 기본 최대 ABI 직렬화 시간 재정의 (ms)
`--chain-state-db-size-mb arg (=1024)` | 체인 상태 데이터베이스의 최대 크기 (MiB)
`--chain-state-db-guard-size-mb arg (=128)` | 체인 상태 데이터베이스에 남아 있는 여유 공간이 이 크기 (MiB) 아래로 떨어지면 노드를 안전하게 종료합니다.
`--signature-cpu-billable-pct arg (=50)` | 청구서 대비 실제 서명 복구 CPU의 비율정수 백분율, 예: 50% 인 경우 50
`--chain-threads arg (=2)` | 컨트롤러 스레드 풀의 작업자 스레드 수
`--contracts-console` | 계약 출력을 콘솔에 인쇄
`--deep-mind` | 체인 운영에 대한 자세한 정보 인쇄
`--actor-whitelist arg` | 액터 화이트리스트에 추가된 계정 (여러 번 지정할 수 있음)
`--actor-blacklist arg` | 액터 블랙리스트에 추가된 계정 (여러 번 지정할 수 있음)
`--contract-whitelist arg` | 계약 화이트리스트에 계약 계정 추가 (여러 번 지정할 수 있음)
`--contract-blacklist arg` | 계약 블랙리스트에 계약 계정 추가 (여러 번 지정할 수 있음)
`--action-blacklist arg` | 액션 (코드: :action 형식) 이 액션 블랙리스트에 추가됨 (여러 번 지정할 수 있음)
`--key-blacklist arg` | 권한에 포함되어서는 안 되는 키의 블랙리스트에 공개 키 추가 (여러 번 지정할 수 있음)
`--sender-bypass-whiteblacklist arg` | 이 목록의 계정에서 보낸 지연된 트랜잭션에는 주관적인 화이트리스트/블랙리스트 검사가 적용되지 않습니다 (여러 번 지정할 수 있음).
`--read-mode arg (=head)` | 데이터베이스 읽기 모드 (“헤드”, “되돌릴 수 없음”, “추측”).“헤드” 모드: 데이터베이스에는 헤드 블록까지의 상태 변경이 포함됩니다. 유효한 경우 노드에서 수신한 트랜잭션이 릴레이됩니다.“되돌릴 수 없는” 모드: 데이터베이스에는 되돌릴 수 없는 마지막 블록까지의 상태 변경이 포함됩니다. P2P 네트워크를 통해 수신된 트랜잭션은 릴레이되지 않으며 트랜잭션은 체인 API를 통해 푸시될 수 없습니다.“투기” 모드: (더 이상 사용되지 않음: 헤드 모드 권장) 데이터베이스에는 헤드 블록까지의 블록체인 내 트랜잭션에 따른 상태 변경과 블록체인에 아직 포함되지 않은 일부 트랜잭션이 포함됩니다. 노드가 수신한 트랜잭션은 유효한 경우 릴레이됩니다.
`--api-accept-transactions arg (=1)` | 유효한 경우 API 트랜잭션을 평가하고 릴레이할 수 있습니다.
`--validation-mode arg (=full)` | 체인 검증 모드 (“전체” 또는 “라이트”).“full” 모드에서는 들어오는 모든 블록이 완전히 검증됩니다.“라이트” 모드에서는 들어오는 모든 블록 헤더가 완전히 검증되고, 검증된 블록의 트랜잭션은 신뢰됩니다.
`--disable-ram-billing-notify-checks` | 계약이 알림 핸들러 컨텍스트 내에서 다른 계정에 더 많은 RAM을 청구하는 경우 (즉, 수신자가 조치 코드가 아닌 경우) 주관적으로 트랜잭션에 실패하는 검사를 비활성화합니다.
`--maximum-variable-signature-length arg (=16384)` | 주관적으로 가변 길이 시그니처의 가변 구성 요소 최대 길이를 이 크기 (바이트) 로 제한
`--trusted-producer arg` | 서명한 블록 헤더가 완전히 검증되지만 검증된 블록의 트랜잭션은 신뢰할 수 있는 생산자를 지정하십시오.
`--database-map-mode arg (=mapped)` | 데이터베이스 맵 모드 (“매핑됨”, “힙” 또는 “잠김”)“매핑된” 모드에서 데이터베이스는 메모리가 파일로 매핑됩니다.“힙” 모드에서는 데이터베이스가 스왑 가능한 메모리에 미리 로드되며 가능한 경우 대용량 페이지를 사용합니다.“잠금” 모드에서는 데이터베이스가 미리 로드되고 메모리에 잠기며 가능한 경우 대용량 페이지를 사용합니다.
`--eos-vm-oc-cache-size-mb arg (=1024)` | EOS VM OC 코드 캐시의 최대 크기 (MiB)
`--eos-vm-oc-compile-threads arg (=1)` | EOS VM OC 티어업에 사용할 스레드 수
`--eos-vm-oc-enable` | EOS VM OC 티어업 런타임 활성화
`--enable-account-queries arg (=0)` | 쿼리를 사용하여 다양한 메타데이터로 계정을 찾을 수 있습니다.
`--max-nonprivileged-inline-action-size arg (=4096)` | 권한 없는 계정에 허용되는 최대 인라인 작업 크기 (바이트)
`--transaction-retry-max-storage-size-gb arg` | 트랜잭션 재시도 기능에 할당할 수 있는 최대 크기 (GiB)0보다 크게 설정하면 이 기능이 활성화됩니다.
`--transaction-retry-interval-sec arg (=20)` | 블록에 보이지 않는 경우 들어오는 트랜잭션을 네트워크로 재전송하는 빈도 (초 단위)
`--transaction-retry-max-expiration-sec arg (=120)` | 재시도 트랜잭션에 허용되는 최대 트랜잭션 만료일은 이 값까지 트랜잭션을 재시도합니다.
`--transaction-finality-status-max-storage-size-gb arg` | 거래 완료 상태 기능에 할당할 수 있는 최대 크기 (GiB)0보다 크게 설정하면 이 기능이 활성화됩니다.
`--transaction-finality-status-success-duration-sec arg (=180)` | 성공적인 거래의 완료 상태는 처음 식별된 시점부터 계속 확인할 수 있습니다.
`--transaction-finality-status-failure-duration-sec arg (=180)` | 기간 (초), 실패한 거래의 최종 상태는 처음 식별된 이후부터 계속 사용할 수 있습니다.
`--integrity-hash-on-start` | 시작 시 상태 무결성 해시 기록
`--integrity-hash-on-stop` | 종료 시 상태 무결성 해시 기록
`--block-log-retain-blocks arg` | 0보다 크게 설정하면 구성된 수의 최신 블록만 저장하도록 블록 로그를 주기적으로 정리합니다.0으로 설정하면 블록 로그에 블록이 기록되지 않고 시작 후 블록 로그 파일이 제거됩니다.

## 종속성

없음
