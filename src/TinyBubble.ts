import {Bubble} from './Bubble';
import {Point} from "./shape";
import {World} from "./Canvas";

export class TinyBubble extends Bubble {
    name = "TinyBubble";
    radius : number = 10;
    MAXCOLLISIONS = 100;
    isHit = true;
    friction = 0.01;
    constructor(center: Point, x_vel:number ,y_vel: number, world: World) {
        super(center, x_vel, y_vel, world);
        this.noCollide = 100;
    }
}
