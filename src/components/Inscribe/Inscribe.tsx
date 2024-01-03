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

export default function Inscribe({ type }: IProps){

    const [to, setTo] = useState("");


    const [output, setOutput] = useState("");
    const [hash, setHash] = useState("");

    const [tick, setTick] = useState("orcs");
    const [amt, setAmt] = useState(0);
    const [max, setMax] = useState(420420);
    const [lim, setLim] = useState(69);


    async function inscribe() {
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

        for(let key in json) {
            if(!json[key].length) {
                setOutput(`Please fill in ${key}`);
                return;
            }
        }


        try {
            setOutput("");

            if (!window.ethereum) {
                alert('MetaMask is not installed');
                return;
            }

            if(!window.ethereum.selectedAddress){
                alert('Please connect your account to MetaMask above');
                document.getElementById("connect-metamask")?.scrollIntoView();
                setTimeout(() => {
                    window.scrollBy(0, -200);
                }, 1);
                return;
            }

            const utfBytes = ethers.utils.toUtf8Bytes(JSON.stringify(json));
            const hexData = ethers.utils.hexlify(utfBytes);

            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    to: type === TYPES.transfer ? to : window.ethereum.selectedAddress,
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

    const buttonElem = (buttonText) => <Button type={'button'} onClick={() => inscribe()}>{buttonText}</Button>;
    const outputElem = (<section className="mt-2">
        {output}
    </section>);
    const hashElem = (<section className="mt-2">
        {!!hash.length && (<a target="_blank" href={`https://explorer.testnet.evm.eosnetwork.com/tx/${hash}`}>
            {hash}
        </a>)}
        {!!hash.length && (<a target="_blank" href={`https://explorer.evm.eosnetwork.com/tx/${hash}`}>
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
            {inputElem("Token Symbol", "Symbol", tick, setTick)}
            {inputElem("Amount to Mint", "420420", amt, setAmt)}

            {buttonElem("Send Mint Inscription")}

            {outputElem}
            {hashElem}
        </section>);
    }

    if(type === TYPES.transfer) {
        return (<section>
            {inputElem("Token Symbol", "Symbol", tick, setTick)}
            {inputElem("Amount to Transfer", "420420", amt, setAmt)}
            {inputElem("Recipient Address", "0x1234", to, setTo)}

            {buttonElem("Send Transfer Inscription")}

            {outputElem}
            {hashElem}
        </section>);
    }
}
