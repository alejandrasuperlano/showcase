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

## Conclusiones

- Vemos como el color de la luz ambiental produce un efecto de tinting sobre las figuras renderizadas.
