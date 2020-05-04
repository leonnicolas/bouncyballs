import { World } from './Canvas';

export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export abstract class Shape {
    center: Point;
    x_vel: number;
    y_vel: number;
    world: World;
    isHit: boolean = false;
    isbroken: boolean = false;
    isdead: boolean = false;
    collisions: number = 0;
    name: string = "Shape";
    constructor(center: Point,x_vel: number, y_vel: number, world: World ) {
        this.center = center;
        this.x_vel = x_vel;
        this.y_vel = y_vel;
        this.world = world;
    }
    getCenter(): Point {
        return this.center
    }
    takeStep(): void{
        let newX = this.center.x += this.x_vel;
        let newY = this.center.y += this.y_vel;
        this.bounce(newX,newY);
        this.moveCenter(this.x_vel, this.y_vel);
    }
    bounce(newX: number,newY: number):void{
        if (newX > this.world.xMax - this.getRadius())
            this.x_vel *= -1;
        if (newX < 0 + this.getRadius())
            this.x_vel *= -1;
        if (newY > this.world.yMax - this.getRadius())
            this.y_vel *= -1;
        if (newY < 0 + this.getRadius())
            this.y_vel *= -1;
    }
    moveCenter(x: number, y: number){
        this.center.x += x;
        this.center.y += y;
    }
    getDistanceToCenter(p: Point): number {
        return Math.sqrt(Math.pow(this.center.x  - p.x, 2) + Math.pow(this.center.y - p.y ,2));
    }
    takeHit(): void{
        this.isHit = true;
    }
    abstract getShortestDistanceTo(p: Point): number;
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract includesPoint(p: Point): boolean;
    abstract getRadius(): number;
    abstract collide(shape: Shape): void;
}
