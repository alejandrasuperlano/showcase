# UV Visualization - Exercise 2 🟥🟩🟦

{{< hint info >}}
<b> Exercises </b>

1. Incluir el canal azul dentro de la visualización uv.
2. Utilizar otras figuras, diferentes a quad, como filtros.
{{< /hint >}}

## Source Code

{{< details "Source Code: JavaScript" closed >}}

``` javascript

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
  uvShader = readShader('/showcase/sketches/uv_2/uv_alpha.frag',
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
  opacity.position(10, 12);
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

```

{{< /details >}}


{{< details "Source Code: Fragment Shader" closed >}}

``` frag

precision mediump float;

varying vec2 texcoords2;
varying vec4 color4;

// uniform is sent by the sketch
uniform float opacity;
uniform int combination;

void main() {
  // ////////// //
  // EXPLIACIÓN //
  // ////////// //

  // // gl_FragColor es un vector de cuatro elementos
  // // vec4 es una función que construye dicho vector (n:4)

  // gl_FragColor = vec4(0.0, texcoords2.x, texcoords2.y, opacity);

  // // se utilizan las coordenas texcoords2.x y texcoords2.y
  // // para poblar coordenas del vector de color

  // // en este caso, se pasan las coordenas <x> al canal verde y 
  // // las coordenas <y> al canal azul 

  // ////// //
  // CODIGO //
  // ////// //

  // {'Blue 🔵 + Green 🟢' : 0, 'Blue 🔵 + Red 🔴' : 1, 'Green 🟢 + Red 🔴' : 2, 
  //   'Green 🟢 + Blue 🔵' : 3, 'Red 🔴 + Blue 🔵' : 4, 'Red 🔴 + Green 🟢' : 5 }

  if (combination == 0){
    gl_FragColor = vec4(0.0, texcoords2.x, texcoords2.y, opacity);
  }else if ( combination == 1){
    gl_FragColor = vec4(texcoords2.x, 0.0, texcoords2.y, opacity);
  }else if (combination == 2){
    gl_FragColor = vec4(texcoords2.x, texcoords2.y, 0.0, opacity);
  }else if (combination == 3){
    gl_FragColor = vec4(0.0, texcoords2.y, texcoords2.x, opacity);
  }else if (combination == 4){
    gl_FragColor = vec4(texcoords2.y, 0.0, texcoords2.x, opacity);
  }else if (combination==5){
    gl_FragColor = vec4(texcoords2.y, texcoords2.x, 0.0, opacity);
  }else{
  }
}

```

{{< /details >}}

## Solución y Resultados
<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="uv-2">
{{< p5-iframe sketch="/showcase/sketches/uv_2/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib3="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="320" height="320">}}

<div style="color: white;padding: 0.5rem;">Utilice el primer selector para cambiar los <span style="color: #FFAA66">canales visualizados</span>.</div>
<div style="color: white;padding: 0.5rem;">Utilice el segundo selector para cambiar la <span style="color: #FFAA66">forma del filtro</span>.</div>
</div>

## Aplicaciones 

{{< hint info >}}

Cuando se utiliza el término "shader" sobre un videojuego, se trata de un programa utilizado para renderizar diferentes píxeles. Los shaders en los juegos se utilizan cuando se detallan las sombras, la iluminación, los gradientes de las texturas y mucho más. Sin embargo, pueden hacer mucho más !!

{{< /hint >}}

<img src="/showcase/sketches/uv_2\shadersv21.jpg">


A veces los juegos utilizan sombreadores sencillos; otras veces, pueden parecer extremadamente complicados. El producto final de un programa de shaders suele ser impresionante, ya que muestra los entornos del juego con la iluminación y el sombreado adecuados.
A través de su lenguaje de codificación, los shaders transforman entornos aburridos y monótonos que pueden carecer de un aspecto cohesivo en obras de arte asombrosamente bellas. 
<center>
<img src="/showcase/sketches/uv_2\shadersv2.jpg">
</center>


Los <b>shaders</b> añaden una cierta sensación de realismo y matiz artístico a los juegos que no existía hace décadas. Provoca una impresionante generación visual sobre la marcha, en tiempo real.

<center>
<img src="/showcase/sketches/uv_2\shadersv2.png">
</center>

{{< hint warning >}}
Como dato curioso  el término "shaders" viene directamente de uno de los reyes de la animación 3D, <b>Pixar</b>. A finales de los 80, su programa de renderizado incluía la frase. La <b>Nvidia GeForce 3</b> fue la primera tarjeta gráfica con un shader de pixeles programable
<img src="/showcase/sketches/uv_2\shadersv3.png">
{{< /hint >}}


Crear shaders suele considerarse un trabajo especializado en películas, videojuegos y otros grandes estudios de producción. De hecho, a veces los grandes estudios contratan a personas para que sólo trabajen en shaders personalizados. Así que si eres lo suficientemente bueno diseñando shaders, ¡podrías hacer mucho  con ello!


## Conclusiones
- Es posible implementar filtros pasando un parametro de opacidad como uniforme al fragment shader.

### Referencias

{{< hint danger >}}

- Visual Computing. (2022, 15 noviembre). Texturing. Visual Computing. Recuperado de https://visualcomputing.github.io/docs/shaders/texturing/
- Wirtz, B. (2022, 13 octubre). What Are Shaders in Video Games? From Dull to Beautiful, The Can's and Can'ts With Using Shaders. Video Game Design and Development. https://www.gamedesigning.org/learn/shaders/

- Denham, T. (2020, 12 mayo). What are 3D & Game Shaders? Concept Art Empire. https://conceptartempire.com/shaders/

{{< /hint >}}

<style>
    #uv-2{
        background-color: black;
        border-radius: 1rem;
        padding: 1rem;
    }
    #uv-2 iframe{
        border: none;
    }
</style>