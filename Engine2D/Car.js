// --- Car.js --- //

import canvas from "./Canvas";
import State from "./State";
import Vector2D from "./Vector2D";
import Controls from "./Controls";
import Polygon from "./Polygon";

class Car {
    constructor(x, y, w, h, color="black", vectors=false) {
        this.color = color;
        this.w = w;
        this.h = h;
        this.state = new State(new Vector2D(x, y), // Position
                               new Vector2D(0, 0), // Velocity
                               new Vector2D(0, 0)); // Acceleration
        this.controls = new Controls();
        this.show_vectors = vectors;

        this.polygon = new Polygon([
            new Vector2D(-this.w/2, this.h/2),
            new Vector2D(-this.w/2, -this.h/2),
            new Vector2D(this.w/2, -this.h/2),
            new Vector2D(this.w/2, this.h/2)
        ], this.state.position, this.state.orientation);

    }

    // Sets Various States Based on Control Input
    #updateControls() {
        if (this.controls.brake) {
            this.state.brakeDown();
        } else {
            this.state.brakeUp();
        }
        
        if (this.controls.throttle) {
            this.state.throttleUp();
        } else {
            this.state.throttleDown();
        }

        if (this.controls.left) {
            this.state.left();
        }

        if (this.controls.right) {
            this.state.right();
        }
    }

    // Handles Stepping forward the Physics engine by one tick, and interprets key presses.
    step(dt) {
        this.#updateControls();
        this.state.tick(dt);
    }

    // Handles Drawing the Car to the Canvas.
    draw() {
        const x = this.state.position.x;
        const y = this.state.position.y;

        this.polygon.set(this.state.position, this.state.orientation);

        this.polygon.draw(this.color);

        if (this.show_vectors) {
            this.state.velocity.draw(x, y, "green", this.w/60);
            this.state.netacceleration.draw(x, y, "red", this.w/60);
            this.state.direction.draw(x, y, "black", this.w*2);
        }
        
    }
}

export default Car;