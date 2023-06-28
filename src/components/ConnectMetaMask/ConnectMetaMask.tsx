import React from 'react';

import styles from './styles.module.css';
import {Button} from "@site/src/components/Shared/Button/Button";

const addNetwork = (chainId, chainName, rpcUrls, blockExplorerUrls) => {
    return window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId,
            chainName,
            nativeCurrency: {
                name: 'EOS',
                symbol: 'EOS',
                decimals: 18
            },
            rpcUrls,
            blockExplorerUrls
        }]
    }).catch(err => {
        console.error(err);
    })
}

const addMainnet = () => {
    return addNetwork(
        '0x4571',
        'EOS EVM',
        ['https://api.evm.eosnetwork.com/'],
        ['https://explorer.evm.eosnetwork.com/']
    );
}

const addTestnet = () => {
    return addNetwork(
        '0x3cc5',
        'EOS EVM Testnet',
        ['https://api.testnet.evm.eosnetwork.com/'],
        ['https://explorer.testnet.evm.eosnetwork.com/']
    );
}

export default function FaucetTokens(){
    return (
        <section className={styles.connectMetamask}>
            <Button type={'button'} onClick={() => addMainnet()}>Add Mainnet</Button>
            <br />
            <Button type={'button'} onClick={() => addTestnet()}>Add Testnet</Button>
        </section>
    )
}
