// Private Variables
var timeIn;
var timeLeft;

class TimeDisplay {
  /**
   * Displays the playback time or the time remaining.
   */
  constructor() {
    this.x = width - 20;
    this.y = height - 20;
    this.w = width - 2 * this.x;
    this.h = 6;
  }

  draw(current, duration) {
    timeIn = current;
    timeLeft = duration - timeIn;

    noStroke();
    fill('#24f17e');
    textAlign(RIGHT, CENTER);
    textSize(15);
    text(this.#formatTime(timeIn) + " / " + this.#formatTime(duration), this.x, this.y + 3);
  }

  /**
   * Private Method
   * Formats a given time t from seconds to MM:SS.
   * 
   * Example:
   * Formatting 75 seconds would result in 1 minute and 15 seconds
   * displayed as 01:15.
   * #formatTime(75)  -->  01:15
   * @param {float} t - time in seconds
   */
  #formatTime(t) {
    var mins, secs;

    mins = floor(t / 60);
    secs = abs(floor(t % 60));

    return String(mins).padStart(2, '0') + ":" + String(secs).padStart(2, '0')
  }
}
