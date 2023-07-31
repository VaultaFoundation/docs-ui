---
title: 雷丁州
---

## 先决条件

要遵循本指南，您需要：

-对EOS区块链及其运作方式的了解。
-用于运行 curl 命令的命令行界面。
-访问 EOS 节点或 EOS API 服务。

## EOS 桌子

EOS 将数据存储在表中，这与数据库表类似。每个表都有一个名称和一组字段。表按作用域进行组织，这些作用域由创建表的智能合约定义。

要从表中检索数据，您需要知道表的名称、范围以及创建该表的智能合约的名称。您还可以指定下限和上限，以限制返回的数据量。

## 从 EOS 表中检索数据的方法

### 使用 get_table_rows 函数

那个 `get_table_rows` 函数从表中检索行。它采用 JSON 格式的以下参数：

- `"code"`: eos 账户名，是创建表的智能合约的所有者。
- `"scope"`: 表的范围，它是 eos 账户名。
- `"table"`: 表示表名的字符串。
- `"json"`:（可选）一个布尔值，它指定是以 JSON 格式还是二进制格式返回行结果，默认为二进制。
- `"lower_bound"`:（可选）表示表键下限的字符串，默认为所用索引的第一个值。
- `"upper_bound"`:（可选）表示表键上限的字符串，默认为所用索引的最后一个值。
- `"index_position"`:（可选）如果表有多个索引，则要使用的索引位置，可接受的值为 `primary`, `secondary`, `tertiary`, `fourth`, `fifth`, `sixth`, `seventh`, `eighth`, `ninth` , `tenth`，默认为 `primary`.
- `"key_type"`:（可选）表示表键类型的字符串，支持的值 `i64`, `i128`, `i256`, `float64`, `float128`, `sha256`, `ripemd160`, `name`.
- `"encode_type"`:（可选）一个表示 key_type 参数编码类型的字符串，要么 `dec` 要么 `hex`，默认为 `dec`.
- `"limit"`: 限制返回的结果数，默认为 10。
- `"time_limit_ms"`:（可选）检索结果应花费的最大时间，默认为 10 毫秒。
- `"reverse"`:（选项）如果 `true` 结果按相反的顺序检索，从 lower_bound 向上到 upper_bound，默认为 `false`。

以下是从中检索行的示例 `abihash` 表，归所有 `eosio` 账户并拥有 `scope` 这 `eosio` 名称。

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

在上面的例子中：

-行值以 JSON 形式返回，由 `json` 参数。
-该桌子归账户所有 `eosio`，由 `code` 参数。
-表格范围是 `eosio`，由 `scope` 参数。
-表名是 `abihash.`，由 `table` 参数。
-查询使用主索引来搜索行，并从 `eosio` 下限索引值，由 `lower_bound` 参数。
-该函数最多将获取 3 行，由以下设置 `limit` 参数。
-检索到的行将按升序排列，由 `reverse` 参数。

或者，您可以使用执行相同的命令 `cleos` 实用工具，结果相同：

```shell
dune -- cleos -u https://eos.greymass.com get table eosio eosio abihash --lower eosio --limit 3
```

#### get_table_rows 结果

返回的 JSON `get_table_rows` 具有以下结构：

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

那个 `"rows"` 字段是 JSON 表示形式的表行对象数组。
那个 `"more"` 字段表示除了返回的行数之外还有其他行。
那个 `"next_key"` 字段包含在下一个检索下一组行的请求中用作下界的密钥。

例如，上一节命令的结果包含三行，看起来与以下内容类似：

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

#### get_table_rows 分页

请注意，前面的命令有 `"more"` 字段设置为 `true`。这意味着表中有更多与使用的过滤器相匹配的行，这些行没有在第一个发出的命令中返回。

那个 `"next_key"`, `"lower_bound"` 和 `"upper_bound"` 字段，可用于实现对EOS区块链中任何表的数据进行分页或迭代检索。

要获取下一组行，你可以发出另一组行 `get_table_rows` 请求，将下限修改为的值 `"next_key"` 字段:

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

或者，您可以使用执行相同的命令 `cleos` 实用工具，结果相同：

```shell
dune -- cleos -u https://eos.greymass.com get table eosio eosio abihash --lower 6138663584080503808 --limit 3
```

上面的命令返回后面的 3 行 `abihash` 生产者名称值大于的表 `"6138663584080503808"`。通过迭代此过程，您可以检索表中的所有行。

如果第二个请求的响应包括 `"more": false`，这意味着您已经获取了与筛选器匹配的所有可用行，无需进一步请求。

### 使用 get_table_by_scope 函数

的目的 `get_table_by_scope` 是扫描给定值下的表名 `code` 账户，使用 `scope` 作为主键。如果你已经知道表名，例如 `mytable`，没有必要使用 `get_table_by_scope` 除非你想找出定义了哪些作用域 `mytable` 桌子。

以下是支持的输入参数 `get_table_by_scope`:

- `"code"`: eos 账户名，是创建表的智能合约的所有者。
- `"table"`: 表示表名的字符串。
- `"lower_bound"` （可选）：此字段指定查询表行时范围的下限。它根据作用域值确定读取行的起点。默认为作用域的第一个值。
- `"upper_bound"` （可选）：此字段指定查询表行时范围的上限。它根据作用域值确定读取行的终点。默认为作用域的最后一个值。
- `"limit"` （可选）：此字段表示函数中要返回的最大行数。它允许您控制在单个请求中检索到的行数。
- `"reverse"` （可选）：如果 `true` 结果按相反的顺序检索，从 lower_bound 向上到 upper_bound，默认为 `false`.
- `"time_limit_ms"`:（可选）检索结果应花费的最大时间，默认为 10 毫秒。

以下是 get_table_by_scope 函数的 JSON 有效载荷示例：

```json
{
  "code": "accountname1",
  "table": "tablename",
  "lower_bound": "accountname2",
  "limit": 10,
  "reverse": false,
}
```

在上面的例子中：

-该桌子归账户所有 `accountname1`，由 `code` 参数。
-表名是 `tablename.`，由 `table` 参数。
-查询从 `accountname2` 作用域值，由 `lower_bound` 参数。
-该函数将最多读取 10 行，由以下设置 `limit` 参数。
-检索到的行将按升序排列，由 `reverse` 参数。

#### get_table_by_scope 结果

那个 `get_table_by_scope` 返回一个 JSON 对象，其中包含有关指定范围内表的信息。返回的 JSON 包含以下字段：

- `"rows"`：此字段包含表数组。
- `"more"`：此字段表示是否有更多结果可用。如果将其设置为 true，则表示可以使用分页读取其他行。有关如何检索其他行的更多详细信息，请参阅上一节。

每个表行都由一个 JSON 对象表示，该对象包含以下字段：

- `"code"`：拥有该表的合约的账户名。
- `"scope"`：在合同中找到该表的范围。它代表合同中的特定实例或类别。
- `"table"`：由合约 ABI 指定的表的名称。
- `"payer"`：支付存储行的 RAM 成本的付款人的账户名。
- `"count"`：表中的行数乘以表定义的索引数（包括主索引）。例如，如果该表只定义了主索引，那么 `count` 表示表中的行数；对于为表定义的每个额外二级索引，计数表示行数乘以 N，其中 N = 1 + 二级索引的数量。

##### 结果为空

返回的 JSON 可能如下所示：

```json
{
    "rows":[],
    "more": "accountname"
}
```

上述结果意味着由于区块链配置施加的交易时间限制，您的请求未完成执行。结果告诉你它没有找到任何表 (`rows` 字段为空）来自指定的 `lower_bound` 到 `"accountname"` 绑定。在这种情况下，您必须使用以下命令再次执行请求 `lower_bound` 设置为提供的值 `"more"` 字段，在本例中为 `accountname`。

#### 真实示例

举一个真实的例子，你可以列出前三个名为的表 `accounts` 由... 拥有 `eosio.token` 以下限范围开头的账户 `eosromania`:

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

结果与下图类似：

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


