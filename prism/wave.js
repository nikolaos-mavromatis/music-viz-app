class Wave {
  constructor() {
    this.origin = createVector(p.x, p.y);
    this.r = 100;
    this.vel = 3;

    this.points = this.#getPoints(1024);
    this.angleStep = 360 / this.points.length;
  }

  draw() {
    push();
    translate(this.origin.x, this.origin.y);
    rotate(-45);
    stroke('yellow');
    strokeWeight(3);
    noFill();
    // ellipse(this.origin.x, this.origin.y, this.r, this.r); // debug circle
    beginShape();
    for (var i = 0; i < this.points.length; i += 5) {
      let p = this.#translateToXY(i, this.points[i], 20);
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }

  update() {
    // updates r
    this.r += this.vel;
  }

  isOffScreen() {
    return this.r > 2 * dist(0, 0, p.x, p.y);
  }

  #getPoints(n) {
    // for debug only 
    var points = [];
    for (var i = 0; i < n; i++) {
      points.push(random(-1, 1));
    }
    return points;
  }

  #translateToXY(i, value, jitter) {
    var angle = map(this.angleStep * i, 0, 360, 360, 180);
    var x = this.r * cos(angle) + value * jitter;
    var y = this.r * sin(angle) + value * jitter;

    return createVector(x, y)
  }
}
