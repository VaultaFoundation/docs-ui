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
                    <section className="hero-title">
                        <img width="400px" src={useBaseUrl('icons/emerald-icon.svg')} />
                    </section>
                    {/*<section className="hero-title"><Translate>Vaulta</Translate></section>*/}
                <section className={"hero-subtitle"}><Translate>
                    VAULTA Blockchain documentation
                </Translate></section>
                <section style={{ maxWidth: "500px" }}>
                    <P_Medium><Translate>
                        Join the banking revolution and leave your mark on the world of finance.
                    </Translate></P_Medium>
                </section>
                {/*<br />*/}
                {/*<br />*/}
                {/*<LinkButton href={useBaseUrl("/evm/smart-contracts/migrate-your-smart-contract")}>*/}
                {/*    <Translate>HOW TO MIGRATE?</Translate>*/}
                {/*</LinkButton>*/}
            </section>
        </div>
    );
}
