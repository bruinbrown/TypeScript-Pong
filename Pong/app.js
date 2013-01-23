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
    Object.defineProperty(Paddle.prototype, "Length", {
        get: function () {
            return this.length;
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
                this.X = maxWidth - (this.paddleWidth / 2);
                break;

            }
            case 'left': {
                this.X = this.paddleWidth / 2;
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
        canvasContext.lineWidth = this.paddleWidth;
        canvasContext.moveTo(this.X, this.Y);
        canvasContext.lineWidth = this.paddleWidth;
        canvasContext.lineTo(this.X, this.Y + this.length);
    };
    Paddle.prototype.update = function (distanceChange) {
        this.Y += distanceChange;
    };
    return Paddle;
})();
var Player = (function () {
    function Player(listenUp, listenDown, game, side) {
        this.game = game;
        this.side = side;
        this.score = 0;
        this.listenDown = listenDown.toLowerCase();
        this.listenUp = listenUp.toLowerCase();
        this.paddle = new Paddle();
        this.paddle.setSide(side, game._canvasWidth);
        this.paddle.resetPosition(game._canvasHeight);
    }
    Player.prototype.update = function (keysDown, ball) {
        var change = 0;
        if(keysDown[this.listenUp] && this.paddle.Y > 0) {
            change -= 5;
        }
        if(keysDown[this.listenDown] && ((this.paddle.Y + this.paddle.Length) < this.game._canvasHeight)) {
            change += 5;
        }
        switch(this.side) {
            case 'left': {
                if((ball.x < (this.paddle.X + this.paddle.Width)) && (ball.x > 0) && (ball.y > this.paddle.Y) && (ball.y < (this.paddle.Y + this.paddle.Length))) {
                    ball.flipDirection();
                } else {
                    if(ball.x < 0) {
                        return true;
                    }
                }
                break;

            }
            case 'right': {
                if((ball.x > (this.game._canvasWidth - this.paddle.Width)) && (ball.x < this.game._canvasWidth) && (ball.y > this.paddle.Y) && (ball.y < (this.paddle.Y + this.paddle.Length))) {
                    ball.flipDirection();
                } else {
                    if(ball.x > this.game._canvasWidth) {
                        return true;
                    }
                }

            }
            default: {
                break;

            }
        }
        this.paddle.update(change);
        return false;
    };
    Player.prototype.draw = function (canvasContext) {
        this.paddle.draw(canvasContext);
        canvasContext.font = '30pt calibri';
        switch(this.side) {
            case 'left': {
                canvasContext.fillText(this.Score.toString(), 20, 40);
                break;

            }
            case 'right': {
                canvasContext.fillText(this.Score.toString(), this.game._canvasWidth - 50, 40);
                break;

            }
            default: {
                break;

            }
        }
    };
    Player.prototype.reset = function () {
        this.paddle.resetPosition(this.game._canvasHeight);
    };
    Player.prototype.win = function () {
        this.score++;
    };
    Object.defineProperty(Player.prototype, "Score", {
        get: function () {
            return this.score;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
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
            _this.keysDown[_this.keyName(e)] = false;
        });
        this._ball = new Ball(this._canvasWidth / 2, this._canvasHeight / 2, this);
        this._player1 = new Player('W', 'S', this, 'left');
        this._player2 = new Player('I', 'K', this, 'right');
    }
    Game.prototype.update = function () {
        if(this._player1.update(this.keysDown, this._ball)) {
            this._player2.win();
            this.reset();
        }
        if(this._player2.update(this.keysDown, this._ball)) {
            this._player1.win();
            this.reset();
        }
        this._ball.update();
    };
    Game.prototype.draw = function () {
        this._canvasContext.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
        this._canvasContext.beginPath();
        this._ball.draw(this._canvasContext);
        this._player1.draw(this._canvasContext);
        this._player2.draw(this._canvasContext);
        this._canvasContext.stroke();
    };
    Game.prototype.reset = function () {
        this._player1.reset();
        this._player2.reset();
        this._ball.resetPosition();
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
var Ball = (function () {
    function Ball(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.width = 5;
        this.startDirection = -1;
        this.startX = x;
        this.startY = y;
        this.resetPosition();
    }
    Object.defineProperty(Ball.prototype, "Width", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Ball.prototype.resetPosition = function () {
        this.x = this.startX;
        this.y = this.startY;
        var rand = Math.floor(Math.random() * 11);
        this.startDirection = Math.pow(-1, rand);
        this.XDirection = this.startDirection * 3;
        rand = Math.floor(Math.random() * 11);
        this.startDirection = Math.pow(-1, rand);
        this.YDirection = this.startDirection * 3;
    };
    Ball.prototype.flipDirection = function () {
        this.XDirection *= -1;
    };
    Ball.prototype.update = function () {
        this.x += (2 * this.XDirection);
        this.y += (2 * this.YDirection);
        if((this.y - this.width) < 0 || (this.y + this.width) > this.game._canvasHeight) {
            this.YDirection *= -1;
        }
    };
    Ball.prototype.draw = function (canvasContext) {
        canvasContext.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    };
    return Ball;
})();
//@ sourceMappingURL=app.js.map
