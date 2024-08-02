import Vector2D from "./Vector2D";

class State {
    constructor(position, velocity, acceleration, orientation) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.netacceleration = acceleration;
        this.friction = 100;
        this.frictionpassive = 100;
        this.orientation = orientation;
        this.direction = new Vector2D(-Math.sin(this.orientation), Math.cos(this.orientation));
    }

    #tickFriction() {

        // Calculates coef. of total friction. Creates more friction when car is not oriented along direction of motion.
        this.friction = this.frictionpassive + Math.abs(this.velocity.normalize().cross(this.direction))*(150+this.frictionpassive*0.5)

        if (this.velocity.magnitude() > 2) {
            this.netacceleration = this.acceleration.subtract(this.velocity.normalize().mult(this.friction));
        } else {
            this.velocity = new Vector2D(0, 0);
            this.netacceleration = this.acceleration
        }
    }



    throttleUp() {
        this.acceleration = this.direction.mult(550);
    }

    throttleDown() {
        this.acceleration = new Vector2D(0, 0);
    }

    brakeDown() {
        this.frictionpassive = 550;
    }

    brakeUp() {
        this.frictionpassive = 100;
    }

    left() {
        this.orientation -= 0.025;
        this.direction = new Vector2D(-Math.sin(this.orientation), Math.cos(this.orientation));
    }

    right() {
        this.orientation += 0.025;
        this.direction = new Vector2D(-Math.sin(this.orientation), Math.cos(this.orientation));
    }


    tick(dt) {
        
        this.#tickFriction();

        // Integrates Acceleration
        this.velocity = this.velocity.add(this.netacceleration.mult(dt));
        // Rotates velocity vector slightly in direction of turn
        this.velocity = this.velocity.applyRotMatrix(this.velocity.normalize().cross(this.direction) * -0.005);
        // Integrates Velocity
        this.position = this.position.add(this.velocity.mult(dt));
                
    }
}

export default State;