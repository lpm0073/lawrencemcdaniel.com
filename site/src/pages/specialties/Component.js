import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import SpecialtiesBanner from './specialtiesBanner';
import TechnologyCarousel from './technologyCarousel';
import {Helmet} from "react-helmet";
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import { gsdKnowsAbout } from '../../shared/seo/gsdKnowsAbout';

import { gsdGraph } from '../../shared/seo/gsdGraph';
import './styles.css';


const Specialties = (props) => {
    /* Google Structured Data */
    const specialties = gsdPersonLawrenceMcDaniel.push({
        "key":"knowsAbout",
        "value":gsdKnowsAbout
    })
    const slug = "specialties";
    const webpageName = "Specialties";
    const webpageDescription = "Lawrence McDaniel's technical skills";
    const primaryImageUrl = "";
    const pageType = "";
    const relatedLink = "";
    const graphExtraData = [specialties];

    return(
        <React.Fragment>
            <Helmet>
                <link rel="canonical" href="https://lawrencemcdaniel.com/specialties/" />
                <script type="application/ld+json">{JSON.stringify(gsdGraph(slug, webpageName, webpageDescription, primaryImageUrl, pageType, relatedLink, graphExtraData))}</script>
            </Helmet>
            <div className="specialties-page">
                <div className="site-page ">
                    <RenderPageTitle theme="dark" icon="fa-pencil-square-o" title="MY" boxed_title="SPECIALTIES" />
                    <SpecialtiesBanner />
                    <TechnologyCarousel specialties={props.specialties} />

                    <div className="row specialties-code-samples mt-5 p-3 m-3 hide-medium">
                        <div className="col">
                            <div>
                                <h2>Want to see code samples?</h2>
                                <h6>I'm constantly experimenting with new GitHub libraries and coding techniques. Click here to see some of my all-time favorites.</h6>
                            </div>
                        </div>
                        <div className="col-2">
                        <a className="btn btn-danger" role="button" href="http://horrors.lawrencemcdaniel.com/" title="AngularJS Code Samples" target="_blank" rel="noopener noreferrer"><i className="fa fa-cogs"></i> Code samples</a>
                        </div>
                    </div>
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Specialties;