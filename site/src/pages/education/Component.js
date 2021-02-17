import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import CoursesGrid from './coursesGrid';
import {Helmet} from "react-helmet";
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import { gsdGraph } from '../../shared/seo/gsdGraph';
import './styles.css';


const Education = (props) => {

    return(
        <React.Fragment>
            <Helmet>
                <link rel="canonical" href="https://lawrencemcdaniel.com/education" />
                <script type="application/ld+json">{JSON.stringify(gsdPersonLawrenceMcDaniel(true, false, props))}</script>
                <script type="application/ld+json">{JSON.stringify(gsdGraph(
                    "https://lawrencemcdaniel.com/education", 
                    "Lawrence McDaniel - Education",
                    "Lawrence McDaniel educational background and courses completed.", 
                    "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2018/01/22125438/Lawrence19.jpg"
                ))}</script>
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