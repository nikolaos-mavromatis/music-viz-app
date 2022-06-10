var img;

class Prism {
  constructor() {
    this.name = "prism"
  }

  draw() {
    background('#aaa');
    //load image
    image(img, 0, 0, width, height);

    //triangle
    noStroke();
    fill('white');
    triangle(
      width / 2 - 150, height / 2 + 100,
      width / 2 + 150, height / 2 + 100,
      width / 2, height / 2 - 100,
    );


  }
}
