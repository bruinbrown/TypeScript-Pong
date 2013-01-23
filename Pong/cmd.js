var Ball = (function () {
    function Ball() {
        this.width = 5;
    }
    Object.defineProperty(Ball.prototype, "Width", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Ball.prototype.update = function () {
    };
    Ball.prototype.draw = function (canvasContext) {
    };
    return Ball;
})();
var Player = (function () {
    function Player() {
        this.listenUp = 'w';
        this.listenDown = 's';
    }
    Player.prototype.update = function (keysDown) {
        var change = 0;
        if(keysDown[this.listenUp]) {
            alert("Up is being pressed");
            change -= 1;
        }
        if(keysDown[this.listenDown]) {
            change += 1;
        }
        this.paddle.update(change);
    };
    Player.prototype.draw = function (canvasContext) {
        this.paddle.draw(canvasContext);
    };
    return Player;
})();
var Paddle = (function () {
    function Paddle() {
        this.length = 40;
        this.paddleWidth = 10;
    }
    Object.defineProperty(Paddle.prototype, "Width", {
        get: function () {
            return this.paddleWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paddle, "Height", {
        get: function () {
            return length;
        },
        enumerable: true,
        configurable: true
    });
    Paddle.prototype.resetPosition = function (maxHeight) {
        this.Y = ((maxHeight / 2) - (this.length / 2));
    };
    Paddle.prototype.setSide = function (side, maxWidth) {
        switch(side.toLowerCase()) {
            case 'right': {
                this.X = maxWidth - this.paddleWidth;
                break;

            }
            case 'left': {
                this.X = 0;
                break;

            }
            default: {
                console.log("Invalid side value passed. Use left or right");
                this.X = 0;
                break;

            }
        }
    };
    Paddle.prototype.draw = function (canvasContext) {
        canvasContext.moveTo(this.X, this.Y);
        canvasContext.lineWidth = this.paddleWidth;
        canvasContext.lineTo(this.X, this.Y + this.length);
    };
    Paddle.prototype.update = function (distanceChange) {
        this.X += distanceChange;
    };
    return Paddle;
})();
var Game = (function () {
    function Game(canvas) {
        var _this = this;
        this.i = 0;
        this.keysDown = {
        };
        this._canvas = canvas;
        this._canvasHeight = canvas.height;
        this._canvasWidth = canvas.width;
        this._canvasContext = this._canvas.getContext('2d');
        $(document).bind('keydown', function (e) {
            _this.keysDown[_this.keyName(e)] = true;
        });
        $(document).bind('keyup', function (e) {
            _this.keysDown[_this.keyName(e)] = true;
        });
        this._ball = new Ball();
    }
    Game.prototype.update = function () {
        this._player1.update(this.keysDown);
    };
    Game.prototype.draw = function () {
        this._canvasContext.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    };
    Game.prototype.keyName = function (e) {
        return String.fromCharCode(e.which).toLowerCase();
    };
    return Game;
})();
$(document).ready(function (e) {
    var el = document.getElementById('pongCanvas');
    var FPS = 30;
    var game = new Game(el);
    setInterval(function () {
        game.update();
        game.draw();
    }, 1000 / FPS);
});
