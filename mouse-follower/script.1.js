const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;


class Particle {
    constructor(x, y, radius, color) {
        this.startX = x;
        this.startY = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;
        this.distanceFromCenter = getRandomInt(50, 150);
        this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    
        this.lastMouse = {
            x: x,
            y: y
        }
    }


    draw(lastPoint) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();

    }
    update() {
        const lastPoint = {
            x: this.x,
            y: this.y
        };

        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1;
        

        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        
        this.draw(lastPoint);
    }
}

let parts = [];
// let part = new Particle(canvas.width/2, canvas.height/2, 5, 'white');

let mouse = {
    x: canvas.width/2,
    y: canvas.height/2
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    console.log(mouse);
});

for (let i = 0; i < 60; i++) {
    let colorR = getRandomInt(0, 255);
    let colorG = getRandomInt(200, 255);
    let colorB = getRandomInt(200, 255);
    let partColor = `rgb(${colorR},${colorG},${colorB})`;
    parts.push(new Particle(canvas.width/2, canvas.height/2, 5, partColor))
}

console.log('test');
let animate = function() {
    // ctx.canvas.width  = window.innerWidth;
    // ctx.canvas.height = window.innerHeight;
    
    for (let i = 0; i < parts.length; i++) {
        parts[i].update();
    }

    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 26, 51, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

animate();












//

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}