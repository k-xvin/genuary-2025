let points = [];
let centerX;
let centerY;
let length;
let density;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    stroke(255);
    strokeWeight(3);

    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    length = windowWidth/2;
    density = 1000;
    for (let i = 0; i < density; i++) {
        let x = centerX + random(-length, length);
        let y = centerY + random(-length, length);
        points.push({ x: x, y: y, w: 0, h: 0, growWidth: true, growHeight: true });
    }
}

function draw() {
    // Clear canavs on every draw
    background(0);

    let max = 200;
    points.forEach((p) => {
        if (p.growWidth && p.w < max) p.w += 1;
        let widthTouching = leftOrRightTouching(p);
        widthTouching.forEach((tp) => { tp.growWidth = false; tp.w -=1; });
        if (p.growHeight && p.h < max) p.h += 1;
        let heightTouching = topOrBottomTouching(p);
        heightTouching.forEach((tp) => { tp.growHeight = false; tp.h -= 1; });
    });

    // Draw final rectangles
    rectMode(CENTER);
    fill(0);
    points.forEach((p) => {
        rect(p.x, p.y, p.w, p.h);
        // circle(p.x, p.y, 5);
    });

    // Stop loop if no more growers
    if (points.every(p => !p.growHeight && !p.growWidth )) {
        noLoop();
    }
}

function leftOrRightTouching(p1) {
    let touchingPoints = [];
    points.forEach((p2) => {
        if (p1.x != p2.x && p1.y != p2.y) {
            let p1top = p1.y - p1.h / 2;
            let p1bottom = p1.y + p1.h / 2;
            let p1left = p1.x - p1.w / 2;
            let p1right = p1.x + p1.w / 2;

            let p2top = p2.y - p2.h / 2;
            let p2bottom = p2.y + p2.h / 2;
            let p2left = p2.x - p2.w / 2;
            let p2right = p2.x + p2.w / 2;

            let topInYBounds = p2top >= p1top && p2top <= p1bottom;
            let bottomInYBounds = p2bottom <= p1bottom && p2bottom >= p1top;
            let inYBounds = topInYBounds || bottomInYBounds;
            let leftTouching = p2right >= p1left && p2left <= p1left;
            let rightTouching = p2left <= p1right && p2right >= p1right;

            if (inYBounds && (leftTouching || rightTouching)) {
                touchingPoints.push(p2);
            }
        }
    });
    if (touchingPoints.length > 0) touchingPoints.push(p1);
    return touchingPoints;
}

function topOrBottomTouching(p1) {
    let touchingPoints = [];
    points.forEach((p2) => {
        if (p1.x != p2.x && p1.y != p2.y) {
            let p1top = p1.y - p1.h / 2;
            let p1bottom = p1.y + p1.h / 2;
            let p1left = p1.x - p1.w / 2;
            let p1right = p1.x + p1.w / 2;

            let p2top = p2.y - p2.h / 2;
            let p2bottom = p2.y + p2.h / 2;
            let p2left = p2.x - p2.w / 2;
            let p2right = p2.x + p2.w / 2;

            let leftInXBounds = p2left <= p1right && p2left >= p1left;
            let rightInXBounds = p2right >= p1left &&  p2right <= p1right;
            let inXBounds = leftInXBounds || rightInXBounds;
            let topTouching = p2bottom >= p1top && p2top <= p1top;
            let bottomTouching = p2top <= p1bottom && p2bottom >= p1bottom

            if (inXBounds && (topTouching || bottomTouching)) {
                touchingPoints.push(p2);
            }
        }
    });
    if (touchingPoints.length > 0) touchingPoints.push(p1);
    return touchingPoints;

}

// function drawLineBlob(centerX, centerY, density, length) {
//     // Generate <density> number of random points, enforcing a minimum distance?

//     // Grow all rectangles outward until they intersect
//     let growing = false;
//     do {
//         growing = false;
//         points.forEach((rect1) => {
//             if (!rect1.widthGrowing) {
//                 rect1.w += 1;
//                 growing = true;
//                 // Check for intersections and mark them
//                 points.forEach((rect2) => {
//                     if ((rect1.x == rect2.x && rect1.y == rect2.y)) return;
//                     if (doesXIntersect(rect1, rect2) && doesYIntersect(rect1, rect2)) {
//                         rect1.widthGrowing = true;
//                         rect2.widthGrowing = true;
//                     }
//                 })
//             }

//             if (!rect1.heightGrowing) {
//                 rect1.h += 1;
//                 growing = true;
//                 // Check for intersections and mark them
//                 points.forEach((rect2) => {
//                     if ((rect1.x == rect2.x && rect1.y == rect2.y)) return;
//                     if (doesXIntersect(rect1, rect2) && doesYIntersect(rect1, rect2)) {
//                         rect1.heightGrowing = true;
//                         rect2.heightGrowing = true;
//                     }
//                 })
//             }

//             // // Expand each rectangle if possible
//             // if (!rect1.xStopped) {
//             //     rect1.w += 1;
//             //     expanding = true;
//             // }
//             // if (!rect1.yStopped) {
//             //     rect1.h += 1;
//             //     expanding = true;
//             // }
//             // // Check for intersections and mark them
//             // points.forEach((rect2) => {
//             //     if ((rect1.x == rect2.x && rect1.y == rect2.y)) return;
//             //     if (doesXIntersect(rect1, rect2)) {
//             //         rect1.xStopped = true;
//             //         rect2.xStopped = true;
//             //     }
//             //     if (doesYIntersect(rect1, rect2)) {
//             //         rect1.yStopped = true;
//             //         rect2.yStopped = true;
//             //     }
//             // })
//         });
//     } while (growing);

//     console.log(points);

// }

// function doesXIntersect(rect1, rect2) {
//     return (rect1.x + (rect1.w / 2) >= rect2.x - (rect2.w / 2) && rect1.x - (rect1.w / 2) <= rect2.x + (rect2.w / 2));
// }

// function doesYIntersect(rect1, rect2) {
//     return (rect1.y + (rect1.h / 2) >= rect2.y - (rect2.h / 2) && rect1.y - (rect1.h / 2) <= rect2.y + (rect2.h / 2));
// }
