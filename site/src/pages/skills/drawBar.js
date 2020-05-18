import { getPixelRatio } from '../../shared/getPixelRatio';

const drawBar = (ref) => {
    let canvas = ref.current;
    let context = canvas.getContext('2d');
    
    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    let height = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
            
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.lineWidth = canvas.height * 2;
    context.strokeStyle = '#666';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    context.shadowColor = '#656565';
    

    var x = canvas.width;
    var y = canvas.height;
    var endPercent = 100;
    var i = 0;
    let requestId;

    const render = (pct) => {

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();

        context.moveTo(0, y);
        context.lineTo(x * pct, 0);
    
        context.stroke();
        i +=2;
    
        if (i <= endPercent) {
            requestId = requestAnimationFrame(function () {
                render(i / 100)
            });
        }
    
    };

    setTimeout(function() { 
        render(); 
    }, Math.random() * 300);
    

    return () => {
        cancelAnimationFrame(requestId);
    };

};

export default drawBar;