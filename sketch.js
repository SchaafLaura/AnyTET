let canv;
let margin = 10;
function setup() {
  canv = createCanvas(windowWidth - 2*margin, windowHeight - 2*margin);
  canv.position(margin, margin, 'fixed');
}

function draw() {
  background(220);
}

function windowResized() {
  canv = createCanvas(windowWidth - 2*margin, windowHeight - 2*margin);
  canv.position(margin, margin, 'fixed');
}