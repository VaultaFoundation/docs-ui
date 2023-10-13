import React from 'react';
import { LinkButton } from '../Shared/LinkButton/LinkButton';

import styles from './styles.module.css';
import {H1_Bold, H2_Bold, P_Medium} from '../Shared/Typography/Typography';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

export const WideCard = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <div className={styles.wideCard}>

            <section className={"content-container"}>
                <section className="hero-title"><Translate>EOS EVM</Translate></section>
                <section className={"hero-subtitle"}><Translate>New opportunities for Solidity developers</Translate></section>
                <P_Medium><Translate>
                    Introducing a brand new home for your decentralized applications.
                </Translate></P_Medium>
                <br />
                <br />
                <LinkButton href={useBaseUrl("/evm/smart-contracts/migrate-your-smart-contract")}>
                    <Translate>HOW TO MIGRATE?</Translate>
                </LinkButton>
            </section>
        </div>
    );
}
