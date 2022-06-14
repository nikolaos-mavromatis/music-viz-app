//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {

  this.menuDisplayed = false;

  //playback button displayed in the top left of the screen
  this.playbackButton = new PlaybackButton();

  //bar displaying the current time playing on the track  
  this.playbackBar = new DurationSlider();

  // jump buttons
  this.jumpForwardButton = new JumpButton(
    width / 2 + 100,
    this.playbackButton.y,
    0.8 * this.playbackButton.r,
    1
  );
  this.jumpBackwardButton = new JumpButton(
    width / 2 - 100,
    this.playbackButton.y,
    0.8 * this.playbackButton.r,
    -1
  );

  this.timer = new TimeDisplay();

  //make the window fullscreen or revert to windowed
  this.mousePressed = function () {
    if (
      // TODO: consolidate in one controls hit check
      !this.playbackButton.hitCheck() &&
      !this.jumpForwardButton.hitCheck() &&
      !this.jumpBackwardButton.hitCheck()
    ) {
      var fs = fullscreen();
      fullscreen(!fs);
    }
  };

  //responds to keyboard presses
  //@param keycode the ascii code of the keypressed
  this.keyPressed = function (keycode) {
    console.log(keycode);
    if (keycode == 32) {
      this.menuDisplayed = !this.menuDisplayed;
    }

    if (keycode > 48 && keycode < 58) {
      var visNumber = keycode - 49;
      vis.selectVisual(vis.visuals[visNumber].name);
    }
  };

  //draws the playback button and potentially the menu
  this.draw = function () {
    angleMode(RADIANS);

    push();
    //playback button
    this.playbackButton.draw();

    //jump buttons
    this.jumpForwardButton.draw();
    this.jumpBackwardButton.draw();

    //playback bar
    this.playbackBar.draw(sound.currentTime(), sound.duration());

    //display time
    this.timer.draw(sound.currentTime(), sound.duration());

    //only draw the menu if menu displayed is set to true.
    if (this.menuDisplayed) {
      fill("white");
      stroke("black");
      strokeWeight(2);
      textSize(34);
      textAlign(LEFT, TOP);
      text("Select a visualisation:", 100, 30);
      this.menu();
    }
    pop();

  };

  this.menu = function () {
    //draw out menu items for each visualisation
    for (var i = 0; i < vis.visuals.length; i++) {
      var yLoc = 70 + i * 40;
      text((i + 1) + ":  " + vis.visuals[i].name, 100, yLoc);
    }
  };
}
