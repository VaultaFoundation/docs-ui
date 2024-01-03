import React, {useState} from 'react';

import { ethers } from 'ethers';
import styles from './styles.module.css';
import {Button} from "@site/src/components/Shared/Button/Button";

const mainnetDetails = {
    chainId: '0x4571',
    chainName: 'EOS EVM',
    nativeCurrency: {
        name: 'EOS',
        symbol: 'EOS',
        decimals: 18
    },
    rpcUrls:['https://api.evm.eosnetwork.com/'],
    blockExplorerUrls:['https://explorer.evm.eosnetwork.com/'],
    numericalChainId: 17777,
};

const testnetDetails = {
    chainId: '0x3cc5',
    chainName: 'EOS EVM Testnet',
    nativeCurrency: {
        name: 'EOS',
        symbol: 'EOS',
        decimals: 18
    },
    rpcUrls:['https://api.testnet.evm.eosnetwork.com/'],
    blockExplorerUrls:['https://explorer.testnet.evm.eosnetwork.com/'],
    numericalChainId: 15557,
};

export default function LoginMetaMask({ type }: IProps){

    const [selectedNetwork, setSelectedNetwork] = useState(mainnetDetails.chainName);
    const [output, setOutput] = useState("");



    async function login() {

        try {
            // Check if MetaMask is installed
            if (!window.ethereum) {
                alert('MetaMask is not installed');
                return;
            }

            // check if on the right network
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const network = await provider.getNetwork();

            if(network.chainId !== (selectedNetwork === mainnetDetails.chainName ? mainnetDetails.numericalChainId : testnetDetails.numericalChainId)) {
                if(!await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: selectedNetwork === mainnetDetails.chainName ? mainnetDetails.chainId : testnetDetails.chainId,
                        chainName:  selectedNetwork === mainnetDetails.chainName ? mainnetDetails.chainName : testnetDetails.chainName,
                        nativeCurrency: {
                            name: 'EOS',
                            symbol: 'EOS',
                            decimals: 18
                        },
                        rpcUrls: selectedNetwork === mainnetDetails.chainName ? mainnetDetails.rpcUrls : testnetDetails.rpcUrls,
                        blockExplorerUrls: selectedNetwork === mainnetDetails.chainName ? mainnetDetails.blockExplorerUrls : testnetDetails.blockExplorerUrls
                    }]
                }).then(x => true).catch((error) => {
                    console.log('error',error);
                    setOutput(error.message || error);
                    return false;
                })) return;

                // log out all accounts
                await window.ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{
                        eth_accounts: {}
                    }]
                }).then(x => true).catch((error) => {
                    console.log('error',error);
                    setOutput(error.message || error);
                    return false;
                });



            }

            if(!await window.ethereum.request({
                method: 'eth_requestAccounts',
            }).then(x => true).catch((error) => {
                console.log('error',error);
                setOutput(error.message || error);
                return false;
            })) return;



        } catch (error) {
            console.error('Error:', error.message);
            setOutput(error.message || error);
        }
    }

    return (<section>
        <section id="connect-metamask" className="mt-2">
            <label className={"text-xs font-bold"}>Network</label>
            <select className={styles.input} onChange={(e) => setSelectedNetwork(e.target.value)}>
                <option value={mainnetDetails.chainName}>{mainnetDetails.chainName}</option>
                <option value={testnetDetails.chainName}>{testnetDetails.chainName}</option>
            </select>
        </section>

        <Button type={'button'} onClick={() => login()}>Login to MetaMask</Button>
        <section className="mt-2">
            {output}
        </section>
    </section>)

}
