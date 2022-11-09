# Color Blending 🔴🟠🟡

{{< hint info >}}
<b> Exercises </b>

1. Averigua el código js de los sketches de ejemplo.
2. Implementar otros modos de blending. Tomar esta <a href="https://p5js.org/reference/#/p5/blendMode">referencia</a> como un punto de partida.
{{< /hint >}}

## Marco teórico

### Color Mixing
Existen 3 tipos de mezcla de colores: aditivo, sustractivo y promedio.

* <b style="color: #6bf;">Aditivo</b> 
    * Por convención, los 3 colores primarios son el rojo, el verde y el azul. 
    * La ausencia de luz de cualquier color corresponde con negro.
    * Si se mezclan los 3 colores en mismas propociones, el resultado es neutral (blanco o gris).
    * Utilizado para <span style="color: #6bf">monitores de computador</span>.
* **Sustractivo**
    * Los 3 colores primarios son cyan, magenta y amarillo.
    * Corresponde a la mezcla de sustancias fisicas: por ejemplo, pintura.
    * El color de un elemento corresponde con el espectro de luz visible que no es absorbido por el material.
* **Promedio**
    * Se obtiene un nuevo color, donde el brillo es igual al promedio entre dos colores.   
        * Diferente a mezcla aditiva, en cuanto a que esta genera colores más claros.
        * Diferente a mezcla substractiva, en cuando a que se generan color más oscuros.

### Fragment Shader
El fragment shader define el color normalizado del fragmento de cada pixel, que debe asignarse siempre a la variable reservada ```gl_FragColor vec4 glsl ```. 

La información correspondiente a los colores que se van a mezclar se pasan como una uniforme, al archivo fragment shader.

```
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = brightness * uMaterial1 * uMaterial2;
}
```

En el codigo anterior, existen tres uniformes:
* **Brighness :** Factor arbitrario que afecta el brillo del color final.
* **uMaterial1 :** 1er color que se va a mezclar.
* **uMaterial2 :** 2do color que se va a mezclar.

## Source Code

{{< details "Source Code" closed >}}

```js
let blendShader;
let color1, color2, brightness;
let modeSelect, mode, identity;

let modeToFileName, modeToIdentity;

const WIDTH = 500;
const HEIGHT = 250;

function preload() {
    // Lectura del Shader utilizando Tree
    modeToFileName = {
        'Multiply ❌': readShader('/sketches/color_blending/mult.frag', { matrices: Tree.NONE, varyings: Tree.NONE }), 
        'Multiply ❌ + Brightness 💡': readShader('/sketches/color_blending/multBrightness.frag', { matrices: Tree.NONE, varyings: Tree.NONE }), 
        'Add ➕' : readShader('/sketches/color_blending/add.frag', { matrices: Tree.NONE, varyings: Tree.NONE }),
        'Difference ➖' : readShader('/sketches/color_blending/difference.frag', { matrices: Tree.NONE, varyings: Tree.NONE }),
        'Darkest 🌑' : readShader('/sketches/color_blending/dark.frag', { matrices: Tree.NONE, varyings: Tree.NONE }),
        'Lightest 🌞' : readShader('/sketches/color_blending/light.frag', { matrices: Tree.NONE, varyings: Tree.NONE }),
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
```

{{< /details >}}

## Solución y resultados 🟢🔵🟣

<div style="display:flex; align-items: center; justify-content: center;" id="color-blending">
    {{< p5-iframe sketch="/showcase/sketches/color_blending/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="550" height="300">}}
</div>

## Conclusiones

- Existen distintas maneras de combinar dos colores en un pixel.
- La estrategia para mezclar colores es dependiente al medio.
    - En el campo de la computación visual, nos concierne la mezcla aditiva.
- El uso de fragment shaders simplifica la manera como se define el color de un pixel, abstrayendo muchos pasos intermedios.

# Referencias

{{< hint danger >}}

Wikipedia contributors. (2022, 9 noviembre). Color Mixing. Wikipedia. Recuperado de https://en.wikipedia.org/wiki/Color_mixing

Visual Computing. (2022, 9 noviembre). Coloring. Visual Computing. Recuperado de https://visualcomputing.github.io/docs/shaders/coloring/

{{< /hint >}}

<style>
    #color-blending iframe{
        border: none;
    }
    #color-bleding{
        background-color: black;
        border-radius: 1rem;
    }
</style>