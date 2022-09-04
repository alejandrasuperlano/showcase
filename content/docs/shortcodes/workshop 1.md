# Illusion 1: Stepping Feet

La ilusión "Stepping Feet" es un fenómeno de percepción del movimiento, donde se percibe que el recuadro azul y amarillo varían sus velocidades relativa de manera dramática, aunque en realidad su movimiento es constante.

Este efecto es más pronunciado cuando se fija la visión en la zona entre los recuadros.
{{< hint info >}} Haz click en el canvas para revelar la ilusión. {{< /hint >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/illusions/SteppingFeet.js" lib1="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="405" height="258">}}

{{< hint warning >}}
**¿Qué está pasando?**
Cuando el recuadro azul se encuentra sobre las líneas blancas, el contraste es alto, por lo cual el movimiento se percibe más rápido que su velocidad real. Por otro lado, cuando el recuadro se encuentra sobre las líneas negras, el contraste resultante es bajo y más difícil de ver.

El efecto contrario ocurre para el recuadro amarillo, resultando en la ilusión de que los recuadros dan pasos alternadamente.
{{< /hint >}}

Debido a lo anterior, cuando el contraste desaparece, es posible ver que los recuadros se mueven a la misma velocidad.

## Source Code

```js
let x = 0;      // Posición en x de los recuadros
let vx = 0.5;   // Velocidad de desplazamiento
let w = 50;     // Ancho de los recuadros

function setup() {
  createCanvas(400, 250);
  colorMode(RGB, 255);
}

function draw() {
  // De acuerdo al mouseIsPressed se pinta un fondo con alto o bajo contraste
  if (mouseIsPressed ){
    lowContrastBackground();
  }else{
    highContrastBackground();
  }
  
  // Actualización de la velocidad cuando llega al limite del canvas
  if (x+vx > width-w || x+vx < 0){vx*=-1;}
  
  // Actualización de la posición en cada iteración
  x+=vx;
  
  noStroke();
  
  // Recuadro amarillo
  fill(color(244, 244, 0));
  rect(x, 80, w, 20);
  
  // Recuadro azul
  fill(color(4, 4, 156));
  rect(x, 160, w, 20);
}

function highContrastBackground(){
  for (let i = 0; i<750; i+=9){
    if (i%2==0){
      fill(242, 242, 242, 255)
    }else{
      fill(12, 12, 12, 255)
    }
    rect(i, 0, 9, 400);
  }
}

function lowContrastBackground(){
  for (let i = 0; i<750; i+=9){
    if (i%2==0){
      fill(140)
    }else{
      fill(116)
    }
    rect(i, 0, 9, 400);
  }
}
```

# Illusion 2 : Stereokinetic Effect (SKE)

La rotación de las figuras adecuadas puede crear una ilusión tridimensional. Un ejemplo que permite demostarlo es el <b>efecto estereocinético</b> el cual una ilusión de profundidad. Puede pasar algún tiempo hasta que surja la percepción. A continuación, podemos observar un ejemplo de lo mencionado anteriormente: <br/>

{{< hint info >}} Click on the canvas change the effect. {{< /hint >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/illusions/StereokineticEffect.js" lib1="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="404" height="408">}}

{{< hint info >}}
**¿Qué es el efecto estereocinético?**  
El efecto estereocinético (SKE) se ha definido y estudiado mediante <b>patrones circulares anidados</b> que giran en una plataforma giratoria. Los círculos deben parecer que no giran, lo que a su vez da lugar a que parecen trasladarse unos a otros.
{{< /hint >}}

Se ha comprobado que las visualizaciones consistentes en simples traslaciones evocan impresiones de <b>profundidad sólidas</b>. 

{{< hint warning >}}
<b>Musatti (1924)</b> publicó el primer informe sobre los fenómenos estereocinéticos y atribuyó su descubrimiento y denominación a su maestro profesor, Vittorio Benussi
{{< /hint >}}


Como se observa en la ilusión, un conjunto de anillos concéntricos gira como si estuviera en una plataforma giratoria. Un conjunto más pequeño de anillos en el centro gira alrededor de un eje diferente, lo que puede dar la ilusión de que estos anillos más pequeños tienen <b>profundidad espacial</b>.

<img src="/showcase/sketches/illusions/stereokineticEffect.PNG">

<b>Imagen 1</b> : Efecto estereocinético (SKE) tradicional girada 90°.

A continuación se muestran las funciónes principales las cuales permitieron crear esta ilusion:
```js
class Circle{
  constructor(r, coordR, color){
    this.r = r;
    this.coordR = coordR;
    this.color = color;
  }
 
  render(centerX, centerY, angle){
    const coord = polarCoordinates(this.coordR, angle);
    const x = coord.x;
    const y = coord.y;
   
    noStroke();
    fill(this.color);
   
    circle(centerX+x, centerY+y, this.r);
  }
}
function polarCoordinates(r, angle){
  let x = 0; y = 0;
  x = r*cos(angle);
  y = r*sin(angle);
 
  return {x, y};
}

function renderingCirles(){
    for (let i = 0; i<circles.length; i++){
        circles[i].render(centerX, centerY, angle);
    }
};
```
## Aplicaciones

Los candidatos más lógicos son los sistemas que requieren movimiento en tiempo real pero en los que las limitaciones de coste, tamaño o fiabilidad impiden el uso de motores de geometría 3D.

{{< hint info >}}
<b>Mapas de contorno en movimiento</b> : Los mapas de contorno se utilizan en la navegación por la siesta, 
La tripulación correlaciona las características del terreno vistas fuera de la cabina con las características representadas en el mapa para lograr y mantener la orientación geográfica.
{{< /hint >}}
<img src="/showcase/sketches/illusions/application.PNG">

<b>Imagen 2</b> : Una línea de elevación constante representada en una superficie y en un mapa de contorno.

{{< hint info >}}
<b>Pantalla de control del tráfico aéreo</b>: Al enrutar y poner en cola el tráfico aéreo, los controladores necesitan recuperar las relaciones espaciales en 3D entre las aeronaves.

Se han desarrollado y evaluado varios formatos de visualización alternativos que utilizan señales de perspectiva 
{{< /hint >}}
<img src="/showcase/sketches/illusions/airTrafficControlDisplay.jpg">

<b>Imagen 3</b> : Pantalla de control de tráfico aereo.


# Image kernel

Un kernel o mascara es una matriz usada para aplicar algun tipo de efecto como difuminado, detección de bordes
, sobre una imagen. Eso se logra realizando una convolución entre el kernel y la imagen.
{{< hint info >}}
**¿Qué es una convolución?**  
En procesamiento de imagenes, una convolución consiste en multiplicar cada píxel de la imagen por la entrada correspondiente del kernel, luego al sumar todos los resultados, se obtiene el valor del nuevo píxel.
{{< /hint >}}

A modo de ejemplo, se escogieron los siguientes kernels para mostrar su aplicación:

{{< details "Sharpening" closed >}}
{{< katex display>}}
\begin{bmatrix}
0 & -1 & 0\\
-1 & 5 & -1\\
0 & -1 & 0\\
\end{bmatrix}
{{< /katex >}}
{{< /details >}}

{{< details "Emboss" closed >}}
{{< katex display>}}
\begin{bmatrix}
-2 & -1 & 0\\
-1 & 1 & 1\\
0 & 1 & 2\\
\end{bmatrix}
{{< /katex >}}
{{< /details >}}

{{< details "Blur" closed >}}
{{< katex display>}}
\begin{bmatrix}
0.0625 & 0.125 & 0.0625\\
0.125 & 0.25 & 0.125\\
0.0625 & 0.125 & 0.0625\\
\end{bmatrix}
{{< /katex >}}
{{< /details >}}

{{< p5-div sketch="/showcase/sketches/imageKernel.js" >}}
A continuación se muestra la función principal, la cual es la encargada de calcula el nuevo valor de cada píxel:

```js
let applyKernelToPixel = (x, y, kernel, kernelSize) => {
  let newR = 0.0;
  let newG = 0.0;
  let newB = 0.0;

  // Go through each kernel entry
  for (let r = 0; r < kernelSize; r++) {
    for (let c = 0; c < kernelSize; c++) {
      // Compute the offset
      let rowOffset = 1 - r;
      let colOffset = 1 - c;

      let imageRow = x - rowOffset;
      let imageCol = y - colOffset;

      let currentPixel = originalImg.get(imageRow, imageCol);

      // Compute new value for each channel
      newR += p.red(currentPixel) * kernel[r][c];
      newG += p.green(currentPixel) * kernel[r][c];
      newB += p.blue(currentPixel) * kernel[r][c];
    }
  }

  // In case the new value is greater than 255
  newR = p.constrain(newR, 0, 255);
  newG = p.constrain(newG, 0, 255);
  newB = p.constrain(newB, 0, 255);

  return p.color(newR, newG, newB);
};
```

## Image histogram

Un histograma de una imagen consiste en la representación gráfica de la distribución tonal de la imagen, trazando el número de píxeles de cada canal.  
En el eje horizontal representa las variaciones tonales, mientras que el vertical, representa la cantidad de píxeles en un tono particular.

{{< hint info >}}
**¿Cómo interpretar un histograma?**

El lado izquierdo del eje horizontal representa las áreas oscuras y el derecho representa las áreas iluminadas.  
Por ejemplo, para una imagen oscura, esta tendrá la mayoría de puntos dibujados en el lado izquiero del histograma.
{{< /hint >}}

{{< p5-div sketch="/showcase/sketches/imageHistogram.js" >}}

A continuación se muestra la función principal, la cual es la encargada de contar la cantidad de píxeles en cada valor de un determinado canal:

```js
let countPixels = () => {
  // Go through each pixel
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let pixel = img.get(x, y);

      // Add 1 to the current tonal value
      let value =
        currentColor === "red"
          ? p.red(pixel)
          : currentColor === "green"
          ? p.green(pixel)
          : p.blue(pixel);
      pixels[value] += 1;
    }
  }
};
```

## Lightness tools

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

{{< p5-div sketch="/showcase/sketches/lightnessTools.js" >}}

A continuación, se muestra la implementación de las 4 maneras de calcular la luminosidad expuestas anteriormente, junto con la función encargada de aplicar ese cálculo a cada pixel de la imagen:

```js
let lightnessModes = {
  mean: (color) => {
    return (p.red(color) + p.green(color) + p.blue(color)) / 3;
  },

  hsv: (color) => {
    return Math.max((p.red(color), p.green(color), p.blue(color)));
  },

  hsl: (color) => {
    let max = Math.max((p.red(color), p.green(color), p.blue(color)));
    let min = Math.min((p.red(color), p.green(color), p.blue(color)));
    return (max + min) / 2;
  },

  luma: (color) => {
    return (
      0.2126 * p.red(color) + 0.7152 * p.green(color) + 0.0722 * p.blue(color)
    );
  },
};

let applyLightness = (mode) => {
  // Extract the current function
  let lightness = lightnessModes[mode];

  // Go through each pixel
  for (let i = 0; i < originalImg.width; i++) {
    for (let j = 0; j < originalImg.height; j++) {
      let newPixel = lightness(originalImg.get(i, j));
      currentImg.set(i, j, p.color(newPixel));
    }
  }
};
```
# Referencias

{{< hint danger >}}

Stereokinetic Effect.Neurobs.
https://www.neurobs.com/manager/content/docs/psychlab101_experiments/Stereokinetic%20Effect/description.html

Proffitt, D. R., Rock, I., Hecht, H., & Schubert, J. (1992). Stereokinetic effect and its relation to the kinetic depth effect. Journal of Experimental Psychology: Human Perception 
and Performance, 18(1), 3–21. https://doi.org/10.1037/0096-1523.18.1.3

G. (2018, 8 noviembre). ¿Qué son las isolíneas, contornos o curvas de nivel? El blog de franz. https://acolita.com/que-son-las-isolineas-contornos-o-curvas-de-nivel/

{{< /hint >}}
