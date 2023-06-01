class Turtle {
  constructor() {
    this.penState = true;
    this.hue = 0;
    this.alpha = 255;
  }
  Move(amount) {
    stroke(this.hue, 255, 255, this.alpha);
    if (this.penState === true) line(0, 0, amount, 0);
    translate(amount, 0);
  }
  Turn(angle) {
    rotate(angle);
  }
}