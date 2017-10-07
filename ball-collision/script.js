//'use strict';
const FRAMES = 120;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// ****************************************************************************************

var balls = [];
for (let i = 0; i < 250; i++) {
    var isGood = false;
    var ball = {};
    while(!isGood) {
        isGood = true;
        ball = new Ball(getRandomInt(20, 780), getRandomInt(20, 580), 1, 10);
        for (let j = 0; j < balls.length; j++) {
            let dist = Vector2D.sub(ball.position, balls[j].position).mag();
            if (dist < ball.r + balls[j].r) {
                isGood = false;
            }
        }
    }
    balls.push(ball);

    if (balls[i].position.x > canvas.width / 2) balls[i].color = 'white';
    else balls[i].color = 'black';

    balls[i].velocity = new Vector2D(getRandomFloat(-2, 2, 3), getRandomFloat(-2, 2, 3));
}
balls[0].color = 'red';

var timer = setInterval(script, 1000 / FRAMES);

function script() {
    update();
    draw();
}

function update() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].move();
    }

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            if (balls[i] != balls[j]) {
                balls[i].bounce(balls[j]);
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }
}
