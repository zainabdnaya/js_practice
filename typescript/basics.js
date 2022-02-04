class player {
    constructor(score, paddle_x, paddle_y, paddle_width, paddle_height, paddle_speed, ctx, color) {
        this.score = score;
        this.paddle_x = paddle_x;
        this.paddle_y = paddle_y;
        this.paddle_width = paddle_width;
        this.paddle_height = paddle_height;
        this.paddle_speed = paddle_speed;
        this.ctx = ctx;
        this.color = color;
    }
    draw_padle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddle_x, this.paddle_y, this.paddle_width, this.paddle_height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    get _paddle_x() {
        return this.paddle_x;
    }
    get _paddle_y() {
        return this.paddle_y;
    }
    set _Paddle_x(value) {
        this.paddle_x = value;
    }
    set _Paddle_y(value) {
        this.paddle_y = value;
    }
    get _paddle_height() {
        return this.paddle_height;
    }
    set _score(value) {
        this.score += value;
    }
}
class ball {
    constructor(ctx, ball_x, ball_y, ball_radius, velocity_x, velocity_y, color) {
        this.ball_x = ball_x;
        this.ball_y = ball_y;
        this.ball_radius = ball_radius;
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        this.ctx = ctx;
        this.color = color;
    }
    draw_ball() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball_x, this.ball_y, this.ball_radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    get _ball_x() {
        return this.ball_x;
    }
    get _ball_y() {
        return this.ball_y;
    }
    get _velocity_x() {
        return this.velocity_x;
    }
    get _velocity_y() {
        return this.velocity_y;
    }
    set _ball_x(value) {
        this.ball_x = value;
    }
    set _ball_y(value) {
        this.ball_y = value;
    }
    set _velocity_x(value) {
        this.velocity_x = value;
    }
    set _velocity_y(value) {
        this.velocity_y = value;
    }
    get _ball_radius() {
        return this.ball_radius;
    }
}
class game {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.uppress = false;
        this.downpress = false;
        this.uppress1 = false;
        this.downpress1 = false;
        this.paddle_left = new player(0, 10, this.canvas.height / 2, 10, 80, 1, this.ctx, "white");
        this.paddle_right = new player(0, this.canvas.width - 20, (this.canvas.height) / 2, 10, 80, 1, this.ctx, "white");
        this.center_rec = new player(0, this.canvas.width / 2, 0, 1, this.canvas.height, 0, this.ctx, "white");
        this._ball = new ball(this.ctx, this.canvas.width / 2, this.canvas.height / 2, 11, 2, -2, "white");
        // this._ball.ball_x= this._ball._ball_x;
        // this._ball.ball_y = this._ball._ball_y;
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        this.start();
    }
    keyDownHandler(e) {
        if (e.key === "ArrowUp" || e.key === "Up") {
            this.uppress = true;
        }
        if (e.key === "w" || e.key === "KeyW") {
            this.uppress1 = true;
        }
        if (e.key === "ArrowDown" || e.key === "Down") {
            this.downpress = true;
        }
        if (e.key === "s" || e.key === "KeyS") {
            this.downpress1 = true;
        }
    }
    keyUpHandler(e) {
        if (e.key === "ArrowUp" || e.key === "Up") {
            this.uppress = false;
        }
        if (e.key === "w" || e.key === "KeyW") {
            this.uppress1 = false;
        }
        if (e.key === "ArrowDown" || e.key === "Down") {
            this.downpress = false;
        }
        if (e.key === "s" || e.key === "KeyS") {
            this.downpress1 = false;
        }
    }
    keyhook() {
        if (this.uppress === true) {
            this.paddle_left.paddle_y -= 2;
            if (this.paddle_left.paddle_y < 0) {
                this.paddle_left.paddle_y = 0;
            }
        }
        if (this.uppress1) {
            this.paddle_right.paddle_y -= 2;
            if (this.paddle_right._paddle_y < 0) {
                this.paddle_right.paddle_y = 0;
            }
        }
        if (this.downpress) {
            this.paddle_left.paddle_y += 4;
            if (this.paddle_left.paddle_y + this.paddle_left._paddle_height < 0) {
                this.paddle_left.paddle_y = this.canvas.height - this.paddle_left._paddle_height;
            }
        }
        if (this.downpress1) {
            this.paddle_right.paddle_y++;
            if (this.paddle_right._paddle_y + this.paddle_right._paddle_height < 0) {
                this.paddle_left.paddle_y = this.canvas.height - this.paddle_right._paddle_height;
                // this.paddle_right._Paddle_y();
            }
        }
    }
    collisionDetection() {
        if (this._ball.ball_y + this._ball._velocity_y < this._ball._ball_radius) {
            this._ball._velocity_y = -this._ball._velocity_y;
        }
        else if (this._ball.ball_y + this._ball._velocity_y >
            this.canvas.height - this._ball._ball_radius) {
            //ball hits the bottom
            this._ball._velocity_y = -this._ball._velocity_y;
        }
        // ball hits rihgt paddle
        if (this._ball.ball_x + this._ball._velocity_y >
            this.canvas.width - this._ball._ball_radius - this.paddle_right._paddle_height) {
            if (this._ball.ball_y > this.paddle_right._paddle_y &&
                this._ball.ball_y < this.paddle_right._paddle_y + this.paddle_right._paddle_height) {
                this._ball._velocity_y = -this._ball._velocity_y;
            }
            else {
                // this.paddle_right._score(1);
                this._ball.ball_x = this.canvas.width / 2;
                this._ball.ball_y = this.canvas.height - this.paddle_right._paddle_height;
                this._ball._velocity_y = 1;
                this._ball._velocity_y = -1;
                // this.paddle_left._Paddle_y((
                //     this.canvas.height - this.paddle_right._paddle_height
                // ) / 2);
                // this.paddle_right._Paddle_y((
                //     this.canvas.height - this.paddle_right._paddle_height
                // ) / 2);
            }
        }
        // balls hits left paddle
        if (this._ball.ball_x + this._ball._velocity_y <
            this._ball._ball_radius + this.paddle_right._paddle_height) {
            if (this._ball.ball_y > this.paddle_right._paddle_y &&
                this._ball.ball_y < this.paddle_right._paddle_y + this.paddle_right._paddle_height) {
                this._ball._velocity_y = -this._ball._velocity_y;
            }
            else {
                // this.paddle_left._score(1);
                this._ball.ball_x = this.canvas.width / 2;
                this._ball.ball_y = this.canvas.height - this.paddle_right._paddle_height;
                this._ball._velocity_y = 2;
                this._ball._velocity_x = -2;
                this.paddle_left.paddle_x = ((this.canvas.height - this.paddle_left._paddle_height) / 2);
                this.paddle_right.paddle_x = ((this.canvas.height - this.paddle_right._paddle_height) / 2);
            }
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle_left.draw_padle();
        this.paddle_right.draw_padle();
        this._ball.draw_ball();
        this.center_rec.draw_padle();
    }
    start() {
        this.keyhook();
        this.draw();
        // setInterval(() => {
        this._ball.ball_x += this._ball._velocity_x;
        this._ball.ball_y += this._ball._velocity_y;
        this.collisionDetection();
        requestAnimationFrame(() => this.start());
        // }, 1);
    }
}
var begin = new game();