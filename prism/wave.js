class Wave {
  constructor() {
    this.r = 100;
    this.vel = 3;

    this.points = [];
  }

  draw() {
    stroke('yellow');
    strokeWeight(3);
    noFill();
    ellipse(p.x, p.y, this.r, this.r);
    // beginShape();
    // for (var i = 0; i < this.points.length; i++) {
    //   curveVertex();
    // }
    // endShape();
  }

  update() {
    // updates r
    this.r += this.vel;
  }

  isOffScreen() {
    if (true) {
      return true;
    }
    return false;
  }
}

class WavePoint {
  constructor(i, value) {
    this.i = i;
    this.value = value;
  }

  translate() {

  }

}
