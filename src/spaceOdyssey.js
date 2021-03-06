var img;
var imgAngle;
var amp;
var spectrum;
var spectralCentroid;
var blastTriggered;
var blastRotation;


class SpaceOdyssey {
  constructor() {
    this.name = "space odyssey";

    img = loadImage('assets/atoms-png-transparent-atoms-images-515983.png');
    imgAngle = radians(0);
    blastRotation = 0;

    this.origin = createVector(width / 2, height / 2);
    this.d = 100;
    this.r = this.d / 2;
    this.particles = [];
  }

  draw() {

    spectrum = fourier.analyze();

    amp = fourier.getEnergy(2000, 8000);

    spectralCentroid = fourier.getCentroid();

    push();
    rectMode(CENTER);
    translate(this.origin.x, this.origin.y);

    blastTriggered = fourier.getEnergy(0.9 * spectralCentroid, 1.5 * spectralCentroid) > 110; //alternative trigger
    blastTriggered = fourier.getEnergy("highMid") > 150;
    if (blastTriggered) {
      this.blast();
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

    // "reflective" surface
    noStroke()
    fill(0, 150);
    rect(0, height / 4, width, height / 2);

    // bar separator
    stroke(0);
    strokeWeight(1);
    line(-width / 2, 0, width / 2, 0);// rotate(radians(random(-2, 2)));
    // centerpiece
    let v = map(amp, 0, 255, 0, 80);
    noStroke();
    fill(255);
    ellipse(0, 0, this.d + v);

    // centrepiece logo rotation
    rotate(imgAngle);
    let imgSize = 70;
    image(img, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
    imgAngle = (imgAngle - radians(0.5)) % (TWO_PI - radians(1));

    pop();

  }

  blast() {
    rotate(radians(random(-2, 2)));
    this.particles.push(new Particle(this.r));
  }
}


class Particle {
  /**
   * Generates a moving particle emitted by the centrepiece.
   * @param {*} distance - the distance from the center of the screen
   */
  constructor(distance) {

    let angle = random() * TWO_PI;
    this.pos = createVector(cos(angle), sin(angle)).mult(distance);

    this.size = map(random(), 0, 1, 1, 5);
    this.vel = createVector(0.01, 0.01);
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
    /** A condition to stop drawing the particle. */
    if (dist(this.pos.x, this.pos.y, 0, 0) > 1500) {
      return true;
    }

    return false;
  }

  update(cond) {
    /** Updates the position of the particle. */
    this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);

    // accelerates even more when the condition is met
    if (cond) {
      let n = 4; // accelerate n times
      for (var i = 0; i < 4; i++) {
        this.pos = this.pos.add(this.vel);
      }
    }
  }
}
