// --- Ball.js --- //

import canvas from "./Canvas";

class Ball {
    constructor(x, y, radius=100, color="black") {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    pos(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        canvas.context.beginPath();
        canvas.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        canvas.context.fillStyle = this.color;
        canvas.context.fill();
        canvas.context.closePath();
    }
}

export default Ball;