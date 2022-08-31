new p5((p) => {
  let radio;
  let img;
  let pixels = new Array(256).fill(0);

  let originX = 60;
  let originY = 340;

  let resetHistogram = () => {
    p.clear();
    p.background("white");
    p.stroke("black");

    // Y axis
    p.line(originX, originY, originX, originY - 280);

    // X axis
    p.line(originX, originY, originX + 260, originY);
  };

  let countPixels = (color) => {
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let pixel = img.get(x, y);

        let value =
          color === "red"
            ? p.red(pixel)
            : color === "green"
            ? p.green(pixel)
            : p.blue(pixel);
        pixels[value] += 1;
      }
    }
  };

  let drawHistogram = (color) => {
    p.stroke(color);
    for (let i = 0; i < 256; i++) {
      p.line(originX + i, originY, originX + i, originY - pixels[i] / 7);
    }
    console.log(pixels[0]);
    pixels = new Array(256).fill(0);
  };

  p.preload = () => {
    img = p.loadImage("/showcase/sketches/animal.jpg");
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    p.background("white");

    radio = p.createRadio();
    radio.option("red", "Red");
    radio.option("green", "Green");
    radio.option("blue", "Blue");

    radio.changed(() => {
      let color = radio.value();
      p.redraw();

      countPixels(color);
      drawHistogram(color);
    });

    p.noLoop();
  };

  p.draw = () => {
    resetHistogram();
  };
}, "imageHistogram");
