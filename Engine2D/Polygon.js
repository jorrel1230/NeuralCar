import Vector2D from "./Vector2D";
import canvas from "./Canvas";

class Polygon {
    constructor(shape, center, rotation) {
        this.shape = shape; // Original Array of Points
        this.points = new Array(shape.length); 
        this.center = center;
        this.rotation = rotation;

        // For every Point on the Polygon, rotate, then move to position.
        for (let i = 0; i < shape.length; i++) {
            this.points[i] = shape[i].applyRotMatrix(-rotation).add(center);
        }
    }

    #ccw(A, B, C) {
        return (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x)
    }

    // Checks if Line Segment AB Intersects Segment CD
    #lineIntersects(A, B, C, D) {
        return (this.#ccw(A,C,D) != this.#ccw(B,C,D)) && (this.#ccw(A,B,C) != this.#ccw(A,B,D))
    }

    intersects(polygon) {
        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < polygon.points.length; j++) {
                if (this.#lineIntersects(this.points[i], this.points[(i+1) % this.points.length], 
                                         this.points[j], this.points[(j+1) % polygon.points.length])) {
                    return true;
                }
            }
        }
    }

    set(center, rotation) {
        this.center = center;
        this.rotation = rotation;
    }

    draw(color) {
        // For every Point on the Polygon, rotate, then move to position.
        for (let i = 0; i < this.shape.length; i++) {
            this.points[i] = this.shape[i].applyRotMatrix(-this.rotation).add(this.center);
        }

        let ctx = canvas.context;

        ctx.beginPath();
        ctx.moveTo(this.points[this.points.length-1].x, this.points[this.points.length-1].y);
        for (let i = 0; i < this.points.length; i++) ctx.lineTo(this.points[i].x, this.points[i].y);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();


    }
}

export default Polygon;