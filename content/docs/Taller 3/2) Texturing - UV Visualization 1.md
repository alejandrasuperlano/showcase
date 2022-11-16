# UV Visualization - Exercise 1 🔴🟢🔵

{{< hint info >}}
<b> Exercise </b>

Redefine the shape texture coordinates to turn the above image upside down.

<div style="display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <img src="/showcase/sketches/uv_1/original_uv.png">
</div>

{{< /hint >}}

## Source Code

### JavaScript: Ajustando coordenadas <u> y <v> en vertex

Construcción de la figura invirtiendo las coordenadas de la textura en el llamado a vertex.

La función vertex tiene la siguiente estructura:
<span style="margin-left: 1rem;">vertex(x, y, [z], [u], [v])</span>
Siendo los parametros los siguientes:
<span style="margin-left: 1rem;">x - x-coordinate of the vertex</span>
<span style="margin-left: 1rem;">y - y-coordinate of the vertex</span>
<span style="margin-left: 1rem;">z - z-coordinate of the vertex</span>
<span style="margin-left: 1rem;">u - the vertex's texture u-coordinate</span>
<span style="margin-left: 1rem;">v - the vertex's texture v-coordinate</span>

``` javascript
// Construcción de la figura invirtiendo las coordenadas de la textura
// en el llamado a vertex

let uvShader;

function preload() {
  // No se pasa ninguna matriz al shader
  uvShader = readShader('/showcase/sketches/uv_1/uv.frag',
                        { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  noStroke();
  shader(uvShader);
  textureMode(NORMAL);
}

function draw() {
  background(0);

  beginShape();
  
  // La función vertex tiene la siguiente estructura:
  //
  //    vertex(x, y, [z], [u], [v])
  //
  // Siendo los parametros los siguientes:
  // x - x-coordinate of the vertex
  // y - y-coordinate of the vertex
  // z - z-coordinate of the vertex
  // u - the vertex's texture u-coordinate
  // v - the vertex's texture v-coordinate

  vertex(-1, -1, 0, 1, 1);
  vertex( 1, -1, 0, 0, 1);
  vertex( 1,  1, 0, 0, 0);
  vertex(-1,  1, 0, 1, 0);
  endShape();
}


```

## Solución y Resultados
<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="uv-1">
{{< p5-iframe sketch="/showcase/sketches/uv_1/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib3="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="320" height="320">}}


</div>

<style>
    #uv-1{
        background-color: black;
        border-radius: 1rem;
        padding: 1rem;
    }
    #uv-1 iframe{
        border: none;
    }
</style>