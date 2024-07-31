import Car from "./Engine2D/Car";
import canvas from "./Engine2D/Canvas";
import Bound from "./Engine2D/Bound";
import Vector2D from "./Engine2D/Vector2D";

const main = () => {

  const w = canvas.element.width;
  const h = canvas.element.height;
  
  var prevTime = Date.now();
  const car = new Car(700, 100, 15, 35, "lightblue", 1);

  const bounds = [
    // TRIANGLE CORNERS
    new Bound([
      new Vector2D(w * 0.7, 0),
      new Vector2D(w, h * 0.3),
      new Vector2D(w, 0)
    ]),
    new Bound([
      new Vector2D(w * 0.7, h),
      new Vector2D(w, h * 0.7),
      new Vector2D(w, h)
    ]),
    new Bound([
      new Vector2D(w * 0.3, h),
      new Vector2D(0, h * 0.7),
      new Vector2D(0, h)
    ]),
    new Bound([
      new Vector2D(w * 0.3, 0),
      new Vector2D(0, h * 0.3),
      new Vector2D(0, 0)
    ]),
    // STRAIGHT RAILINGS
    new Bound([
      new Vector2D(0, 0),
      new Vector2D(0, h * 0.05),
      new Vector2D(w, h * 0.05),
      new Vector2D(w, 0)
    ]),
    new Bound([
      new Vector2D(0, h),
      new Vector2D(0, h * 0.95),
      new Vector2D(w, h * 0.95),
      new Vector2D(w, h)
    ]),
    new Bound([
      new Vector2D(0, 0),
      new Vector2D(0, h),
      new Vector2D(w * 0.05, h),
      new Vector2D(w * 0.05, 0)
    ]),
    new Bound([
      new Vector2D(w, 0),
      new Vector2D(w, h),
      new Vector2D(w * 0.95, h),
      new Vector2D(w * 0.95, 0)
    ])
  ]

  const loop = () => {

    const currTime = Date.now();
    const dt = (currTime - prevTime)/1000;
    prevTime = currTime; 

    car.step(dt);
    


    canvas.clear();
    car.draw();
    for (let i = 0; i < bounds.length; i++) {
      // if (bounds[i].polygon.intersects(car.polygon)) {
      //   console.log("bruh");
      // }
      bounds[i].draw("black");
    }

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

};

main(); // Call main function