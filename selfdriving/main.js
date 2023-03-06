const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const h = window.innerHeight;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 400;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width * 0.9)
var you = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");

var N=150;
if(localStorage.getItem("numCars"))
{
    N = JSON.parse(localStorage.getItem("numCars"));
    document.getElementById("carnum").value = JSON.parse(localStorage.getItem("numCars"));
}

var cars = [];

cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i = 0; i < cars.length; i++)
    {
        cars[i].brain = JSON.parse(
        localStorage.getItem("bestBrain"));
        if(i != 0){
            NeuralNetwork.mutate(cars[i].brain, 0.2);
        }
    }
    
}


const traffic = [
    // new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 1.5),
    // new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 1.5),
    // new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 1.5),
    // new Car(road.getLaneCenter(2), -450, 30, 50, "DUMMY", 1.5),
    // new Car(road.getLaneCenter(1), -450, 30, 50, "DUMMY", 1.5)
];
const cras = h/150;
for(let i = 0; i < cras -1; i++)
{
    let inUse = road.getLaneCenter(Math.floor(Math.random()*3));
    traffic.push(new Car(inUse, -150 * i, 30, 50, "DUMMY", 1.5));
    if(Math.random() > 0.5){
        let second = road.getLaneCenter(Math.floor(Math.random()*3));
        if(second != inUse)
        {
            traffic.push(new Car(second, -150 * i, 30, 50, "DUMMY", 1.5));
        }
        
    }
}
function generateCars(N){
    const cars = [];
    for(let i = 0; i <= N; i++)
    {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}
animate();

function save(){
    if(confirm("You are updating the saved AI to the best current one."))
    {
        localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain));
    }
    
}

function discard()
{
    if(confirm("You are discarding the saved AI and starting from scratch."))
    {
    localStorage.removeItem("bestBrain");
    }
}
function spawnCar(){
    you = new Car(bestCar.x, bestCar.y, 30, 50, "KEYS");
}

    var interval = 3000;
    var lastTime = 0;
    var carTimer = 0;

function animate(time){

    const deltatime = time - lastTime;
    lastTime = time;

    for(let i = 0; i < traffic.length; i++)
    {
        traffic[i].update(road.borders, [], bestCar.y, h);
    }
    for(let i = 0; i<cars.length;i++)
    {
        cars[i].update(road.borders, traffic, bestCar.y, h);
    }
    you.update(road.borders, traffic, bestCar.y, h);
    bestCar = cars.find(
        c=>c.y==Math.min(
        ...cars.map(c=>c.y)
    ));
    
    localStorage.setItem("numCars", JSON.stringify(document.getElementById("carnum").value));
    document.getElementById("vals").innerHTML = "Number of cars next time: " + document.getElementById("carnum").value;
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for(let i = 0; i < traffic.length; i++)
    {
        traffic[i].draw(carCtx, "black");
    }

    carCtx.globalAlpha = 0.2;

    for(let i = 0; i<cars.length;i++)
    {
        cars[i].draw(carCtx, "blue");
    }

    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);
    you.draw(carCtx, "red", false);
    carCtx.restore();

    networkCtx.lineDashOffset = -time/50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}