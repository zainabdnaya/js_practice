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
    get _paddle_x()
    {
        return this.paddle_x;
    }

    get _paddle_y()
    {
        return this.paddle_y;
    }

    set _paddle_x(value)
    {
        this.paddle_x = value;
    }

    set_paddle_y(value)
    {
        this.paddle_y = value;
    }

}

