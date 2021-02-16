import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import RecommendationsCarousel from './recommendationsCarousel';
import ClientGrid from '../../components/clientGrid/Component';
import {Helmet} from "react-helmet";
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import { gsdLocalBusinessLawrenceMcDaniel } from '../../shared/seo/gsdLocalBusiness';
import { gsdGraph } from '../../shared/seo/gsdGraph';
import './styles.css';

const Clients = (props) => {

    return(
        <React.Fragment>
            <Helmet>
                <link rel="canonical" href="https://lawrencemcdaniel.com/clients" />
                <script type="application/ld+json">{JSON.stringify(gsdPersonLawrenceMcDaniel())}</script>
                <script type="application/ld+json">{JSON.stringify(gsdLocalBusinessLawrenceMcDaniel())}</script>
                <script type="application/ld+json">{JSON.stringify(gsdGraph(
                    "https://lawrencemcdaniel.com/clients", 
                    "Lawrewnce McDaniel - Clients",
                    "Lawrence McDaniel client list for my Full Stack Developer practice.", 
                    "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2018/01/22125438/Lawrence19.jpg"
                ))}</script>
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