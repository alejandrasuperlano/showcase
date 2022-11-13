let myShader;
let brightnessRadio;
let kernelRadio;
let magnifierCheck;
let magnifierSlider;

let img;

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

function preload() {
  myShader = readShader("/showcase/sketches/image_processing/color.frag", {
    varyings: Tree.texcoords2,
  });

  img = loadImage("/showcase/sketches/image_processing/animal.jpg");
}

function setup() {
  createCanvas(img.width, img.height, WEBGL);
  noStroke();

  textureMode(NORMAL);
  shader(myShader);

  // User interaction
  let brightnessTitle = createP("Select brightness tool:");
  brightnessTitle.style("font-weight", "bold");
  brightnessRadio = createRadio();
  brightnessRadio.option(0, "None");
  brightnessRadio.option(1, "Luma");
  brightnessRadio.option(2, "Mean");
  brightnessRadio.option(3, "HSV");
  brightnessRadio.option(4, "HSL");
  brightnessRadio.selected(0);

  brightnessRadio.changed(() => {
    let mode = brightnessRadio.value();
    myShader.setUniform("brightnessTool", mode);
  });

  let kernelTitle = createP("Select kernel to apply:");
  kernelTitle.style("font-weight", "bold");
  kernelRadio = createRadio();
  kernelRadio.option("none", "Normal");
  kernelRadio.option("sharpen", "Sharpen");
  kernelRadio.option("emboss", "Emboss");
  kernelRadio.option("blur", "Blur");
  kernelRadio.selected("none");

  kernelRadio.changed(() => {
    let selection = kernelRadio.value();
    myShader.setUniform("kernel", kernels[selection].flat());
  });

  let magnifierTitle = createP("Toggle magnifier:");
  magnifierTitle.style("font-weight", "bold");
  magnifierCheck = createCheckbox("Magnifier", false);
  magnifierCheck.changed(() => {
    myShader.setUniform("magnifier", magnifierCheck.checked());
  });

  magnifierSlider = createSlider(0.0, 1.0, 0.5, 0.1);
  magnifierSlider.changed(() => {
    console.log(magnifierSlider.value());
    myShader.setUniform("scale", magnifierSlider.value());
  });

  myShader.setUniform("texture", img);
  myShader.setUniform("brightnessTool", 0);
  myShader.setUniform("kernel", kernels["none"].flat());
  myShader.setUniform("scale", 0.5);
  emitTexOffset(myShader, img, "texOffset");
  emitResolution(myShader, "resolution");
}

function draw() {
  background(0);

  quad(
    -width / 2,
    -height / 2,
    width / 2,
    -height / 2,
    width / 2,
    height / 2,
    -width / 2,
    height / 2
  );

  emitMousePosition(myShader, "mouse");
}
