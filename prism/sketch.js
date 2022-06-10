var img;
var sound;

function preload() {
  img = loadImage('stars-g340404e24_1920.jpeg');
  sound = loadSound('jazzy-abstract-beat-11254.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  p = new Prism();
}

function draw() {
  p.draw();
}
