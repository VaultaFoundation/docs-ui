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

    const [loggedInWith, setLoggedInWith] = useState("");


    const checkAccounts = async () => {
        const accounts = await ethereum.request({method: 'eth_accounts'});
        const network = await ethereum.request({method: 'net_version'});
        if(accounts.length) {
            if(![mainnetDetails.numericalChainId, testnetDetails.numericalChainId].includes(parseInt(network))) {
                setLoggedInWith("");
                return;
            }
            setOutput(`Logged in with ${accounts[0]} on ${network === mainnetDetails.numericalChainId ? mainnetDetails.chainName : testnetDetails.chainName}`);
            setLoggedInWith(accounts[0]);
        } else {
            setOutput(`Not logged in`);
            setLoggedInWith("");
        }
    }

    if(window.ethereum){
        checkAccounts();
        window.ethereum.on('accountsChanged', function () {
            checkAccounts();
        });
    }


    async function login() {

        try {
            if (!window.ethereum) {
                alert('MetaMask is not installed');
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();

            if(!(await window.ethereum.request({
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
            }))) return;

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            // log out all accounts if any are logged in
            if(!accounts || accounts.length) {
                await window.ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{
                        eth_accounts: {}
                    }]
                }).then(x => true).catch((error) => {
                    console.log('error', error);
                    setOutput(error.message || error);
                    return false;
                });
            }

            if(!(await window.ethereum.request({
                method: 'eth_requestAccounts',
            }).then(x => true).catch((error) => {
                console.log('error',error);
                setOutput(error.message || error);
                return false;
            }))) return;



        } catch (error) {
            console.error('Error:', error.message);
            setOutput(error.message || error);
        }
    }

    if(loggedInWith) return (<section>
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
    </section>);

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
