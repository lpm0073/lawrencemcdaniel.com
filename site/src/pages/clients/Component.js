import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import RecommendationsCarousel from './recommendationsCarousel';
import ClientGrid from './clientGrid';
import './styles.css';

const Clients = (props) => {

    return(
        <React.Fragment>
            <div className="recommendations-page">
                <div className="site-page ">
                    <RenderPageTitle theme="dark" icon="fa-users" title="MY" boxed_title="CLIENTS" />
                    <div className="mx-5">
                        <RecommendationsCarousel recommendations={props.recommendations} />
                    </div>
                    <ClientGrid clients={props.clients} />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Clients;