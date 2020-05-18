import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import drawBar from './drawBar';

const SkillBar = (props) => {
    
    const ref = useRef();

    useEffect(() => drawBar(ref));

    return(
        <React.Fragment>

            <div className="m-3 pl-2 pt-1">
                <div className="skill-bar right-rounded">
                    <div className="skill-bar-text ml-5 mt-2">
                        {props.description}
                    </div>
                    <canvas className="m-0 p-0" ref={ref}  />
                </div>
            </div>

        </React.Fragment>

    );
}

export default SkillBar;

