import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import RecommendationsCarousel from './recommendationsCarousel';
import './styles.css';

const Clients = (props) => {

    return(
        <React.Fragment>
            <div className="recommendations-page">
                <div className="site-page ">
                    <RenderPageTitle theme="dark" icon="fa-users" title="CLIENT" boxed_title="RECOMMENDATIONS" />
                    <RecommendationsCarousel recommendations={props.recommendations} />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Clients;