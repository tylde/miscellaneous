class Car {
    constructor(x, y, alpha) {
        this.x = x;
        this.y = y;
        this.alpha = alpha;
        this.beta = 0;
        this.velocity = 0;
        this.maxVelocity = 3;

        this.acceleration = 0.1;

        this.width = 15;
        this.length = 25;

        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;

        this.lights = false;

        this.dbeta = 2 * 75 / 60;

        this.maxSteerAngle = 35;

        this.wheelLength = 4;
        this.wheelWidth = 2;
    }

    update() {
        // MOVEMENT LEFT/RIGHT
        if (this.left === true && this.right === false) {
            this.beta -= this.dbeta;
            if (this.beta < -this.maxSteerAngle) this.beta = -this.maxSteerAngle;
        }
        else if (this.left === false && this.right === true) {
            this.beta += this.dbeta;
            if (this.beta > this.maxSteerAngle) this.beta = this.maxSteerAngle;
        }
        else if (this.left === false && this.right === false) {
            this.beta *= 0.9;
            if (-1 < this.beta && this.beta < 1) this.beta = 0;
        }
        // MOVEMENT FORWARD/BACKWARD
        if (this.forward === true && this.backward === false) {
            this.velocity += this.acceleration;
            console.log(this.acceleration, this.velocity);
            if (this.velocity > this.maxVelocity) this.velocity = this.maxVelocity;
        }
        else if (this.forward === false && this.backward === true) {
            this.velocity -= this.acceleration / 2;
            if (this.velocity < 0) this.velocity = 0;
        }

        if (-0.1 < this.velocity && this.velocity < 0.1) this.velocity = 0;


    }

    move() {
        // // CHANGE ALPHA
        // if (this.velocity > 0.01) this.alpha += this.beta / 10;
        // else if (this.velocity < -0.01) this.alpha -= this.beta / 10;

        // // CHANGE POSITION
        // this.x += this.velocity * Math.cos(this.alpha * Math.PI / 180);
        // this.y += this.velocity * Math.sin(this.alpha * Math.PI / 180);



        // CHANGE ALPHA
        const radius = (2 * this.length) / Math.sin(2 * this.beta * Math.PI / 180);
        const dalpha = (360 * this.velocity) / (2 * Math.PI * radius);

        const dx = this.velocity * Math.cos(dalpha * Math.PI / 180);
        const dy = this.velocity * Math.sin(dalpha * Math.PI / 180);

        const dxFinal = dx * Math.cos(this.alpha * Math.PI / 180) - dy * Math.sin(this.alpha * Math.PI / 180);
        const dyFinal = dy * Math.cos(this.alpha * Math.PI / 180) - dx * Math.sin(this.alpha * Math.PI / 180);

        // CHANGE POSITION
        this.x += dxFinal;
        this.y += -dyFinal;
        this.alpha += dalpha;
        // console.log(
        //     Math.floor(100 * dxFinal) / 100,
        //     Math.floor(100 * dyFinal) / 100,
        //     Math.floor(100 * dalpha) / 100,
        // );


    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.alpha * Math.PI / 180);

        // CAR
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'crimson';
        ctx.rect(-this.length / 2, -this.width / 2, this.length, this.width);
        // ctx.fillStyle = 'red';
        // ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, 2 * Math.PI);
        ctx.strokeStyle = 'crimson';
        ctx.fillStyle = 'crimson';
        ctx.stroke();
        ctx.fill();

        // =================

        // BACK LIGHTS
        ctx.lineWidth = 1;
        if ((this.velocity > 0 && this.backward === true) || (this.velocity < 0 && this.forward === true)) ctx.strokeStyle = 'red';
        else ctx.strokeStyle = 'red';

        ctx.beginPath();
        ctx.moveTo(-this.length / 2 - 2, -this.width / 2);
        ctx.lineTo(-this.length / 2 - 2, -this.width / 2 + 6);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-this.length / 2 - 2, this.width / 2 - 6);
        ctx.lineTo(-this.length / 2 - 2, this.width / 2);
        ctx.stroke();

        // BACK LIGHTS SHADOW
        if ((this.velocity > 0 && this.backward === true) || (this.velocity < 0 && this.forward === true)) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'red';

            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.moveTo(-this.length / 2 - 5, -this.width / 2 - 1);
            ctx.lineTo(-this.length / 2 - 5, -this.width / 2 + 7);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-this.length / 2 - 5, this.width / 2 - 7);
            ctx.lineTo(-this.length / 2 - 5, this.width / 2 + 1);
            ctx.stroke();

            ctx.globalAlpha = 1;
        }


        // FRONT LIGHTS
        ctx.lineWidth = 1;
        if (this.lights === true) ctx.strokeStyle = 'orange';
        else ctx.strokeStyle = 'yellow';


        ctx.beginPath();
        ctx.moveTo(this.length / 2 + 2, -this.width / 2);
        ctx.lineTo(this.length / 2 + 2, -this.width / 2 + 4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.length / 2 + 2, this.width / 2 - 4);
        ctx.lineTo(this.length / 2 + 2, this.width / 2);
        ctx.stroke();

        // FRONT LIGHTS SHADOW

        if (this.lights === true) {
            ctx.globalAlpha = 0.1;

            ctx.beginPath();
            ctx.moveTo(this.length / 2 + 10, -this.width / 2 + 2);
            ctx.arc(this.length / 2 + 10, -this.width / 2 + 2, 75, -0.10 * Math.PI, 0.10 * Math.PI);
            ctx.strokeStyle = 'yellow';
            ctx.fillStyle = 'yellow';
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(this.length / 2 + 10, this.width / 2 - 2);
            ctx.arc(this.length / 2 + 10, this.width / 2 - 2, 75, -0.10 * Math.PI, 0.10 * Math.PI);
            ctx.strokeStyle = 'yellow';
            ctx.fillStyle = 'yellow';
            ctx.closePath();
            ctx.fill();

            ctx.globalAlpha = 1;
        }





        // =================

        ctx.lineWidth = this.wheelWidth;
        ctx.strokeStyle = 'white';

        // REAR LEFT
        ctx.beginPath();
        ctx.moveTo(-this.length / 2 - this.wheelLength, -this.width / 2 - 4);
        ctx.lineTo(-this.length / 2 + this.wheelLength, -this.width / 2 - 4);
        ctx.stroke();

        // REAR RIGHT
        ctx.beginPath();
        ctx.moveTo(-this.length / 2 - this.wheelLength, this.width / 2 + 4);
        ctx.lineTo(-this.length / 2 + this.wheelLength, this.width / 2 + 4);
        ctx.stroke();

        // =================

        ctx.lineWidth = this.wheelWidth;
        ctx.strokeStyle = 'white';

        ctx.translate(this.length / 2, -this.width / 2);
        ctx.rotate(this.beta * Math.PI / 180);

        // FRONT LEFT
        ctx.beginPath();
        ctx.moveTo(-this.wheelLength, -4);
        ctx.lineTo(this.wheelLength, -4);
        ctx.stroke();

        ctx.rotate(-this.beta * Math.PI / 180);
        ctx.translate(0, this.width);
        ctx.rotate(this.beta * Math.PI / 180);

        // FRONT RIGHT
        ctx.beginPath();
        ctx.moveTo(-this.wheelLength, + 4);
        ctx.lineTo(this.wheelLength, + 4);
        ctx.stroke();

        ctx.restore();
    }

}