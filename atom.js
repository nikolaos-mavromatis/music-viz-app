var img;
var imgAngle;
var freq;
var spectrum;


class Atom {
  constructor() {
    this.name = "atom";

    img = loadImage('assets/atoms-png-transparent-atoms-images-515983.png');
    imgAngle = 0;
  }

  draw() {
    spectrum = fourier.analyze();

    freq = fourier.getEnergy(400, 8000);

    push();
    translate(width / 2, height / 2);

    // vertical bars
    noStroke();
    fill(251, 164, 198, 255);
    let spacing = 0;
    let barW = (width / 2) / spectrum.length;
    for (var dir = -1; dir <= 1; dir += 2) {
      for (var i = 0; i < spectrum.length; i++) {
        let barH = map(spectrum[i], 0, 255, 0, 400);
        let barX = dir * i * (barW + spacing);
        barX -= barW / 2;
        barX += -dir * width / 2;
        rect(barX, -barH / 2, barW, barH, 10);
      }
    }

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
