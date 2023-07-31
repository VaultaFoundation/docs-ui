import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import Translate from "@docusaurus/Translate";

export const LanguageWarning = () => {
    return (
        <div className="mx-5 mb-10 p-5 px-10 rounded bg-blue-100 text-xs -mt-1.5">
            <Translate>
                This page is translated from English. Please note that errors or differences compared to the original page may occur.
                The documentation source of truth should always be the English version.
            </Translate>
        </div>
    )
}
