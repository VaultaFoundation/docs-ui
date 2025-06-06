---
title: 일반 업그레이드 가이드
---

이 안내서는 노드를 업그레이드하기 위해 취해야 하는 단계를 안내합니다.
이 지침은 일반적인 지침이며, 일부 릴리스에서는 필요한 추가 단계가 필요할 수 있다는 점을 명심하세요.
취해야 합니다.릴리스에 대한 특정 업그레이드 가이드가 있는 경우 대신 해당 가이드를 따라야 합니다 (그럴 수도 있지만). 
일반 단계는 이 가이드를 참조하십시오.

## 업그레이드 계획

- 프로덕션 노드에서 업그레이드를 테스트하지 말고 먼저 테스트 노드를 사용하십시오.
- 지원되는 운영 체제는 다음과 같습니다.
 - **우분투 20.04 포컬**
 - **우분투 22.04 재미**
- **더 이상 사용되지 않는 플러그인을 사용하지 마십시오**
- **모두 활성화** 새로운 필수 플러그인 사용
- 노드의 **백업 만들기**


## 노드 업그레이드

다음 단계를 순서대로 따르세요.궁금한 점이 있으면 다음 주소로 문의하십시오. [텔레그램 그룹](https://t.me/AntelopeIO).

### 1.바이너리 다운로드/빌드

소스에서 빌드하고 설치하려는 경우, 의 지침을 따를 수 있습니다. [읽어보기](https://github.com/AntelopeIO/spring#build-and-install-from-source).

바이너리를 사용하려면 에서 다운로드할 수 있습니다. [릴리스 페이지](https://github.com/AntelopeIO/spring/releases).

### 2.스냅샷 만들기

새 바이너리를 설치하거나 노드를 중지하기 전에 스냅샷을 만들어야 합니다. 
이렇게 하면 문제가 발생할 경우 신속하게 복구하여 노드를 재생하는 데 사용할 수 있습니다.

스냅샷을 만들려면 **프로듀서 노드**에서 다음 명령을 실행하십시오.

```bash
curl -X POST http://127.0.0.1:8888/v1/producer/create_snapshot
```

curl이 다시 돌아올 때까지 기다리십시오. `JSON` 새로 생성된 스냅샷 파일의 파일 이름이 포함된 응답입니다.

다음과 같이 신뢰할 수 있는 출처에서 스냅샷을 가져올 수도 있습니다. [이오스 네이션](https://snapshots.eosnation.io/), 하지만 만드세요
올바른 네트워크에 대한 스냅샷과 스냅샷 버전이 있는지 확인하세요.


### 3.노드를 중지하세요

스냅샷을 만들었으니 이제 노드를 중지할 수 있습니다.

### 4.이전 파일 제거

제거 `data/state/shared_memory.bin` 파일.

> ❔ **내 곳은 어디야 `data` 디렉토리?**
>
> 더 `data` 디렉토리는 전달되는 경로가 됩니다. `nodeos --data-dir` 논쟁, 또는 `$HOME/local/share/eosio/nodeos/data/state` 기본적으로

<details>
  <summary>이력이 필요한 경우 (ShiP)</summary>

**경고**: 다시 플레이하는 데 몇 주가 걸릴 수 있습니다.

또한 제거해야 할 수도 있습니다. `data/blocks` 디렉터리
업그레이드하려는 릴리스의 블록 로그 형식이 다른 경우
블록 로그가 호환되지 않는 경우 네트워크에서 동기화하거나 파일을 다운로드해야 합니다.
신뢰할 수 있는 출처의 호환 가능한 블록 로그

각 개별 업그레이드 가이드는 블록 로그 형식이 다음과 같은지 여부를 알려줍니다.
호환되지 않습니다.

또한 삭제해야 합니다. `SHiP`.
업그레이드하려는 릴리스와 호환되는 블록 로그가 있는 경우
네트워크에서 동기화하는 대신 해당 블록 로그를 로컬에서 간단히 재생할 수 있습니다.

리플레이 속도를 높이기 위한 몇 가지 팁은 다음과 같습니다.
- 레이즈 `-–sync-fetch-span` 리플레이 중 (리플레이 후 안정성을 위해 디폴트로 되돌리세요!)
- 동료를 모두 채운 상태로 사용하세요 `blocks.log` 만
- 보관하세요 `p2p-peer-address` 가장 가까운 노드만 나열하여 짧게 나열합니다.
- 동일한 버전이 아니더라도 동일한 데이터 센터에 있는 단일 피어에서 빠르게 동기화할 수 있습니다.
 - 동일한 컴퓨터에서 동일한 작업을 수행할 수 있지만 새 컴퓨터가 필요합니다. `/blocks` 과 `/state` 디렉토리 + 더 많은 NVMe 공간
- 복사할 수 있습니다. `blocks.log` 호환되는 경우 다른 컴퓨터에서

#### 제네시스까지 확장된 blocks.log 파일이 있는 피어 노드 목록:
```bash
EOS:
eos.seed.eosnation.io:9876
peer1.eosphere.io:9876
peer2.eosphere.io:9876
p2p.genereos.io:9876

EOS Jungle4 Testnet:
peer1-jungle4.eosphere.io:9876
jungle4.seed.eosnation.io:9876
jungle4.genereos.io:9876
jungle.p2p.eosusa.io:9883
```

</details>

### 5.이전 구성 옵션 및 플러그인을 제거하고 새 구성 옵션 및 플러그인을 추가합니다.

각 릴리스에는 지원 중단되거나 단종되거나 새 플러그인이 있을 수 있습니다.
이러한 변경으로 인해 기존 구성 옵션 및 플러그인을 제거하거나 다음과 같은 새 플러그인을 추가해야 할 수 있습니다.
일반적으로 새 구성 옵션을 포함합니다.

업그레이드하려는 릴리스에 이러한 변경 사항이 있는 경우 릴리스 노트 또는 해당 변경 사항을 확인할 수 있습니다.
왼쪽 목록의 해당 릴리스 관련 가이드 (또는 모바일에서는 햄버거 메뉴) 에서 확인할 수 있습니다.

### 6.바이너리 업데이트

먼저, 이전 바이너리를 삭제하세요.

```bash
sudo apt-get remove -y leap
# or 
sudo dpkg --remove <old-pkg-name>
```

그런 다음 새 바이너리를 설치합니다.

```bash 
sudo apt-get install -y ./leap[-_][0-9]*.deb
# or
sudo dpkg -i <filename>.deb
```

### 7.노드를 시작하세요

2단계에서 생성/다운로드한 스냅샷으로 노드를 시작합니다.

스냅샷을 시작하는 방법 및 스냅샷에 대한 자세한 내용은 를 참조하십시오. [스냅샷 가이드](../10_getting-started/50_snapshots.md).





