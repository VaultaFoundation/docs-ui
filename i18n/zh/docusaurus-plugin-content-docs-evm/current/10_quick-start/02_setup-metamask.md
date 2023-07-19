---
title: 设置 MetaMask
---

从 “@site /src/components/connectmetamask/connectMetamask” 导入 connectMetaMask”；

点击这两个按钮即可立即将 EOS EVM 添加到您的 MetaMask。

<ConnectMetaMask />


## 手动添加

如果你使用的钱包不支持 `wallet_addEthereumChain` 协议，你可以添加网络
使用以下信息手动操作。


### 主网

* `Network Name`: EOS EVM
* `Chain ID`: 17777
* `New RPC URL`: https://api.evm.eosnetwork.com/
* `Currency Symbol`: EOS
* `Block Explorer URL (Optional)`: https://explorer.evm.eosnetwork.com/
* `Token Bridge`: https://bridge.evm.eosnetwork.com/

### 测试网

* `Network Name`: EOS EVM 测试网
* `Chain ID`: 15557
* `New RPC URL`: https://api.testnet.evm.eosnetwork.com/
* `Currency Symbol`: EOS
* `Block Explorer URL (Optional)`: https://explorer.testnet.evm.eosnetwork.com/
* `Token Bridge`: https://bridge.testnet.evm.eosnetwork.com/

