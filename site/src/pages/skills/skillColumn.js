import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

/*
 Canvas animated drawing in React: http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/
 */

const getPixelRatio = context => {
    var backingStore = context.backingStorePixelRatio ||
                        context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 
                        1;
    
    return (window.devicePixelRatio || 1) / backingStore;
    };

const SkillColumn = (props) => {
    
    const thisClassName = "fa p-3 " + props.icon + " fa-2x";
    const ref = useRef();

    useEffect(() => {
        let canvas = ref.current;
        let context = canvas.getContext('2d');
        
        let ratio = getPixelRatio(context);
        let width = getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2);
        let height = getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2);
                
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.lineWidth = 10;
        context.strokeStyle = '#555';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;
        context.shadowColor = '#656565';
     

        var x = canvas.width / 2;
        var y = canvas.height / 2;

        var radius = x - context.lineWidth;
        var endPercent = 100;
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;

        let requestId, i = 0;

        const render = (current) => {

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(x, y, radius, -(quart), (circ * current) - quart, false);
            /*
            context.arc(x, y, x * Math.abs(Math.cos(i)), 0, 2 * Math.PI);
            context.fill();
            */
            context.stroke();
            i +=2;
     
            if (i <= endPercent) {
                requestId = requestAnimationFrame(function () {
                    render(i / 100)
                });
            }
     
        };

        setTimeout(function(){ render(); }, Math.random() * 300);
        

        return () => {
            cancelAnimationFrame(requestId);
        };

    });

    return(
        <React.Fragment>
            <div className="col-lg-2 col-md-4 col-sm-6 px-1 mb-5">
                <div className="skill-column text-center">
                    <canvas 
                        ref={ref}
                        className="skill-pct" />
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

