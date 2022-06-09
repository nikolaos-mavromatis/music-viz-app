var tim;
var ct;
var dur;

function setup() {
  createCanvas(400, 400);
  tim = new Timer();

  ct = 0;
  dur = 100;
}

function draw() {
  background(0);

  if (ct <= dur) {
    tim.draw(ct, dur);
  }

}

function mouseWheel() {
  ct++;
}

function keyPressed() {
  if (keyCode == 32) {
    ct = 0;
  }
}
