---
title: 状态数据
---

智能合约中有两种类型的数据：状态数据和瞬态数据。状态数据是存储在
区块链，并且是持久性的。瞬态数据是指在事务执行期间存储的数据，而不是
持久。交易结束的那一刻，瞬态数据就消失了。

在区块链上存储数据有两个部分：模型和表。模型就是你的数据结构
将存储，而表是存放数据的容器。有几种不同类型的表格，每种都有
一个有自己的用例。

## 数据模型

模型是您将存储在 EOS++ 表中的数据结构。它是一个可序列化的 C++ 结构，可以包含 
任何也可以序列化的数据类型。所有常见的数据类型都是可序列化的，您也可以创建自己的数据类型
可序列化的数据类型，例如其他以 `TABLE` 关键字。

```cpp
TABLE UserModel {
    uint64_t id;
    name eos_account;
    
    uint64_t primary_key() const { return id; }
};
```

定义模型与定义 C++ 结构非常相似，但有一些区别。第一个区别是你
必须使用 `TABLE` 用关键字代替 `struct` 关键字。第二个区别是你必须定义一个 `primary_key`
返回 a 的函数 `uint64_t`。此函数用于确定表的主键，该主键用于
为表编制索引。

可以把它想象成一个 NoSQL 数据库，其中主键是表的索引。主键用于
确定数据在表中的位置，并用于轻松高效地从表中检索数据。

### 主键数据类型

主键**必须**是 `uint64_t` （你也可以使用 `name.value`)，并且该表中每一行都必须是唯一的。这意味着你不能
有两行具有相同主键。如果需要有多行具有相同主键，则可以使用
二级索引。

### 次要密钥数据类型

二级索引比主键更灵活，可以是以下任何一种数据类型：

- `uint64_t`
- `uint128_t`
- `double`
- `long double`
- `checksum256`

它们也可以包含重复值，这意味着您可以使用相同的辅助键拥有多行。

>💰 **成本注意事项**
> >每个索引每行消耗 RAM，因此只有在需要时才使用二级索引。如果你不需要查询表
>通过某个字段，则不应为该字段创建索引。

## 付款人和范围

在我们深入研究如何在表中存储数据之前，我们需要先谈一谈 `scope` 和 `payer`。

### RAM Payer

RAM 付款人是支付用于存储数据的 RAM 的账户。这要么是那个账户
正在调用合约，或者调用合约本身。这有时在很大程度上依赖于博弈论，而且可能很复杂
决定。现在，您只需要使用合约本身作为RAM付款人。

您也不能拥有不属于交易授权的账户，为RAM付费。

>💰 **当心 RAM **
>>RAM 是 EOS 区块链上的有限资源，你应该谨慎考虑允许其他人使用多少 RAM
>你的合同。通常最好让用户为 RAM 付费，但这需要你为他们制定激励措施
>花费自己的 RAM 来换取被认为等值或更高价值的东西。


### 作用域

表的范围是进一步隔离表中数据的一种方法。它是一个 `uint64_t` 用来确定
数据存储在哪个 _bucket_ 中。

如果我们把数据库想象成一个 `JSON` 对象，它可能看起来像这样：

```json title="tables.json"
{
    "users": {
        1: [
            {
                "id": 1,
                "eos_account": "bob"
            },
            {
                "id": 2,
                "eos_account": "sally"
            }
        ],
        2: [
            {
                "id": 1,
                "eos_account": "joe"
            }
        ]
    }
}
```

如上所示，您可以在不同的作用域中使用相同的主键，而不会发生冲突。这在各种不同情况下都很有用：
-如果你想存储每个用户的数据
-如果你想存储每个游戏实例的数据
-如果你想存储每个用户库存的数据
-等等


## 多索引表

多索引表是在 EOS 区块链上存储数据的最常用方式。它是一个持久的键值存储
可以通过多种方式建立索引，但始终具有主键。回到 NoSQL 数据库的类比，你可以想
将多索引表视为文档的集合，而每个索引是从集合中查询或获取数据的不同方式。

### 定义表

要创建多索引表，必须使用至少一个主键定义一个模型。然后，您可以创建多索引
使用以下方法的表 `multi_index` 模板，然后传入表/集合的名称和要使用的模型。

```cpp
TABLE UserModel ...

using users_table = multi_index<"users"_n, UserModel>;
```

这将创建一个名为的表 `users` 它使用 `UserModel` 模型。然后，您可以使用此表来存储和检索
来自区块链的数据。


### 实例化表

要对表执行任何操作，必须先对其进行实例化。为此，您必须传入拥有该表的合约，
以及你要使用的范围。

```cpp
ACTION test() {
    name thisContract = get_self();
    users_table users(thisContract, thisContract.value);
```


### 插入数据

现在您已经引用了实例化表，可以向其中插入数据。为此，你可以使用 `emplace`
函数，它采用一个 lambda/anonymous 函数，该函数接受对要插入的模型的引用。

```cpp
...

name ramPayer = thisContract;
users.emplace(ramPayer, [&](auto& row) {
    row.id = 1;
    row.eos_account = name("eosio");
});
```

也可以先定义一个模型，然后将其插入到整行中。

```cpp
UserModel user = {
    .id = 1,
    .eos_account = name("eosio")
};

users.emplace(ramPayer, [&](auto& row) {
    row = user;
});
```

### 检索数据

要从表中检索数据，您将使用 `find` 表上的方法，它采用该行的主键
你想找回。这将返回该行的迭代器（引用）。

```cpp
auto iterator = users.find(1);
```

你需要检查你是否真的找到了该行，因为如果你没有，那么迭代器将等于 `end` 迭代器，
这是一个特殊的迭代器，代表表的结尾。

```cpp
if (iterator != users.end()) {
    // You found the row
}
```

然后，您可以通过两种方式访问行中的数据。第一种方法是使用 `->` 操作员，它会给你
指向行数据的指针，第二种方法是使用 `*` 运算符，它将为您提供该行的原始数据。

```cpp
UserModel user = *iterator;
uint64_t idFromRaw = user.id;
uint64_t idFromRef = iterator->id;
```


### 修改数据

如果你想打电话 `emplace` 两次你会因为主键已经存在而出错。修改数据
在表中，必须使用 `modify` 方法，它引用你想要修改的迭代器、RAM 支付者，
还有一个允许我们修改数据的 lambda/匿名函数。

```cpp
users.modify(iterator, same_payer, [&](auto& row) {
    row.eos_account = name("foobar");
});
```

>❔ **什么是 same_payer **
> >那个 `same_payer` 变量是一个特殊变量，用于指示 RAM 付款人应与 RAM 支付者相同
>原始 RAM 付款人。当你想修改表中的数据，但你没有原始 RAM 付款人时，这很有用
>授权。当你想修改自己插入的合约表中的数据时，通常会出现这种情况 
>使用其他用户的 RAM。您将无法向数据添加任何字段，但如果您只修改现有字段
>那么内存使用量就没有增量了，因此无需支付任何额外的 RAM 费用或退还任何剩余的 RAM。


### 移除数据

要从表中移除数据，必须使用 `erase` 方法，它引用要删除的迭代器。

```cpp
users.erase(iterator);
```


### 使用二级索引

使用二级索引将允许您以不同的方式查询表。例如，如果你想查询你的
旁边的桌子 `eos_account` 字段，则需要在该字段上创建二级索引。

#### 重新定义我们的模型和表格

要使用二级索引，必须先在模型中对其进行定义。要做到这一点，请使用 `indexed_by` 模板，然后传递
在索引的名称中，以及索引的类型。

```cpp
TABLE UserModel {
    uint64_t id;
    name eos_account;

    uint64_t primary_key() const { return id; }
    uint64_t account_index() const { return eos_account.value; }
};

using users_table = multi_index<"users"_n, UserModel,
    indexed_by<"byaccount"_n, const_mem_fun<UserModel, uint64_t, &UserModel::account_index>>
>;
```

那个 `indexed_by` 模板可能有点混乱，所以让我们分解一下。

```cpp
indexed_by<
    <name_of_index>,
    const_mem_fun<
        <model_to_use>, 
        <index_type>,
        <pointer_to_index_function>
    >
>
```

那个 `name_of_index` 是您要使用的索引的名称。这可以是任何东西，但最好用点东西
这描述了索引的用途。

那个 `model_to_use` 是您要用于索引的模型。这通常与您使用的模型相同
桌子，但不一定是。如果你想为索引使用不同的模型，但仍然想要，这很有用
以便能够访问表中的数据。

那个 `index_type` 是索引的类型，仅限于我们前面讨论的类型。

那个 `pointer_to_index_function` 是一个指向函数的指针，该函数返回要用于索引的值。这个
函数必须是 `const_mem_fun` 函数，并且必须是用于索引的模型的成员函数。

#### 使用二级索引

现在您有了二级索引，您可以使用它来查询您的表。为此，首先从表中获取索引，然后
然后使用 `find` 在索引上使用方法，而不是直接在表上使用它。

```cpp
auto index = users.get_index<"byaccount"_n>();
auto iterator = index.find(name("eosio").value);
```

要使用二级索引修改表中的数据，可以使用 `modify` 索引上的方法，而不是使用它
直接放在桌子上。

```cpp
index.modify(iterator, same_payer, [&](auto& row) {
    row.eos_account = name("foobar");
});
```

## Singleton 表

A `singleton` table 是一种特殊类型的表，每个作用域只能有一行。这对于存储以下数据很有用
你只想拥有一个实例，比如配置或玩家的物品栏。

a之间的主要区别 `singleton` 表和多索引表是：
-单例不需要模型上的主键
-Singleton 可以存储任何类型的数据，而不仅仅是预定义的模型

### 定义表

要定义单例表，可以使用 `singleton` 模板，然后传入表的名称和类型
您要存储的数据。

您还必须导入 `singleton.hpp` 头文件。

```cpp
#include <eosio/singleton.hpp>

TABLE ConfigModel {
    bool is_active;
};

using config_table = singleton<"config"_n, ConfigModel>;

using is_active_table = singleton<"isactive"_n, bool>;
```

那个 `singleton` 模板等同于 `multi_index` 模板，唯一的不同是它不支持二级索引。

您已经定义了一个用于存储 `ConfigModel`，还有另一张存储 a 的表 `bool`。两张桌子都有 
完全相同的数据，但是 `bool` table 效率更高，因为它不需要存储增加的开销，即
由于 `ConfigModel` 结构。

### 实例化表

就像 `multi_index` table，必须先实例化该表，然后才能使用它。

```cpp
name thisContract = get_self();
config_table configs(thisContract, thisContract.value);
```

那个 `singleton` table 在其构造函数中采用两个参数。第一个参数是表格所在的合约
归所有，第二个参数是 `scope`。

### 获取数据

有几种方法可以从中获取数据 `singleton`。 

#### 要么获得，要么失败

如果没有现有数据，这将在运行时出错。
为了防止这种情况，你可以使用 `exists` 检查是否存在数据的方法。

```cpp
if (!configs.exists()) {
    // handle error
}
ConfigModel config = configs.get();
bool isActive = config.is_active;
```

#### 获取或默认

这将返回默认值，但**不会**保留该值。

```cpp
ConfigModel config = configs.get_or_default(ConfigModel{
  .is_active = true
});
```

#### 获取或创建

这将返回默认值，并且**将**保留该值。

```cpp
ConfigModel config = configs.get_or_create(ConfigModel{
  .is_active = true
});
```

### 设置数据

将数据保存在 `singleton`，你可以使用 `set` 方法，它引用要设置的数据。

```cpp
configs.set(ConfigModel{
    .is_active = true
}, ramPayer);
```

### 移除数据

一旦你实例化了一个 `singleton`，很容易将其移除。刚刚打电话给 `remove` 实例本身上的方法。

```cpp
configs.remove();
```


