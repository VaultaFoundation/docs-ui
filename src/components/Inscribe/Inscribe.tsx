import React, {useState} from 'react';

import { ethers } from 'ethers';
import styles from './styles.module.css';
import {Button} from "@site/src/components/Shared/Button/Button";

enum TYPES {
    deploy = "deploy",
    mint = "mint",
    transfer = "transfer",
}

interface IProps {
    type: TYPES;
}

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

export default function FaucetTokens({ type }: IProps){

    const [selectedNetwork, setSelectedNetwork] = useState(mainnetDetails.chainName);


    const [to, setTo] = useState("");
    const [output, setOutput] = useState("");
    const [hash, setHash] = useState("");

    const [tick, setTick] = useState("orcs");
    const [amt, setAmt] = useState(0);
    const [max, setMax] = useState(420420);
    const [lim, setLim] = useState(69);


    async function inscribe() {
        if(!to) return setOutput("Please enter an address");

        let json = {
            "p": "eorc-20",
            "op": type,
            tick
        };

        if(type === TYPES.deploy) {
            json.lim = lim.toString();
            json.max = max.toString();
        }

        if(type === TYPES.mint || type === TYPES.transfer) {
            json.amt = amt.toString();
        }


        try {
            setOutput("");
            // Check if MetaMask is installed
            if (!window.ethereum) {
                alert('MetaMask is not installed');
                return;
            }

            // check if on the right network
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const network = await provider.getNetwork();
            console.log('network', network);

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

                //
                // if(!await window.ethereum.request({
                //     method: 'wallet_switchEthereumChain',
                //     params: [{ chainId: selectedNetwork === mainnetDetails.chainName ? mainnetDetails.chainId : testnetDetails.chainId }]
                // }).then(x => true).catch((error) => {
                //     console.log('error',error);
                //     setOutput(error.message || error);
                //     return false;
                // })) return;

                if(!await window.ethereum.request({
                    method: 'eth_requestAccounts',
                }).then(x => true).catch((error) => {
                    console.log('error',error);
                    setOutput(error.message || error);
                    return false;
                })) return;
            }



            const utfBytes = ethers.utils.toUtf8Bytes(JSON.stringify(json));
            const hexData = ethers.utils.hexlify(utfBytes);

            console.log('selected', window.ethereum.selectedAddress);

            const tx = {
                to,
                value: 0,
                data: hexData
            };

            // signer.sendTransaction(tx).then((txHash) => {
            //     console.log(txHash);
            //     setOutput(txHash.hash);
            // }).catch((error) => {
            //     console.log('error',error);
            //     setOutput(error.message || error);
            // });

            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    to: to,
                    from: window.ethereum.selectedAddress,
                    value: "0x0",
                    data: hexData,
                }],
            }).then((txHash) => {
                console.log('txhash', txHash);
                setOutput("Inscription sent!");
                setHash(txHash);
            }).catch((error) => {
                console.log('error',error);
                setOutput(error.message || error);
            });

        } catch (error) {
            console.error('Error:', error.message);
            setOutput(error.message || error);
        }
    }

    const networkSelector = (
        <section className="mt-2">
            <label className={"text-xs font-bold"}>Network</label>
            <select className={styles.input} onChange={(e) => setSelectedNetwork(e.target.value)}>
                <option value={mainnetDetails.chainName}>{mainnetDetails.chainName}</option>
                <option value={testnetDetails.chainName}>{testnetDetails.chainName}</option>
            </select>
        </section>
    )

    const buttonElem = (buttonText) => <Button type={'button'} onClick={() => inscribe()}>{buttonText}</Button>;
    const outputElem = (<section className="mt-2">
        {output}
    </section>);
    const hashElem = (<section className="mt-2">
        {!!hash.length && (<a target="_blank" href={`${selectedNetwork === mainnetDetails.chainName ? mainnetDetails.blockExplorerUrls[0] : testnetDetails.blockExplorerUrls[0]}tx/${hash}`}>
            {hash}
        </a>)}
    </section>);
    const inputElem = (label, placeholder, value, setter) => (
        <section>
            <label className={"text-xs font-bold"}>{label}</label>
            <input placeholder={placeholder} className={styles.input} type="text" value={value} onChange={(e) => setter(e.target.value)} />
        </section>
    )

    if(type === TYPES.deploy) {
        return (<section>
            {networkSelector}
            {inputElem("Inscription Address", "Address (0x...)", to, setTo)}
            {inputElem("Token Symbol", "Symbol", tick, setTick)}
            {inputElem("Maximum Supply", "420420", max, setMax)}
            {inputElem("Mint Limit", "69", lim, setLim)}

            {buttonElem("Send Deploy Inscription")}

            {outputElem}
            {hashElem}
        </section>);
    }

    if(type === TYPES.mint) {
        return (<section>
            {networkSelector}
            {inputElem("Inscription Address", "Address (0x...)", to, setTo)}
            {inputElem("Token Symbol", "Symbol", tick, setTick)}
            {inputElem("Amount to Mint", "420420", amt, setAmt)}

            {buttonElem("Send Mint Inscription")}

            {outputElem}
            {hashElem}
        </section>);
    }

    if(type === TYPES.transfer) {
        return (<section>
            {networkSelector}
            {inputElem("Inscription Address", "Address (0x...)", to, setTo)}
            {inputElem("Token Symbol", "Symbol", tick, setTick)}
            {inputElem("Amount to Transfer", "420420", amt, setAmt)}

            {buttonElem("Send Transfer Inscription")}

            {outputElem}
            {hashElem}
        </section>);
    }
}
