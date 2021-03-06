// FIXME: when moving to fullscreen the position should be lower

//displays and handles clicks on the playback button.
function PlaybackButton() {
  this.x = width / 2;
  this.y = height - 80;
  this.r = 30;

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
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
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
    ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
  }

  this.playButton = function () {
    fill('#FFFFFF');
    triangle(
      this.x - this.r / 3, this.y - this.r / 2, // top left
      this.x + this.r / 2, this.y, // right
      this.x - this.r / 3, this.y + this.r / 2, // bottom left
    );
  }

  this.pauseButton = function () {
    fill('#FFFFFF');
    rect(this.x - this.r / 2, this.y - this.r / 2, this.r / 2 - 2, this.r);
    rect(this.x + 2, this.y - this.r / 2, this.r / 2 - 2, this.r);
  }
}
