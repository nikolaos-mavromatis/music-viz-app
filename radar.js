var beamAngle = 0;

class Radar {
  constructor() {
    this.name = 'radar';

    this.pos = createVector(width / 2, height / 2);
    this.dia = 700;

    this.beam = new Beam(this.dia / 2);
  }

  draw() {
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
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
        fill(255, 150);
        rect(i * tickStep - this.dia / 2, 0, 1, 10);
        rect(0, i * tickStep - this.dia / 2, 10, 1);
      }
    }

    // draw beam
    this.beam.draw()

    pop();
  }
}

class Beam {
  /**
   * Generates a rotating radar beam.
   * @param {int, float} r - the length of the beam
   */
  constructor(r) {
    this.r = r;

    this.angle = 0;
  }

  draw() {
    rotate(this.angle);
    stroke('green');
    strokeWeight(3);
    noFill();
    line(0, 0, 0, this.r);
    this.angle += 0.5;
  }
}
