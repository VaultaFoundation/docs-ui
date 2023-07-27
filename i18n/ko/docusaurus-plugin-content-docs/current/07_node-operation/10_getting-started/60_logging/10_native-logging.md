---
title: 네이티브 로깅
---

에 대한 로깅 메커니즘 `nodeos` 를 통해 제어됩니다. `logging.json` 파일은 로깅 구성 파일이라고도 합니다.로깅 구성 파일을 사용하여 정의할 수 있습니다. [부록](#appenders) 그리고 그것들을 묶으려면 [벌목꾼](#loggers) 과 [로깅 수준](#logging-levels).

## 로깅.json 파일 구성

이 길이 있는 곳 `logging.json` 를 사용하여 명시적으로 저장할 수 있습니다. `-l` 또는 `--logconf` 시작 시 옵션 `nodeos`.기본적으로 `logging.json` 파일이 지정된 위치에 있습니다. `--config-dir`, 와 동일한 디렉토리 `config.ini` 파일.

## 어펜더

EOS 로깅 라이브러리는 두 가지를 지원합니다. `appender` 유형:

- [걸프](#gelf) (그레이로그 확장 로그 형식)
- [콘솔](#console)

## 젤프

이것은 `appender` 로그 메시지를 다음 주소로 보냅니다. [`그레이로그`](https://github.com/Graylog2/graylog2-server) 로그 메시지를 수집, 인덱싱 및 분석하기 위한 완전히 통합된 플랫폼입니다.지원되는 구성 옵션은 다음과 같습니다.

- `name` - 로거에서 사용할 인스턴스를 식별하기 위한 임의의 이름
- `type` - “젤프”
- `endpoint` - IP 주소 및 포트 번호
- `host` - 사용자를 식별하는 그레이로그 호스트 이름 [그레이로그](https://github.com/Graylog2/graylog2-server).
- `enabled` - 부울 값을 사용하여 어펜더를 활성화/비활성화합니다.

예시:

```json
{
    "name": "net",
    "type": "gelf",
    "args": {
        "endpoint": "104.198.210.18:12202”,
        "host": <YOURNAMEHERE IN QUOTES>
    },
    "enabled": true
}
```

### 콘솔

이것은 `appender` 화면에 로그 메시지를 출력합니다.지원되는 구성 옵션은 다음과 같습니다.

- `name` - 로거에서 사용할 인스턴스를 식별하기 위한 임의의 이름
- `type` - “콘솔”
- `stream` - “std_out” 또는 “std_err”
- `level_colors` - 로그 수준을 색상에 매핑합니다. 하위 항목으로 다음 두 항목을 참조하십시오.
 - `level` - (“디버그”, “정보”, “경고”, “오류”, “모두”, “끄기”) 중 하나일 수 있습니다.
 - `color` - (“빨간색”, “녹색”, “갈색”, “파란색”, “자홍색”, “청록색”, “흰색”, “console_default”) 중 하나일 수 있습니다.
- `enabled` - 어펜더를 활성화/비활성화하기 위한 부울 값

예시:

```json
{
    "name": "consoleout",
    "type": "console",
    "args": {
    "stream": "std_out",

    "level_colors": [{
        "level": "debug",
        "color": "green"
        },{
        "level": "warn",
        "color": "brown"
        },{
        "level": "error",
        "color": "red"
        }
    ]
    },
    "enabled": true
}
```

## 로거

EOS 로깅 라이브러리는 다음 로거를 지원합니다.

- `default` - 기본 로거로, 항상 활성화되어 있습니다.
- `producer_plugin` - 프로듀서 플러그인에 대한 자세한 로깅
- `http_plugin` - http 플러그인에 대한 자세한 로깅
- `trace_api` - trace_api 플러그인에 대한 자세한 로깅
- `transaction_success_tracing` - P2P 네트워크의 릴레이 노드에서 성공적인 결과를 내보내는 상세 로그.
- `transaction_failure_tracing` - P2P 네트워크의 릴레이 노드에서 실패한 판결을 내보내는 상세 로그.
- `state_history` - 상태 기록 플러그인에 대한 자세한 로깅.
- `net_plugin_impl` - 넷 플러그인에 대한 자세한 로깅
- `blockvault_client_plugin` - blockvault 클라이언트 플러그인에 대한 자세한 로깅

지원되는 구성 옵션은 다음과 같습니다.

- `name` - 위에서 설명한 이름 중 하나와 일치해야 합니다.
- `level` - 아래 로깅 수준을 참조하십시오.
- `enabled` - 부울 값을 사용하여 로거를 활성화/비활성화합니다.
- `additivity` - 참 또는 거짓
- `appenders` - 이름별 어펜더 목록 (어펜더 구성의 이름)

예시:

```json
{
    "name": "net_plugin_impl",
    "level": "debug",
    "enabled": true,
    "additivity": false,
    "appenders": [
        "net"
    ]
}
```

> ℹ️ 각 로거는 독립적으로 구성할 수 있습니다. `logging.json` 파일.모든 로거에 대한 기본 로깅 수준 (없는 경우) `logging.json` 제공되고 있습니다 `info`.

## 로깅 수준

지원되는 로깅 수준은 다음과 같습니다.

- `all`
- `debug`
- `info`
- `warn`
- `error`
- `off`  

샘플 `logging.json`:

```json
{
  "includes": [],
  "appenders": [{
      "name": "stderr",
      "type": "console",
      "args": {
        "stream": "std_error",
        "level_colors": [{
            "level": "debug",
            "color": "green"
          },{
            "level": "warn",
            "color": "brown"
          },{
            "level": "error",
            "color": "red"
          }
        ],
        "flush": true
      },
      "enabled": true
    },{
      "name": "stdout",
      "type": "console",
      "args": {
        "stream": "std_out",
        "level_colors": [{
            "level": "debug",
            "color": "green"
          },{
            "level": "warn",
            "color": "brown"
          },{
            "level": "error",
            "color": "red"
          }
        ],
        "flush": true
      },
      "enabled": true
    },{
      "name": "net",
      "type": "gelf",
      "args": {
        "endpoint": "10.10.10.10:12201",
        "host": "host_name"
      },
      "enabled": true
    }
  ],
  "loggers": [{
      "name": "default",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "net_plugin_impl",
      "level": "info",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "http_plugin",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "producer_plugin",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "transaction_success_tracing",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "transaction_failure_tracing",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "state_history",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "trace_api",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    },{
      "name": "blockvault_client_plugin",
      "level": "debug",
      "enabled": true,
      "additivity": false,
      "appenders": [
        "stderr",
        "net"
      ]
    }
  ]
}
```
