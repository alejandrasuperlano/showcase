let easycam;
let uvShader;
let opacity;
let mode;
let figure = 'Ellipse 🌌';

const combinationMapper = {'Blue 🔵 + Green 🟢' : 0, 'Blue 🔵 + Red 🔴' : 1, 'Green 🟢 + Red 🔴' : 2, 
  'Green 🟢 + Blue 🔵' : 3, 'Red 🔴 + Blue 🔵' : 4, 'Red 🔴 + Green 🟢' : 5 };

function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('uv_alpha.frag',
              { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);

  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };

  // Configuración de EasyCam
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  textureMode(NORMAL);

  // Slider de Opacidad
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 25);
  opacity.style('width', '280px');

  // Creación de select de canales de color
  modeSelect = createSelect();
  modeSelect.position(15, height - 20);
  modeSelect.style('width', `${width/2}px`);

  modeSelect.option('Blue 🔵 + Green 🟢'); 
  modeSelect.option('Blue 🔵 + Red 🔴');
  modeSelect.option('Green 🟢 + Red 🔴');
  modeSelect.option('Green 🟢 + Blue 🔵');
  modeSelect.option('Red 🔴 + Blue 🔵');
  modeSelect.option('Red 🔴 + Green 🟢');

  modeSelect.changed(selectModeEvent);

  // Creación de select de figura
  figureSelect = createSelect();
  figureSelect.position(30+width/2, height - 20);
  figureSelect.style('width', `${width/3}px`);

  figureSelect.option('Ellipse 🌌'); 
  figureSelect.option('Circle ⭕');
  figureSelect.option('Triangle 🔺')
  figureSelect.option('Rectangle 🟦');

  figureSelect.changed(selectFigureEvent);
}

function selectModeEvent(){
  mode = modeSelect.value();
}

function selectFigureEvent(){
  figure = figureSelect.value();
}

function draw() {
  background(200);
  // reset shader so that the default shader is used to render the 3D scene
  resetShader();

  // world space scene
  axes();
  grid();
  translate(0, -70);
  rotateY(0.5);
  fill(color(255, 0, 255, 125));
  box(30, 50);
  translate(70, 70);
  fill(color(0, 255, 255, 125));
  sphere(30, 50);

  // use custom shader
  shader(uvShader);

  // Pasa valor a fregment shader mediante una uniforme
  // https://p5js.org/reference/#/p5.Shader/setUniform
  uvShader.setUniform('opacity', opacity.value());

  uvShader.setUniform('combination', combinationMapper[mode]);


  // definición de la figura
  beginHUD();
  noStroke();

  if (figure == 'Ellipse 🌌')         { ellipse(width/2, height/2, width, width*4/5); }
  else if (figure == 'Circle ⭕')     { circle(width/2, height/2, width, height); }
  else if (figure == 'Triangle 🔺')   { triangle(width/2, 0, 0, height, width, height); }
  else                                { quad(0, 0, width, 0, width, height, 0, height); }
  endHUD();
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}