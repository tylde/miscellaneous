var canvas = document.getElementById('can');
c = canvas.getContext('2d');

class Drop {
    constructor (x, y, w) {
        this.x = x;
        this.y = y;
        this. w = w;
        this.dy = 2.5 * w;
    }

    move() {
        this.y += this.dy;
        if (this.y > 500)  {
            this.y = 0;
            this.x = getRandomInt(0, 900);
        }
    }

    draw() {
        //'rgb(153, 204, 255)' 'rgb(0, 107, 179)' 'rgb(0, 138, 230)'
        c.fillStyle =  'white';
        c.fillRect(this.x, this.y, this.w/3, this.w);
    }
}

var drops = [];

for(var i = 0; i < 600; i++) {
    drops.push(new Drop(getRandomInt(0, 900), getRandomInt(0, 500), getRandomInt(1, 6)));
}

function animation() {
    drawBackground();
    for(var i = 0; i < drops.length; i++) {
        drops[i].draw();
        drops[i].move();
    }

}
setInterval('animation()', 1000/60);

function drawBackground() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle =  'rgb(15, 30, 62)';
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}