import React, {useState, useRef, useCallback, useMemo} from 'react';
import {createPortal} from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useHistory} from '@docusaurus/router';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {DocSearchButton, useDocSearchKeyboardEvents} from '@docsearch/react';
import {useAlgoliaContextualFacetFilters} from '@docusaurus/theme-search-algolia/client';
import Translate from '@docusaurus/Translate';
import translations from '@theme/SearchTranslations';

let DocSearchModal = null;

function Hit({hit, children}) {
  return <Link to={hit.url}>{children}</Link>;
}

function ResultsFooter({state, onClose}) {
  createSearchLink = useSearchLinkCreator();
  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{count: state.context.nbHits}}>
        {'See all {count} results'}
      </Translate>
    </Link>
  );
}
function mergeFacetFilters(f1, f2) {
  const normalize = (f) => (typeof f === 'string' ? [f] : f);
  return [...normalize(f1), ...normalize(f2)];
}
function DocSearch({contextualSearch, externalUrlRegex, ...props}) {
  const {siteMetadata} = useDocusaurusContext();
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();
  const configFacetFilters = props.searchParameters?.facetFilters ?? [];
  const facetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : // ... or use config facetFilters
      configFacetFilters;
  // We let user override default searchParameters if she wants to
  const searchParameters = {
    ...props.searchParameters,
    facetFilters,
  };
  const {withBaseUrl} = useBaseUrlUtils();
  const history = useHistory();
  const searchContainer = useRef(null);
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(undefined);
  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve();
    }
    return Promise.all([
      import('@docsearch/react/modal'),
      import('@docsearch/react/style'),
      import('./styles.css'),
    ]).then(([{DocSearchModal: Modal}]) => {
      DocSearchModal = Modal;
    });
  }, []);


  const onCustomInput = (event) => {
    if (event.key === 'Enter') {
      // const query = event.target.value;
      // const searchPageLink = withBaseUrl(`/search?q=${query}`);
      // navigator.navigate({itemUrl: searchPageLink});
    }
  };

  return (
    <>
      <a href={withBaseUrl('/chatbot')}>
        <button className='ask-the-ai'>
          Ask the robots 👀
        </button>
      </a>
      {/*<input*/}
      {/*  className='search-input-box'*/}
      {/*  type="text"*/}
      {/*  // placeholder={translations.placeholder}*/}
      {/*  placeholder="Ask the AI 🤖"*/}
      {/*  onKeyUp={onCustomInput}*/}
      {/*/>*/}
    </>
  );
}
export default function SearchBar() {
  const {siteConfig} = useDocusaurusContext();
  return <DocSearch {...siteConfig.themeConfig.algolia} />;
}
