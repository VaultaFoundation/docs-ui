---
title: 迁移您的智能合约
---

本指南将教你在EOS EVM主网和测试网上使用安全帽将智能合约部署到EOS EVM。

## 设置你的 MetaMask


从 “@site /src/components/connectmetamask/connectMetamask” 导入 connectMetaMask”；

点击这两个按钮即可立即将 EOS EVM 添加到您的 MetaMask。

<ConnectMetaMask />


## 获取 EOS 代币

从 “@site /src/components/faucetTokens/faucetTokens” 导入 faucetTokens；

想要一些EOS代币来玩吗？点击下面的按钮，从测试网水龙头中获取一些。

<FaucetTokens />

如果你在测试网上，你可以使用以下方法获得一些 EOS 代币 [**测试网水龙头**](https://faucet.testnet.evm.eosnetwork.com/)。

如果你在 EOS 主网上，] 你可以使用标准的 EOS 转账来转移你的原生 EOS：
-将代币发送至： `eosio.evm`
-设置 `memo` 到你的 EOS EVM 地址

欲了解更多获取 EOS 代币的方法，请查看 [EVM 代币](/evm/10_quick-start/03_evm-tokens.md) 页面。

## Hardhat 配置

如果你想建立一个新的 hardhat 项目，请前往他们的 [快速入门](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start)
指南。


打开你的 `hardhat.config.js` 文件并添加以下配置：


```javascript
const config: HardhatUserConfig = {
    // ...

    networks: {
        eosevm: {
            url: "https://api.evm.eosnetwork.com",
            accounts:[process.env.PRIVATE_KEY],
        },
        eosevm_testnet: {
            url: "https://api.testnet.evm.eosnetwork.com",
            accounts:[process.env.PRIVATE_KEY],
        }
    }
};
```

>🔑 **私钥**
> >请注意，我们正在使用 `process.env.PRIVATE_KEY` 确保我们的私钥不会在我们的代码中公开。
>这意味着你需要使用类似的东西 `dotenv` 将密钥注入您的环境，
>将其手动添加到您的环境中，或者您可以直接用私钥替换环境变量。
> >但是，请谨慎地将您的实际密钥放入此文件中，因为它可能会提交到公共存储库，
>而且你永远不应该与任何人共享你的私钥。

## 部署你的合约

现在你可以将你的合约部署到 EOS EVM 测试网了：

```bash
npx hardhat run scripts/deploy.js --network eosevm

// or for testnet
npx hardhat run scripts/deploy.js --network eosevm_testnet
```

部署后，您将看到新合约的地址，并通过粘贴即可在资源管理器中查看该合约 
进入搜索字段。

- [**测试网资源管理器**](https://explorer.testnet.evm.eosnetwork.com/)
- [**主网资源管理器**](https://explorer.evm.eosnetwork.com/)

![部署安全帽](/images/deploy_hardhat.png)

## 恭喜你!

您已成功将您的第一个智能合约部署到EOS EVM!🎉

如果你已经有一个可以与你的智能合约交互的前端应用程序，你现在可以把它指向 
[EOS EVM 端点](/evm/999_miscellaneous/10_endpoints.md)，它会按预期工作。

请务必访问 [**兼容性**](/evm/999_miscellaneous/20_evm-compatibility.md) 部分以了解两者之间的区别
EOS EVM 和以太坊，以及如何确保你的 web3 应用程序按预期在 EOS EVM 上运行。
