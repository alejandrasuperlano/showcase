# UV Visualization - Exercise 2 🟥🟩🟦

{{< hint info >}}
<b> Exercises </b>

1. Incluir el canal azul dentro de la visualización uv.
2. Utilizar otras figuras, diferentes a quad, como filtros.
{{< /hint >}}

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