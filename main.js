import Car from "./Engine2D/Car";
import canvas from "./Engine2D/Canvas";
import Bound from "./Engine2D/Bound";
import Vector2D from "./Engine2D/Vector2D";

const main = () => {

  const w = canvas.element.width;
  const h = canvas.element.height;
  
  var prevTime = Date.now();
  let car = new Car(w*0.5, h*0.875, w*0.015, w*0.035, -1.57, "lightblue", 0);
  const bounds = [
    new Bound([
      new Vector2D(w * 0.8, h * 0.05),
      new Vector2D(w * 0.95, h * 0.2),
      new Vector2D(w * 0.95, h * 0.8),
      new Vector2D(w * 0.8, h * 0.95),
      new Vector2D(w * 0.2, h * 0.95),
      new Vector2D(w * 0.05, h * 0.8),
      new Vector2D(w * 0.05, h * 0.2),
      new Vector2D(w * 0.2, h * 0.05),
      new Vector2D(w * 0.8, h * 0.05),
      new Vector2D(w * 0.8, 0),
      new Vector2D(0, 0),
      new Vector2D(0, h),
      new Vector2D(w, h),
      new Vector2D(w, 0),
      new Vector2D(w * 0.8, 0),
    ]),

    // Inside Octogon
    new Bound([
      new Vector2D(w*0.3, h*0.2),
      new Vector2D(w*0.7, h*0.2),
      new Vector2D(w*0.8, h*0.3),
      new Vector2D(w*0.8, h*0.7),
      new Vector2D(w*0.7, h*0.8),
      new Vector2D(w*0.3, h*0.8),
      new Vector2D(w*0.2, h*0.7),
      new Vector2D(w*0.2, h*0.3),
    ])
  ]

  const loop = () => {

    const currTime = Date.now();
    const dt = (currTime - prevTime)/1000;
    prevTime = currTime; 

    car.step(dt, bounds);

    canvas.clear();
    for (let i = 0; i < bounds.length; i++) {
      if (bounds[i].polygon.intersects(car.polygon)) {
        car = new Car(w*0.5, h*0.875, w*0.015, w*0.035, -1.57, "lightblue", 0);
      }
      bounds[i].draw(canvas.context, "#222222");
    }
    car.draw(canvas.context);

    canvas.writeScore(car.getScore());

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

};

main(); // Call main function