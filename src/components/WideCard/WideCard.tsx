import React from 'react';
import { LinkButton } from '../Shared/LinkButton/LinkButton';
import { IconBox } from '../Shared/IconBox/IconBox';

import styles from './styles.module.css';
import {H1_Bold, H2_Bold, P_Medium} from '../Shared/Typography/Typography';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const WideCard = () => {
    const { siteConfig } = useDocusaurusContext();

    // @ts-ignore
    const { title, tagline, subtitle, icon, href, buttonText } = siteConfig.customFields.main.wideCard;

    return (
        <div className={styles.wideCard}>

            <section className={"content-container"}>
                <section className="hero-title">{title}</section>
                <section className={"hero-subtitle"}>{tagline}</section>
                <P_Medium>{subtitle}</P_Medium>
                <br />
                <br />
                <LinkButton href={href} text={buttonText} />
            </section>
        </div>
    );
}
