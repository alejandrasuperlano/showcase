# Color Brightness 🌟 and Tinting 👩‍🎨

{{< hint info >}}
<b> Exercises </b>

1. Implementar otras modos de luminosidad, como HSV, HSL y promedio.
2. Implementar tintado de texturas para mezclar colores y texels.

{{< /hint >}}

## Marco teórico

### Herramientas de luminosidad

La luminosidad es la percepción visual de la luminancia de un objeto. En colorimetría, es una predicción de que tan iluminado aparecerá un color para un determinado observador.
{{< hint info >}}
**¿Qué es la luminancia?**
Es la médida de intensidad lumínica por unidad de área de la luz viajando en una determinada dirección. Es decir, describe la cantidad de luz que pasa a través, es emitida o reflejada de un área particular.  
Existen varias formas de calcular la luminosidad de un color. A modo de ejemplo, se mostrarán las siguientes 4:
{{< /hint >}}

{{< details "Media aritmética" closed >}}
{{< katex display>}}
I=\frac{R+G+B}{3}
{{< /katex >}}
{{< /details >}}

{{< details "HSV" closed >}}
{{< katex display>}}
V=max(R,G,B)
{{< /katex >}}
{{< /details >}}

{{< details "HSL" closed >}}
{{< katex display>}}
L=\frac{max(R,G,B)+min(R,G,B)}{2}
{{< /katex >}}
{{< /details >}}

{{< details "Luma" closed >}}
{{< katex display>}}
Y=0.2126\cdot R+ 0.7152\cdot G+0.0722\cdot B
{{< /katex >}}
{{< /details >}}

### Texels
Un téxel es la unidad mínima de una textura aplicada a una superficie. De esta manera, una textura se puede representar mediante una matriz de téxeles.

Dentro del fragment shader, el texel se obtiene mediante la función 
``` frag
texture2D(sampler2D sampler, vec2 coord) 
```
Siendo los parametros los siguientes:
- sampler - Especifica el sampler de la textura, del cual se reciben los texels.
- coord - Especifica las coordenadas de textura donde la textura sera muestreada.

Más información <a href="https://thebookofshaders.com/glossary/?search=texture2D" target="_blank">aqui</a>.

## Source Code

{{< details "Source Code: JavaScript" closed >}}

``` javascript

let lumaShader;
let img;
let grey_scale;
let brightnessTool, colorPicker, tintMode;

const brightnessToolToCombination  = {'💡 None': 0, '💡 Luma':1, '💡 HSV':2, '💡 HSL':3, '💡 Component Avarage':4};
const tintModeToCombination = { '🎨 Multiply ❌': 0, '🎨 Multiply ❌ + Brightness 💡': 1, '🎨 Add ➕' : 2,
  '🎨 Difference ➖' : 3, '🎨 Darkest 🌑' : 4, '🎨 Lightest 🌞' : 5,
}

function preload() {
  lumaShader = readShader('/showcase/sketches/color_br_and_tinting/frag.frag', { varyings: Tree.texcoords2 });
  img = loadImage('/showcase/sketches/color_br_and_tinting/fire_breathing.png');
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
  colorPicker = createColorPicker(color(1, 0, 0));
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

```

{{< /details >}}

{{< details "Source Code: Fragment Shader" closed >}}

``` frag

precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;

uniform int brightnessToolCombination;

uniform bool tintEnabled;
uniform vec4 tintColor;
uniform int colorBlendingCombination;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// Transformación de brillo sobre texel
float luma(vec3 texel){
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float mean(vec3 texel){
  return (texel.r + texel.g + texel.b)/3.0;
}

float hsv(vec3 texel){
  return max(max(texel.r, texel.g), texel.b);
}

float hsl(vec3 texel){
  float maxColor = max(max(texel.r, texel.g), texel.b);
  float minColor = min(min(texel.r, texel.g), texel.b);

  return (maxColor + minColor)/2.0;
}

// Transformación de tintado sobre texel
vec4 mult(vec4 texel){
  return tintColor * texel;
}

vec4 add(vec4 texel){
  return tintColor + texel;
}

vec4 diff(vec4 texel){
  return max(texel, tintColor) - min(texel, tintColor);
}

vec4 light(vec4 texel){
  return max(tintColor, texel);
}

vec4 dark(vec4 texel){
  return min(tintColor, texel);
}


void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color

  vec4 texel = texture2D(texture, texcoords2);

  if (brightnessToolCombination == 0){
    texel = texel;
  }else if (brightnessToolCombination == 1){
    texel = vec4((vec3(luma(texel.rgb))), 1.0);
  }else if (brightnessToolCombination == 2){
    texel = vec4((vec3(hsv(texel.rgb))), 1.0);
  }else if (brightnessToolCombination == 3){
    texel = vec4((vec3(hsl(texel.rgb))), 1.0);
  }else{
    texel = vec4((vec3(mean(texel.rgb))), 1.0);
  } 

  // Tinting
  if (tintEnabled){
    if (colorBlendingCombination == 0){
      texel = mult(texel);
    }else if (colorBlendingCombination == 2){
      texel = add(texel);
    }else if (colorBlendingCombination == 3) {
      texel = diff(texel);
    }else if (colorBlendingCombination == 4){
      texel = light(texel);
    }else if (colorBlendingCombination == 5){
      texel = dark(texel);
    }
  }

  gl_FragColor = texel;
}

```

{{< /details >}}

## Solución y Resultados
<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="cbat">
{{< p5-iframe sketch="/showcase/sketches/color_br_and_tinting/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="720" height="520">}}

<div style="color: white;padding: 0.5rem;">Utilice el 1er selector para cambiar el <span style="color: #FFAA66">modo de brillo</span> (Coloring Brightness Tool).</div>
<div style="color: white;padding: 0.5rem;">Utilice el 2do selector para cambiar el <span style="color: #FFAA66">modo de mezcla de colores </span>(BlendMode).</div>
<div style="color: white;padding: 0.5rem;">Utilice el checkbox para aplicar el <span style="color: #FFAA66">tintado</span>.</div>
<div style="color: white;padding: 0.5rem;">Seleccione el <span style="color: #FFAA66">color de tintado</span> con el selector.</div>
</div>


## Aplicaciones 

El proceso de asignar los <b>texels</b> apropiados a sus puntos correspondientes en un polígono se llama <b>mapeo de textura</b>. 
- El mapeo de texturas es una etapa del proceso de renderización de una imagen 3D para su visualización. Cuando la rejilla de texel de origen y la rejilla de píxel de destino no se alinean, se aplica un filtrado de textura adicional para suavizar los píxeles mapeados de textura resultantes (ampliación o minificación de la textura). El resultado final del proceso de renderizado es una proyección 2D aplanada del modelo 3D, donde la textura se ha "envuelto" alrededor del modelo.

<center>
<img src="/showcase/sketches/color_br_and_tinting\texture-maps-imvu.jpg">
</center>

Los mapas de textura son esenciales para que las imágenes 3D parezcan reales. Se aplican a los modelos 3D para crear efectos especiales, patrones o texturas repetitivas. Hay muchos tipos diferentes de mapas de textura


{{< hint warning >}}
¿Y por qué son importantes para la moda 3D?
{{< /hint >}}

<center>
<img src="/showcase/sketches/color_br_and_tinting\3_LowPoly.jpg.img.jpg">
</center>

<b> El comercio electrónico en 3D </b>  ha demostrado duplicar las tasas de conversión en línea, mientras que el uso del 3D en las ventas  ha permitido a las marcas reducir su huella de carbono, aumentar la velocidad de comercialización y reducir los costes al sustituir las muestras físicas por modelos en 3D

## Conclusiones

- Los texeles, como mapeos de texturas, facilitan la implementación de herramientas de luminosidad y tintado.
- Los texeles, permiten manipular texturas a muy bajo nivel y de manera rapida.

# Referencias

{{< hint danger >}}

- Wikipedia contributors. (2022, 15 noviembre). Texel. Wikipedia. Recuperado de https://es.wikipedia.org/wiki/Texel_(gr%C3%A1ficos)

- Patricio Gonzales Vivo. (2022 15 noviembre). Texture2D. The Book of Shaders. Recuperado de https://thebookofshaders.com/glossary/?search=texture2D

- Visual Computing. (2022, 15 noviembre). Texturing. Visual Computing. Recuperado de https://visualcomputing.github.io/docs/shaders/texturing/

- Texel - MDN Web Docs Glossary: Definitions of Web-related terms | MDN. (2022, 21 septiembre). https://developer.mozilla.org/en-US/docs/Glossary/Texel

- https:\/\/www.vntana.com\/author\/ashleyvntana-com\/#author. (2022, 12 octubre). What are texture maps and why do they matter for 3D fashion? | VNTANA. VNTANA | The 3D Commerce Platform. https://www.vntana.com/blog/what-are-texture-maps-and-why-do-they-matter-for-3d-fashion/

{{< /hint >}}

<style>
    #cbat{
        background-color: black;
        border-radius: 1rem;
        padding: 1rem;
    }
    #cbat iframe{
        border: none;
    }
</style>