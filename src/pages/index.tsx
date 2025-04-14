import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { WideCard } from '../components/WideCard/WideCard';
import { Card } from '../components/Card/Card';
import { CardWrapper } from '../components/CardWrapper/CardWrapper';
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { JoinCommunity } from '../components/JoinCommunity/JoinCommunity';
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
                            <figure className="card-title"><Translate>Write your first Vaulta Smart Contract</Translate></figure>
                            <figure className="card-p"><Translate>Learn how to write Vaulta's NativeVM contracts in minutes</Translate></figure>
                        </Card>
                        <Card icon="icons/ethereum-logo.svg" link={useBaseUrl("/evm/smart-contracts/develop-with-remix")}>
                            <figure className="card-title"><Translate>
                                Vaulta's EVM
                            </Translate></figure>
                            <figure className="card-p"><Translate>
                                Write Solidity contracts and deploy them on Vaulta's EVM to leverage the Ethereum ecosystem.
                            </Translate></figure>
                        </Card>
                    </CardWrapper>

                    <JoinCommunity />

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
                            <figure className="card-p"><Translate>Consult the API references explore the Vaulta RPC</Translate></figure>
                        </Card>
                        <Card icon="icons/ethereum-logo.svg" link={useBaseUrl("/docs/latest/core-concepts/accounts")}>
                            <figure className="card-title"><Translate>Vaulta Basics</Translate></figure>
                            <figure className="card-p"><Translate>Learn about accounts and resources on Vaulta</Translate></figure>
                        </Card>
                    </CardWrapper>

                    {/*<IntakeForm />*/}
                </section>
            </section>
        </Layout>
    );
}
