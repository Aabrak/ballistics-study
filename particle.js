class Particle {
    
    constructor (x, y, vx, vy, w, h, c, g, f) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.c = c
        this.g = g;
        this.f = f;
    }

    tracker() {

        if(this.x + this.w > can.width) {
            this.vx = -this.vx;
            this.x = can.width - this.w;
        }
        
        if(this.x < 0) {
            this.vx = -this.vx;
            this.x = 0;
        }
        
        if(this.y + this.h > can.height) {
            this.vy = -this.vy/1.5;
            this.y = can.height - this.h;
        }
        
        if(this.y < 0) {
            this.vy = -this.vy;
            this.y = 0;
        }

    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= this.f;
        this.vy *= this.f
    }

    gravity() {

        if (this.y + this.h < can.height) {
            this.vy += 0.5;
        }

        if (this.y + this.h > can.height + 5 && this.y + this.h < can.height - 5) {
            this.f = 0.2;
        } else {
            this.f = 0.995
        }
    
    }

}