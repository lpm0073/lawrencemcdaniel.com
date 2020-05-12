import React from 'react';


export const RenderPageTitle({icon, title, boxed_title}) {
    const thisClassName = "fa " + icon + " fa-2x page-tile-icon";

    return(

        <div className="row">
            <div className="col-12 text-center page-title">
                <span className={thisClassName}></span>
                <h1 className="display-4">{title} <span className="page-title-boxed">{boxed_title}</span></h1>
            </div>                
        </div>

    );

};

