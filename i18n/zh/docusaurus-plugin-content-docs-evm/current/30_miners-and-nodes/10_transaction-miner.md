---
title: 交易矿工
--- 

EOS EVM 交易挖矿器是一个简单的交易中继，它允许您进行以太坊格式的交易和 
将它们推送到 EOS 原生节点上的 EOS EVM 合约。 


## 您的矿工账户

你需要一个 EOS Network 账户作为你的**矿工账户**。 

EOS EVM Miner 软件获取它收到的 EVM 交易并将其转换为 EOS 交易，然后再发送 
到 `eosio.evm` 在原生EOS网络上签订合同。 

作为这些交易的中继，您有机会因所提供的服务而获得奖励。

### 矿工和资源

当你的矿工账户中继交易时，它会慢慢耗尽其 CPU 和 NET 资源。你需要管理这些
确保您的矿机能够继续运行的资源。

诸如PowerUp之类的服务应实现自动化，以确保您的矿工账户有足够的资源来继续运营 
不间断。

>❔ **不需要内存**
> >您的矿工账户在中继交易时不会耗尽 RAM 资源。它只消耗 CPU 和网络资源。
>那个 `eosio.evm` 合约通过从EVM交易中收取的费用来支付EOS EVM使用的RAM。

### 注册您的矿工

拥有矿工账户后，您需要在矿工账户上注册 `eosio.evm` 合同。

```bash
cleos -u https://eos.greymass.com/ push action eosio.evm open '["<your-miner-account>"]' -p <your-miner-account>
```

如果您想使用网页界面进行注册，可以访问 [bloks.io](https://bloks.io/account/eosio.evm?loadContract=true&tab=Actions&account=eosio.evm&scope=eosio.evm&limit=100&action=open)
并使用类似的钱包签署交易 [锚](https://www.greymass.com/anchor)。

### 查看您的挖矿奖励

那个 `eosio.evm` 合约将把你从挖矿中获得的奖励存储在一张桌子里。您可以通过以下方式随时查看这些奖励
从合约中获取表格行 `balances` 将上限和下限设置为您的矿工账户的表格：

```bash
cleos -u https://eos.greymass.com/ get table eosio.evm eosio.evm balances -U <your-miner-account> -L <your-miner-account>
```

您也可以在上查看相同的数据 [bloks.io](https://bloks.io/account/eosio.evm?loadContract=true&tab=Tables&account=eosio.evm&scope=eosio.evm&limit=100&table=balances)


### 提取挖矿奖励

那个 `eosio.evm` 合约将把你从挖矿中获得的奖励存储在一张桌子里。你可以随时提取这些奖励
通过将交易发送到 `eosio.evm` 使用以下操作签订合同：

```bash
cleos -u https://eos.greymass.com/ push action eosio.evm withdraw '["<your-miner-account>", "1.0000 EOS"]' -p <your-miner-account>
```

如果您想使用网络界面进行索赔，可以访问 [bloks.io](https://bloks.io/account/eosio.evm?loadContract=true&tab=Actions&account=eosio.evm&scope=eosio.evm&limit=100&table=balances&action=withdraw)
并使用类似的钱包签署交易 [锚](https://www.greymass.com/anchor)。


## 设置矿机

### 安装

确保你有 `node` 已安装在您的计算机上。 

推荐的版本是 [`18.16.0`] (https://nodejs.org/en/download)，最低版本是 `16.16.0`。

#### 从 GitHub 获取矿机并安装所有依赖项

```bash
git clone https://github.com/eosnetworkfoundation/eos-evm-miner.git
cd eos-evm-miner
yarn
```

#### 您还需要设置环境变量
复制 `.env.example` 文件到 `.env` 并填写环境变量。

| 名称 | 描述 | 默认 |
|---|----------------------------------------------------------------------------------
| `PRIVATE_KEY` | 矿工账户的私钥 | |
| `MINER_ACCOUNT` | EOS 网络上矿工账户的名称 | |
| `RPC_ENDPOINTS` | 要连接的 EOS RPC 端点列表，以逗号分隔 | |
| `PORT` | 监听传入的以太坊交易的端口 | `50305` |
| `LOCK_GAS_PRICE` | 如果设置为 `true`，一旦设定了汽油价格，这个矿工就不会再点击EOS API节点来获得新的汽油价格 | `true`  |




### 开始挖矿

```bash
yarn mine
```

>📄 **日志**：
> >A `logs` 目录是在项目根目录中创建的，其中包含两个日志文件：
>-**error.log**：只有错误日志
>-**combined.log**：其他所有内容





