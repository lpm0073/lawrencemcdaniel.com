import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import ProjectsGrid from './projectsGrid';
import {Helmet} from "react-helmet";
import './styles.css';


const Portfolio = (props) => {

    return(
        <React.Fragment>
            <Helmet>
                <link rel="canonical" href="https://lawrencemcdaniel.com/" />
            </Helmet>
            <div key="portfolio-page" className="portfolio-page">
                <div className="site-page ">
                    <RenderPageTitle theme="dark" icon="fa-briefcase" title="PROJECT" boxed_title="PORTFOLIO" />
                    <div className="p-2">
                        <ProjectsGrid portfolio={props.portfolio} />
                    </div>
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Portfolio;