const can = document.getElementById("can");
const ctx = can.getContext("2d");
const pi = Math.PI;
let frame = 0;

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

// ----
// ----
// ----

let drawRectEnt = (x, y, wid, hei, col) => {
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.rect(x, y, wid, hei);
    ctx.fill();
    ctx.closePath();
};

let drawLineEnt = (x1, y1, x2, y2) => {
    ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
};

let cu = new Particle(can.width/2, 200, 0, 0, 40, 40, "rgba(200, 200, 0, 1)", true, 0.995);
//createTrailSprite(cu, 8, 10, "rgba(0, 0, 0, 1)"); //NEEDS FIX

let loop = () => {
    
    clear();
	
	//drawSprite(); NEEDS FIX

	drawRectEnt(cu.x, cu.y, cu.w, cu.h, cu.c);	
	
	if (holdingClick) {
		drawLineEnt(cu.x + cu.w/2, cu.y + cu.h/2, cu.x + dragDistanceX + cu.w/2, cu.y + dragDistanceY + cu.h/2);
		drawLineEnt(ex1, ey1, emx, emy);
	} else {
		// If gravity is here, makes it stop falling when holding click
		cu.gravity();
	}

	cu.tracker();
	cu.move();
    
    window.requestAnimationFrame(loop);

}; window.requestAnimationFrame(loop);

// ----
// ----
// ----

document.addEventListener("mousedown", function(e){

	//clear();

	holdingClick = 1;

	e.clientX = cu.x;
	e.clientY = cu.y;

	ex1 = e.clientX;
	ey1 = e.clientY;

	// Stopping cube
	cu.vx = 0;
	cu.vy = 0;
	
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

	applyForce(cu, dragAngle(ex1+cu.w/2, ey1+cu.h/2, ex2+cu.w/2, ey2+cu.h/2), getDistance(ex1, ey1, ex2, ey2)/20 );

});