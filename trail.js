// Requires :
/* // vars
        can
        ctx
        frame (to count which frames you're on, mainly used with requestAnimationFrame)

    // Implement this to initiate the trail effect
        createTrailSprite(entityAnchorPoint, Lifetime, Size, Color);

    // Implement this in game loop
        drawSprite();
*/

// MOVE THIS LATER SOMEWHERE WITH MISC FUNCTIONS YOU MADE
function trueOnFrame(num) {
    if(!(frame % num)) {
        return true;
    }
}
function msgOnFrame(num, msg) {
    if(!(frame % num)) {
        console.log(msg);
    }
}

let img_material = document.getElementById("img_material");
let img_idle = document.getElementById("img_idle");
let img_right = document.getElementById("img_right");
let img_left = document.getElementById("img_left");
// MOVE THIS LATER SOMEWHERE WITH MISC FUNCTIONS YOU MADE

class TrailSprite {

    constructor(anchor, x, y, size, color) {
        this.anchor = anchor;
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.save();
        ctx.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.restore();
		ctx.fillStyle = this.color;
		ctx.closePath();
		ctx.fill();
		ctx.strokeStyle = "#000";
		ctx.stroke();
    }

    setChildPoint() {
        if (trueOnFrame(1)) {
            this.oldX = this.x;
            this.oldY = this.y;
        }
        this.x = this.oldX;
        this.y = this.oldY;
    }

    setOriginPoint() {
        if (trueOnFrame(1)) {
            this.oldX = this.anchor.x + this.anchor.width/2;
            this.oldY = this.anchor.y + this.anchor.height/2;
        }
        this.x = this.oldX;
        this.y = this.oldY;
    }

    setSize(size) {
        if(this.size < this.anchor.width) {
            this.size = size;
        } else { this.size = this.anchor.width }
    }

}

class TrailImageSprite {

    constructor(anchor, x, y, size) {
        this.anchor = anchor;
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.save();
        ctx.drawImage(img_material, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.restore();
		ctx.strokeStyle = "#000";
		ctx.closePath();
    }

    setChildPoint() {
        if (trueOnFrame(1)) {
            this.oldX = this.x;
            this.oldY = this.y;
        }
        this.x = this.oldX;
        this.y = this.oldY;
    }

    setOriginPoint() {
        if (trueOnFrame(1)) {
            this.oldX = this.anchor.x + this.anchor.width/2;
            this.oldY = this.anchor.y + this.anchor.height/2;
        }
        this.x = this.oldX;
        this.y = this.oldY;
    }

    setSize(size) {
        if(this.size < this.anchor.width) {
            this.size = size;
        } else { this.size = this.anchor.width }
    }

}



let sprites = [];

function createTrailSprite(entity, life, size, color) {
    for (let i = 0; i < life; i++) {
        sprites.push(new TrailSprite(entity, entity.x, entity.y, size, color));
    }
} 

function createTrailImageSprite(entity, life, size) {
    for (let i = 0; i < life; i++) {
        sprites.push(new TrailImageSprite(entity, entity.x, entity.y, size));
    }
} 

function drawSprite() {
    for (let i = 0; i < sprites.length; i++) {
        if (i == sprites.length-1) {
            sprites[i].setOriginPoint();
        } else if (i < sprites.length) {
            sprites[i].setChildPoint();
            sprites[i].x = sprites[i+1].oldX;
            sprites[i].y = sprites[i+1].oldY;
        }
        sprites[i].setSize(i*8);
        sprites[i].draw();
    }
}

//createTrailSprite(ent, 8, 10, "rgba(0, 0, 0, 1)");
//createTrailImageSprite(player, 20, 5, 20);