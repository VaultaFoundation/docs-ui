import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { WideCard } from '../components/WideCard/WideCard';
import { Card } from '../components/Card/Card';
import { CardWrapper } from '../components/CardWrapper/CardWrapper';
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { SignUp } from '../components/SignUp/SignUp';
import { IntakeForm } from '../components/IntakeForm/IntakeForm';

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();

    return (
        <Layout>
            <section>
                <WideCard />

                <section className="limiter">

                    <CardWrapper>
                        <Card icon="icons/emerald-icon.svg" link={useBaseUrl("/docs/latest/quick-start/write-a-contract")}>
                            <figure className="card-title"><Translate>Write your first EOS Native Smart Contract</Translate></figure>
                            <figure className="card-p"><Translate>Get building native smart contracts on the EOS Network in minutes</Translate></figure>
                        </Card>
                        <Card icon="icons/ethereum-logo.svg" link={useBaseUrl("/evm/smart-contracts/develop-with-remix")}>
                            <figure className="card-title"><Translate>Write your first EOS EVM Smart Contract</Translate></figure>
                            <figure className="card-p"><Translate>Take advantage of the raw power of the EOS Network using EVM smart contracts</Translate></figure>
                        </Card>
                    </CardWrapper>

                    <SignUp />

                    <CardWrapper>
                        <Card icon="icons/molecules-icon.svg" link={useBaseUrl("/docs/latest/guides/create-a-token")} color="yellow">
                            <figure className="card-title"><Translate>Create a Token</Translate></figure>
                            <figure className="card-p"><Translate>Learn how to develop fungible tokens</Translate></figure>
                        </Card>
                        <Card icon="icons/chat-icon.svg" link={useBaseUrl("/docs/latest/guides/create-an-nft")} color="yellow">
                            <figure className="card-title"><Translate>Create an NFT</Translate></figure>
                            <figure className="card-p"><Translate>Learn how to develop non-fungible tokens</Translate></figure>
                        </Card>
                        <Card icon="icons/ref-icon.svg" link={useBaseUrl("/docs/latest/miscellaneous/apis-and-manuals")}>
                            <figure className="card-title"><Translate>Reference</Translate></figure>
                            <figure className="card-p"><Translate>Consult the API references explore the EOS RPC</Translate></figure>
                        </Card>
                        <Card icon="icons/ethereum-logo.svg" link={useBaseUrl("/evm/quick-start/introduction")}>
                            <figure className="card-title"><Translate>EOS EVM</Translate></figure>
                            <figure className="card-p"><Translate>Take advantage of the world's fastest EVM</Translate></figure>
                        </Card>
                    </CardWrapper>

                    <IntakeForm />
                </section>
            </section>
        </Layout>
    );
}
