---
title: 읽기 상태
---

## 전제 조건

이 가이드를 따르려면 다음이 필요합니다.

- EOS 블록체인과 그 작동 방식에 대한 이해
- curl 명령을 실행하는 명령줄 인터페이스입니다.
- EOS 노드 또는 EOS API 서비스에 액세스할 수 있습니다.

## 이오스 테이블

EOS는 데이터베이스 테이블과 유사한 테이블에 데이터를 저장합니다.각 테이블에는 이름과 필드 집합이 있습니다.테이블은 범위로 구성되며, 범위는 테이블을 생성한 스마트 계약에 의해 정의됩니다.

테이블에서 데이터를 검색하려면 테이블의 이름, 범위, 테이블을 생성한 스마트 컨트랙트의 이름을 알아야 합니다.하한과 상한을 지정하여 반환되는 데이터의 양을 제한할 수도 있습니다.

## EOS 테이블에서 데이터를 검색하는 방법

### get_table_rows 함수 사용

더 `get_table_rows` 함수는 테이블에서 행을 검색합니다.JSON 형식으로 다음 매개변수를 사용합니다.

- `"code"`: 테이블을 생성한 스마트 계약의 소유자인 eos 계정 이름.
- `"scope"`: 테이블의 범위, eos 계정 이름입니다.
- `"table"`: 테이블 이름을 나타내는 문자열.
- `"json"`: (선택 사항) 행 결과를 JSON 형식 또는 이진 형식으로 반환할지 여부를 지정하는 부울 값이며 기본값은 바이너리입니다.
- `"lower_bound"`: (선택 사항) 테이블 키의 하한을 나타내는 문자열로, 기본값은 사용된 인덱스의 첫 번째 값입니다.
- `"upper_bound"`: (선택 사항) 테이블 키의 상한을 나타내는 문자열로, 기본값은 사용된 인덱스의 마지막 값입니다.
- `"index_position"`: (선택 사항) 테이블에 여러 인덱스가 있는 경우 사용할 인덱스의 위치, 허용되는 값은 `primary`, `secondary`, `tertiary`, `fourth`, `fifth`, `sixth`, `seventh`, `eighth`, `ninth` , `tenth`, 기본값은 `primary`.
- `"key_type"`: (선택 사항) 테이블 키 유형을 나타내는 문자열, 지원되는 값 `i64`, `i128`, `i256`, `float64`, `float128`, `sha256`, `ripemd160`, `name`.
- `"encode_type"`: (선택 사항) key_type 매개 변수의 인코딩된 유형을 나타내는 문자열, 다음 중 하나 `dec` 또는 `hex`, 기본값은 `dec`.
- `"limit"`: 반환되는 결과 수를 제한하며 기본값은 10입니다.
- `"time_limit_ms"`: (선택 사항) 결과를 검색하는 데 소요되는 최대 시간이며 기본값은 10ms입니다.
- `"reverse"`: (옵션) 인 경우 `true` 결과는 하한에서 상한까지 역순으로 검색되며 기본값은 `false`.

다음은 에서 행을 검색하는 예제입니다. `abihash` 테이블, 소유자 `eosio` 계정 및 AS 보유 `scope` 그 `eosio` 이름.

```shell
curl --request POST \
--url https://eos.greymass.com/v1/chain/get_table_rows \
--header 'content-type: application/json' \
--data '{
"json": true,
"code": "eosio",
"scope": "eosio",
"table": "abihash",
"lower_bound": "eosio",
"limit": 3,
"reverse": false
}'
```

위의 예에서:

- 행 값은 다음에 의해 설정된 JSON으로 반환됩니다. `json` 파라미터.
- 테이블은 계정 소유입니다. `eosio`, 에 의해 설정 `code` 파라미터.
- 테이블 범위는 `eosio`, 에 의해 설정 `scope` 파라미터.
- 테이블 이름은 `abihash.`, 에 의해 설정 `table` 파라미터.
- 쿼리는 기본 인덱스를 사용하여 행을 검색하고 다음부터 시작합니다. `eosio` 에 의해 설정된 하한 지수 값 `lower_bound` 파라미터.
- 함수는 다음과 같이 설정된 최대 3개의 행을 가져옵니다. `limit` 파라미터.
- 검색된 행은 다음과 같이 설정된 오름차순으로 표시됩니다. `reverse` 파라미터.

또는 를 사용하여 동일한 명령을 실행할 수 있습니다. `cleos` 유틸리티 도구이며 결과가 동일합니다.

```shell
dune -- cleos -u https://eos.greymass.com get table eosio eosio abihash --lower eosio --limit 3
```

#### get_table_rows 결과

에서 반환한 JSON입니다. `get_table_rows` 구조는 다음과 같습니다.

```json
{
  "rows": [
    { },
    ...
    { }
  ],
  "more": true,
  "next_key": ""
}
```

더 `"rows"` 필드는 JSON 표현의 테이블 행 객체 배열입니다.
더 `"more"` 필드는 반환된 행 외에 추가 행이 있음을 나타냅니다.
더 `"next_key"` 필드에는 다음 행 집합을 검색하기 위한 다음 요청에서 하한으로 사용할 키가 포함됩니다.

예를 들어, 이전 섹션 명령의 결과는 세 개의 행을 포함하며 아래 행과 비슷합니다.

```json
{
  "rows": [
    {
      "owner": "eosio",
      "hash": "00e166885b16bcce50fea9ea48b6bd79434cb845e8bc93cf356ff787e445088c"
    },
    {
      "owner": "eosio.assert",
      "hash": "aad0ac9f3f3d8f71841d82c52080f99479e869cbde5794208c9cd08e94b7eb0f"
    },
    {
      "owner": "eosio.evm",
      "hash": "9f238b42f5a4be3b7f97861f90d00bbfdae03e707e5209a4c22d70dfbe3bcef7"
    }
  ],
  "more": true,
  "next_key": "6138663584080503808"
}
```

#### get_table_rows 페이징

참고로 이전 명령에는 `"more"` 필드가 다음으로 설정됨 `true`.즉, 테이블에 사용된 필터와 일치하지만 처음 실행된 명령에서 반환되지 않은 행이 더 많습니다.

더 `"next_key"`, `"lower_bound"` 과 `"upper_bound"` 필드, EOS 블록 체인의 모든 테이블에서 데이터의 페이지 매김 또는 반복 검색을 구현하는 데 사용할 수 있습니다.

다음 행 세트를 가져오려면 다른 행을 발행하면 됩니다. `get_table_rows` 요청, 하한을 값이 되도록 수정 `"next_key"` 필드:

```shell
curl --request POST \
--url https://eos.greymass.com/v1/chain/get_table_rows \
--header 'content-type: application/json' \
--data '{
"json": true,
"code": "eosio",
"scope": "eosio",
"table": "abihash",
"lower_bound": "6138663584080503808",
"limit": 3,
"reverse": false
}'
```

또는 를 사용하여 동일한 명령을 실행할 수 있습니다. `cleos` 유틸리티 도구이며 결과가 동일합니다.

```shell
dune -- cleos -u https://eos.greymass.com get table eosio eosio abihash --lower 6138663584080503808 --limit 3
```

위의 명령은 다음 3개의 행을 반환합니다. `abihash` 생산자 이름 값이 다음보다 큰 테이블 `"6138663584080503808"`.이 프로세스를 반복하여 테이블의 모든 행을 검색할 수 있습니다.

두 번째 요청의 응답에 다음이 포함된 경우 `"more": false`즉, 필터와 일치하는 사용 가능한 행을 모두 가져왔으므로 추가 요청이 필요하지 않습니다.

### get_table_by_scope 함수 사용

의 목적 `get_table_by_scope` 주어진 테이블 이름을 스캔하는 것입니다. `code` 계정, 사용 `scope` 기본 키로.테이블 이름을 이미 알고 있는 경우, 예: `mytable`, 사용할 필요는 없습니다 `get_table_by_scope` 정의한 범위가 무엇인지 알고 싶지 않다면 `mytable` 표.

에서 지원하는 입력 매개변수는 다음과 같습니다. `get_table_by_scope`:

- `"code"`: 테이블을 생성한 스마트 계약의 소유자인 eos 계정 이름.
- `"table"`: 테이블 이름을 나타내는 문자열.
- `"lower_bound"` (선택 사항): 이 필드는 테이블 행을 쿼리할 때 범위의 하한을 지정합니다.범위 값을 기반으로 행을 가져오는 시작점을 결정합니다.스코프의 첫 번째 값이 기본값입니다.
- `"upper_bound"` (선택 사항): 이 필드는 테이블 행을 쿼리할 때 범위의 상한을 지정합니다.범위 값을 기반으로 행 가져오기의 끝점을 결정합니다.기본값은 범위의 마지막 값입니다.
- `"limit"` (선택 사항): 이 필드는 함수에서 반환되는 최대 행 수를 나타냅니다.단일 요청으로 검색되는 행 수를 제어할 수 있습니다.
- `"reverse"` (선택 사항): 만약 `true` 결과는 하한에서 상한까지 역순으로 검색되며 기본값은 `false`.
- `"time_limit_ms"`: (선택 사항) 결과를 검색하는 데 소요되는 최대 시간이며 기본값은 10ms입니다.

다음은 get_table_by_scope 함수에 대한 JSON 페이로드 예제입니다.

```json
{
  "code": "accountname1",
  "table": "tablename",
  "lower_bound": "accountname2",
  "limit": 10,
  "reverse": false,
}
```

위의 예에서:

- 테이블은 계정 소유입니다. `accountname1`, 에 의해 설정 `code` 파라미터.
- 테이블 이름은 `tablename.`, 에 의해 설정 `table` 파라미터.
- 쿼리는 에서 시작됩니다. `accountname2` 범위 값, 에 의해 설정 `lower_bound` 파라미터.
- 함수는 다음과 같이 설정된 최대 10개의 행을 가져옵니다. `limit` 파라미터.
- 검색된 행은 다음과 같이 설정된 오름차순으로 표시됩니다. `reverse` 파라미터.

#### get_table_by_scope 결과

더 `get_table_by_scope` 지정된 범위 내의 테이블에 대한 정보가 포함된 JSON 객체를 반환합니다.반환 JSON에는 다음 필드가 있습니다.

- `"rows"`: 이 필드에는 테이블 배열이 포함되어 있습니다.
- `"more"`: 이 필드는 사용 가능한 결과가 더 있는지 여부를 나타냅니다.true로 설정하면 페이지 매김을 사용하여 가져올 수 있는 추가 행이 있음을 의미합니다.추가 행을 검색하는 방법에 대한 자세한 내용은 이전 섹션을 참조하십시오.

각 테이블 행은 다음 필드를 포함하는 JSON 객체로 표시됩니다.

- `"code"`: 테이블을 소유한 계약의 계정 이름입니다.
- `"scope"`: 테이블이 검색되는 계약 내의 범위입니다.계약 내의 특정 인스턴스 또는 범주를 나타냅니다.
- `"table"`: 계약 ABI에 지정된 테이블의 이름.
- `"payer"`: 행을 저장하는 데 드는 RAM 비용을 부담하는 지불자의 계정 이름입니다.
- `"count"`: 테이블의 행 수에 테이블에서 정의된 인덱스 수 (기본 인덱스 포함) 를 곱한 값입니다.예를 들어 테이블에 기본 인덱스만 정의된 경우 `count` 테이블의 행 수를 나타냅니다. 테이블에 정의된 각 추가 보조 인덱스에 대해 개수는 행 수에 N을 곱한 값입니다. 여기서 N = 1+보조 인덱스 수입니다.

##### 빈 결과

반환된 JSON은 아래와 같을 수 있습니다.

```json
{
    "rows":[],
    "more": "accountname"
}
```

위의 결과는 블록체인 구성에 의해 부과된 트랜잭션 시간 제한으로 인해 요청이 실행을 완료하지 못했음을 의미합니다.결과는 어떤 테이블도 찾지 못했다는 것을 알려줍니다 (`rows` 지정된 필드의 필드 (비어 있음) `lower_bound` 에 `"accountname"` 경계.이 경우 다음과 같이 요청을 다시 실행해야 합니다. `lower_bound` 에서 제공한 값으로 설정 `"more"` 필드 (이 경우) `accountname`.

#### 실제 사례

실제 예를 들어, 이름이 지정된 처음 세 테이블을 나열할 수 있습니다. `accounts` 에 의해 소유된 `eosio.token` 하한 범위에서 시작하는 계정 `eosromania`:

```shell
curl --request POST \
--url https://eos.greymass.com/v1/chain/get_table_by_scope \
--header 'content-type: application/json' \
--data '{
"json": true,
"code": "eosio.token",
"table": "accounts",
"lower_bound": "eosromania",
"upper_bound": "",
"reverse": false,
"limit": "3"
}'
```

결과는 아래와 비슷합니다.

```json
{
  "rows": [
    {
      "code": "eosio.token",
      "scope": "eosromania22",
      "table": "accounts",
      "payer": "tigerchainio",
      "count": 1
    },
    {
      "code": "eosio.token",
      "scope": "eosromaniaro",
      "table": "accounts",
      "payer": "gm3tqmrxhage",
      "count": 1
    },
    {
      "code": "eosio.token",
      "scope": "eosromansev1",
      "table": "accounts",
      "payer": "gateiowallet",
      "count": 1
    }
  ],
  "more": "eosromario11"
}
```


