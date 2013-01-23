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
        if((ball.y > this.paddle.Y) && (ball.y < (this.paddle.Y + this.paddle.Length))) {
            switch(this.side) {
                case 'left': {
                    if((ball.x < (this.paddle.X + this.paddle.Width)) && (ball.x > 0)) {
                        ball.flipDirection();
                    } else {
                        if(ball.x < 0) {
                            return true;
                        }
                    }
                    break;

                }
                case 'right': {
                    if((ball.x > (this.game._canvasWidth - this.paddle.Width)) && (ball.x < this.game._canvasWidth)) {
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
