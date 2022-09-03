new p5((p) => {
  let originalImg;
  let currentImg;

  let reset = false;

  let radio;

  let lightnessModes = {
    mean: (color) => {
      return (p.red(color) + p.green(color) + p.blue(color)) / 3;
    },

    hsv: (color) => {
      return Math.max((p.red(color), p.green(color), p.blue(color)));
    },

    hsl: (color) => {
      let max = Math.max((p.red(color), p.green(color), p.blue(color)));
      let min = Math.min((p.red(color), p.green(color), p.blue(color)));
      return (max + min) / 2;
    },

    luma: (color) => {
      return (
        0.2126 * p.red(color) + 0.7152 * p.green(color) + 0.0722 * p.blue(color)
      );
    },
  };

  let applyLightness = (mode) => {
    // Extract the current function
    let lightness = lightnessModes[mode];

    // Go through each pixel
    for (let i = 0; i < originalImg.width; i++) {
      for (let j = 0; j < originalImg.height; j++) {
        let newPixel = lightness(originalImg.get(i, j));
        currentImg.set(i, j, p.color(newPixel));
      }
    }
  };

  let resetImage = () => {
    p.imageMode(p.CENTER);
    p.image(currentImg, currentImg.width / 2, currentImg.height / 2);
  };

  p.preload = () => {
    originalImg = p.loadImage("/showcase/sketches/animal.jpg");
    currentImg = p.loadImage("/showcase/sketches/animal.jpg");
  };

  p.setup = () => {
    p.createCanvas(currentImg.width, currentImg.height);

    radio = p.createRadio();
    radio.option("none", "None");
    radio.option("mean", "Mean");
    radio.option("hsv", "HSV");
    radio.option("hsl", "HSL");
    radio.option("luma", "Luma");
    radio.selected("none");

    radio.changed(() => {
      let mode = radio.value();
      if (mode === "none") {
        reset = true;
        p.redraw();
        reset = false;
      } else {
        applyLightness(radio.value());
        currentImg.updatePixels();
        p.redraw();
      }
    });

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
}, "lightnessTools");
