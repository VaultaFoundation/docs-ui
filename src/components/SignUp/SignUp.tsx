import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { Button } from '../Shared/Button/Button';
import {H3, H2, P_XLarge, H1} from '../Shared/Typography/Typography';

import styles from './styles.module.css';

export const SignUp = () => {
  const { siteConfig } = useDocusaurusContext();

  const { title, subtitle, action, buttonText } = siteConfig.customFields.main.signUp;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <H1 className={styles.title}>
          Start Networking
        </H1>
        <P_XLarge className={styles.subtitle}>
          Need help or want to help? Maybe you just want to chat with some like-minded developers.
          Most journeys are less fun alone, <b>join the community</b>.
        </P_XLarge>
        <section className={styles.socials}>
          <a href="https://github.com/eosnetworkfoundation" target="_blank" rel="noopener noreferrer">
            <img className={styles.icons} src="/icons/github-icon.svg" alt="GitHub" />
          </a>
          <a href="https://discord.gg/XjVqej4uT5" target="_blank" rel="noopener noreferrer">
            <img className={styles.icons} src="/icons/discord-icon.svg" alt="Discord" />
          </a>
          <a href="https://t.me/antelopedevs" target="_blank" rel="noopener noreferrer">
            <img className={styles.icons} src="/icons/telegram-icon.svg" alt="Discord" />
          </a>
        </section>
      </div>
    </div>
  )
}
