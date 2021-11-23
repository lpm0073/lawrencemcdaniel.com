import { getPixelRatio } from "../../shared/getPixelRatio";

const drawCircle = (ref) => {
  let canvas = ref.current;
  let context = canvas.getContext("2d");

  let ratio = getPixelRatio(context);
  let width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
  let height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.lineWidth = 10;
  context.strokeStyle = "#666";
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 0;
  context.shadowColor = "#656565";

  var x = canvas.width / 2;
  var y = canvas.height / 2;
  var radius = x - context.lineWidth;
  var endPercent = 100;
  var circ = Math.PI * 2;
  var quart = Math.PI / 2;
  var i = 0;
  let requestId;

  const render = (current) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, radius, -quart, circ * current - quart, false);
    context.stroke();
    i += 2;

    if (i <= endPercent) {
      requestId = requestAnimationFrame(function () {
        render(i / 100);
      });
    }
  };

  setTimeout(function () {
    render();
  }, Math.random() * 300);

  return () => {
    cancelAnimationFrame(requestId);
  };
};

export default drawCircle;
