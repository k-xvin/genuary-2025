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

  let numLayers = floor(random(10, 20));
  for (let i = 0; i < numLayers; i++) {
    let numSplotches = floor(random(4, 10));
    for (let j = 0; j < numSplotches; j++) {
      drawSplotch();
    }
  }
}

function drawSplotch() {
  let cx = random(width);
  let cy = random(height);
  let radius = random(80, 300);
  let noiseScale = random(0.02, 0.04);
  let numDots = floor(random(2000, 5000));

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
    let r = random(radius);
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);

    if (noise(x * noiseScale, y * noiseScale) > random(0.3, 0.55)) {
      ellipse(x, y, random(1, 3));
    }
  }
}