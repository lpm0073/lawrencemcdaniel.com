import React from 'react';

const RenderAboutTile = (props) => {
    
    const thisClassName = "fa " + props.icon + " fa-2x about-tile-icon";

    return(

        <div className="col-md-6 text-center about-tile ">
            <div className={thisClassName}></div>
            <div className="about-tile-value">{props.value}</div>
            <div>{props.text}</div>
        </div>                

    );

}

export default RenderAboutTile;
