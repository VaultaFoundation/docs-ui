import React from 'react';
import {P_XLarge, H1} from '../Shared/Typography/Typography';
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate from "@docusaurus/Translate";

import styles from './styles.module.css';

export const JoinCommunity = () => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <H1 className={styles.title}>
          <Translate>Start Networking</Translate>
        </H1>
        <P_XLarge className={styles.subtitle}>
          <Translate>
          Need help or want to help? Maybe you just want to chat with some like-minded developers.
          Most journeys are less fun alone, join the community.
          </Translate>
        </P_XLarge>
        <section className={styles.socials}>
          <a href="https://github.com/eosnetworkfoundation" target="_blank" rel="noopener noreferrer">
            <img className={styles.icons} src={useBaseUrl("/icons/github-icon.svg")} alt="GitHub" />
          </a>
          {/*<a href="https://discord.gg/XjVqej4uT5" target="_blank" rel="noopener noreferrer">*/}
          {/*  <img className={styles.icons} src={useBaseUrl("/icons/discord-icon.svg")} alt="Discord" />*/}
          {/*</a>*/}
          <a href="https://t.me/antelopedevs" target="_blank" rel="noopener noreferrer">
            <img className={styles.icons} src={useBaseUrl("/icons/telegram-icon.svg")} alt="Discord" />
          </a>
        </section>
      </div>
    </div>
  )
}
