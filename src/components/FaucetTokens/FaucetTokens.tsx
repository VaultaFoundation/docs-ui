import React from 'react';

import styles from './styles.module.css';
import {Button} from "@site/src/components/Shared/Button/Button";

console.log('styles', styles);

const sendTokens = () => {
    const address:string = (document.getElementById('eos-evm-address') as HTMLInputElement).value;

    if(!address || address.length !== 42) return alert('Invalid address');

    return fetch('https://eos-evm-faucet-bwakzykmta-ue.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "to": address,
        })
    }).then(x => {
        return x.json();
    }).then(x => {
        console.log(x);
        document.getElementById('status').innerHTML = `Tokens sent!`;
    }).catch(err => {
        console.error(err);
        document.getElementById('status').innerHTML = `There was an error sending your testnet tokens.`
    })
}

export default function ConnectMetaMask(){
    return (
        <section>
            <input id="eos-evm-address" className={styles['tokens-input']} placeholder="EOS EVM Address" />
            <Button type={'button'} onClick={() => sendTokens()}>Send Tokens</Button>
            <figure className={styles['token-status']} id="status"></figure>
        </section>
    )
}
