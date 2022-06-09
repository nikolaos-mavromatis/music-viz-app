// FIXME: when song is paused the slider returns to 0
// FIXME: when moving to fullscreen the position is higher

class DurationSlider {
  /**
   * Displays a slider indicating the total duration of the track
   * and the progress in playback time.
   */
  constructor() {
    this.x = 80;
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

    let ctX = map(current, 0, duration, this.x, this.x + this.w);
    // progress bar
    noStroke();
    fill('#24f17e');
    rect(this.x - 2, this.y - 2, ctX - this.x, this.h + 4, 5);

    //current time point
    noStroke();
    ellipse(ctX, this.y + 3, 20);
  }
}
