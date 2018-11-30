// console.log('script works!');

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_ARROW_UP = 38;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_DOWN = 40;
const KEY_ARROW_RIGHT = 39;
const KEY_L = 76;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');



let drawBackground = function () {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let numberOfLinesX = Math.floor(ctx.canvas.width / 100);
    let numberOfLinesY = Math.floor(ctx.canvas.height / 100);
    for (let i = 0; i <= numberOfLinesX; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 100, 0);
        ctx.lineTo(i * 100, ctx.canvas.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
    for (let i = 0; i <= numberOfLinesX; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 100);
        ctx.lineTo(ctx.canvas.width, i * 100);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
};



let car = new Car(400, 600, 0);

let animation = function () {
    let startTime = Date.now();
    drawBackground();

    car.update();
    car.move();
    car.draw();
    let endTime = Date.now();
    // console.log(endTime - startTime);
    window.requestAnimationFrame(animation);
};
animation();

let handleKeyDown = function (event) {
    switch (event.keyCode) {
        case KEY_W:
        case KEY_ARROW_UP:
            car.forward = true;
            break;
        case KEY_A:
        case KEY_ARROW_LEFT:
            car.left = true;
            break;
        case KEY_S:
        case KEY_ARROW_DOWN:
            car.backward = true;
            break;
        case KEY_D:
        case KEY_ARROW_RIGHT:
            car.right = true;
            break;
        case KEY_L:
            car.lights = !car.lights;
            break;
    }
};
let handleKeyUp = function (event) {
    switch (event.keyCode) {
        case KEY_W:
        case KEY_ARROW_UP:
            car.forward = false;
            break;
        case KEY_A:
        case KEY_ARROW_LEFT:
            car.left = false;
            break;
        case KEY_S:
        case KEY_ARROW_DOWN:
            car.backward = false;
            break;
        case KEY_D:
        case KEY_ARROW_RIGHT:
            car.right = false;
            break;
    }
};

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);










