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
        if (norm != 0) {
            return new Vector2D(this.x/norm, this.y/norm);
        } else {
            return new Vector2D(0, 0);
        }
    }

    // Returns sum of another vector and current vector
    add(vector) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    // Returns difference of another vector and current vector
    subtract(vector) {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    // Returns Product of another vector and current vector
    mult(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    // Dots another vector to current vector. Returns value.
    dot(vector) {
        return this.x*vector.x + this.y*vector.y;
    }

    cross(vector) {
        return this.x*vector.y - this.y*vector.x;
    }

    applyRotMatrix(alpha) {
        return new Vector2D(Math.cos(alpha)*this.x + Math.sin(alpha)*this.y,
                            -Math.sin(alpha)*this.x + Math.cos(alpha)*this.y)
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