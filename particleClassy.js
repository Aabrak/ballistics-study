class Particle {
    
    constructor (x, y, vx, vy, w, h, c, m, f) {
        this.x = x;
        this.y = y;
        this.vx = vx/timeSteps;
        this.vy = vy/timeSteps;
        this.w = w;
        this.h = h;
        this.c = c
        this.f = f;
        this.m = m;
        this.sel = false;
    }

    drawRectEnt (x, y, wid, hei, col) {
        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.rect(x, y, wid, hei);
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
    }

    applyForce (ang, mag) {
        this.vx = cosOf(ang)*mag;
        this.vy = sinOf(ang)*mag;
    }

    tracker() {

        if(this.x + this.w > can.width) {
            clak.currentTime = 0;
            clak.play();
            this.vx = -this.vx;
            this.x = can.width - this.w;
        }
        
        if(this.x < 0) {
            clak.currentTime = 0;
            clak.play();
            this.vx = -this.vx;
            this.x = 0;
        }
        
        if(this.y + this.h > can.height) {
            this.vy = -this.vy/1.5;
            this.y = can.height - this.h;
        }
        
        if(this.y < 0) {
            this.vy = -this.vy;
            clak.currentTime = 0;
            clak.play();this.y = 0;
        }

    }

    move() {
        this.x += this.vx/timeSteps;
        this.y += this.vy/timeSteps;

        // this.vx *= 1.000001;
        // this.vy *= 1.000001;

        // Friction
        // this.vx *= this.f;
        // this.vy *= this.f;
    }

    gravity() {

        if (this.y + this.h < can.height) {
            this.vy += 0.5/timeSteps;
        }
    
    }

    collideX(other) {
        return this.x < other.x + other.w && this.x + this.w > other.x;
    }

    collideY(other) {
        return this.y < other.y + other.h && this.y + this.h > other.y;
    }

    collide(other) {
        return this.collideX(other) && this.collideY(other);
    }

    bounceX(other) {
        let sumMX = this.m + other.m;
        let newVX = ((this.m - other.m) / sumMX) * this.vx + ((2 * other.m) / sumMX) * other.vx;
        return newVX;
    }

    bounceY(other) {
        let sumMY = this.m + other.m;
        let newVY = ((this.m - other.m) / sumMY) * this.vy + ((2 * other.m) / sumMY) * other.vy;
        return newVY;
    }

    translateBounce(other) {
        if (this.collide(other)) {
            if (this.collideX(other)) {
                const vx1 = this.bounceX(other);
                const vx2 = other.bounceX(this);
                this.vx = vx1;
                other.vx = vx2;
            }
            if (this.collideY(other)) {
                const vy1 = this.bounceY(other);
                const vy2 = other.bounceY(this);
                this.vy = vy1;
                other.vy = vy2;
            }
        }
        
    }

    selfCollide() {
        for (let i = 0; i < particles.length; i++) {
            this.translateBounce(particles[i]);
        }
    }

    selected() {
        return this.sel;
    }

    destroyOnSpeed(max) {
        if(this.vx > max || this.vy > max || this.vx < -max || this.vy < -max) {
            kill.currentTime = 0;
            kill.play();
            return true;
        }
    }

}

let particles = [];

// particles.push(new Particle(can.width/2, 200, 0, 0, 50, 50, "rgba(200, 200, 0, 1)", true, 0.995));
// particles.push(new Particle(can.width/2, 300, 0, 0, 40, 40, "rgba(200, 200, 0, 1)", true, 0.995));

let newPart = (x, y, w, h, c, m) => {
    particles.push(new Particle(x, y, 0, 0, w, h, c, m, timeStepsFrictionFix ));
    console.log(particles[0].f);
}
let newPartDefault = () => {
    newPart(range(50, 1400), range(0, 500), 50, 50, "rgba(200, 200, 0, 1)", 50);
}

// ---------------------------------------- GENERATING A BUNCH OF PARTICLES
let partamount = 3;
for (let i = 0; i < partamount; i++) {
    newPart(range(50, 1400), range(0, 500), 50, 50, "rgba(200, 200, 200, 1)", 1);
} particles[0].m = 1;

// ---------------------------------------- GENERATING A BUNCH OF PARTICLES

let animParts = () => {
    if (particles.length > 0) {
        for (let i = 0; i < particles.length; i++) {
            for(let j = 0; j < timeSteps; j++) {
                particles[i].tracker();
                particles[i].move();
                particles[i].gravity();
                particles[i].selfCollide();
            }
            
            particles[i].drawRectEnt(particles[i].x, particles[i].y, particles[i].w, particles[i].h, particles[i].c);
            why.innerHTML = `X vel: ${Math.floor(particles[0].vx)}<br>Y vel: ${Math.floor(particles[0].vy)}`
            if(particles[i].destroyOnSpeed(800)) particles.splice(particles.indexOf(i));
            // if (!holdingClick) particles[i].gravity();
        }
    }
};