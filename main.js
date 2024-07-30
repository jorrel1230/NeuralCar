import Ball from "./Engine2D/Ball";
import canvas from "./Engine2D/Canvas";
import Vector2D from "./Engine2D/Vector2D";

const main = () => {
  
  const loop = () => {

    canvas.clear();
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

};

main(); // Call main function