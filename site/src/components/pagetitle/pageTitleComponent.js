import React from 'react';
import './styles.css';

const RenderPageTitle = (props) => {

    const iconClasses = "fa " + props.icon + " fa-2x page-tile-icon";

    const pageClasses = "col-12 page-title " + props.theme;

    return(
        <div className="row text-center">
            <div className={pageClasses}>
                <span className={iconClasses}></span>
                <h1 className="display-4">{props.title} <i className="page-title-boxed light">{props.boxed_title}</i></h1>
            </div>                
        </div>
    );


}

export default RenderPageTitle;
