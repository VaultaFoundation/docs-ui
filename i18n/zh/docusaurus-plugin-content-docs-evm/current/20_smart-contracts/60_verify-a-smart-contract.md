---
title: 验证智能合约
---

为了验证您的智能合约，您必须知道您的：

-智能合约地址
-编译已部署合约时使用的编译器版本
-EVM 版本
-Solidity 扁平化了智能合约的源代码

## 前往验证页面

复制此 URL 并替换 `SMART_CONTRACT_ADDRESS` 使用您的智能合约地址：

```https://explorer.evm.eosnetwork.com/address/SMART_CONTRACT_ADDRESS/verify-via-flattened-code/new
```

将其粘贴到浏览器中，您应该会看到以下页面：

![验证智能合约](/images/verify_contract.png)

## 完成验证流程

1.填写所有字段
3.复制并粘贴 solidity 合约（扁平化；意思是没有导入的单个文件）源代码
4.点击 `Verify & Push` 按钮
