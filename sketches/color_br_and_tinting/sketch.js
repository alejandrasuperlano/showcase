let lumaShader;
let img;
let grey_scale;
let brightnessTool, colorPicker, tintMode;

const brightnessToolToCombination  = {'💡 None': 0, '💡 Luma':1, '💡 HSV':2, '💡 HSL':3, '💡 Component Avarage':4};
const tintModeToCombination = { '🎨 Multiply ❌': 0, '🎨 Multiply ❌ + Brightness 💡': 1, '🎨 Add ➕' : 2,
  '🎨 Difference ➖' : 3, '🎨 Darkest 🌑' : 4, '🎨 Lightest 🌞' : 5,
}

function preload() {
  lumaShader = readShader('https://mbolanoss.github.io/showcase/sketches/color_br_and_tinting/frag.frag', { varyings: Tree.texcoords2 });
  img = loadImage('https://mbolanoss.github.io/showcase/sketches/color_br_and_tinting/fire_breathing.png');
}

function setup() {
  createCanvas(700, 500, WEBGL);

  noStroke();
  textureMode(NORMAL);
  colorMode(RGB, 1);
  shader(lumaShader);

  // Selector de modo de Brightness Tool
  brightnessTool = 'None'

  brightnessToolMode = createSelect();
  brightnessToolMode.position(15, 15);
  brightnessToolMode.style('width', `${width/4}px`);

  brightnessToolMode.option('💡 None'); 
  brightnessToolMode.option('💡 Luma'); 
  brightnessToolMode.option('💡 HSV');
  brightnessToolMode.option('💡 HSL');
  brightnessToolMode.option('💡 Component Avarage');

  brightnessToolMode.changed(selectBrightnessToolModeEvent);

  // Selector de color para tinte
  colorPicker = createColorPicker(color(0.8, 0.5, 0.3));
  colorPicker.position(width-45, 17);

  // Checkbox para aplicar tinte
  tintModecheck = createCheckbox('  Tint? 🎨', false);
  tintModecheck.position(width - 155, 15);
  tintModecheck.style('color', 'white');
  tintModecheck.style('background', 'rgba(0, 0, 0, 0.5)');
  tintModecheck.style('padding', "5px");
  tintModecheck.style('border-radius', '20px');

  // Creación de select de blendMode

  tintMode = 'Multiply ❌';

  tintModeSelect = createSelect();

  tintModeSelect.position(width/3, 15);
  tintModeSelect.style('width', `${width/4}px`);
  tintModeSelect.option('🎨 Multiply ❌'); 
  tintModeSelect.option('🎨 Add ➕');
  tintModeSelect.option('🎨 Difference ➖');
  tintModeSelect.option('🎨 Darkest 🌑');
  tintModeSelect.option('🎨 Lightest 🌞');

  tintModeSelect.changed(tintModeSelectEvent);

  // Definir imagen como textura
  lumaShader.setUniform('texture', img);
}

function selectBrightnessToolModeEvent(){
  brightnessTool = brightnessToolMode.value();
}

function tintModeSelectEvent(){
  tintMode = tintModeSelect.value();
}

function draw() {
  background(0);

  lumaShader.setUniform('brightnessToolCombination', brightnessToolToCombination[brightnessTool]);
  
  const myColor = colorPicker.color();
  lumaShader.setUniform('tintColor', [red(myColor), green(myColor), blue(myColor), 1.0]);
  lumaShader.setUniform('tintEnabled', tintModecheck.checked());
  lumaShader.setUniform('colorBlendingCombination', tintModeToCombination[tintMode]);

  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
}