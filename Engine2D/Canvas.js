// --- Canvas.js --- //
// Exports an Object for the Car Canvas.

class Canvas {
    constructor() {
        this.element = document.getElementById("carCanvas");
        this.context = this.element.getContext("2d");

        this.element.width = window.devicePixelRatio * (window.innerWidth*0.6-20);
        this.element.height = window.devicePixelRatio * (window.innerHeight-20);

    }

    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    writeScore(score) {
        this.context.fillStyle = "white";
        this.context.font = "50px Arial";
        this.context.textAlign = "center";
        this.context.fillText(`Score: ${score.toFixed(2)}`, this.element.width/2, this.element.height/2);
    }
}

// Export Single Instance
const canvas = new Canvas();
export default canvas;