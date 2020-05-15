import React from 'react';


const SkillColumn = (props) => {
    
    const thisClassName = "fa p-3 " + props.icon + " fa-2x";

    return(
        <React.Fragment>
            <div className="col-lg-2 col-md-4 col-sm-6 px-1 mb-5">
                <div className="skill-column text-center">
                    <div className="skill-pct">{props.pct}%</div>
                    <h4 className="skill-title mt-4">{props.title}</h4>
                    <p className="skill-description px-2">{props.description}</p>
                    <div className="skill-icon">
                        <i className={thisClassName}></i>
                    </div>
                </div>
            </div>

        </React.Fragment>

    );
}

export default SkillColumn;

