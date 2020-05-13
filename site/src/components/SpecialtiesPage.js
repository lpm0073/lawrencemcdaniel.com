import React from 'react';

import RenderPageTitle from '../widgets/pageTitleComponent';

const Bio = (props) => {

        return(

            <React.Fragment>
                <LinkedIn />
                <div className="container site-page">
                    <RenderPageTitle icon="fa-pencil-square-o" title="MY" boxed_title="SPECIALTIES" />
                    <div className="row row-content">
                        <div className="col-4">
                            <h2>FULL STACK DEVELOPMENT</h2>
                            <div className="row">
                                <div classNname="col-3">hello world</div>
                                <div classNname="col-7">hello world</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <h2>BUSINESS ANALYSIS</h2>
                        </div>
                        <div className="col-4">
                            <h2>OPEN EDX</h2>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    
        );

}

export default Bio;