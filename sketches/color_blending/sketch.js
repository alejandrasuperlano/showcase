let blendShader;
let color1, color2, brightness;
let modeSelect, mode, identity;

let modeToFileName, modeToIdentity;

const WIDTH = 500;
const HEIGHT = 250;

function preload() {
    // Lectura del Shader utilizando Tree
    modeToFileName = {
        'Multiply ❌': readShader('/showcase/sketches/color_blending/mult.frag', { matrices: Tree.NONE, varyings: Tree.NONE }), 
        'Multiply ❌ + Brightness 💡': readShader('/showcase/sketches/color_blending/multBrightness.frag', { matrices: Tree.NONE, varyings: Tree.NONE }), 
        'Add ➕' : readShader('/showcase/sketches/color_blending/add.frag', { matrices: Tree.NONE, varyings: Tree.NONE }),
        'Difference ➖' : readShader('/showcase/sketches/color_blending/difference.frag', { matrices: Tree.NONE, varyings: Tree.NONE }),
        'Darkest 🌑' : readShader('/showcase/sketches/color_blending/dark.frag', { matrices: Tree.NONE, varyings: Tree.NONE }),
        'Lightest 🌞' : readShader('/showcase/sketches/color_blending/light.frag', { matrices: Tree.NONE, varyings: Tree.NONE }),
    }

    modeToIdentity = {
        'Multiply ❌': [1.0, 1.0, 1.0, 1.0], 
        'Multiply ❌ + Brightness 💡': [1.0, 1.0, 1.0, 1.0], 
        'Add ➕' : [0.0, 0.0, 0.0, 0.0],
        'Difference ➖' : [0.0, 0.0, 0.0, 0.0],
        'Darkest 🌑' : [1.0, 1.0, 1.0, 1.0],
        'Lightest 🌞' : [0.0, 0.0, 0.0, 0.0],
    }
}

function setup() {
    createCanvas(WIDTH, HEIGHT, WEBGL);
    noStroke();

    // El color se normaliza entre 0 y 1
    colorMode(RGB, 1);

    // Creación de los selectores de colores
    color1 = createColorPicker(color(0.8, 0.5, 0.3));
    color1.position(10, 10);
    color2 = createColorPicker(color(0.9, 0.1, 0.4));
    color2.position(width - 45, 10);

    // Creación del slider de brightness
    // emits 'brightness' uniform in [0.0, 1.0] ∈ R
    brightness = createSlider(0, 1, 0.5, 0.05);
    brightness.position(width / 2 - 35, 15);
    brightness.style('width', '80px');

    const defaultMode = 'Multiply ❌';

    // Creación de select de blendMode
    modeSelect = createSelect();
    modeSelect.position(WIDTH/3, height - 30);
    modeSelect.style('width', `${WIDTH/3}px`);
    modeSelect.option('Multiply ❌'); 
    modeSelect.option('Multiply ❌ + Brightness 💡');
    modeSelect.option('Add ➕');
    modeSelect.option('Difference ➖');
    modeSelect.option('Darkest 🌑');
    modeSelect.option('Lightest 🌞');
    modeSelect.changed(mySelectEvent);

    // Default shader
    mode = defaultMode;
    blendShader = modeToFileName[mode];
    identity = modeToIdentity[mode];
    shader(blendShader);
}

function mySelectEvent(){
    mode = modeSelect.value();
    blendShader = modeToFileName[mode];
    identity = modeToIdentity[mode];
    shader(blendShader);
}

function draw() {
    // Variables de utilidad para el posicionamiento de los elementos en el canvas
    let padding = 0.1;
    let width = 0.55;
    let height = 1;

    // Obtensión de los colores desde los color pickers
    let color1Color = color1.color();
    let color2Color = color2.color();

    background(0);

    // //////////////// //
    // FIGURA IZQUIERDA //
    // //////////////// //

    // setUniform : Utilizado para definir las uniformes del objeto p5.Shader
    //  -> Especificadas en el archivo blend.frag
    blendShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
    blendShader.setUniform('uMaterial2', identity);
    // Al definir la uniforme uMaterial2 como (1, 1, 1, 1) entonces el color resultante corresponde con 
    // uMaterial1, debido a que se multiplican los colores en el fragment
    blendShader.setUniform('brightness', 1.0);
    // Al definir la uniforme brightness como 1 entonces no afecta el resultado; elemento identidad
    
    beginShape();
    vertex(-(width+(width/2) + padding), height/2, 0);
    vertex(-(width/2 + padding), height/2, 0);
    vertex(-(width/2 + padding), -height/2, 0);
    vertex(-(width+(width/2) + padding), -height/2, 0);
    endShape();

    // ////////////// //
    // FIGURA DERECHA //
    // ////////////// //

    // setUniform : Utilizado para definir las uniformes del objeto p5.Shader
    //  -> Especificadas en el archivo blend.frag
    blendShader.setUniform('uMaterial1', identity);
    blendShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
    // Al definir la uniforme uMaterial1 como (1, 1, 1, 1) entonces el color resultante corresponde con 
    // uMaterial2, debido a que se multiplican los colores en el fragment
    blendShader.setUniform('brightness', 1.0);
    // Al definir la uniforme brightness como 1 entonces no afecta el resultado; elemento identidad

    beginShape();
    vertex(width/2 + padding, height/2, 0);
    vertex(width/2 + padding + width, height/2, 0);
    vertex(width/2 + padding + width, -height/2, 0);
    vertex(width/2 + padding, -height/2, 0);
    endShape();

    // ////////////// //
    // FIGURA CENTRAL //
    // ////////////// //

    // setUniform : Utilizado para definir las uniformes del objeto p5.Shader
    //  -> Especificadas en el archivo blend.frag
    blendShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
    blendShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
    // En este caso, el color resultante es el producto entre ambas uniformes; ambas toman sus colores propios.
    blendShader.setUniform('brightness', brightness.value());
    // En este caso, la uniforme brightness toma el valor del slider; por lo cual afecta el resultado

    beginShape();
    vertex( -(width/2), height/2, 0 );
    vertex( width/2, height/2, 0 );
    vertex( width/2, -height/2, 0 );
    vertex( -(width/2), -height/2, 0 );
    endShape();
}