var img;
var imgAngle;
var freq;
var spectrum;
var spectralCentroid;
var blastTriggered;


class Atom {
  constructor() {
    this.name = "atom";

    img = loadImage('assets/atoms-png-transparent-atoms-images-515983.png');
    imgAngle = 0;

    this.particles = [];
  }

  draw() {
    spectrum = fourier.analyze();

    freq = fourier.getEnergy(400, 2000);

    spectralCentroid = fourier.getCentroid();
    blastTriggered = fourier.getEnergy(0.9 * spectralCentroid, 1.5 * spectralCentroid) > 120;
    // console.log(spectralCentroid);

    push();
    translate(width / 2, height / 2);

    if (blastTriggered) {
      this.particles.push(new Particle(map(random(), 0, 1, 1, 5), 50));
    }

    translate(0, 0);
    rotate(0);
    for (var i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      if (!p.isOffScreen()) {
        p.update(blastTriggered);
        p.draw();
      }
    }

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
    // rotate(imgAngle);
    // image(img, -35, -35, 70, 70);
    // imgAngle = (imgAngle - 1) % 359;

    pop();
  }
}


class Particle {
  constructor(size, radius) {
    let angle = random() * 360;

    // this.pos = p5.Vector.random2D().mult(150);
    this.pos = createVector(cos(angle), sin(angle)).mult(radius);

    this.size = size;
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00005));
  }

  draw() {
    stroke('white');
    strokeWeight(this.size);
    noFill();
    point(this.pos.x, this.pos.y);
  }

  isOffScreen() {
    if (dist(this.pos.x, this.pos.y, 0, 0) > 500) {
      return true;
    }

    return false;
  }

  update(cond) {
    this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);

    if (cond && random() > 0.5) {
      this.pos = this.pos.add(this.vel);
      this.pos = this.pos.add(this.vel);
      this.pos = this.pos.add(this.vel);
      this.pos = this.pos.add(this.vel);
    }
  }
}
