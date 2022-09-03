new p5((p) => {
  let reset = false;
  let width = 350;
  let height = 350;

  let img;
  let pixels = new Array(256).fill(0);
  let currentColor = "black";

  let radio;

  let originX = width / 8;
  let originY = height * 0.85;
  let originXOffset = 10;

  let resetHistogram = () => {
    p.clear();
    p.background("white");
    p.stroke("black");

    // Y axis
    p.line(originX, originY, originX, originY - 280);

    // X axis
    p.text("Color intensity", width / 2, originY + 40);
    p.line(originX, originY, originX + 280, originY);
    for (let i = 0; i <= 5; i++) {
      let x = originX + originXOffset + 50 * i;
      p.line(x, originY, x, originY + 5);
      p.text(`${i * 50}`, x, originY + 20);
    }
  };

  let countPixels = () => {
    // Go through each pixel
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let pixel = img.get(x, y);

        // Add 1 to the current tonal value
        let value =
          currentColor === "red"
            ? p.red(pixel)
            : currentColor === "green"
            ? p.green(pixel)
            : p.blue(pixel);
        pixels[value] += 1;
      }
    }
  };

  let drawHistogram = () => {
    resetHistogram();

    p.stroke(currentColor);
    for (let i = 0; i < 256; i++) {
      p.line(
        originX + i + originXOffset,
        originY,
        originX + i + originXOffset,
        originY - pixels[i] / 7
      );
    }

    pixels = new Array(256).fill(0);
  };

  p.preload = () => {
    img = p.loadImage("/showcase/sketches/animal.jpg");
  };

  p.setup = () => {
    p.createCanvas(width, height);
    p.background("white");
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);

    radio = p.createRadio();
    radio.option("red", "Red");
    radio.option("green", "Green");
    radio.option("blue", "Blue");

    radio.changed(() => {
      currentColor = radio.value();
      countPixels();
      p.redraw();
    });

    p.noLoop();
  };

  p.draw = () => {
    drawHistogram();
  };
}, "imageHistogram");
