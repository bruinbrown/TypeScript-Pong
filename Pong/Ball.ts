/// <reference path="references.ts" />
class Ball {
    private startX: number;
    private startY: number;
    constructor(public x: number, public y: number, private game:Game) {
        this.startX = x;
        this.startY = y;
        this.resetPosition();
    }

    private width: number = 5;
    private startDirection = -1;
    private XDirection: number;
    private YDirection: number;

    get Width() {
        return this.width;
    }

    resetPosition() {
        this.x = this.startX;
        this.y = this.startY;
        var rand = Math.floor(Math.random() * 11);
        this.startDirection = Math.pow(-1, rand);
        this.XDirection = this.startDirection * 3;
        rand = Math.floor(Math.random() * 11);
        this.startDirection = Math.pow(-1, rand);
        this.YDirection = this.startDirection * 3;
    }

    flipDirection(): void {
        this.XDirection *= -1;
    }

    update(): void {
        this.x += (2*this.XDirection);
        this.y += (2*this.YDirection);
        if ((this.y-this.width) < 0 || (this.y+this.width) > this.game._canvasHeight) {
            this.YDirection *= -1;
        }
    }

    draw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    }
}
