const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, width, color) {
        this.width = width;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;
        this.distanceFromCenter = getRandomInt(20, 50);
        this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    
        this.centerPosition = {
            x: x,
            y: y
        };
        this.trail = [];
    }

    draw() {
        for (let i = 0; i < this.trail.length - 1; i++) {
            let opacity = 0 + i * 0.05;
            let trailColor = this.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');

            ctx.beginPath();
            ctx.lineWidth = this.width;
            ctx.strokeStyle = trailColor;
            ctx.moveTo(this.trail[i].x, this.trail[i].y);
            ctx.lineTo(this.trail[i+1].x, this.trail[i+1].y);
            ctx.stroke();
            ctx.closePath();
        }
    }

    update() {

        this.radians += this.velocity;
        this.centerPosition.x += (mouse.x - this.centerPosition.x) * 0.1;
        this.centerPosition.y += (mouse.y - this.centerPosition.y) * 0.1;

        this.x = this.centerPosition.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.centerPosition.y + Math.sin(this.radians) * this.distanceFromCenter;

        this.trail.push({ x: this.x, y: this.y });
        while (this.trail.length > 22) {
            this.trail.shift();
        }

        this.draw();
    }
}

let mouse = {
    x: canvas.width/2,
    y: canvas.height/2
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

let parts = [];
for (let i = 0; i < 50; i++) {
    let colorR = getRandomInt(0, 255);
    let colorG = getRandomInt(100, 255);
    let colorB = getRandomInt(200, 255);
    let partColor = `rgb(${colorR},${colorG},${colorB})`;
    parts.push(new Particle(canvas.width/2, canvas.height/2, 2, partColor))
}

let animate = function() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    for (let i = 0; i < parts.length; i++) {
        parts[i].update();
    }
    window.requestAnimationFrame(animate);
}

animate();


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}