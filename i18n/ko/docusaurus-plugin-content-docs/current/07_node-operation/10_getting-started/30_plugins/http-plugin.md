---
title: http_plugin
dont_translate_title: true
---

## 개요

더 `http_plugin` 다음 중 하나에서 제공하는 RPC API 기능을 활성화하는 데 필수적입니다. `nodeos` 또는 `keosd` 예.둘 다 `nodeos` 과 `keosd` 를 지원하다 `http_plugin` 핵심 플러그인으로.

## 사용법

```console
# config.ini
plugin = eosio::http_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::http_plugin [options]
 (or)
keosd ... --plugin eosio::http_plugin [options]
```

## 옵션

명령줄 또는 명령줄에서 지정할 수 있습니다. `config.ini` 파일:

### 에 대한 구성 옵션 `http_plugin`

옵션 (=기본값) | 설명
-|-
`--unix-socket-path arg` | HTTP RPC용 유닉스 소켓을 만들기 위한 파일 이름 (데이터 디렉토리 기준). 비활성화하려면 공백으로 설정합니다.
`--http-server-address arg (=127.0.0.1:8888)` | 들어오는 http 연결을 수신하기 위한 로컬 IP 및 포트입니다. 비활성화하려면 공백으로 설정합니다.
`--access-control-allow-origin arg` | 각 요청에서 반환될 액세스-제어-허용-출처를 지정합니다.
`--access-control-allow-headers arg` | 각 요청에서 반환될 액세스 제어 허용 헤더를 지정합니다.
`--access-control-max-age arg` | 각 요청에 대해 반환할 액세스 제어-최대 연령을 지정합니다.
`--access-control-allow-credentials` | 각 요청에 대해 액세스 제어 허용-자격 증명: true를 반환할지 여부를 지정합니다.
`--max-body-size arg (=2097152)` | 들어오는 RPC 요청에 허용되는 최대 본문 크기 (바이트)
`--http-max-bytes-in-flight-mb arg (=500)` | http_plugin이 http 요청을 처리하는 데 사용해야 하는 최대 크기 (메가바이트). -1은 무제한입니다. 초과하면 429개의 오류 응답이 발생합니다.
`--http-max-in-flight-requests arg (=-1)` | http_plugin이 http 요청을 처리하는 데 사용해야 하는 최대 요청 수입니다. 초과하면 429개의 오류 응답이 발생합니다.
`--http-max-response-time-ms arg (=30)` | 최대 요청 처리 시간, 무제한의 경우 -1
`--verbose-http-errors` | HTTP 응답에 오류 로그 추가
`--http-validate-host arg (=1)` | false로 설정하면 들어오는 모든 “Host” 헤더가 유효한 것으로 간주됩니다.
`--http-alias arg` | 들어오는 HTTP 요청의 “Host” 헤더에 추가로 허용되는 값을 여러 번 지정할 수 있습니다.기본적으로 http/s_server_address 를 포함합니다.
`--http-threads arg (=2)` | http 스레드 풀의 작업자 스레드 수
`--http-keep-alive arg (=1)` | false로 설정하면 클라이언트가 요청하더라도 HTTP 연결을 계속 유지하지 마십시오.

## 종속성

없음
