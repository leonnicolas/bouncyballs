import {Point, Shape} from './shape';
import { World } from './Canvas';

export class Bubble extends Shape{
    name = "Bubble";
    radius: number = 30;
    friction: number = 0.005;
    gravity: number = -0.05;
    ttl: number = 500;
    noCollide = 5;
    collisions = 0;
    MAXCOLLISIONS: number = 2;
constructor(center: Point, x_vel:number ,y_vel: number, world: World) {
    super(center, x_vel, y_vel, world);
}
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.beginPath();
        ctx.arc(this.center.x , this.center.y  , this.radius , 0, 2 * Math.PI);
        ctx.fill();
    }

    takeStep(): void {
        if (this.noCollide !=0)
            this.noCollide --;
        if (!this.isHit)
            super.takeStep();
        else {
            this.y_vel *= (1 - this.friction);
            this.x_vel *= (1 - this.friction);
            this.y_vel -= this.gravity;
            if (Math.abs(this.x_vel) + Math.abs(this.y_vel) < 0.1 && this.ttl -- <= 0 )
                this.isdead = true;
            super.takeStep();
        }
    }

    includesPoint(p: Point): boolean {
        return this.getShortestDistanceTo(p) <= 0;
    }


    getShortestDistanceTo(p: Point): number {
        return this.getDistanceToCenter(p) - this.radius;
    }

    getRadius(): number {
        return this.radius;
    }
    collide(shape: Shape): void {
        if (this.noCollide != 0)
            return;
        this.noCollide = 5;
        if (++this.collisions == this.MAXCOLLISIONS || ++shape.collisions == this.MAXCOLLISIONS){
            this.isbroken = true;
            shape.isbroken = true;
        }
        let rel_v_x = this.x_vel - shape.x_vel;
        let rel_v_y = this.y_vel - shape.y_vel;
        let rel_v = Math.sqrt(Math.pow(rel_v_x,2) + Math.pow(rel_v_y,2));
        let abstands = new Point(this.center.x - shape.center.x,this.center.y - shape.center.y);
        let angle = Math.acos((abstands.x * rel_v_x + abstands.y * rel_v_y) / (Math.sqrt(Math.pow(abstands.x,2) + Math.pow(abstands.y,2)) * Math.sqrt(Math.pow(rel_v_y,2) + Math.pow(rel_v_x,2))));
        let rel_v2_x_new = Math.pow(Math.cos(angle),2) * rel_v;
        let rel_v2_y_new = Math.cos(angle) * Math.sin(angle) * rel_v;
        let rel_v_x_new = Math.pow(Math.sin(angle),2) * rel_v;
        let rel_v_y_new = Math.sin(angle) * Math.cos(angle) * rel_v;
        this.x_vel = 0.95*(shape.x_vel + rel_v_x_new);
        this.y_vel = 0.95*(shape.y_vel + rel_v_y_new);
        shape.x_vel += rel_v_x;
        shape.y_vel += rel_v_y;
        shape.x_vel *= 0.95;
        shape.y_vel *=0.95;
        if (shape.x_vel == NaN || shape.y_vel == NaN)
            shape.isbroken;
        if (this.x_vel == NaN || this.y_vel == NaN)
            this.isbroken;
    }
}
