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

  let bgColor = color(palette[3]);
  background(bgColor);

  drawTextureLayers();
}

function drawTextureLayers() {
  let numLayers = random(10, 20);

  for (let i = 0; i < numLayers; i++) {
    drawSplotchTexture();
  }
}

function drawSplotchTexture() {
  let numSplotches = floor(random(4, 10));

  for (let s = 0; s < numSplotches; s++) {
    let cx = random(width);
    let cy = random(height);
    let radius = random(80, 300);
    let paletteColor = color(random(palette));
    let dotColor = color(red(paletteColor) * 0.7, green(paletteColor) * 0.7, blue(paletteColor) * 0.7, random(30, 80));

    let noiseScale = random(0.02, 0.04);
    let numDots = floor(random(2000, 5000));

    noStroke();
    for (let i = 0; i < numDots; i++) {
      let angle = random(TWO_PI);
      let r = random(radius);
      let x = cx + r * cos(angle);
      let y = cy + r * sin(angle);
      let n = noise(x * noiseScale, y * noiseScale);

      if (n > random(0.3, 0.55)) {
        fill(dotColor);
        let dotSize = random(1, 3);
        ellipse(x, y, dotSize, dotSize);
      }
    }
  }
}