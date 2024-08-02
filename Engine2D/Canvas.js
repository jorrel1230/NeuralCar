// --- Canvas.js --- //
// Exports an Object for the Canvas.

class Canvas {
    constructor() {
        this.element = document.getElementById("canvas");
        this.context = this.element.getContext("2d");

        this.element.width = window.devicePixelRatio * (window.innerWidth - 100);
        this.element.height = window.devicePixelRatio * (window.innerHeight - 100);

    }

    toCanvasY(y) {
        return this.element.clientHeight - y;
    }

    clear() {
        this.context.fillStyle = "#aaaaaa"
        this.context.fillRect(0, 0, this.element.width, this.element.height);
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