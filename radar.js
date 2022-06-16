var beamAngle = 0;

function getRandomColor() {
  let r = random(255);
  let g = random(100, 200);
  let b = random(100);
  return color(r, g, b);
}

function polarToCart(radius, theta) {
  var x = radius * cos(theta);
  var y = radius * sin(theta);
  return createVector(x, y);
}

class Radar {
  constructor() {
    angleMode(DEGREES);
    this.name = 'radar';

    this.pos = createVector(width / 2, height / 2);
    this.dia = 700;

    this.beam = new Beam(this.dia / 2);
    this.objects = [new SuspiciousObject(this.dia / 2, this.beam.angle, 10)];
  }

  draw() {
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
    translate(width / 2, height / 2);

    // grid
    let tickStep = 50;
    let n = this.dia / tickStep;
    for (var i = 0; i <= n; i++) {
      if (i * tickStep % 100 == 0) {
        stroke(255, 50);
        strokeWeight(1);
        noFill();
        ellipse(0, 0, i * tickStep);
        noStroke();
        fill(255, 150);
        rect(i * tickStep - this.dia / 2, 0, 1, 3);
        rect(0, i * tickStep - this.dia / 2, 3, 1);
      }
      else {
        rect(i * tickStep - this.dia / 2, 0, 1, 10);
        rect(0, i * tickStep - this.dia / 2, 10, 1);
      }
    }

    for (var i = this.objects.length - 1; i >= 0; i--) {
      console.log(this.beam.pos.angleBetween(this.objects[i].pos))
      this.objects[i].draw();
    }

    // draw beam
    this.beam.draw();
    ;
    pop();
  }
}

class Beam {
  /**
   * Generates a rotating radar beam.
   * @param {int, float} r - the length of the beam
   */
  constructor(r) {
    angleMode(DEGREES);
    this.r = r;

    this.pos = createVector(0, 0);
    this.angle = 180;
  }

  draw() {
    angleMode(DEGREES);
    rotate(this.angle);
    stroke('green');
    strokeWeight(3);
    noFill();
    line(this.pos.x, this.pos.y, 0, this.r);
    this.angle = (this.angle + 1) % 360;
  }
}

class SuspiciousObject {
  constructor(maxDist, theta, size = 10) {
    console.log(theta);
    var r = random(0.1 * maxDist, 0.9 * maxDist);
    var angle = random((theta + 30) % 360, (theta + 30 + 45) % 360); // take remainder in case 340+50=390* --> 30*

    this.pos = polarToCart(r, angle);
    this.w = size;

    this.color = getRandomColor();
    this.visible = false;
  }

  draw() {
    push();
    stroke(this.color);
    strokeWeight(2);
    noFill();
    // this.#rectShape();
    this.#circleShape();
    pop();
  }

  #rectShape() {
    rect(this.pos.x, this.pos.y, this.w, this.w);
  }

  #circleShape() {
    ellipse(this.pos.x, this.pos.y, this.w, this.w);
  }
}
