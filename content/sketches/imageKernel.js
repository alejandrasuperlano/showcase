new p5((p) => {
  let originalImg;
  let currentImg;

  let noKernel = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];

  let outlineKernel = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ];

  let applyKernelToPixel = (x, y, kernel, kernelSize) => {
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
          imageRow >= 0 &&
          imageRow < currentImg.width &&
          imageCol >= 0 &&
          imageCol < currentImg.height
        ) {
          let currentPixel = originalImg.get(imageRow, imageCol);

          newR += p.red(currentPixel) * kernel[r][c];
          newG += p.green(currentPixel) * kernel[r][c];
          newB += p.blue(currentPixel) * kernel[r][c];
        }
      }
    }

    newR = p.constrain(newR, 0, 255);
    newG = p.constrain(newG, 0, 255);
    newB = p.constrain(newB, 0, 255);
    return p.color(newR, newG, newB);
  };

  p.preload = () => {
    originalImg = p.loadImage("/showcase/sketches/animal.jpg");
    currentImg = p.loadImage("/showcase/sketches/animal.jpg");
  };

  p.setup = () => {
    p.createCanvas(originalImg.width, originalImg.height);
    p.noLoop();
  };

  p.draw = () => {
    p.imageMode(p.CENTER);
    p.image(currentImg, currentImg.width / 2, currentImg.height / 2);
  };

  p.keyTyped = () => {
    if (p.key == "a") {
      for (let x = 0; x < currentImg.width; x++) {
        for (let y = 0; y < currentImg.height; y++) {
          let newPixel = applyKernelToPixel(x, y, noKernel, 3);
          currentImg.set(x, y, newPixel);
        }
      }

      currentImg.updatePixels();
      p.redraw();
    } else if (p.key == "b") {
      for (let x = 0; x < currentImg.width; x++) {
        for (let y = 0; y < currentImg.height; y++) {
          let newPixel = applyKernelToPixel(x, y, outlineKernel, 3);
          currentImg.set(x, y, newPixel);
        }
      }

      currentImg.updatePixels();
      p.redraw();
    }
  };
}, "imageKernel");
