# Procedural texturing ⚽

{{< hint danger >}}
<b> Exercise </b>

Adapte otros patrones del <a href="https://thebookofshaders.com/09/" target="_blank">libro de shaders</a> y apliquelos a otras figuras 3D.
{{< /hint >}}

## Source Code (Ejercicio 1)

Los fragment shaders correspondientes fueron tomados de el <a href="https://thebookofshaders.com/09/" target="_blank">libro de shaders</a>.

{{< details "Source Code: JavaScript" closed >}}

``` javascript

let pg;
let truchetShader;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/showcase/sketches/procedular/bricks.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  console.log(pg);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(0);
  orbitControl();
  box(200, 200);
}

function mouseMoved() {
  if (pg){
    // https://p5js.org/reference/#/p5.Shader/setUniform
    truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
    // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  }
}


```

{{< /details >}}

## Solución y Resultados

<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="procedular-texturing">

{{< p5-iframe sketch="/showcase/sketches/procedular/sketch1.js"  lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="420" height="420">}}

{{< p5-iframe sketch="/showcase/sketches/procedular/sketch2.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="420" height="420">}}

{{< p5-iframe sketch="/showcase/sketches/procedular/sketch3.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="420" height="420">}}

{{< p5-iframe sketch="/showcase/sketches/procedular/sketch4.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="420" height="420">}}

</div>

## Conclusiones

- Existe una gran cantidad de recursos online que proveen fragment shaders completos.
- Asimismo, existe varios recursos de aprendizaje acerca de este tema.

# Referencias

{{< hint danger >}}

- Patricio Gonzales Vivo & Jen Lowe (2022, 27 noviembre). The Book of Shaders. https://thebookofshaders.com/09/

{{< /hint >}}


<style>
    #procedular-texturing{
        background-color: black;
        border-radius: 1rem;
        padding: 1rem;

        text-decoration: none !important;
    }
    #procedular-texturing iframe{
        border: none;
    }
</style>