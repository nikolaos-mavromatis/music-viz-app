var img;
var imgAngle;
var freq;


class Atom {
  constructor() {
    this.name = "atom";

    img = loadImage('assets/atoms-png-transparent-atoms-images-515983.png');
    imgAngle = 0;
  }

  draw() {
    fourier.analyze();

    freq = fourier.getEnergy(400, 8000);

    push();
    translate(width / 2, height / 2);

    // centerpiece
    let v = map(freq, 0, 255, 0, 80);
    noStroke();
    fill(255);
    ellipse(0, 0, 100 + v, 100 + v);

    // centrepiece logo rotation
    rotate(imgAngle);
    image(img, -35, -35, 70, 70);
    imgAngle = (imgAngle - 1) % 359;

    pop();
  }
}
