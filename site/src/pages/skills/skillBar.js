import React from 'react';


const SkillBar = (props) => {
    

    return(
        <React.Fragment>

            <div className="skill-bar right-rounded m-3 pl-2 pt-1">{props.description}</div>

        </React.Fragment>

    );
}

export default SkillBar;

