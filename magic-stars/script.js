var Particle = function(parent, x, y) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.particle = undefined;
    this.svg = undefined;
    this.path = undefined;
    this.lifeTimer = undefined;
    this.lifeTime = 1400;
}
Particle.prototype.create = function() {
    this.particle = document.createElement('div');
    this.particle.classList.add('star-container');
    this.particle.classList.add('star-' + getRandomInt(1, 4));
    this.particle.style.left = this.x + getRandomInt(-10, 10) + 'px';
    this.particle.style.top = this.y + getRandomInt(-10, 10) + 'px';

    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.classList.add('star-svg');
    this.svg.setAttribute('viewBox', '0 0 100 100');
    this.svg.setAttribute('preserveAspectRatio', 'none');

    this.path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    this.path.classList.add('star-path');
    this.path.setAttribute('d', 'M 50.000 72.000 L 75.863 85.597 L 70.923 56.798 L 91.846 36.403 L 62.931 32.202 L 50.000 6.000 L 37.069 32.202 L 8.154 36.403 L 29.077 56.798 L 24.137 85.597 L 50.000 72.000');
    
    this.svg.appendChild(this.path);
    this.particle.appendChild(this.svg);
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

var generateStar = function() {
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    var x = getRandomInt(0, width);
    var y = getRandomInt(0, height);
    new Particle(container, x, y).init();
}

setInterval(generateStar, 15)



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max, fixed) {
    return Number((Math.random() * (max - min) + min).toFixed(fixed));
}