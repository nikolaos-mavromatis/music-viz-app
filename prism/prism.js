var img;


class Prism {
  constructor() {
    img.filter(BLUR, 2);
    this.name = "prism"

    this.h = 200; //the height of the triangle
    this.b = 300; //the base of the triangle
    this.x = width / 2;
    this.y = height / 2;

    this.waves = []; /* instantiate array that keeps the waves being 
                        generated with every beat */
  }

  draw() {
    background(180);
    // this.#drawStaticElements();

    for (var i = this.waves.length - 1; i >= 0; i--) {
      var wave = this.waves[i];

      // // traverse backwards the waves array to delete wave if necessary
      // if (!wave.outOfScreen) { // flag showing wave's radius is larger than half the 
      //   wave.draw();
      // } else {
      //   this.waves.splice(i, 1);
      //   this.waves.append(new Wave()); // 
    }
  }

  #drawStaticElements() {
    // //load image
    // image(img, 0, 0, width, height);

    //the 3 vertices of the triangle
    let A = createVector(this.x, this.y - 100);
    let B = createVector(this.x - 150, this.y + 100);
    let C = createVector(this.x + 150, this.y + 100);

    noStroke();
    fill('#fff')
    triangle(A.x, A.y, B.x, B.y, C.x, C.y); //outer  triangle

    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = 'rgb(18, 16, 38)';
    fill('rgb(18, 16, 38)');
    triangle(A.x, A.y + 10, B.x + 10, B.y - 5, C.x - 10, C.y - 5); //inner triangle
    drawingContext.shadowBlur = 0;
  }
}
