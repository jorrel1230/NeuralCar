import Polygon from "./Polygon";
import Vector2D from "./Vector2D";

const origin = new Vector2D(0, 0);
class Bound {

    constructor(points) {
        this.polygon = new Polygon(points, origin, 0);
    }

    draw(ctx, color) {
        this.polygon.draw(ctx, color);
    }

}

export default Bound;