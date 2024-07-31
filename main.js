import Car from "./Engine2D/Car";
import canvas from "./Engine2D/Canvas";

const main = () => {
  
  var prevTime = Date.now();
  const car = new Car(700, 100, 15, 35, "lightblue", 1);

  const loop = () => {

    const currTime = Date.now();
    const dt = (currTime - prevTime)/1000;
    prevTime = currTime; 

    car.step(dt);
    


    canvas.clear();
    car.draw();

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

};

main(); // Call main function