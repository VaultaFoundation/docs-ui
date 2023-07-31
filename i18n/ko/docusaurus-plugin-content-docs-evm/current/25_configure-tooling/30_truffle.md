---
title: 트러플
---

당신의 것을 수정하세요 `truffle-config.js` 에 EOS EVM을 추가하려면 [트러플](https://www.trufflesuite.com/):

```javascript
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
    networks: {
        eosevm: {
            provider: new HDWalletProvider([process.env.PRIVATE_KEY], "https://api.evm.eosnetwork.com"),
            network_id: 17777,
        },
        eosevm_testnet: {
            provider: new HDWalletProvider([process.env.PRIVATE_KEY], "https://api.testnet.evm.eosnetwork.com"),
            network_id: 15557,
        },
        // ... other networks
    },
    // ... other config
```

### 종속성 설치

설치가 필요할 수 있습니다. `@truffle/hdwallet-provider` 과 `dotenv`:

```bash
npm install @truffle/hdwallet-provider dotenv
// or
yarn add @truffle/hdwallet-provider dotenv
```

