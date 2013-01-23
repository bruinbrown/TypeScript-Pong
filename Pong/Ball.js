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
    Ball.prototype.update = function () {
        this.x += this.XDirection;
        this.y += this.YDirection;
        if((this.y - this.width) < 0 || (this.y + this.width) > this.game._canvasHeight) {
            this.YDirection *= -1;
        }
    };
    Ball.prototype.draw = function (canvasContext) {
        canvasContext.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    };
    return Ball;
})();
