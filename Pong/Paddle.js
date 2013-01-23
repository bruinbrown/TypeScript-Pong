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
