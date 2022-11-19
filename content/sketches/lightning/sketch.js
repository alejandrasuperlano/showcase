let easycam;
let myShader;
let ambient;

function preload() {
  myShader = readShader("/showcase/sketches/lightning/light.frag", {
    varyings: Tree.texcoords2,
  });
}

function setup() {
  createCanvas(700, 400, WEBGL);
  noLights();
  colorMode(RGB, 1);
  setAttributes("antialias", true);

  ambient = createSlider(0, 1, 0.5, 0.05);
  ambient.position(420, 10);
  ambient.style("width", "80px");
  ambient.input(() => {
    myShader.setUniform("ambient", ambient.value());
  });

  shader(myShader);
  myShader.setUniform("ambient", ambient.value());
}

function draw() {
  background(0);
  orbitControl();
  box(100);
}
