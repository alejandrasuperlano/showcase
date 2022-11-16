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

## Conclusiones
- Es posible implementar filtros pasando un parametro de opacidad como uniforme al fragment shader.

### Referencias

{{< hint danger >}}

Visual Computing. (2022, 15 noviembre). Texturing. Visual Computing. Recuperado de https://visualcomputing.github.io/docs/shaders/texturing/

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