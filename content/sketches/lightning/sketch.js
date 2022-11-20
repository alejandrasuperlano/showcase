let myShader;
let models;

let ambientSlider;
let modelsSlider;
let colorPicker;

function preload() {
  myShader = readShader("/showcase/sketches/lightning/light.frag", {
    varyings: Tree.NONE,
  });
}

function setup() {
  createCanvas(700, 400, WEBGL);
  noLights();
  colorMode(RGB, 1);
  setAttributes("antialias", true);

  let trange = 100;
  models = [];

  for (let i = 0; i < 100; i++) {
    models.push({
      position: createVector(
        (random() * 2 - 1) * trange,
        (random() * 2 - 1) * trange,
        (random() * 2 - 1) * trange
      ),
      size: random() * 25 + 8,
      color: color(random(), random(), random()),
    });
  }

  setupUI();

  shader(myShader);
  myShader.setUniform("ambient", ambientSlider.value());
  myShader.setUniform("lightColor", [1, 1, 1, 1]);
}

function draw() {
  orbitControl();
  background(0);
  resetShader();
  push();
  stroke("green");
  axes();
  grid();
  pop();
  shader(myShader);
  for (let i = 0; i < modelsSlider.value(); i++) {
    push();
    noStroke();
    fill(models[i].color);
    translate(models[i].position);
    let radius = models[i].size / 2;
    i % 3 === 0
      ? box(radius * 2)
      : i % 3 === 1
      ? sphere(radius)
      : torus(radius, radius / 4);
    pop();
  }
}

function setupUI() {
  let modelsTitle = createP("Choose models to display:");
  modelsTitle.style("font-weight", "bold");
  modelsSlider = createSlider(1, models.length, int(models.length / 4), 1);

  let ambientTitle = createP("Choose lighting level:");
  ambientTitle.style("font-weight", "bold");
  ambientSlider = createSlider(0, 1, 0.5, 0.05);
  ambientSlider.input(() => {
    myShader.setUniform("ambient", ambientSlider.value());
  });

  let colorTitle = createP("Choose light color:");
  colorTitle.style("font-weight", "bold");
  colorPicker = createColorPicker("#FFFFFF");
  colorPicker.input(() => {
    let color = colorPicker.color();

    myShader.setUniform("lightColor", [
      red(color) / 255,
      green(color) / 255,
      blue(color) / 255,
      1,
    ]);
  });
}
