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
}

// Export Single Instance
const netCanvas = new NetworkCanvas();
export default netCanvas;