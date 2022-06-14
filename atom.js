var img;
var imgAngle;
var amp;
var spectrum;
var spectralCentroid;
var blastTriggered;
var blastRotation;


class Atom {
  constructor() {
    this.name = "atom";

    img = loadImage('assets/atoms-png-transparent-atoms-images-515983.png');
    imgAngle = 0;
    blastRotation = 0;

    this.origin = createVector(width / 2, height / 2);
    this.d = 100;
    this.r = this.d / 2;
    this.particles = [];
  }

  draw() {

    spectrum = fourier.analyze();

    amp = fourier.getEnergy(2000, 10000);

    spectralCentroid = fourier.getCentroid();

    push();
    angleMode(DEGREES);
    rectMode(CENTER);
    translate(this.origin.x, this.origin.y);

    blastTriggered = fourier.getEnergy(0.9 * spectralCentroid, 1.5 * spectralCentroid) > 110; //alternative trigger
    blastTriggered = fourier.getEnergy("highMid") > 160;
    if (blastTriggered) {
      this.shakeVis();
      this.particles.push(new Particle(map(random(), 0, 1, 1, 5), this.d));
    }

    for (var i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      if (!p.isOffScreen()) {
        p.update(blastTriggered);
        p.draw();
      }
      else {
        this.particles.splice(i, 1);
      }
    }

    // vertical bars
    noStroke();
    fill(251, 164, 198, 255);
    let spacing = 1;
    let barW = this.origin.x / spectrum.length;
    for (var dir = -1; dir <= 1; dir += 2) {
      for (var i = 0; i < spectrum.length; i++) {
        let barH = map(spectrum[i], 0, 255, 0, 500);
        let barX = dir * i * (barW + spacing);
        barX -= barW / 2;
        barX += -dir * this.origin.x;
        rect(barX, 0, barW, barH, 10);
      }
    }

    noStroke();
    fill(0, 150);
    rect(0, height / 4, width, height / 2);

    stroke(0);
    strokeWeight(1);
    line(-width / 2, 0, width / 2, 0);

    // centerpiece
    let v = map(amp, 0, 255, 0, 80);
    noStroke();
    fill(255);
    ellipse(0, 0, this.d + v);

    // centrepiece logo rotation
    rotate(imgAngle);
    let imgSize = 70;
    image(img, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
    imgAngle = (imgAngle - 1) % 359;

    pop();
  }

  shakeVis() {
    rotate(random(-2, 2));
  }
}


class Particle {
  constructor(size, radius) {
    let angle = random() * 360;

    this.pos = createVector(cos(angle), sin(angle)).mult(radius);

    this.size = size;
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00005));

    let r = random(255);
    let g = random(100, 200);
    let b = random(100);
    this.color = color(r, g, b);
  }

  draw() {
    stroke(this.color);
    strokeWeight(this.size);
    noFill();
    point(this.pos.x, this.pos.y);
  }

  isOffScreen() {
    if (dist(this.pos.x, this.pos.y, 0, 0) > 1500) {
      return true;
    }

    return false;
  }

  update(cond) {
    this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);

    if (cond) {
      let n = 4; // accelerate n times
      for (var i = 0; i < 4; i++) {
        this.pos = this.pos.add(this.vel);
      }
    }
  }
}
