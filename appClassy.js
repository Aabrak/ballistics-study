const can = document.getElementById("can");
const ctx = can.getContext("2d");
const why = document.getElementById("why");
const pi = Math.PI;
let frame = 0;
var clak = new Audio('clak.wav');
var kill = new Audio('killsend.wav');

let ex1 = 0;
let ey1 = 0;
let ex2 = 0;
let ey2 = 0;
let emx = 0;
let emy = 0;
let holdingClick = 0;
let friction = 0.995;
let dragDistanceX = 0;
let dragDistanceY = 0;
const timeSteps = 10000;
const timeStepsFrictionFix = parseFloat(`0.99${Math.floor(timeSteps / 9)*9}5`);
let count = 0;


let resizeCanvas = (wid, hei) => {
    can.width = wid;
    can.height = hei;
}; resizeCanvas(window.innerWidth, window.innerHeight);

let clear = () => {
    ctx.clearRect(0, 0, can.width, can.height);
};

let cosOf = (ang) => {
    return Math.cos(ang * (pi/180));
};

let cosMi = (ang) => {
    return Math.acos(ang * (180/pi));
};

let sinOf = (ang) => {
    return Math.sin(ang * (pi/180));
};

let sinMi = (ang) => {
    return Math.asin(ang * (180/pi));
};

let tanOf = (ang) => {
    return Math.tan(ang * (pi/180));
};

let tanMi = (ang) => {
    return Math.atan(ang * (180/pi));
};

let range = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

let applyForce = (ent, ang, mag) => {
    ent.vx = cosOf(ang)*mag;
    ent.vy = sinOf(ang)*mag;
};

let dragAngle = (x1, y1, x2, y2) => {

	let adj = x2 - x1;

	let opp = y2 - y1;

	let tanA = Math.atan(opp / adj);

	let angle = tanA * 180/Math.PI;
	
	if (adj > 0) {
		
		return angle;

	} else if (adj < 0) {

		return angle + 180;

	}

};

let getDistance = (x1, y1, x2, y2) => {

	let adj = x2 - x1;
	let opp = y2 - y1;

	let hyp = Math.hypot(adj, opp);

	return hyp;

};

let drawLineEnt = (x1, y1, x2, y2) => {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
};
// ----
// ----
// ----

// let drawRectEnt = (x, y, wid, hei, col) => {
//     ctx.beginPath();
//     ctx.fillStyle = col;
//     ctx.rect(x, y, wid, hei);
//     ctx.fill();
//     ctx.closePath();
// };


//createTrailSprite(cu, 8, 10, "rgba(0, 0, 0, 1)"); //NEEDS FIX

let loop = () => {
    
	clear();
	
	if (holdingClick) {

		if (particles.length != 0) {
			for (let i = 0; i < particles.length; i++) {
				if (particles[i].sel) drawLineEnt(particles[i].x + particles[i].w/2, particles[i].y + particles[i].h/2, particles[i].x + dragDistanceX + particles[i].w/2, particles[i].y + dragDistanceY + particles[i].h/2);
			}
		}

		drawLineEnt(ex1, ey1, emx, emy);
	}

	// newPartDefault();
	// if (particles.length > 10) particles.shift();

	animParts();
    
    window.requestAnimationFrame(loop);

}; window.requestAnimationFrame(loop);

// ----
// ----
// ----

document.addEventListener("mousedown", function(e){

	//clear();

	holdingClick = 1;

    ex1 = e.clientX;
	ey1 = e.clientY;

	for (let i = 0; i < particles.length; i++) {
		if (e.clientX > particles[i].x && e.clientX < particles[i].x + particles[i].w && e.clientY > particles[i].y && e.clientY < particles[i].y + particles[i].h) {
			particles[i].sel = true;
		} else {
			particles[i].sel = false;
		}
	}
	

	// Stopping cube
	// cu.vx = 0;
	// cu.vy = 0;
	
	// Reposition on mouse
	//cu.x = ex1 - cu.w / 2;
	//cu.y = ey1 - cu.h / 2;

});

document.addEventListener("mousemove", function(e){

    emx = e.clientX;
	emy = e.clientY;

	dragDistanceX = emx - ex1;
	dragDistanceY = emy - ey1;

});

document.addEventListener("mouseup", function(e){

	holdingClick = 0;

    ex2 = e.clientX;
	ey2 = e.clientY;

	if (particles.length != 0) {
        for (let i = 0; i < particles.length; i++) {
			if (particles[i].selected()) {
				applyForce(particles[i], dragAngle(ex1+particles[i].w/2, ey1+particles[i].h/2, ex2+particles[i].w/2, ey2+particles[i].h/2), getDistance(ex1, ey1, ex2, ey2)/20);
			}
        }
	}

});