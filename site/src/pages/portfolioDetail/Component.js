import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import './styles.css';


const PortfolioDetail = (props) => {

    return(
        <React.Fragment>
            <div className="portfolio-page">
                <div className="site-page ">
                    <RenderPageTitle theme="dark" icon="fa-briefcase" title="PROJECT" boxed_title="" />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default PortfolioDetail;