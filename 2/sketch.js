/************************************************
 * GENUARY 2025 - JAN 2
 * "Layers upon layers upon layers."
 * Canvas texture stacker
 ************************************************/

const palette = [
  '#656565',
  '#808782',
  '#A6D3A0',
  '#D1FFD7',
  '#B3FFB3'
];

function setup() {
  createCanvas(800, 800);
  noLoop();

  background(color(palette[3]));

  let numSplotches = floor(random(40, 80));
  for (let i = 0; i < numSplotches; i++) {
    drawSplotch();
  }
}

function drawSplotch(cx, cy) {
  cx = cx || random(width);
  cy = cy || random(height);
  let baseRadius = random(80, 300);
  let numDots = floor(random(3000, 6000));
  let densityNoiseScale = random(0.015, 0.03);
  let densityNoiseOffset = random(1000);

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