var ct;
var dur;

function setup() {
  createCanvas(400, 400);
  ds = new DurationSlider();

  ct = 0;
  dur = 100;
}

function draw() {
  background(0);

  if (ct <= dur) {
    ds.draw(ct, dur);
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
