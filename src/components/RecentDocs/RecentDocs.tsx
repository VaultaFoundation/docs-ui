import React from 'react';

import {H1_Bold, H2_Bold, P_Bold, P_Medium, P_Small} from '../Shared/Typography/Typography';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const RecentDocs = () => {
    const { siteConfig } = useDocusaurusContext();

    const list = require('./latest-docs.json')
    const timeSince = (timestamp: number) => {
        const seconds = Math.floor((new Date().getTime() - timestamp) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    const itemPathToRealPath = (itemPath: string) => {
        // remove all <number>_ from the path
        return itemPath.replace(/\/\d*_/g, '/').replace('/docs/', '/docs/latest/');
    }

    return (
        <div className="recent-docs">
            <section className="recent-docs-title">
                <H2_Bold>What's New</H2_Bold>
                <p>Keep up to date with the latest documentation</p>
            </section>

            <section className="recent-docs-list">
                {list.map((item: any) => (
                    <a href={itemPathToRealPath(item.path)} className="recent-docs-item" key={item.title}>
                        <figure>{item.title}</figure>
                        <figure>{timeSince(item.last_updated)} ago</figure>
                    </a>
                ))}
            </section>

        </div>
    );
}
