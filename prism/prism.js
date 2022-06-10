class Prism {
  constructor() {
    img.filter(BLUR, 2);
    this.name = "prism"

    this.h = 300; //the height of the triangle
    this.b = 300; //the base of the triangle
    this.x = width / 2;
    this.y = height / 2;

    this.waves = []; /* instantiate array that keeps the waves being 
                        generated with every beat */
  }

  draw() {
    //load image
    image(img, 0, 0, width, height);

    stroke('black');
    strokeWeight(25);
    point(width / 2, height / 2);


    for (var i = this.waves.length - 1; i >= 0; i--) {
      var wave = this.waves[i];
      wave.update();
      wave.draw();

      //   // traverse backwards the waves array to delete wave if necessary
      //   if (!wave.isOffScreen) { // flag showing wave's radius is larger than half the 
      //     wave.draw();
      //   } else {
      //     this.waves.splice(i, 1);
      //   }
    }
    this.#drawTriangle();
  }

  #drawTriangle() {
    //the 3 vertices of the triangle
    let A = createVector(this.x, this.y + this.h / 3 - 100);
    let B = createVector(this.x - 150, this.y + this.h / 3 + 100);
    let C = createVector(this.x + 150, this.y + this.h / 3 + 100);

    noStroke();
    fill('#fff')
    triangle(A.x, A.y, B.x, B.y, C.x, C.y); //outer  triangle

    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = 'rgb(18, 16, 38)';
    fill('rgb(18, 16, 38)');
    let offset = 10;
    triangle(A.x, A.y + offset, B.x + offset, B.y - offset / 2, C.x - offset, C.y - offset / 2); //inner triangle
    drawingContext.shadowBlur = 0;
  }
}
