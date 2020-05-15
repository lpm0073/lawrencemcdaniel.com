import React from 'react';
import RenderPageTitle from '../../components/pageTitleComponent';
import ProjectsGrid from './projectsGrid';

const Portfolio = (props) => {

    return(
        <React.Fragment>
            <div className="portfolio-page">
                <div className="container site-page ">
                    <RenderPageTitle icon="fa-briefcase" title="PROJECT" boxed_title="PORTFOLIO" />
                    <ProjectsGrid portfolio={props.portfolio} />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Portfolio;