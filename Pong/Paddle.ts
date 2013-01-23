
class Paddle {
    constructor() { }
    X: number;
    Y: number;
    private length: number = 40;
    private paddleWidth: number = 10;

    get Width() {
        return this.paddleWidth;
    }

    get Length() {
        return this.length;
    }

    resetPosition(maxHeight: number) {
        this.Y = ((maxHeight / 2) - (this.length / 2));
    }

    setSide(side: string, maxWidth: number) {
        switch (side.toLowerCase()) {
            case 'right':
                this.X = maxWidth - (this.paddleWidth / 2);
                break;
            case 'left':
                this.X = this.paddleWidth / 2;
                break;
            default:
                console.log("Invalid side value passed. Use left or right");
                this.X = 0;
                break;
        }
    }

    draw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.lineWidth = this.paddleWidth;
        canvasContext.moveTo(this.X, this.Y);
        canvasContext.lineWidth = this.paddleWidth;
        canvasContext.lineTo(this.X, this.Y + this.length);
    }

    update(distanceChange: number): void {
        this.Y += distanceChange;
    }
}
