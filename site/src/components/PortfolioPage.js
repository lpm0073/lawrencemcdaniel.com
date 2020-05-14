import React from 'react';
import RenderPageTitle from '../widgets/pageTitleComponent';
import PortfolioGrid from '../widgets/portfolioGrid';

const Portfolio = (props) => {

    return(
        <React.Fragment>
            <div className="portfolio-page">
                <div className="container site-page ">
                    <RenderPageTitle icon="fa-briefcase" title="PROJECT" boxed_title="PORTFOLIO" />
                    <PortfolioGrid />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Portfolio;