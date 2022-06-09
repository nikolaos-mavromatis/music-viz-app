class JumpButton {
  /**
   * Creates an arrow pointing to the direction provided.
   * @param {int, float} x 
   * @param {int, float} y 
   * @param {int} size 
   * @param {int} direction 
   */
  constructor(x, y, size, direction) {
    this.x = x;
    this.y = y;
    this.r = size;
    this.dir = int(direction); // -1 for backwards, 1 for forward

    this.step = 5; // how many seconds to jump
  }

  hitCheck() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
      sound.jump(sound.currentTime() + this.dir * this.step, 0);
      return true;
    }
    return false;
  }

  draw() {
    let s = 8;

    // frame
    noStroke();
    fill(0);
    ellipse(this.x, this.y, this.r + this.r / s, this.r + this.r / s);

    // arc
    stroke('#24f17e');
    strokeWeight(2);
    noFill();
    if (this.dir == -1) {
      arc(this.x, this.y, this.r, this.r, PI, HALF_PI, OPEN);
    }
    else if (this.dir == 1) {
      arc(this.x, this.y, this.r, this.r, HALF_PI, TWO_PI, OPEN);
    }

    // arrow tip
    noStroke();
    fill('#24f17e');
    triangle(
      this.x + this.dir * this.r / 2 - this.r / s, this.y,
      this.x + this.dir * this.r / 2 + this.r / s, this.y,
      this.x + this.dir * this.r / 2, this.y + this.r / s,
    );

    // text
    noStroke();
    fill('#24f17e');
    textAlign(CENTER, CENTER);
    textSize(0.4 * this.r);
    // pad with a + when the direction is forward
    text(String(this.dir * this.step).padStart(2, '+') + "s", this.x, this.y);
  }
}

