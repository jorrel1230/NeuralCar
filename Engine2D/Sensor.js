import utils from "./utils";

class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 7;
        this.rayLength = 200;
        this.raySpread = Math.PI;

        this.#fillRaysArray();
        this.readings = []
    }

    #fillRaysArray() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = utils.lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1 ? 0.5 : i/(this.rayCount-1)
            ) - this.car.state.orientation + 3.14;

            const start={
                x: this.car.state.position.x,
                y: this.car.state.position.y,
            };

            const end={
                x: this.car.state.position.x - Math.sin(rayAngle)*this.rayLength,
                y: this.car.state.position.y - Math.cos(rayAngle)*this.rayLength,
            };

            this.rays.push([start, end]);
        }
    }

    #getReading(ray, bounds) {
        let touches = [];

        for (let i = 0; i < bounds.length; i++) {
            for (let j = 0; j < bounds[i].polygon.points.length; j++) {
                const touch = utils.getIntersection(ray[0], ray[1],
                    bounds[i].polygon.points[j],
                    bounds[i].polygon.points[(j+1)%bounds[i].polygon.points.length]
                );
                if (touch) {
                    touches.push(touch);
                }
            }
        }
        if (touches.length==0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset==minOffset);
        }

    }

    update(bounds) {
        this.#fillRaysArray();
        this.readings = [];
        for (let i = 0; i < this.rayCount; i++) {
            this.readings.push(
                this.#getReading(this.rays[i], bounds)
            );
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.rayCount; i++) {

            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i]
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y,
            )
            ctx.lineTo(
                end.x,
                end.y,
            )
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.moveTo(
                end.x,
                end.y,
            )
            ctx.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y,
            )
            ctx.stroke();

        }
    }
}

export default Sensor;
