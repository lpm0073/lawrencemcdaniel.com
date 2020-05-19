import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import RecommendationsCarousel from './recommendationsCarousel';
import ClientCarousel from './clientCarousel';
import './styles.css';

const Clients = (props) => {

    return(
        <React.Fragment>
            <div className="recommendations-page">
                <div className="site-page ">
                    <RenderPageTitle theme="dark" icon="fa-users" title="MY" boxed_title="CLIENTS" />
                    <RecommendationsCarousel recommendations={props.recommendations} />
                    <div className="mx-5">
                        <ClientCarousel clients={props.clients} />
                    </div>
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Clients;