import Car from "./Engine2D/Car";
import canvas from "./Engine2D/Canvas";
import netCanvas from "./Network/networkCanvas";
import Bound from "./Engine2D/Bound";
import Vector2D from "./Engine2D/Vector2D";
import Visualizer from "./Network/Visualizer";
import Network from "./Network/network";

const N = 1;
const dt = 0.0125;
let bestCar;

let mutationRate = 0.0002;

const generateCars = (N) => {
  const cars = [];
  for (let i = 0; i < N; i++) {
    cars.push(new Car(canvas.element.width*0.5, canvas.element.height*0.875, canvas.element.width*0.015, canvas.element.width*0.035, -1.57, 0, 1));
  }
  return cars;
}

export const saveCurrNetwork = () => {
  localStorage.setItem("savedNetwork",
    JSON.stringify(bestCar.brain)
  );
  console.log("Saved Currently Highlighted Car");
}

export const deleteCurrNetwork = () => {
  localStorage.removeItem("savedNetwork");
  console.log("Deleted Car in Local Storage");

}

const main = () => {

  const w = canvas.element.width;
  const h = canvas.element.height;
  
  // let car = new Car(w*0.5, h*0.875, w*0.015, w*0.035, -1.57, "lightblue", 0, 0);

  if (localStorage.getItem("mutationRate")) {
    mutationRate = localStorage.getItem("mutationRate");
  }

  let cars = generateCars(N);
  bestCar = cars[0];


  if (localStorage.getItem("savedNetwork")) {

    const bestNetwork = JSON.parse(localStorage.getItem("savedNetwork"));

    for (let i = 0; i < N; i++) {
      cars[i].brain = JSON.parse(localStorage.getItem("savedNetwork"));
      Network.mutate(cars[i].brain, mutationRate); 
    }

    bestCar.brain = bestNetwork;
  }

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

    for (let i = 0; i < bounds.length; i++) {
      bounds[i].draw(canvas.context, "#222222");
    }

    canvas.context.globalAlpha = 0.5;
    for (let i = 0; i < N; i++) {
      cars[i].step(dt, bounds);

      for (let j = 0; j < bounds.length; j++) {
        if (bounds[j].polygon.intersects(cars[i].polygon)) {
          cars[i].crashed = true;
        }
      }
      cars[i].draw(canvas.context, cars[i].crashed ? "gray" : "lightblue", 0);

    }

    // canvas.writeScore(car.getScore());
    // Visualizer.drawNetwork(netCanvas.context, car.brain);

    for (let i = 0; i < N; i++) {
      if (cars[i].getScore() > bestCar.getScore() && !cars[i].crashed) {
        bestCar = cars[i];
      }
    }
    canvas.context.globalAlpha = 1;
    bestCar.draw(canvas.context, "blue", 1);
    canvas.writeScore(bestCar.getScore());
    Visualizer.drawNetwork(netCanvas.context, bestCar.brain);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

};

main(); // Call main function
