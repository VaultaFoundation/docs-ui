---
title: net_plugin
dont_translate_title: true
---

## 개요

더 `net_plugin` 노드의 지속적인 동기화를 위한 인증된 P2P (Peer-to-Peer) 프로토콜을 제공합니다.또한 에서 제공하는 핵심 기능을 구현합니다. [넷 API 플러그인](./net-api-plugin.md).

## 사용법

```console
# config.ini
plugin = eosio::net_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::net_plugin [options]
```

## 옵션

명령줄 또는 명령줄에서 지정할 수 있습니다. `config.ini` 파일:

### 에 대한 구성 옵션 `net_plugin`

옵션 (=기본값) | 설명
-|-
`--p2p-listen-endpoint arg (=0.0.0.0:9876)` | 들어오는 p2p 연결을 수신하는 데 사용되는 실제 호스트:포트입니다.
`--p2p-server-address arg` | 이 노드를 식별하기 위한 외부에서 액세스할 수 있는 host:port기본값은 p2p-리스젠-엔드포인트입니다.
`--p2p-peer-address arg` | 연결할 피어 노드의 퍼블릭 엔드포인트.필요에 따라 여러 개의 p2p-peer-address 옵션을 사용하여 네트워크를 구성하십시오.구문: host:port [:^trx^\ |^blk^] 선택적 'trx' 및 'blk'는 노드에 트랜잭션 'trx' 또는 블록 'blk'만 전송해야 함을 나타냅니다.예: p2p.eos.io:9876 p2p.trx.eos.io:9876:trx p2p.blk.eos.io:9876:blk
`--p2p-max-nodes-per-host arg (=1)` | 단일 IP 주소의 최대 클라이언트 노드 수
`--p2p-accept-transactions arg (=1)` | p2p 네트워크를 통해 받은 거래를 평가하고 유효한 경우 중계할 수 있습니다.
`--p2p-auto-bp-peer arg` | 블록 프로듀서 노드가 프로듀서 스케줄에 근접할 때 자동으로 연결할 블록 프로듀서 노드의 계정 및 퍼블릭 p2p 엔드포인트.구문: 계정, 호스트:포트 예제, eosproducer1, p2p.eos.io:9876 eosproducer2, p2p.trx.eos.io:9876:t rx eosproducer3, p2p.blk.eos.io:9876:b lk
`--agent-name arg (=EOS Test Agent)` | 피어들 사이에서 이 노드를 식별하기 위해 제공된 이름입니다.
`--allowed-connection arg (=any)` | '임의', '생산자', '지정' 또는 '없음'일 수 있습니다.'지정'인 경우 피어 키를 한 번 이상 지정해야 합니다.'생산자'만 있는 경우에는 피어 키가 필요하지 않습니다.'생산자'와 '지정'을 결합할 수 있습니다.
`--peer-key arg` | 연결이 허용된 피어의 선택적 공개 키.여러 번 사용할 수 있습니다.
`--peer-private-key arg` | [퍼블릭 키, WIF 프라이빗 키] 의 튜플 (여러 번 지정할 수 있음)
`--max-clients arg (=25)` | 연결이 허용되는 최대 클라이언트 수, 제한 없이 0을 사용하십시오.
`--connection-cleanup-period arg (=30)` | 데드 연결을 정리하기 전에 대기하는 시간 (초)
`--max-cleanup-time-msec arg (=10)` | 정리 호출당 최대 연결 정리 시간 (밀리초)
`--p2p-dedup-cache-expire-time-sec arg (=10)` | 중복 최적화를 위한 트랜잭션 추적 최대 시간
`--net-threads arg (=4)` | net_plugin 스레드 풀의 워커 스레드 수
`--sync-fetch-span arg (=100)` | 동기화 중에 개별 피어로부터 청크 내에서 검색할 블록 수
`--use-socket-read-watermark arg (=0)` | 실험적 소켓 읽기 워터마크 최적화 활성화
`--peer-log-format arg (=["${_name}" - ${_cid} ${_ip}:${_port}] )` | 피어에 대한 메시지를 로깅할 때 피어의 형식을 지정하는 데 사용되는 문자열입니다.변수는 $ {^변수 이름^} 으로 이스케이프됩니다.사용 가능한 변수: _name 자체 보고 이름 _cid 할당 연결 ID _id 자체 보고 ID (16진수 64자) _sid _peer.id의 처음 8자 _ip 피어의 원격 IP 주소 _포트 원격 포트 번호 피어에 연결된 로컬 IP 주소 _lip 피어에 연결된 로컬 IP 주소 _lport 피어에 연결된 로컬 포트 번호
`--p2p-keepalive-interval-ms arg (=10000)` | 피어 하트비트 keepalive 메시지 간격 (밀리초)

## 종속성

없음
