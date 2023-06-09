import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { Button } from '../Shared/Button/Button';
import {H3, H2, P_XLarge, H1} from '../Shared/Typography/Typography';

import styles from './styles.module.css';

export const IntakeForm = () => {
  const { siteConfig } = useDocusaurusContext();

  // @ts-ignore
    const { title, subtitle, action, buttonText } = siteConfig.customFields.main.intakeForm;

  const handleClick = () => {
    window.location.replace(action);
  };

  return (
      <div className="mb-40 flex flex-col justify-center items-center">
          <H1>{title}</H1>
          <P_XLarge className="max-w-[600px] mb-10">{subtitle}</P_XLarge>
          <a href={action} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
            <Button type="button">{buttonText}</Button>
          </a>
      </div>
  )
}
