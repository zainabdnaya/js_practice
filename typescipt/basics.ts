
class player 
{
    score : number;
    paddle_x : number;
    paddle_y : number;
    paddle_width : number;
    paddle_height : number;
    paddle_speed : number;
    ctx : CanvasRenderingContext2D;
    color : string;
    constructor(score:number, paddle_x:number, paddle_y:number, paddle_width:number, paddle_height:number, paddle_speed:number, ctx:CanvasRenderingContext2D,color:string)
    {
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
    public get _paddle_x()
    {
        return this.paddle_x;
    }

    public get _paddle_y()
    {
        return this.paddle_y;
    }

    public set _Paddle_x(value)
    {
        this.paddle_x = value;
    }

    public set _Paddle_y(value)
    {
        this.paddle_y = value;
    }

    public get _paddle_height()
    {
        return this.paddle_height;
    }
    public set _score(value)
    {
        this.score += value;
    }


}



class game
{
    canvas : HTMLCanvasElement;
    ctx : CanvasRenderingContext2D;
    ball_x : number;
    ball_y : number;
    ball_radius : number;
    ball_speed_x : number;
    ball_speed_y : number;
    paddle_right : player;
    paddle_left : player;
    game_over : boolean;
    winner : string;
    uppress:boolean;
    downpress:boolean;
    velocity_x : number;
    velocity_y : number;
    center_rec:player;
    uppress1 : boolean;
    downpress1 : boolean;

    x: number ;
    y: number ;

    constructor()
    {
        this.canvas = <HTMLCanvasElement>document.getElementById("game_canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ball_x = this.canvas.width / 2;
        this.ball_y = this.canvas.height / 2;
        this.ball_radius = 10;
        this.velocity_x = 0.5;
        this.velocity_y = -0.5;
        this.uppress = false;
        this.downpress = false;
        this.uppress1 = false;
        this.downpress1 = false;
        this.paddle_left = new player(0, 10,(this.canvas.height - 80) / 2, this.canvas.height / 2, 80, 1, this.ctx, "white");
        this.paddle_right = new player(0,this.canvas.width - 20 , this.canvas.width - 10, (this.canvas.height - 80) / 2, 80, 1, this.ctx, "white");
        this.center_rec = new player(0,this.canvas.width / 2, 0,1, this.canvas.height,0, this.ctx, "white");
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
    }

    draw_ball() 
    {
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.ball_radius,0, Math.PI * 2);
        this.ctx.fillStyle = "#FFFF";
        this.ctx.fill();
        this.ctx.closePath();   
    }
    keyDownHandler(e:KeyboardEvent) {
        if (e.key == "ArrowUp" || e.key == "Up") {
            this.uppress = true;
        }
        if (e.key == "w" || e.key == "KeyW") {
            this.uppress1 = true;
        }
        if (e.key == "ArrowDown" || e.key == "Down") {
            this.downpress = true;
        }
        if (e.key == "s" || e.key == "KeyS") {
            this.downpress1 = true;
        }
    }
    
     keyUpHandler(e:KeyboardEvent) 
     {
    
        if (e.key == "ArrowUp" || e.key == "Up") {
            this.uppress = false;
        }
        if (e.key == "w" || e.key == "KeyW") {
            this.uppress1 = false;
        }
        if (e.key == "ArrowDown" || e.key == "Down") {
            this.downpress = false;
        }
        if (e.key == "s" || e.key == "KeyS") {
            this.downpress1 = false;
        }

    }

    keyhook()
    { 
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("keydown", this.keyDownHandler, false);
        if (this.uppress) {
            this.paddle_left._Paddle_y(this.paddle_left._paddle_y   -1);
            if (this.paddle_left._paddle_y < 0) {
                this.paddle_left._Paddle_y(0);
            }
        }
         if (this.uppress1) {
            this.paddle_right._Paddle_y(this.paddle_right._paddle_y   -1);
            if (this.paddle_right._paddle_y < 0) {
                this.paddle_right._Paddle_y(0);
            }
        }
         if (this.downpress) {
            this.paddle_left._Paddle_y(this.paddle_left._paddle_y   + 1);
            if ((this.paddle_left._paddle_y  + this.paddle_left._paddle_height) < 0) {
                this.paddle_left._Paddle_y(this.canvas.height - this.paddle_left._paddle_height);
            }
           
        }
         if (this.downpress1) {
            this.paddle_right._Paddle_y(this.paddle_right._paddle_y   + 1);
            if ((this.paddle_right._paddle_y  + this.paddle_right._paddle_height) < 0) {
                this.paddle_right._Paddle_y(this.canvas.height - this.paddle_right._paddle_height);
            }
        }
    }


    collisionDetection() {
        if (this.y + this.velocity_y < this.ball_radius) { //ball hits the top
            this.velocity_y = -this.velocity_y;
        }
        else if (this.y + this.velocity_y > this.canvas.height - this.ball_radius) { //ball hits the bottom
            this.velocity_y = -this.velocity_y;
        }
    
        // ball hits rihgt paddle
        if (this.x + this.velocity_x > this.canvas.width - this.ball_radius - this.paddle_right._paddle_height) {
            if (this.y > this.paddle_right._paddle_y && this.y < this.paddle_right._paddle_y + this.paddle_right._paddle_height) {
                this.velocity_x = -this.velocity_x;
            }
            else {
                this.paddle_right._score(1);
                this.x = this.canvas.width / 2;
                this.y = this.canvas.height - this.paddle_right._paddle_height;
                this.velocity_x = 1;
                this.velocity_y = -1;
                this.paddle_left._Paddle_y (this.canvas.height - this.paddle_right._paddle_height) / 2;
                this.paddle_right._Paddle_y(this.canvas.height - this.paddle_right._paddle_height) / 2;
            }
        }
        // balls hits left paddle
        if (this.x + this.velocity_x < this.ball_radius + this.paddle_right._paddle_height) {
            if (this.y > this.paddle_right._paddle_y && this.y < this.paddle_right._paddle_y + this.paddle_right._paddle_height) {
                this.velocity_x = - this.velocity_x;
            }
            else {
                this.paddle_left._score(1);
                this.x = this.canvas.width / 2;
                this.y = this.canvas.height - this.paddle_right._paddle_height;
                this.velocity_x = -1;
                this.velocity_y = -1;
                this.paddle_left._Paddle_y((this.canvas.height - this.paddle_right._paddle_height ) / 2) ;
                this.paddle_right._Paddle_y((this.canvas.height - this.paddle_right._paddle_height ) / 2) ;
            }
        }
    
    }



}