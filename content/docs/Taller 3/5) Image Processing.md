# Image/Video processing 🖼️

{{< hint danger >}}
<b> Workshop </b>

Implement an image / video processing app supporting different masks, including other kernel sizes different than 3x3, and:

- A region-of-interest base tool to selectively apply a given mask.Hint: circular regions around the mouse pointer are handy and quite simple to implement by means of glsl distance.
- A magnifier tool. Requires a bit of research. For instance, look for it in shadertoy.
- Integrate luma and other coloring brightness tools.
  {{< /hint >}}

## Marco teórico

### Kernel

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

{{< details "Edge detection" closed >}}
{{< katex display>}}
\begin{bmatrix}
-1 & -1 & -1\\
-1 & 8 & -1\\
-1 & -1 & -1\\
\end{bmatrix}
{{< /katex >}}
{{< /details >}}

## Solución y resultados

A continuación se muestran los fragmentos más relevante del código del fragment shader usado.  
Primero, estas son las variables usadas:

{{< details "Variables" closed >}}

```glsl
precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;

// Herramienta de brillo seleccionada
uniform int brightnessTool;

// Posicion del mouse
uniform vec2 mouse;

// Resolucion de la pantalla
uniform vec2 resolution;

uniform float kernel[9];

uniform bool magnifier;
uniform bool region;
uniform float radius;
uniform float scale;

varying vec2 texcoords2;
```

{{< /details >}}

Con la siguiente función se aplica el kernel seleccionado:

{{< details "Función applyKernel" closed >}}

```glsl
vec4 applyKernel(){
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*kernel[i];
  }

  convolution = vec4(convolution.rgb, 1.0);

  return convolution;
}
```

{{< /details >}}

Para calcular el area de interes o la lupa:

{{< details "Area" closed >}}

```glsl
float dist = distance(gl_FragCoord.xy, mouse);

if(dist < radius){
...
}
```

{{< /details >}}

Por último, para realizar el efecto de lupa:

{{< details "Lupa" closed >}}

```glsl
vec2 mouseDist = gl_FragCoord.xy - mouse;

vec2 newCoords = gl_FragCoord.xy;

vec2 zoomed = (newCoords - (mouseDist * scale)) / resolution;

// Se invierte el eje y
zoomed = vec2(zoomed.x, 1.0 - zoomed.y);

vec4 zoomedTexel = texture2D(texture, zoomed);
zoomedTexel = changeBrightness(zoomedTexel);

gl_FragColor = zoomedTexel;
```

{{< /details >}}

<br>

<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="cbat">

{{< p5-iframe sketch="/showcase/sketches/image_processing/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js"  width="705" height="850">}}

</div>


## Aplicaciones 

El procesamiento de imágenes tiene muchos campos de acción. Gracias  a su gran utilidad se ha extendido de  gran manera en toda la vida y lo podemos observar aplicado por ejemplo en  la medicina, la agricultura y  el espacio exterior.

- <b>Medicina</b> : Es de gran utilidad para la visualización de imágenes como radiografías, resonancias, tacs, entre otros exámenes que funcionan bajo este método.

<center>
<img src="/showcase/sketches/image_processing\mislow-neurosurgclinnam2009-fig3.jpeg">
</center>


- <b> Agricultura </b> : Ayuda a identificar eficazmente los frutos, y diferenciar la maleza de la planta en general.

<center>
<img src="/showcase/sketches/image_processing\Como-procesar-imagenes-multiespectrales-en-agricultura.jpg">
</center>

- <b> Espacio Exterior </b> : Ha permitido a la humanidad avistar grandes planetas, galaxias entre otras, y el logro más reciente de este método fue poder visualizar de una manera clara un hoyo negro.

<center>
<img src="/showcase/sketches/image_processing\hubble-aniversario-treinta.jpg">
</center>

## Conclusiones

- La forma del area de interes o de la lupa se puede cambiar usando diferentes aproximaciones
- Las coordenadas de cada fragmento se deben normalizar
- El eje y se debe invertir

# Referencias

{{< hint danger >}}

- Rubio, O. (2020, 2 octubre). Procesamiento de imagenes. https://www.vistronica.com/blog/post/procesamiento-de-imagenes.html

{{< /hint >}}


<style>
    #cbat{
        background-color: white;
        border-radius: 1rem;
        padding: 1rem;
    }
    #cbat iframe{
        border: none;
    }
</style>