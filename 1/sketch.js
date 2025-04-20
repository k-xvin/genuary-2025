function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
    stroke(255);
    strokeWeight(1);
}

function draw() {
    drawLineBlob(windowWidth/2, windowHeight/2, 10, 100)
    
    noLoop();
}

function drawLineBlob(centerX, centerY, density, length) {
    // Generate <density> number of random points, enforcing a minimum distance
    let points = [];
    for (let i = 0; i < density; i++) {
        let x = centerX + random(-length, length);
        let y = centerY + random(-length, length);
        points.push({ x: x, y: y, w: 0, h: 0 });
    }

    // Grow all rectangles outward until they intersect
    let growing = false;
    do {
        growing = false;
        points.forEach((rect1) => {
            if (!rect1.widthGrowing) {
                rect1.w += 1;
                growing = true;
                // Check for intersections and mark them
                points.forEach((rect2) => {
                    if ((rect1.x == rect2.x && rect1.y == rect2.y)) return;
                    if (doesXIntersect(rect1, rect2) && doesYIntersect(rect1, rect2)) {
                        rect1.widthGrowing = true;
                        rect2.widthGrowing = true;
                    }
                })
            }
            
            if (!rect1.heightGrowing) {
                rect1.h += 1;
                growing = true;
                // Check for intersections and mark them
                points.forEach((rect2) => {
                    if ((rect1.x == rect2.x && rect1.y == rect2.y)) return;
                    if (doesXIntersect(rect1, rect2) && doesYIntersect(rect1, rect2)) {
                        rect1.heightGrowing = true;
                        rect2.heightGrowing = true;
                    }
                })
            }

            // // Expand each rectangle if possible
            // if (!rect1.xStopped) {
            //     rect1.w += 1;
            //     expanding = true;
            // }
            // if (!rect1.yStopped) {
            //     rect1.h += 1;
            //     expanding = true;
            // }
            // // Check for intersections and mark them
            // points.forEach((rect2) => {
            //     if ((rect1.x == rect2.x && rect1.y == rect2.y)) return;
            //     if (doesXIntersect(rect1, rect2)) {
            //         rect1.xStopped = true;
            //         rect2.xStopped = true;
            //     }
            //     if (doesYIntersect(rect1, rect2)) {
            //         rect1.yStopped = true;
            //         rect2.yStopped = true;
            //     }
            // })
        });
    } while (growing);

    console.log(points);

    // Draw final rectangles
    rectMode(CENTER);
    fill(0);
    points.forEach((r) => {
        rect(r.x, r.y, r.w, r.h);
        circle(r.x, r.y, 5);
    })
}

function doesXIntersect(rect1, rect2) {
    return (rect1.x + (rect1.w / 2) >= rect2.x - (rect2.w / 2) && rect1.x - (rect1.w / 2) <= rect2.x + (rect2.w / 2));
}

function doesYIntersect(rect1, rect2) {
    return (rect1.y + (rect1.h / 2) >= rect2.y - (rect2.h / 2) && rect1.y - (rect1.h / 2) <= rect2.y + (rect2.h / 2));
}
