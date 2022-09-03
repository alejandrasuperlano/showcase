new p5((p) => {
  let reset = false;

  let originalImg;
  let currentImg;

  let kernels = {
    none: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],

    sharpen: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],

    emboss: [
      [-2, -1, 0],
      [-1, 1, 1],
      [0, 1, 2],
    ],

    blur: [
      [0.0625, 0.125, 0.0625],
      [0.125, 0.25, 0.125],
      [0.0625, 0.125, 0.0625],
    ],
  };

  let applyKernelToPixel = (x, y, kernel, kernelSize) => {
    let newR = 0.0;
    let newG = 0.0;
    let newB = 0.0;

    // Go through each kernel entry
    for (let r = 0; r < kernelSize; r++) {
      for (let c = 0; c < kernelSize; c++) {
        // Compute the offset
        let rowOffset = 1 - r;
        let colOffset = 1 - c;

        let imageRow = x - rowOffset;
        let imageCol = y - colOffset;

        let currentPixel = originalImg.get(imageRow, imageCol);

        // Compute new value for each channel
        newR += p.red(currentPixel) * kernel[r][c];
        newG += p.green(currentPixel) * kernel[r][c];
        newB += p.blue(currentPixel) * kernel[r][c];
      }
    }

    // In case the new value is greater than 255
    newR = p.constrain(newR, 0, 255);
    newG = p.constrain(newG, 0, 255);
    newB = p.constrain(newB, 0, 255);

    return p.color(newR, newG, newB);
  };

  let applyKernelToImage = (kernel) => {
    for (let x = 0; x < currentImg.width; x++) {
      for (let y = 0; y < currentImg.height; y++) {
        let newPixel = applyKernelToPixel(x, y, kernel, 3);
        currentImg.set(x, y, newPixel);
      }
    }
  };

  p.preload = () => {
    originalImg = p.loadImage("/showcase/sketches/animal.jpg");
    currentImg = p.loadImage("/showcase/sketches/animal.jpg");
  };

  p.setup = () => {
    p.createCanvas(originalImg.width, originalImg.height);

    radio = p.createRadio();
    radio.option("none", "Normal");
    radio.option("sharpen", "Sharpen");
    radio.option("emboss", "Emboss");
    radio.option("blur", "Blur");
    radio.selected("none");

    radio.changed(() => {
      let selection = radio.value();
      if (selection === "none") {
        reset = true;
        p.redraw();
        reset = false;
      } else {
        applyKernelToImage(kernels[radio.value()]);
        currentImg.updatePixels();
        p.redraw();
      }
    });
    p.textAlign(p.CENTER);

    p.noLoop();
  };

  p.draw = () => {
    p.imageMode(p.CENTER);
    if (reset) {
      p.image(originalImg, originalImg.width / 2, originalImg.height / 2);
    } else {
      p.image(currentImg, currentImg.width / 2, currentImg.height / 2);
    }
  };
}, "imageKernel");
