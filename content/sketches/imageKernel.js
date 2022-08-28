new p5((p) => {
  let img;

  let kernel = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ];

  let applyKernel = (x, y, kernelSize) => {
    let newR = 0.0;
    let newG = 0.0;
    let newB = 0.0;

    for (let r = 0; r < kernelSize; r++) {
      for (let c = 0; c < kernelSize; c++) {
        let rowOffset = 1 - r;
        let colOffset = 1 - c;

        let imageRow = x - rowOffset;
        let imageCol = y - colOffset;

        if (
          imageRow > 0 &&
          imageRow < img.width &&
          imageCol > 0 &&
          imageCol < img.height
        ) {
          let currentPixel = img.get(imageRow, imageCol);

          newR += p.red(currentPixel) * kernel[r][c];
          newG += p.green(currentPixel) * kernel[r][c];
          newB += p.blue(currentPixel) * kernel[r][c];
        }
      }
    }

    return p.color(newR % 255, newG % 255, newB % 255);
  };

  p.preload = function () {
    img = p.loadImage("/showcase/sketches/animal.jpg");
  };

  p.setup = function () {
    p.createCanvas(img.width, img.height);
    img.loadPixels();

    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let newPixel = applyKernel(x, y, 3);
        img.set(x, y, newPixel);
      }
    }
    img.updatePixels();
  };

  p.draw = function () {
    p.imageMode(p.CENTER);

    p.image(img, img.width / 2, img.height / 2);
  };
}, "imageKernel");
