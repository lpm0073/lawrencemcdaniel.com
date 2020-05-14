import React from 'react';

const RenderAboutTile = (props) => {
    
    const thisClassName = "fa " + props.icon + " fa-2x about-tile-icon";

    return(

        <div className="col-md-6 col-sm-12 m-0 p-0 text-center">
            <div className="m-1 about-tile">
                <div className={thisClassName}></div>
                <div className="about-tile-value">{props.value}</div>
                <div>{props.text}</div>
            </div>
        </div>                

    );

}

export default RenderAboutTile;
