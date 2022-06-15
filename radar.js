class Radar {
  constructor() {
    this.name = 'radar';

    this.pos = createVector(width / 2, height / 2);
    this.dia = 700;
  }

  draw() {
    push();
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);

    // grid
    let tickStep = 50;
    let n = this.dia / tickStep;
    for (var i = 0; i <= n; i++) {
      if (i * tickStep % 100 == 0) {
        stroke(255, 50);
        strokeWeight(1);
        noFill();
        ellipse(0, 0, i * tickStep);
      }
      else {
        noStroke();
        fill('white');
        rect(i * tickStep - this.dia / 2, 0, 1, 10);
        rect(0, i * tickStep - this.dia / 2, 10, 1);
      }
    }

    pop();
  }
}
