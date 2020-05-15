import React from 'react';

const RenderPageTitle = (props) => {

    const thisClassName = "fa " + props.icon + " fa-2x page-tile-icon";

    return(

        <div className="row text-center">
            <div className="col-12 page-title">
                <span className={thisClassName}></span>
                <h1 className="display-4">{props.title} <span className="page-title-boxed">{props.boxed_title}</span></h1>
            </div>                
        </div>

    );

}

export default RenderPageTitle;
