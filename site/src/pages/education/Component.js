import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import CoursesGrid from './coursesGrid';
import {Helmet} from "react-helmet";
import './styles.css';


const Education = (props) => {

    return(
        <React.Fragment>
            <Helmet>
                <link rel="canonical" href="https://lawrencemcdaniel.com/" />
            </Helmet>
            <div key="education-page" className="portfolio-page">
                <div className="site-page ">
                    <RenderPageTitle theme="dark" icon="fa-graduation-cap" title="ADVANCED" boxed_title="TRAINING" />
                    <CoursesGrid education={props.education} />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Education;