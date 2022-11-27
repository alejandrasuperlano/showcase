# Lighting 🔦

{{< hint danger >}}
<b> Workshop </b>

Implement a scene having the following lighting equation:
{{< katex display>}}
a = ambient\cdot ambient4
{{< /katex >}}

where ambient4 is the ambient light color.
{{< /hint >}}

## Marco teórico

La iluminación local está dada por la siguiente ecuación:
<img src="/showcase/sketches/lightning/Eq light.png" width="250" style="margin: 2rem auto; display: block;">

En este caso los terminos d y s de la ecuación no nos interesan ya que solo vamos a modificar la luz ambiental.

De modo que la ecuación a usar es la siguiente:

{{< katex display>}}
\lambda = a\cdot \rho
{{< /katex >}}

## Solución y resultados

{{< details "Fragment shader" closed >}}

```glsl
precision mediump float;

uniform vec4 uMaterialColor;
uniform vec4 lightColor;
uniform float ambient;

void main() {
  vec4 ambient4 = lightColor * ambient;
  gl_FragColor = ambient4 * uMaterialColor;
}
```

{{< /details >}}

<br>

{{< p5-iframe sketch="/showcase/sketches/lightning/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" lib3="https://freshfork.github.io/p5.EasyCam/p5.easycam.js"  width="705" height="650">}}


## Aplicaciones 
<center>
<img src="/showcase/sketches/lightning\RayTracing.png">
</center>

En los gráficos por ordenador en 3D, el trazado de rayos es una técnica de modelado del transporte de la luz para su uso en una amplia variedad de algoritmos de renderizado para generar imágenes digitales. El trazado de rayos es capaz de simular diversos efectos ópticos, como la reflexión, la refracción, las sombras suaves, la dispersión, la profundidad de campo, el desenfoque de movimiento, las cáusticas, la oclusión ambiental y los fenómenos de dispersión


{{< hint info >}}
En los videojuegos, el ray tracing es esencialmente un sistema de simulación de cómo viaja la luz, interactúa con diversos objetos del entorno y finalmente llega a nuestros ojos. La luz rebota en los objetos, viaja a través de ellos, se dobla y a veces es absorbida. Simular todas estas interacciones puede llevar mucho trabajo, pero eso es lo que intenta hacer el trazado de rayos en la búsqueda de una imagen más realista.
{{< /hint >}}


<center>
<img src="/showcase/sketches/lightning\RayTraced.PNG">
</center>

Al dotar a los objetos del mundo del juego de diversas propiedades materiales, los juegos pueden simular este comportamiento realista de la iluminación para crear imágenes que se asemejen a lo que vemos en la realidad, donde la luz rebota por todas partes.
<center>
<img src="/showcase/sketches/lightning\RayTraced2.png">
</center>


El ray tracing se está introduciendo en cada vez más juegos. Aunque puede requerir un gran esfuerzo para su aplicación, ya que necesita tarjetas gráficas de gama alta y toda la potencia que puedan ofrecer las últimas consolas, puede suponer un gran salto en la calidad gráfica y evitar algunos problemas de los efectos gráficos actuales.

<center>
<img src="/showcase/sketches/lightning\RayTraced3.PNG">
</center>

{{< hint warning >}}
Ray Tracing es una tecnología que cambia en gran manera la forma en la que vemos los reflejos y las sombras.
{{< /hint >}}




## Conclusiones

- Vemos como el color de la luz ambiental produce un efecto de tinting sobre las figuras renderizadas.

# Referencias

{{< hint danger >}}

- Wikipedia contributors. (2022, 22 noviembre). Ray tracing (graphics). Wikipedia. https://en.wikipedia.org/wiki/Ray_tracing_(graphics)
- Jefferies, C. (2021, 7 mayo). What Is Ray Tracing? (And What It Means for PC Gaming). PCMAG. https://www.pcmag.com/how-to/what-is-ray-tracing-and-what-it-means-for-pc-gaming
- 🗹 Ray Tracing: ¿Qué es y para qué sirve? - Definición. (2020, 30 abril). GEEKNETIC. https://www.geeknetic.es/Ray-Tracing/que-es-y-para-que-sirve

{{< /hint >}}