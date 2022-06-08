//displays and handles clicks on the playback button.
function PlaybackButton() {

  this.x = 40;
  this.y = 40;
  this.width = 30;
  this.height = 30;

  //flag to determine whether to play or pause after button click and
  //to determine which icon to draw
  this.playing = false;

  this.draw = function () {
    this.buttonFrame();
    if (this.playing) {
      this.pauseButton();
    } else {
      this.playButton();
    }
  };

  //checks for clicks on the button, starts or pauses playabck.
  //@returns true if clicked false otherwise.
  this.hitCheck = function () {
    if (dist(mouseX, mouseY, this.x, this.y) < this.width) {
      if (sound.isPlaying()) {
        sound.pause();
        noLoop();
      } else {
        sound.loop();
        loop();
      }
      this.playing = !this.playing;
      return true;
    }
    return false;
  };

  this.buttonFrame = function () {
    fill('#24f17e');
    noStroke();
    ellipse(this.x, this.y, 2 * this.width, 2 * this.width);
  }

  this.playButton = function () {
    fill('#FFFFFF');
    triangle(
      this.x - this.width / 3, this.y - this.height / 2, // top left
      this.x + this.width / 2, this.y, // right
      this.x - this.width / 3, this.y + this.height / 2, // bottom left
    );
  }

  this.pauseButton = function () {
    fill('#FFFFFF');
    rect(this.x - this.width / 2, this.y - this.height / 2, this.width / 2 - 2, this.height);
    rect(this.x + 2, this.y - this.height / 2, this.width / 2 - 2, this.height);
  }
}
