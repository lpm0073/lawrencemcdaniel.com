import React from 'react';

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import { LinkedinBadge } from '../../components/linkedinBadge/Component';

import { resumeUrl } from '../../shared/urls';
import './styles.css';


const ReactPage = (props) => {

        return(

            <React.Fragment>
                <div className="site-page">
                    <RenderPageTitle theme="light" icon="fa-align-left" title="BUILT WITH" boxed_title="REACTJS" />
                    <div className="row mt-5">
                        <div className="col-lg-3 hide-medium">
                            <div className="ml-auto text-center">
                                <LinkedinBadge />
                                <a className="mt-4 btn btn-danger" role="button" target="_blank" href={resumeUrl} rel="noopener noreferrer">
                                        <i className="fa fa-download"></i> Download Resume
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 ml-5">
                            <div className="text-justify">
                                <p>We build this city with .... </p>
                                <p>We build this city with Rock and Roll .... </p>
                                <hr />
                            </div>
    
                        </div>
                    </div>
                </div>
            </React.Fragment>
    
        );

}

export default ReactPage;