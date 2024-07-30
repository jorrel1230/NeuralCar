// --- Canvas.js --- //
// Exports an Object for the Canvas.

class Canvas {
    constructor() {
        this.element = document.getElementById("canvas");
        this.context = this.element.getContext("2d");

        this.element.width = window.devicePixelRatio * (window.innerWidth - 100);
        this.element.height = window.devicePixelRatio * (window.innerHeight - 100);

        this.context.transform(1, 0, 0, -1, 0, this.element.height)
    }

    toCanvasY(y) {
        return this.element.clientHeight - y;
    }

    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }
}

// Export Single Instance
const canvas = new Canvas();
export default canvas;