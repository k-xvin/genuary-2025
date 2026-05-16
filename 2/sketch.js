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
  let blobNoiseScale = 0.02;
  let blobNoiseOffset = random(1000);
  let numDots = floor(random(2000, 5000));
  let dotNoiseScale = random(0.02, 0.04);

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
    let noiseVal = noise(
      cos(angle) * blobNoiseScale + blobNoiseOffset,
      sin(angle) * blobNoiseScale + blobNoiseOffset
    );
    let r = map(noiseVal, 0, 1, baseRadius * 0.3, baseRadius * 1.4);
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);

    if (x > 0 && x < width && y > 0 && y < height) {
      if (noise(x * dotNoiseScale, y * dotNoiseScale) > random(0.3, 0.55)) {
        ellipse(x, y, random(1, 3));
      }
    }
  }
}