---
title: 变量
---

定义变量是任何编程语言的基本组成部分。在本节中，我们将看看
您可以在EOS智能合约中定义的不同类型的变量。

C++ 支持多种数据类型。EOS++ 使用特定于 EOS 的类型扩展了类型集。

## 定义变量

变量的定义方式与 C++ 中的定义方式相同。

```cpp
function main() {
    // <type> <name> = <value>;
    int a = 5;
}
```


## 基本类型

这些是 C++ 内置的基本类型。你以前可能使用过这种类型的某种形式
在你使用过的其他编程语言中。

除非另有说明，否则以下类型是从 `<eosio/eosio.hpp>` 标题。

```cpp
#include <eosio/eosio.hpp>
```

### 整数类型

整数类型用于表示整数。它们可以是有符号的（正数或负数），也可以是无符号的（仅限正数）。


| 整数类型 | 描述 |
|--------------------|
| `bool`                 | 布尔值（真/假）|
| `int8_t`               | 有符号的 8 位整数 |
| `int16_t`              | 有符号的 16 位整数 |
| `int32_t`              | 有符号的 32 位整数 |
| `int64_t`              | 有符号的 64 位整数 |
| `int128_t`             | 有符号的 128 位整数 |
| `uint8_t`              | 无符号 8 位整数 |
| `uint16_t`             | 无符号 16 位整数 |
| `uint32_t`             | 32 位无符号整数 |
| `uint64_t`             | 无符号 64 位整数 |
| `uint128_t`            | 无符号 128 位整数 |

#### 必填标题

```cpp
#include <eosio/varint.hpp>
```

| 整数类型 | 描述 |
|--------------------|
| `signed_int`           | 可变长度有符号 32 位整数 |
| `unsigned_int`         | 可变长度无符号 32 位整数 |


### 浮点类型

浮点类型用于表示十进制数。

>⚠ **警告**
> >浮点类型并不精确。它们不适合存储货币价值，而且通常是
>存储其他类型的数据也有问题。请谨慎使用它们，尤其是在处理时
>区块链。

| 浮动类型 | 描述 |
|---|---|
| `float` | 32 位浮点数 |
| `double` | 64 位浮点数 |

### 字节类型

字节类型用于表示原始字节序列，例如二进制数据/字符串。

| Blob 类型 | 描述 |
|---|---|
| `bytes` | 原始字节序列 |
| `string` | 字符串 |

### 时间类型

时间类型用于表示时间，特别是与区块相关的时间。

| 时间类型 | 描述 |
|---|------------------------------
| `time_point` | 以微秒为单位的时间点 |
| `time_point_sec` | 时间点（以秒为单位）|
| `block_timestamp_type` | 区块时间戳 |


### 哈希类型

哈希类型用于表示加密哈希，例如 SHA-256。

| 校验和类型 | 描述 |
|---|---|
| `checksum160` | 160 位校验和 |
| `checksum256` | 256 位校验和 |
| `checksum512` | 512 位校验和 |

## 自定义类型

这些是 EOS++ 内置的自定义类型。您可能会经常在EOS智能合约中使用其中一些类型。

### 名称类型

那个 `name` type 用于表示账户名称。它是 64 位整数，但显示为字符串。

各种系统函数都需要将名称作为参数。

有三种方法可以将字符串转换为名称：
- `name{"string"}`
- `name("string")`
- `"string"_n`

如果你想获得 `uint64_t` 名称的值，可以使用 `value` 方法。

```cpp
name a = name("hello");
uint64_t b = a.value;
```

### 密钥和签名类型

那个 `public_key` 和 `signature` 类型用于表示加密密钥和签名，并且是
也是 EOS++ 特定的类型。

#### 必填标题

```cpp
#include <eosio/crypto.hpp>
```

#### 从签名中恢复密钥

```cpp
function recover(checksum256 hash, signature sig) {
    public_key recovered_key = recover_key(hash, sig);
}
```

### 资产类型

那个 `asset` type 用于表示数字资产的数量。它是一个带符号的 64 位整数，但显示为字符串。

它具有抗溢出和下溢的能力，并且具有多种方法可以轻松执行算术运算。

#### 必填标题

```cpp
#include <eosio/asset.hpp>
```

| 资产类型 | 描述 |
|---|---|
| `symbol` | 资产符号 |
| `symbol_code` | 资产符号代码 |
| `asset` | 资产 |

#### 创建资产

资产分为两部分：数量和符号。数量为 64 位整数，符号为
是字符串和精度的组合。

```cpp
// symbol(<symbol (string)>, <precision (1-18)>)
symbol mySymbol = symbol("TKN", 4);

// asset(<quantity (int64_t)>, <symbol>)
asset myAsset = asset(1'0000, mySymbol);
```

#### 执行算术运算

您可以轻松地对资产进行算术运算。

```cpp
asset a = asset(1'0000, symbol("TKN", 4));
asset b = asset(2'0000, symbol("TKN", 4));

asset c = a + b; // 3'0000 TKN
asset d = a - b; // -1'0000 TKN
asset e = a * 2; // 2'0000 TKN
asset f = a / 2; // 0'5000 TKN
```

>？？**符号匹配**
> >对具有不同符号的资产进行算术运算会引发错误，但仅限于运行时。确保 
>您总是使用相同符号对资产进行操作。

#### 资产方法

您可以使用将资源转换为字符串 `to_string` 方法。

```cpp
std::string result = a.to_string(); // "1.0000 TKN"
```

您也可以使用以下方法获取资产的数量和符号 `amount` 和 `symbol` 方法。

```cpp
int64_t quantity = a.amount; // 1'0000
symbol sym = a.symbol; // symbol("TKN", 4)
```

使用资产时，您始终需要确保其有效（金额在范围内）。

```cpp
bool valid = a.is_valid();
```


#### 符号方法

您可以使用将符号转换为字符串 `to_string` 方法。

```cpp
std::string result = mySymbol.to_string(); // "4,TKN"
```

你也可以得到未加工的 `uint64_t` 使用符号的值 `value` 方法。

```cpp
uint64_t value = mySymbol.value;
```

单独使用符号时，您始终需要确保其有效。**但是，在使用资产时，它已经检查了 
符号本身的有效性 `is_valid` 方法。**

```cpp
bool valid = mySymbol.is_valid();
```


## 结构

结构用于表示复杂数据。它们与类类似，但更简单、更轻便。想一想
`JSON` 对象。

你可以在 EOS++ 中使用它们，但如果你将它们存储在表中，你应该使用 `TABLE` 我们将在中讨论的关键字 
[下一节](/docs/03_smart-contracts/04_state-data.md).

```cpp
struct myStruct {
    uint64_t id;
};
```
