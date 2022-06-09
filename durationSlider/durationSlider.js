class DurationSlider {
  // FIXME: when song is paused the slider returns to 0
  // FIXME: when moving to fullscreen the position is higher
  constructor() {
    this.x = 50;
    this.y = height - 20;
    this.w = width - 2 * this.x;
    this.h = 6;
  }

  draw(current, duration) {
    // total duration bar
    noFill();
    stroke(120);
    strokeWeight(4);
    rect(this.x, this.y, this.w, this.h, 3);

    //current time point
    let ctX = map(current, 0, duration, this.x, this.x + this.w);
    noStroke();
    fill('#24f17e');
    ellipse(ctX, this.y + 3, 20);
  }
}
