/************************************************
 * GENUARY 2025 - JAN 1
 * "Vertical or horizontal lines only."
 ************************************************/

let points = [];
let centerX;
let centerY;
let length;
let colors;

function setup() {
    // Setup
    colors = [color('#202030'), color('#B0A990'), color('#B6244F')];
    windowWidth = 800;
    windowHeight = 800;
    createCanvas(windowWidth, windowHeight);
    background(colors[0]);
    rectMode(CENTER);
    fill(colors[0]);
    strokeWeight(1);

    // Center points around a square with some border
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    if (windowHeight > windowWidth) length = windowWidth/2 - windowWidth/10;
    else length = windowHeight/2 - windowHeight/10;

    // Create points
    const density = 1000;
    for (let i = 0; i < density; i++) {
        const x = centerX + random(-length, length);
        const y = centerY + random(-length, length);
        const p = { x: x, y: y, w: 0, h: 0, growWidth: true, growHeight: true };
        // Vary the color based on a noise map
        p.color = colors[1+ floor(noise(p.x/100,p.y/100) * 2)];
        // p.strokeWeight = noise(p.x/100, p.y/100) * 5;
        p.strokeWeight = 3;
        points.push(p);
    }
}

function draw() {
    // Clear canavs on every draw
    background(colors[0]);

    // Grow rectangle step
    const max = 200;
    points.forEach((p) => {
        if (p.growWidth) p.w += 1;
        const widthTouching = leftOrRightTouching(p);
        if (p.w > max) widthTouching.push(p);
        widthTouching.forEach((tp) => { tp.growWidth = false; tp.w -=1; });
        if (p.growHeight) p.h += 1;
        const heightTouching = topOrBottomTouching(p);
        if (p.h > max) heightTouching.push(p);
        heightTouching.forEach((tp) => { tp.growHeight = false; tp.h -= 1; });
    });

    // Draw final rectangles
    points.forEach((p) => {
        stroke(p.color);
        strokeWeight(p.strokeWeight);
        rect(p.x, p.y, p.w, p.h);
    });

    // Stop loop if no more growers
    if (points.every(p => !p.growHeight && !p.growWidth )) {
        noLoop();
    }
}

function getBounds(p) {
    return {
        top: p.y - p.h / 2,
        bottom: p.y + p.h / 2,
        left: p.x - p.w / 2,
        right: p.x + p.w / 2
    };
}

function isWidthTouching(b1, b2) {
    const inYBounds = (b2.top >= b1.top && b2.top <= b1.bottom) ||
                      (b2.bottom <= b1.bottom && b2.bottom >= b1.top);
    const touching = (b2.right >= b1.left && b2.left <= b1.left) ||
                     (b2.left <= b1.right && b2.right >= b1.right);
    return inYBounds && touching;
}

function isHeightTouching(b1, b2) {
    const inXBounds = (b2.left <= b1.right && b2.left >= b1.left) ||
                      (b2.right >= b1.left && b2.right <= b1.right);
    const touching = (b2.bottom >= b1.top && b2.top <= b1.top) ||
                     (b2.top <= b1.bottom && b2.bottom >= b1.bottom);
    return inXBounds && touching;
}

function leftOrRightTouching(p1) {
    const touchingPoints = [];
    points.forEach((p2) => {
        if (p1 == p2) return;
        const b1 = getBounds(p1);
        const b2 = getBounds(p2);
        if (isWidthTouching(b1, b2)) touchingPoints.push(p2);
    });
    if (touchingPoints.length > 0) touchingPoints.push(p1);
    return touchingPoints;
}

function topOrBottomTouching(p1) {
    const touchingPoints = [];
    points.forEach((p2) => {
        if (p1 == p2) return;
        const b1 = getBounds(p1);
        const b2 = getBounds(p2);
        if (isHeightTouching(b1, b2)) touchingPoints.push(p2);
    });
    if (touchingPoints.length > 0) touchingPoints.push(p1);
    return touchingPoints;
}
