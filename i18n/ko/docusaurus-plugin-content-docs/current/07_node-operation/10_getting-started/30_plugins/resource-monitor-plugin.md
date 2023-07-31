---
title: resource_monitor_plugin
dont_translate_title: true
---

## 개요

더 `resource_monitor_plugin` 컴퓨팅 시스템의 스토리지 공간 사용을 모니터링하는 역할을 담당합니다. `nodeos` 활성화되어 있습니다.특히, 일정한 간격으로 `resource-monitor-interval-seconds`, 연결된 각 파일 시스템에서 사용하는 공간의 양을 계산합니다. `data-dir`, `state-dir`, `blocks-log-dir`, `snapshots-dir`, `state-history-dir`, 및 `trace-dir`.모니터링되는 파일 시스템의 공간 사용량이 범위 내에 있는 경우 `5%` 에 의해 지정된 임계값 `resource-monitor-space-threshold`파일 시스템 경로와 사용된 공간의 비율을 나타내는 경고 메시지가 표시됩니다.공간 사용량이 이 임계값을 초과할 경우 동작은 다음 여부에 따라 달라집니다. `resource-monitor-not-shutdown-on-threshold-exceeded` 활성화 여부비활성화된 경우 `nodeos` 정상적으로 종료됩니다. 활성화되어 있으면 `nodeos` 공간 사용량이 임계값 아래로 떨어질 때까지 주기적으로 경고를 표시합니다.

더 `resource_monitor_plugin` 해당 시 자동으로 로드됩니다. `nodeos` 인스턴스가 시작됩니다.

## 사용법

```console
# config.ini
plugin = eosio::resource_monitor_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::resource_monitor_plugin [options]
```

## 구성 옵션

다음 중 하나에서 지정할 수 있습니다. `nodeos` 명령줄 또는 `config.ini` 파일:

### 에 대한 구성 옵션 `resource_monitor_plugin`

옵션 (=기본값) | 설명
-|-
`--resource-monitor-interval-seconds arg (=2)` | 두 번의 연속 리소스 사용 확인 사이의 시간 (초).1에서 300 사이여야 합니다.
`--resource-monitor-space-threshold arg (=90)` | 사용된 공간 대 총 공간의 백분율로 나타낸 임계값.사용 공간이 임계값 - 5% 를 초과하면 경고가 생성됩니다.임계값 초과 시 Resource-Monitor-not-shutdown이 활성화되지 않은 경우, 사용된 공간이 임계값을 초과하면 정상 종료가 시작됩니다.값은 6에서 99 사이여야 합니다.
`--resource-monitor-space-absolute-gb arg` | 남은 공간의 절대 임계값 (GB) 으로, 모니터링되는 각 디렉터리에 적용됩니다.남은 공간이 모니터링되는 디렉터리의 값보다 작으면 임계값을 초과한 것으로 간주합니다. 리소스-모니터 공간-임계값을 재정의합니다.
`--resource-monitor-not-shutdown-on-threshold-exceeded` | 임계값을 초과해도 노드가 종료되지 않음을 나타내는 데 사용됩니다.
`--resource-monitor-warning-interval arg (=30)` | 임계값에 도달했을 때 연속된 두 경고 사이의 리소스 모니터 간격 수입니다.1에서 450 사이여야 합니다.

## 플러그인 종속성

* 없음
