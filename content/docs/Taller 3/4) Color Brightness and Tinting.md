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

## Solución y Resultados
<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="cbat">
{{< p5-iframe sketch="/showcase/sketches/color_br_and_tinting/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="720" height="520">}}

<div style="color: white;padding: 0.5rem;">Utilice el 1er selector para cambiar el <span style="color: #FFAA66">modo de brillo</span> (Coloring Brightness Tool).</div>
<div style="color: white;padding: 0.5rem;">Utilice el 2do selector para cambiar el <span style="color: #FFAA66">modo de mezcla de colores </span>(BlendMode).</div>
<div style="color: white;padding: 0.5rem;">Utilice el checkbox para aplicar el <span style="color: #FFAA66">tintado</span>.</div>
<div style="color: white;padding: 0.5rem;">Seleccione el <span style="color: #FFAA66">color de tintado</span> con el selector.</div>
</div>

## Conclusiones

- Conclusión 1

# Referencias

{{< hint danger >}}

Wikipedia contributors. (2022, 15 noviembre). Texel. Wikipedia. Recuperado de https://es.wikipedia.org/wiki/Texel_(gr%C3%A1ficos)

Patricio Gonzales Vivo. (2022 15 noviembre). Texture2D. The Book of Shaders. Recuperado de https://thebookofshaders.com/glossary/?search=texture2D

Visual Computing. (2022, 15 noviembre). Texturing. Visual Computing. Recuperado de https://visualcomputing.github.io/docs/shaders/texturing/

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