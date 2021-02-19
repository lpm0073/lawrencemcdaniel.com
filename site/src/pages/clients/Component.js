import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import RecommendationsCarousel from './recommendationsCarousel';
import ClientGrid from '../../components/clientGrid/Component';
import {Helmet} from "react-helmet";
import { gsdGraph } from '../../shared/seo/gsdGraph';
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';

import './styles.css';

const Clients = (props) => {
    /* Google Structured Data */
    const slug = "clients";
    const webpageName = "Clients";
    const webpageDescription = "Lawrence McDaniel client list for my Full Stack Developer practice.";
    const primaryImageUrl = "";
    const pageType = "";
    const relatedLink = "";
    const graphExtraData = [gsdPersonLawrenceMcDaniel];

    return(
        <React.Fragment>
            <Helmet>
                <link rel="canonical" href="https://lawrencemcdaniel.com/clients/" />
                <script type="application/ld+json">{JSON.stringify(gsdGraph(slug, webpageName, webpageDescription, primaryImageUrl, pageType, relatedLink, graphExtraData))}</script>
            </Helmet>
            <div key="client-page" className="recommendations-page">
                <div className="site-page ">
                    <RenderPageTitle theme="dark" icon="fa-users" title="MY" boxed_title="CLIENTS" />
                    <RecommendationsCarousel recommendations={props.recommendations} />
                    <ClientGrid clients={props.clients} />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Clients;