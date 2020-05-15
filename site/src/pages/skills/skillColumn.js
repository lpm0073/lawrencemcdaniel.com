import React from 'react';


const SkillColumn = (props) => {
    
    const thisClassName = "fa " + props.icon + " fa-2x";

    return(
        <React.Fragment>
            <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="skill-column text-center">
                    <div className="skill-pct">{props.pct}%</div>
                    <h4 className="skill-title my-4">{props.title}</h4>
                    <p className="skill-description">{props.description}</p>
                    <div className="skill-icon mt-5">
                        <i className={thisClassName}></i>
                    </div>
                </div>
            </div>

        </React.Fragment>

    );
}

export default SkillColumn;

