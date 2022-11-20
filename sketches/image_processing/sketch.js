let myShader;
let brightnessRadio;
let kernelRadio;
let areaRadio;
let magnifierSlider;
let areaSlider;
let sourceRadio;

let img;
let video;

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

  edge: [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ],
};

function preload() {
  video = createVideo(["/showcase/sketches/image_processing/video.mp4"]);
  video.hide();

  myShader = readShader("/showcase/sketches/image_processing/color.frag", {
    varyings: Tree.texcoords2,
  });

  img = loadImage("/showcase/sketches/image_processing/animal.jpg");
}

function setup() {
  createCanvas(700, 400, WEBGL);
  noStroke();

  textureMode(NORMAL);
  shader(myShader);

  setupUI();

  myShader.setUniform("texture", img);
  myShader.setUniform("brightnessTool", 0);
  myShader.setUniform("kernel", kernels["none"].flat());
  myShader.setUniform("scale", 0.5);
  myShader.setUniform("radius", 100.0);
  myShader.setUniform("region", false);
  myShader.setUniform("magnifier", false);
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

function setupUI() {
  let sourceTitle = createP("Select source:");
  sourceTitle.style("font-weight", "bold");
  sourceRadio = createRadio();
  sourceRadio.option("img", "Image");
  sourceRadio.option("video", "Video");
  sourceRadio.changed(() => {
    let val = sourceRadio.value();
    if (val === "img") {
      myShader.setUniform("texture", img);
      emitTexOffset(myShader, img, "texOffset");
      video.pause();
    } else if (val === "video") {
      myShader.setUniform("texture", video);
      emitTexOffset(myShader, video, "texOffset");
      video.loop();
    }
  });

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
  kernelRadio.option("edge", "Edge detection");
  kernelRadio.selected("none");

  kernelRadio.changed(() => {
    let selection = kernelRadio.value();
    myShader.setUniform("kernel", kernels[selection].flat());
  });

  let areaTitle = createP("Area tools:");
  areaTitle.style("font-weight", "bold");

  areaRadio = createRadio();
  areaRadio.option("none", "None");
  areaRadio.option("magnifier", "Magnifier");
  areaRadio.option("region", "Region");
  areaRadio.selected("none");

  areaRadio.changed(() => {
    let selection = areaRadio.value();
    if (selection === "none") {
      myShader.setUniform("region", false);
      myShader.setUniform("magnifier", false);
    } else if (selection === "magnifier") {
      myShader.setUniform("region", false);
      myShader.setUniform("magnifier", true);
    } else if (selection === "region") {
      myShader.setUniform("region", true);
      myShader.setUniform("magnifier", false);
    }
    myShader.setUniform("brightnessTool", 0);
    myShader.setUniform("kernel", kernels["none"].flat());
  });

  let areaSliderTitle = createP("Area size:");
  areaSlider = createSlider(25.0, 250.0, 100.0, 50.0);
  areaSlider.changed(() => {
    myShader.setUniform("radius", areaSlider.value());
  });

  let zoomSliderTitle = createP("Zoom level:");
  magnifierSlider = createSlider(0.0, 1.0, 0.5, 0.1);
  magnifierSlider.changed(() => {
    myShader.setUniform("scale", magnifierSlider.value());
  });
}
