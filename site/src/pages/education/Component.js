import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import CoursesGrid from './coursesGrid';
import {Helmet} from "react-helmet";
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence';

import { gsdGraph } from '../../shared/seo/gsdGraph';
import './styles.css';


const Education = (props) => {

    /* Google Structured Data */
    var person = gsdPersonLawrenceMcDaniel.push({
        key: "hasOccupation",
        value: hasOccupation
    })
    

    const slug = "education";
    const webpageName = "Eduction";
    const webpageDescription = "Lawrence McDaniel educational background and courses completed.";
    const primaryImageUrl = "";
    const pageType = "";
    const relatedLink = "";
    const graphExtraData = [person];

    return(
        <React.Fragment>
            <Helmet>
                <link rel="canonical" href="https://lawrencemcdaniel.com/education/" />
                <script type="application/ld+json">{JSON.stringify(gsdGraph(slug, webpageName, webpageDescription, primaryImageUrl, pageType, relatedLink, graphExtraData))}</script>
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