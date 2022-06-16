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
  /**
   * Creates a radar that is responsive to elements of the sound.
   */
  constructor() {
    angleMode(DEGREES);
    this.name = 'radar';

    this.pos = createVector(width / 2, height / 2);
    this.dia = 900;
    this.radius = this.dia / 2;

    this.grid = new Grid(this.radius);
    this.beam = new Beam(this.radius);
    this.objects = [new SuspiciousObject(this.radius, this.beam.angle, 10)];
  }

  draw() {
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
    translate(width / 2, height / 2);
    var origin = createVector(0, 0);

    this.grid.show(origin);

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

  scan() {
    /**
     * Scans the area covered by the radar for objects.
     */
    // placeholder
  }
}

class Grid {
  /**
   * Draws a grid of concentric circles.
   * @param {int} radius - the radius of the outermost circle
   */
  constructor(radius) {
    this.radius = radius;
  }

  show(origin) {
    /**
     * Display the grid at the specified origin .
     * @param {p5.Vector} origin - the origin of the concentric circles
     */
    let tickStep = 50;
    let n = 2 * this.radius / tickStep;
    for (var i = 0; i <= n; i++) {
      if (i * tickStep % 100 == 0) {
        stroke(255, 50);
        strokeWeight(1);
        noFill();
        ellipse(origin.x, origin.y, i * tickStep);
        noStroke();
        fill(255, 150);
        rect(origin.x + i * tickStep - this.radius, origin.y, 1, 3);
        rect(origin.x, origin.y + i * tickStep - this.radius, 3, 1);
      }
      else {
        rect(origin.x + i * tickStep - this.radius, origin.y, 1, 10);
        rect(origin.x, origin.y + i * tickStep - this.radius, 10, 1);
      }
    }
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

    this.angle = 0;
    this.angVel = 0.11;
    this.startPos = polarToCart(20, this.angle);
    this.endPos = polarToCart(this.length, this.angle);
  }

  draw() {
    angleMode(DEGREES);
    this.rotate();
    this.show();
  }

  rotate() {
    /**
     * Rotates the radar beam by the beam's angular velocity.
     */
    this.angle = (this.angle + degrees(this.angVel));
    // update start and end line points
    this.startPos = p5.Vector.fromAngle(this.angle, 20);
    this.endPos = p5.Vector.fromAngle(this.angle, this.length);
  }

  show() {
    /**
     * Makes the radar beam appear.
     */
    stroke('green');
    strokeWeight(3);
    noFill();
    line(
      this.startPos.x, this.startPos.y,
      this.endPos.x, this.endPos.y
    );
  }
}

class SuspiciousObject {
  /**
   * Makes an object suspiciously appear on the radar's screen. 
   * @param {int} maxDist - the max distance to randomly choose from
   * @param {float} angle - the radar beam's current angle 
   * @param {int} size - the size of the shape (default: 10px)
   */

  #shape;

  constructor(maxDist, angle, size = 10) {
    angleMode(DEGREES);
    var r = random(0.1 * maxDist, 0.9 * maxDist);
    this.angle = random(angle, angle + 30) % 360; // take remainder in case 340+50=390* --> 30*

    this.pos = polarToCart(r, angle);
    this.w = size;

    this.color = getRandomColor();
    this.visible = true;

    var availShapes = ["rectangle", "circle"]
    this.#shape = random(availShapes);
  }

  draw() {
    this.blink();

    if (this.visible) {
      this.show();
    }
  }

  blink(freq = 50) {
    /** 
     * Toggles visibility at the specified frequency.
     */
    if (frameCount % freq == 0) {
      this.visible = !this.visible;
    }
  }

  show() {
    /** 
     * Makes object appear on the radar.
     */
    stroke(this.color);
    strokeWeight(2);
    noFill();
    this.#drawShape();
  }

  #drawShape() {
    /** 
     * Factory method for drawing a random shape from options.
     */
    if (this.#shape == "rectangle") {
      this.#rectShape();
    }
    else if (this.#shape == "circle") {
      this.#circleShape();
    }
  }

  #rectShape() {
    /** 
     * Draws a rectangle.
     */
    rect(this.pos.x, this.pos.y, this.w, this.w);
  }

  #circleShape() {
    /** 
     * Draws a circle.
     */
    ellipse(this.pos.x, this.pos.y, this.w, this.w);
  }
}
