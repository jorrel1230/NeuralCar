import Car from "./Engine2D/Car";
import canvas from "./Engine2D/Canvas";
import netCanvas from "./Network/networkCanvas";
import Bound from "./Engine2D/Bound";
import Vector2D from "./Engine2D/Vector2D";
import Visualizer from "./Network/Visualizer";

const N = 2000;


const generateCars = (N) => {
  const cars = [];
  for (let i = 0; i < N; i++) {
    cars.push(new Car(canvas.element.width*0.5, canvas.element.height*0.875, canvas.element.width*0.015, canvas.element.width*0.035, -1.57, 0, 1));
  }
  return cars;
}


const main = () => {

  const w = canvas.element.width;
  const h = canvas.element.height;
  
  var prevTime = Date.now();
  // let car = new Car(w*0.5, h*0.875, w*0.015, w*0.035, -1.57, "lightblue", 0, 0);

  let cars = generateCars(N);


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

    canvas.clear();

    // car.step(dt, bounds);
        
    // for (let i = 0; i < bounds.length; i++) {
    //   if (bounds[i].polygon.intersects(car.polygon)) {
    //     // Code for when Car loses
    //     car.crashed = true;
    //   }
    //   bounds[i].draw(canvas.context, "#222222");
    // }
    // car.draw(canvas.context);

    let bestScore = -99999999;
    let bestScoreIndex = 0;

    for (let i = 0; i < bounds.length; i++) {
      bounds[i].draw(canvas.context, "#222222");
    }

    for (let i = 0; i < N; i++) {
      cars[i].step(dt, bounds);

      for (let j = 0; j < bounds.length; j++) {
        if (bounds[j].polygon.intersects(cars[i].polygon)) {
          cars[i].crashed = true;
        }
      }
      cars[i].draw(canvas.context, cars[i].crashed ? "gray" : "lightblue");

    }

    // canvas.writeScore(car.getScore());
    // Visualizer.drawNetwork(netCanvas.context, car.brain);

    for (let i = 0; i < N; i++) {
      if (cars[i].getScore() > bestScore && !cars[i].crashed) {
        bestScoreIndex = i;
        bestScore = cars[i].getScore();
      }
    }
    cars[bestScoreIndex].draw(canvas.context, "blue");
    canvas.writeScore(cars[bestScoreIndex].getScore());
    Visualizer.drawNetwork(netCanvas.context, cars[bestScoreIndex].brain);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

};

main(); // Call main function