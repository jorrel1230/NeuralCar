import Car from "./Engine2D/Car";
import canvas from "./Engine2D/Canvas";
import netCanvas from "./Network/networkCanvas";
import Bound from "./Engine2D/Bound";
import Vector2D from "./Engine2D/Vector2D";
import Visualizer from "./Network/Visualizer";
import Network from "./Network/network";

const dt = 0.00625;
let bestCar;
let cars;
const w = canvas.element.width;
const h = canvas.element.height;

let mutationRate = 0;
let N = 1000;


// Array of all polygon objects for track. 
const trackPolygons = [
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

var requestID = undefined;
let enableAI = false;

// Generates an array of N cars with randomly generated networks.
const generateCars = (N) => {
  const cars = [];
  for (let i = 0; i < N; i++) {
    cars.push(new Car(canvas.element.width*0.5, canvas.element.height*0.875, canvas.element.width*0.015, canvas.element.width*0.035, -1.57, 0, enableAI));
  }
  return cars;
}

// Allows User to save currently highlighted network to localStorage.
const saveCurrNetwork = () => {
  localStorage.setItem("savedNetwork",
    JSON.stringify(bestCar.brain)
  );
  console.log("Saved Currently Highlighted Car");
}

// Allows User to delete any network present in localStorage.
const deleteCurrNetwork = () => {
  localStorage.removeItem("savedNetwork");
  console.log("Deleted Car in Local Storage");

}

// Allows the user to restart simulation with button
const toggleLoop = () => {
  if (!requestID) {
    init();
    requestID = requestAnimationFrame(loop);
  }
  else {
    cancelAnimationFrame(requestID);
    requestID = undefined;
    init();
    requestID = requestAnimationFrame(loop);
  }
};

// If a network exists in localStorage, fetch it and create next generation.
// Else, cars are left as random networks.
const fetchStoredBrain = () => {
  if (localStorage.getItem("savedNetwork")) {
    const bestNetwork = JSON.parse(localStorage.getItem("savedNetwork"));
    for (let i = 0; i < N; i++) {
      cars[i].brain = JSON.parse(localStorage.getItem("savedNetwork"));
      Network.mutate(cars[i].brain, mutationRate); 
    }
    bestCar.brain = bestNetwork;
  }
}

// Setup function before main loop. Sets up network if available.
const init = () => {

  // Fetch Any Previous Stored Mutation Rates
  if (localStorage.getItem("mutationRate")) {
    mutationRate = localStorage.getItem("mutationRate");
  }

  // Fetch Any Previous Stored N Value
  if (localStorage.getItem("carCount")) {
    N = localStorage.getItem("carCount");
  }
  cars = generateCars(enableAI ? N : 1);
  bestCar = cars[0];
  if (enableAI) fetchStoredBrain();

}

// Main loop; called continously until broken by toggleLoop()
const loop = () => {

  canvas.clear();

  for (let i = 0; i < trackPolygons.length; i++) {
    trackPolygons[i].draw(canvas.context, "#222222");
  }



  canvas.context.globalAlpha = 0.5;
  for (let i = 0; i < cars.length; i++) {
    cars[i].step(dt, trackPolygons);

    for (let j = 0; j < trackPolygons.length; j++) {
      if (trackPolygons[j].polygon.intersects(cars[i].polygon)) {
        cars[i].crashed = true;
      }
    }
    cars[i].draw(canvas.context, cars[i].crashed ? "gray" : "lightblue", 0);

  }

  for (let i = 0; i < cars.length; i++) {
    if (cars[i].getScore() > bestCar.getScore() && !cars[i].crashed) {
      bestCar = cars[i];
    }
  }
  canvas.context.globalAlpha = 1;
  cars[0].draw(canvas.context, "green", enableAI);
  bestCar.draw(canvas.context, "blue", enableAI);
  canvas.writeScore(bestCar.getScore());
  if (enableAI) {
    netCanvas.clear()
    Visualizer.drawNetwork(netCanvas.context, bestCar.brain);
  } else netCanvas.drawControls();

  requestID = requestAnimationFrame(loop);
};


// Initializing Number Inputs
var inputMut = document.getElementById("inputMut");
var outputMut = document.getElementById("mutText");

var inputN = document.getElementById("inputN");
var outputN = document.getElementById("NText");

if (localStorage.getItem("mutationRate")) {
  const mutRate = localStorage.getItem("mutationRate")
  inputMut.value = mutRate*100;
  outputMut.innerHTML = parseFloat(inputMut.value).toFixed(4);
}

if (localStorage.getItem("carCount")) {
  const carCount = localStorage.getItem("carCount")
  inputN.value = carCount;
  outputN.innerHTML = inputN.value;
}

inputMut.oninput = () => {
  outputMut.innerHTML = parseFloat(inputMut.value).toFixed(4);
  localStorage.setItem("mutationRate", inputMut.value/100);
}

inputN.oninput = () => {
  outputN.innerHTML = inputN.value;
  localStorage.setItem("carCount", inputN.value);
}



// Initializing Buttons
const saveButton = document.getElementById("saveButton");
const deleteButton = document.getElementById("deleteButton");
const restartButton = document.getElementById("restartButton");
const modeButton = document.getElementById("switchMode");
const modeIcon = document.getElementById("modeIcon");

saveButton.addEventListener('click', saveCurrNetwork);
deleteButton.addEventListener('click', deleteCurrNetwork);
restartButton.addEventListener('click', toggleLoop);
modeButton.addEventListener('click', () => {
  enableAI = !enableAI;
  modeButton.innerText = enableAI ? "🤖" : "👩"
})

toggleLoop();
