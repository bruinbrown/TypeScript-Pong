/// <reference path="Paddle.ts" />

class Player {
    score: number = 0;
    paddle: Paddle;
    listenDown: string;
    listenUp: string;

    constructor(listenUp: string, listenDown: string, private game:Game, private side:string) {
        this.listenDown = listenDown.toLowerCase();
        this.listenUp = listenUp.toLowerCase();
        this.paddle = new Paddle();
        this.paddle.setSide(side, game._canvasWidth);
        this.paddle.resetPosition(game._canvasHeight);
    }


    update(keysDown, ball:Ball): bool {
        var change: number = 0;
        if (keysDown[this.listenUp]&&this.paddle.Y>0) {
            change -= 5;
        }
        if (keysDown[this.listenDown]&&((this.paddle.Y+this.paddle.Length)<this.game._canvasHeight)) {
            change += 5;
        }
       
        switch (this.side) {
            case 'left':
                if ((ball.x < (this.paddle.X + this.paddle.Width)) && (ball.x > 0) && (ball.y > this.paddle.Y) && (ball.y < (this.paddle.Y + this.paddle.Length))) {
                    ball.flipDirection();
                }
                else if (ball.x < 0) {
                    return true;
                }
                break;
            case 'right':
                if ((ball.x > (this.game._canvasWidth - this.paddle.Width)) && (ball.x < this.game._canvasWidth) && (ball.y > this.paddle.Y) && (ball.y < (this.paddle.Y + this.paddle.Length))) {
                    ball.flipDirection();
                }
                else if (ball.x > this.game._canvasWidth) {
                    return true;
                }
            default:
                break;
        }
        this.paddle.update(change);
        return false;
    }

    draw(canvasContext: CanvasRenderingContext2D): void {
        this.paddle.draw(canvasContext);
        canvasContext.font = '30pt calibri';
        switch (this.side) {
            case 'left':
                canvasContext.fillText(this.Score.toString(), 20, 40);
                break;
            case 'right':
                canvasContext.fillText(this.Score.toString(), this.game._canvasWidth - 50, 40);
                break;
            default:
                break;
        }
    }

    reset(): void {
        this.paddle.resetPosition(this.game._canvasHeight);
    }

    win(): void {
        this.score++;
    }

    get Score(): number {
        return this.score;
    }
}
