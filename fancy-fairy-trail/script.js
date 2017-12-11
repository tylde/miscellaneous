var Particle = function(parent, x, y) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.particle = undefined;
    this.lifeTimer = undefined;
    this.lifeTime = 1000;
}
Particle.prototype.create = function() {
    this.particle = document.createElement('div');
    this.particle.classList.add('ball');
    this.particle.classList.add('ball-' + getRandomInt(1, 4));
    this.particle.style.background = 'rgba(255, 255, 255, ' + getRandomFloat(0.1, 1.0, 2) + ')';
    this.particle.style.left = this.x + getRandomInt(-10, 10) + 'px';
    this.particle.style.top = this.y + getRandomInt(-10, 10) + 'px';
}
Particle.prototype.append = function() {
    this.parent.appendChild(this.particle);
    this.lifeTimer = window.setTimeout(this.destroy.bind(this), this.lifeTime);
}
Particle.prototype.init = function() {
    this.create();
    this.append();
}
Particle.prototype.destroy = function() {
    this.parent.removeChild(this.particle);
}



var container = document.getElementById('container');

var handleMouseMove = function(event) {
    new Particle(container, event.offsetX, event.offsetY).init();
}
container.addEventListener('mousemove', handleMouseMove);



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max, fixed) {
    return Number((Math.random() * (max - min) + min).toFixed(fixed));
}