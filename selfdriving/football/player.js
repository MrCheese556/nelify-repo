class Player{
    constructor(x, y,width, height, color, type,  maxSpeed=4.5){
        this.x = x;
        this.y = x;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        this.maxSpeed = maxSpeed;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.angle=0;

        this.controls = new Controls(type);
    }
}