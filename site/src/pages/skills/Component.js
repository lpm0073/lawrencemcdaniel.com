import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import './styles.css';


const Skills = (props) => {

    return(
        <React.Fragment>

            <div className="skills-page">
                <div className="container site-page ">
                    <RenderPageTitle icon="fa-book" title="HARD" boxed_title="SKILLS" />

                </div>
            </div>              

        </React.Fragment>
    );

}

export default Skills;