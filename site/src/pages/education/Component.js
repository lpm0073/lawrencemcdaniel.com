import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import CoursesGrid from './coursesGrid';
import './styles.css';


const Education = (props) => {

    return(
        <React.Fragment>
            <div className="portfolio-page">
                <div className="site-page ">
                    <RenderPageTitle theme="dark" icon="fa-graduation-cap" title="ADVANCED" boxed_title="TRAINING" />
                    <CoursesGrid education={props.education} />
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Education;