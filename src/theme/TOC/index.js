import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import clsx from 'clsx';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import {useDoc} from '@docusaurus/theme-common/internal';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css';
import { useLocation, useHistory } from '@docusaurus/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBug, faCodePullRequest } from '@fortawesome/free-solid-svg-icons'
import Translate from "@docusaurus/Translate";

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const suggestTitle = '<ENTER A TITLE HERE>';

// duplicate what is in config, react can't access docusarus config from here
// this must match docusaurus.config.js
const i18n = { locales: ['en', 'zh', 'ko'], defaultLocale: 'en' }

function useDocsSearchVersionsHelpers() {
  const allDocsData = useAllDocsData();
  // State of the version select menus / algolia facet filters
  // docsPluginId -> versionName map
  const [searchVersions, setSearchVersions] = useState(() =>
    Object.entries(allDocsData).reduce(
      (acc, [pluginId, pluginData]) => ({
        ...acc,
        [pluginId]: pluginData.versions[0].name,
      }),
      {},
    ),
  );
  // Set the value of a single select menu
  const setSearchVersion = (pluginId, searchVersion) =>
    setSearchVersions((s) => ({...s, [pluginId]: searchVersion}));
  const versioningEnabled = Object.values(allDocsData).some(
    (docsData) => docsData.versions.length > 1,
  );
  return {
    allDocsData,
    versioningEnabled,
    searchVersions,
    setSearchVersion,
  };
}

const getPathKey = (path) => {
  const pathParts = path.split('/');
  // look at first directory in URL
  // simple check for locales matching config entry 'en' 'zh' 'ko'
  const localeFromUrl = i18n.locales.find(locale => locale === pathParts[1])
  if (localeFromUrl) {
    return {
      localKey: pathParts[1],
      pluginId: pathParts[2],
      version: pathParts[3],
    }
  }
  // undefined localeFromURL
  // get default from config
  return {
    localKey: i18n.defaultLocale,
    pluginId: pathParts[1],
    version: pathParts[2],
  }
}

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({className, ...props}) {
  const [options, setOptions] = useState([]);
  const [currentVersion, setCurrentVersion] = useState({});
  const { allDocsData } = useDocsSearchVersionsHelpers();
  const doc = useDoc();
  const location = useLocation();
  const history = useHistory();
  const {pathname} = location;

  const isVirtual = !!doc.frontMatter.virtual;
  const isDocs = doc.metadata.permalink.includes('/docs/') || doc.metadata.permalink.includes('/evm/');
  const canEditOrSuggest = isDocs && !isVirtual;
  const suggestLink = doc.metadata.permalink;
  const sourceFile = doc.metadata.source.replace('@site','');
  const suggestBody = encodeURIComponent(`
  <ENTER DESCRIPTION HERE>

  File: [${doc.metadata.title}](https://github.com/vaultafoundation/docs/tree/main${sourceFile})
`);

  const suggestEditsLink = `https://github.com/vaultafoundation/docs/edit/main${doc.metadata.source.replace('@site','').replace('docs/', 'native/')}`;

  const { contributors } = doc.frontMatter;

  useEffect(() => {
    Object.keys(allDocsData).forEach((key) => {
      const { localKey, pluginId } = getPathKey(pathname);
      const currentDoc = allDocsData[pluginId === 'docs' ? 'default' : pluginId.toLowerCase()];
      const { versions } = currentDoc;

      if (versions) {
        const versionOptions = versions.map((version) => ({
          value: version.name,
          label: version.label,
          path: version.path,
        }));
        setOptions(versionOptions);

        const currentOption = versionOptions.find((option) => pathname.includes(option.path));

        setCurrentVersion(currentOption);
      }
    });
  }, [allDocsData, pathname]);

  const handleOnChange = (selectedOption) => {
    const { path } = selectedOption;
    const { localKey, pluginId, version } = getPathKey(pathname);
    let newPath = pathname.replace(`/${pluginId}/${version}`, path);
    if (localKey !== i18n.defaultLocale ) {
      newPath = pathname.replace(`/${localKey}/${pluginId}/${version}`, path);
    }

    history.push(newPath);
  }


  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      {canEditOrSuggest && <div className={clsx(styles.linkContainer, props.toc.length && styles.linkContainerWithTOC)}>
        <a className={styles.link} href={suggestEditsLink} target="_blank">
          <FontAwesomeIcon icon={faBug} />&nbsp; <Translate>Suggest Edits</Translate>
        </a>
        <a className={styles.link} href={`https://github.com/vaultafoundation/docs/issues/new?body=${suggestBody}&title=${suggestTitle}`} target="_blank">
          <FontAwesomeIcon icon={faCodePullRequest} />&nbsp; <Translate>Request Changes</Translate>
        </a>
      </div>}

      {contributors && contributors.length && <section>
        <figure className={styles.contributorsLabel}><Translate>Community authors</Translate></figure>
        <section className={styles.contributorsList}>
          {contributors.map((contributor, index) => (
              <figure key={index}>
                <a href={"https://github.com/"+contributor.github} target="_blank">{contributor.name}</a>
              </figure>
          ))}
        </section>
      </section>}

      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}
