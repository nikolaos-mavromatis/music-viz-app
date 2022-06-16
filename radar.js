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

    // draw objects
    for (var i = this.objects.length - 1; i >= 0; i--) {
      // console.log(this.beam.angle - this.objects[i].angle);
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
   * @param {int, float} length - the length of the beam
   */
  constructor(length) {
    angleMode(DEGREES);
    this.length = length;

    this.angle = PI;
    this.startPos = polarToCart(20, this.angle);
    this.endPos = polarToCart(this.length, this.angle);
  }

  draw() {
    angleMode(DEGREES);
    // update start and end line points
    this.startPos = p5.Vector.fromAngle(this.angle, 20);
    this.endPos = p5.Vector.fromAngle(this.angle, this.length);

    // draw beam
    stroke('green');
    strokeWeight(3);
    noFill();
    line(
      this.startPos.x, this.startPos.y,
      this.endPos.x, this.endPos.y
    );
    this.angle = (this.angle + degrees(0.11));
  }
}

class SuspiciousObject {
  /**
   * Makes an object suspiciously appear on the radar's screen. 
   * @param {int} maxDist - the max distance to randomly choose from
   * @param {float} angle - the radar beam's current angle 
   * @param {int} size - the size of the shape (default: 10px)
   */
  constructor(maxDist, angle, size = 10) {
    angleMode(DEGREES);
    var r = random(0.1 * maxDist, 0.9 * maxDist);
    this.angle = random(angle, angle + 30) % 360; // take remainder in case 340+50=390* --> 30*

    this.pos = polarToCart(r, angle);
    this.w = size;

    this.color = getRandomColor();
    this.visible = false;

    var shapes = ["rectangle", "circle"]
    this.shape = random(shapes);
  }

  draw() {
    angleMode(DEGREES);
    push();
    stroke(this.color);
    strokeWeight(2);
    noFill();
    this.#drawShape();
    pop();
  }

  #drawShape() {
    if (this.shape == "rectangle") {
      this.#rectShape();
    }
    else if (this.shape == "circle") {
      this.#circleShape();
    }
  }

  #rectShape() {
    rect(this.pos.x, this.pos.y, this.w, this.w);
  }

  #circleShape() {
    ellipse(this.pos.x, this.pos.y, this.w, this.w);
  }
}
