import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import RecommendationsCarousel from './recommendationsCarousel';
import './styles.css';

const Recommendations = (props) => {

    return(
        <React.Fragment>
            <div className="recommendations-page">
                <div className="container site-page ">
                    <RenderPageTitle icon="fa-users" title="CLIENT" boxed_title="RECOMMENDATIONS" />
                    <RecommendationsCarousel />

                </div>
            </div>              

        </React.Fragment>
    );

}

export default Recommendations;