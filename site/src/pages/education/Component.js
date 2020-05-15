import React from 'react';
import RenderPageTitle from '../../widgets/pageTitleComponent';
import EducationGrid from '../../widgets/educationGrid';

const Education = (props) => {

    return(
        <React.Fragment>
            <div className="portfolio-page">
                <div className="container site-page ">
                    <RenderPageTitle icon="fa-graduation-cap" title="ADVANCED" boxed_title="TRAINING" />
                    <EducationGrid education={props.education} />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Education;