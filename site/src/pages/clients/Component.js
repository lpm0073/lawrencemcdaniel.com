import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import RecommendationsCarousel from './recommendationsCarousel';
import ClientGrid from '../../components/clientGrid/Component';
import {Helmet} from "react-helmet";
import './styles.css';

const Clients = (props) => {

    return(
        <React.Fragment>
            <Helmet>
                <link rel="canonical" href="https://lawrencemcdaniel.com/" />
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