import React from 'react';

import styles from './styles.module.css';
import {Button} from "@site/src/components/Shared/Button/Button";

export default function FaucetTokens(){
    return (
        <section className={styles.connectMetamask}>
            <Button type={'button'} onClick={() => addMainnet()}>Add Mainnet</Button>
            <br />
            <Button type={'button'} onClick={() => addTestnet()}>Add Testnet</Button>
        </section>
    )
}
