// --- Car.js --- //

import canvas from "./Canvas";
import State from "./State";
import Vector2D from "./Vector2D";
import Controls from "./Controls";
import Polygon from "./Polygon";
import Sensor from "./Sensor";

class Car {
    constructor(x, y, w, h, rotation=0, color="black", vectors=false) {
        this.color = color;
        this.w = w;
        this.h = h;
        this.state = new State(new Vector2D(x, y), // Position
                               new Vector2D(0, 0), // Velocity
                               new Vector2D(0, 0),
                               rotation); // Acceleration
        this.controls = new Controls();
        this.show_vectors = vectors;

        this.sensor = new Sensor(this);

        this.polygon = new Polygon([
            new Vector2D(-this.w/2, this.h/2),
            new Vector2D(-this.w/2, -this.h/2),
            new Vector2D(this.w/2, -this.h/2),
            new Vector2D(this.w/2, this.h/2)
        ], this.state.position, this.state.orientation);

        this.score = 0 // The Car's current score.
        this.lastscore = 0 
        this.laps = 0;

    }

    disableControls() {
        this.controls.disable();
        this.state.velocity = new Vector2D(0, 0);
        this.state.acceleration = new Vector2D(0, 0);
        
    }

    getScore() {

        this.lastscore = this.score;

        const w = canvas.element.width;
        const h = canvas.element.height;
        
        const pos = this.state.position.subtract(new Vector2D(w/2, h/2));
        this.score = Math.atan2(pos.x, pos.y);

        if (this.lastscore > 1 && this.score < -1) {
            this.laps += 1;
        }
        if (this.lastscore < -1 && this.score > 1) {
            this.laps -= 1;
        }
        return ((this.score / 6.28 + this.laps)*100);
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
    step(dt, bounds) {
        this.#updateControls();
        this.state.tick(dt);
        this.polygon.set(this.state.position, this.state.orientation);
        this.sensor.update(bounds);
    }

    // Handles Drawing the Car to the Canvas.
    draw(ctx) {

        this.polygon.draw(ctx, this.color);

        this.sensor.draw(ctx);

        if (this.show_vectors) {
            const x = this.state.position.x;
            const y = this.state.position.y;

            this.state.velocity.draw(x, y, "green", this.w/60);
            this.state.netacceleration.draw(x, y, "red", this.w/60);
            this.state.direction.draw(x, y, "black", this.w*2);
        }
        
    }
}

export default Car;