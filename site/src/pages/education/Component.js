import React from 'react';
import RenderPageTitle from '../../components/pageTitleComponent';
import CoursesGrid from './coursesGrid';
import './styles.css';


const Education = (props) => {

    return(
        <React.Fragment>
            <div className="portfolio-page">
                <div className="container site-page ">
                    <RenderPageTitle icon="fa-graduation-cap" title="ADVANCED" boxed_title="TRAINING" />
                    <CoursesGrid education={props.education} />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Education;