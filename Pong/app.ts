/// <reference path="jquery.d.ts" />
/// <reference path="Ball.ts" />
/// <reference path="Player.ts" />
/// <reference path="Paddle.ts" />

class Game {
    _canvas: HTMLCanvasElement;
    _canvasContext: CanvasRenderingContext2D;
    _canvasWidth: number;
    _canvasHeight: number;
    _player1: Player;
    _player2: Player;
    _ball: Ball;
    i: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._canvasHeight = canvas.height;
        this._canvasWidth = canvas.width;
        this._canvasContext = this._canvas.getContext('2d');
        $(document).bind('keydown', (e) => {
            this.keysDown[this.keyName(e)] = true;
        });
        $(document).bind('keyup', (e) => {
            this.keysDown[this.keyName(e)] = false;
        });
        this._ball = new Ball(this._canvasWidth/2, this._canvasHeight/2, this);
        this._player1 = new Player('W', 'S', this, 'left');
        this._player2 = new Player('I', 'K', this, 'right');
    }

    update(): void {
        if (this._player1.update(this.keysDown, this._ball)) {
            this._player2.win();
            this.reset();
        }
        if (this._player2.update(this.keysDown, this._ball)) {
            this._player1.win();
            this.reset();
        }
        this._ball.update();
    }

    draw(): void {
        this._canvasContext.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
        this._canvasContext.beginPath();
        this._ball.draw(this._canvasContext);
        this._player1.draw(this._canvasContext);
        this._player2.draw(this._canvasContext);
        this._canvasContext.stroke();
    }

    reset(): void {
        this._player1.reset();
        this._player2.reset();
        this._ball.resetPosition();
    }

    keysDown: { [index: string]: bool; } = {};

    private keyName(e: KeyboardEvent) {
        return String.fromCharCode(e.which).toLowerCase();
    }
}


$(document).ready((e) => {
    var el = <HTMLCanvasElement>document.getElementById('pongCanvas');
    var FPS = 30;
    var game = new Game(el);
    setInterval(() => {
        game.update();
        game.draw();
    }, 1000 / FPS);
});