/************************************************
 * GENUARY 2025 - JAN 2
 * "Layers upon layers upon layers."
 * Canvas texture stacker
 ************************************************/

let palette;
let splotches = [];
let currentSplotch = 0;

function setup() {
  createCanvas(800, 800);

  let p = random(chromotome);
  palette = p.colors;
  // background(color(p.background || palette[0]));

  let noiseScale = random(0.003, 0.008);
  let threshold = random(0.35, 0.55);
  let numSplotches = floor(random(40, 200));
  for (let i = 0; i < numSplotches; i++) {
    let cx = random(width);
    let cy = random(height);
    let n = noise(cx * noiseScale, cy * noiseScale);
    if (n > threshold) {
      splotches.push({
        cx: cx,
        cy: cy,
        baseRadius: random(80, 300),
        numDots: floor(random(3000, 50000)),
        densityNoiseScale: random(0.015, 0.03),
        densityNoiseOffset: random(1000)
      });
    }
  }

  if (splotches.length === 0) {
    splotches.push({
      cx: width / 2,
      cy: height / 2,
      baseRadius: random(80, 300),
      numDots: floor(random(3000, 50000)),
      densityNoiseScale: random(0.015, 0.03),
      densityNoiseOffset: random(1000)
    });
  }
}

function draw() {
  if (currentSplotch >= splotches.length) {
    noLoop();
    return;
  }

  let s = splotches[currentSplotch];
  drawSplotch(s.cx, s.cy, s.baseRadius, s.numDots, s.densityNoiseScale, s.densityNoiseOffset);
  currentSplotch++;
}

function drawSplotch(cx, cy, baseRadius, numDots, densityNoiseScale, densityNoiseOffset) {

  let baseColor = color(random(palette));
  let dotColor = color(
    red(baseColor) * 0.7,
    green(baseColor) * 0.7,
    blue(baseColor) * 0.7,
    random(30, 80)
  );

  noStroke();
  fill(dotColor);

  for (let i = 0; i < numDots; i++) {
    let angle = random(TWO_PI);
    let r = random(baseRadius);
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);

    let density = noise(
      (x - cx) * densityNoiseScale + densityNoiseOffset,
      (y - cy) * densityNoiseScale + densityNoiseOffset
    );

    let threshold = map(r, 0, baseRadius, 0.2, 0.7);

    if (density > threshold && x > 0 && x < width && y > 0 && y < height) {
      ellipse(x, y, random(1, 3));
    }
  }
}