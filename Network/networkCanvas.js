// --- networkCanvas.js --- //
// Exports an Object for the Network Canvas.

class NetworkCanvas {
    constructor() {
        this.element = document.getElementById("networkCanvas");
        this.context = this.element.getContext("2d");

        this.element.width = window.devicePixelRatio * (window.innerWidth*0.4-10);
        this.element.height = window.devicePixelRatio * (window.innerHeight-20);

    }

    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    drawControls() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        this.context.fillStyle = "white";
        this.context.font = "50px Arial";
        this.context.textAlign = "center";  
        this.context.fillText("W: Throttle", this.element.width/2, this.element.height*0.2);
        this.context.fillText("A: Left", this.element.width/2, this.element.height*0.4);
        this.context.fillText("S: Brake", this.element.width/2, this.element.height*0.6);
        this.context.fillText("D: Right", this.element.width/2, this.element.height*0.8);
    }
}

// Export Single Instance
const netCanvas = new NetworkCanvas();
export default netCanvas;