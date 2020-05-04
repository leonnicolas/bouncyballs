import {Point, Shape} from "./shape";
import {Bubble} from "./Bubble";
import {TinyBubble} from "./TinyBubble";

export class World {
    xMax: number;
    yMax: number;

    constructor(x: number, y: number) {
        this.xMax = x;
        this.yMax = y;
    }
}

export class Canvas {
    shapes: Shape[] = [];
    canvas: HTMLCanvasElement;
    world: World;
    color: string = "rgb(47, 79, 79)";
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.world = new World(this.canvas.width, this.canvas.height);
        //this.shapes.push(new Bubble(new Point(100, 100), 1, 1, world));
        document.getElementById('canvas').addEventListener('click', (event) => {
            //console.log(event);
            let hit = false;
            let p = new Point(event.x, event.y);
            this.shapes.forEach((e,i,a) => {
                if (e.includesPoint(p)) {
                    //a.splice(i, 1);
                    e.takeHit();
                    hit = true;
                }
            })

            if (!hit)
                this.shapes.push(new Bubble(new Point(event.x, event.y),Math.random()*2 -1 , Math.random()*2 - 1, this.world));
        })
    }

    start(): void {

        if (this.canvas.getContext) {
            let ctx = this.canvas.getContext("2d");
            setInterval(() => {
                this.clearCanvas(ctx);
                // delete dead shapes
                this.shapes = this.shapes.filter( (e) => {
                    if (e.isdead)
                        return false;
                    else
                        return true;
                });
                // handle broken shapes
                for (let i = 0 ; i < this.shapes.length ; i++ ){
                    if (this.shapes[i].isbroken && this.shapes[i].name == "Bubble"){

                        this.shapes[i].isdead = true;
                        for ( let j = 0 ; j < 5 ; j++){
                            console.log(this.shapes)
                            this.shapes.push(new TinyBubble(new Point(this.shapes[i].center.x, this.shapes[i].center.y),Math.random()*2 -1 , Math.random()*2 -1, this.world));
                        }
                    }
                }
                //take steps and draw
                for (let i = 0 ; i < this.shapes.length ; i++ ) {
                    this.shapes[i].takeStep();
                    this.shapes[i].draw(ctx);
                }
                for (let i = 0 ; i < this.shapes.length ; i++ ){
                    for (let j = i + 1 ; j < this.shapes.length  ; j++){
                        //console.log("i=" + i + " j=" + j)
                        if (this.isCollision(this.shapes[i], this.shapes[j])){
                            this.shapes[i].collide(this.shapes[j]);
                        }
                    }
                }
            }, 25);


        }
    }
    clearCanvas(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = this.color;
        ctx.clearRect(0,0, this.canvas.width , this.canvas.height);
    }
    isCollision(s1: Shape, s2: Shape): boolean{
        //to save resources calculating the sqrt
        let distance_approx_x = Math.abs(s1.center.x - s2.center.x);
        let distance_approx_y = Math.abs(s1.center.y - s2.center.y);
        if (distance_approx_x  > s1.getRadius() + s2.getRadius() || distance_approx_y  > s1.getRadius() + s2.getRadius())
            return false;
        let distance = Math.sqrt(Math.pow(s1.center.x - s2.center.x,2) + Math.pow(s1.center.y - s2.center.y, 2));
        if (distance <= s1.getRadius() + s2.getRadius()) {
            return true;
        }
        else
            return false;
    }
}
