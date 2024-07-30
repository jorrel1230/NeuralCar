// --- Vector2D.js --- //
// Class for creating vector objects 

import canvas from "./Canvas";

class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Returns Magnitude of the vector
    magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    // Returns New Vector which is normalized to a unit vector
    normalize() {
        const norm = this.magnitude();
        return new Vector2D(x/norm, y/norm);
    }

    // Adds another vector to current vector, overwrites current.
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    // Multiplies a scalar to current vector, overwrites current.
    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    // Multiplies Scalar to only x dimension
    multX(scalar) {
        this.x *= scalar;
    }

    // Multiplies Scalar to only y dimension
    multY(scalar) {
        this.y *= scalar;
    }

    // Dots another vector to current vector. Returns value.
    dot(vector) {
        return this.x*vector.x + this.y*vector.y;
    }

    // Returns new Vector2D Object with same values.
    copy() {
        return new Vector2D(this.x, this.y);
    }

    // Draws Vector from Start Point x, y represented as arrow
    draw(x, y, color="black", factor=1) {

        const endX = x+this.x*factor;
        const endY = y+this.y*factor;

        canvas.context.beginPath();
        //Line
        canvas.context.moveTo(x, y);
        canvas.context.lineTo(endX, endY);
        canvas.context.strokeStyle = color;
        canvas.context.stroke();
        canvas.context.closePath();

    }

}

export default Vector2D;