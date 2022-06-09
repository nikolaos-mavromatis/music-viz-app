var sound;

function preload() {
  sound = loadSound("dreamy-beat-dream-11323.mp3");
}

function setup() {
  createCanvas(400, 400);

  jf = new JumpButton(width / 2 + 100, height / 2, 100, 1);
  jb = new JumpButton(width / 2 - 100, height / 2, 100, -1);
}

function draw() {
  background(220);

  textAlign(CENTER, TOP);
  textSize(40);
  text(floor(sound.currentTime()), width / 2, 50);

  jf.draw();
  jb.draw();
}

function keyPressed() {
  if (keyCode == 32) {
    sound.play();
  }
}

function mousePressed() {
  jf.hitCheck();
  jb.hitCheck();
}
