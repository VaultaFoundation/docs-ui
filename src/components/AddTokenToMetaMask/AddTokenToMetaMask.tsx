import React from 'react';

import styles from './styles.module.css';
import {Button} from "@site/src/components/Shared/Button/Button";

interface IProps {
    address: string;
    symbol: string;
    decimals: number;
    text: string;
}

export default function FaucetTokens({ address, symbol, decimals }: IProps){

    async function addTokenToMetamask() {
        try {
            // Check if MetaMask is installed
            if (!window.ethereum) {
                alert('MetaMask is not installed');
                return;
            }

            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address,
                        symbol,
                        decimals,
                        // image: tokenImage,
                    },
                },
            });

        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <Button type={'button'} onClick={() => addTokenToMetamask()}>Add {symbol} to MetaMask</Button>
    )
}
