// // ESTRATEGIA #1

// // Construcción de la figura invirtiendo las coordenadas de la textura
// // en el llamado a vertex

// let uvShader;

// function preload() {
//   // No se pasa ninguna matriz al shader
//   uvShader = readShader('/showcase/sketches/uv_1/uv.frag',
//                         { matrices: Tree.NONE, varyings: Tree.texcoords2 });
// }

// function setup() {
//   createCanvas(300, 300, WEBGL);
//   noStroke();
//   shader(uvShader);
//   textureMode(NORMAL);
// }

// function draw() {
//   background(0);

//   beginShape();
  
//   // La función vertex tiene la siguiente estructura:
//   //
//   //    vertex(x, y, [z], [u], [v])
//   //
//   // Siendo los parametros los siguientes:
//   // x - x-coordinate of the vertex
//   // y - y-coordinate of the vertex
//   // z - z-coordinate of the vertex
//   // u - the vertex's texture u-coordinate
//   // v - the vertex's texture v-coordinate

//   vertex(-1, -1, 0, 1, 1);
//   vertex( 1, -1, 0, 0, 1);
//   vertex( 1,  1, 0, 0, 0);
//   vertex(-1,  1, 0, 1, 0);
//   endShape();
// }








// ESTRATEGIA #2

// Construcción de la figura editando el mapeo de texturas en el fragment shader

/*
precision mediump float;

varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(1.0 - texcoords2.x, 1.0 - texcoords2.y, 0.0, 1.0);
}
*/

// Debido a que normalizamos el modo de textura; logramos invertir la textura
// restando cada una de las componentes en <x> y <y> a 1.0

let uvShader;

function preload() {
  // No se pasa ninguna matriz al shader
  uvShader = readShader('/showcase/sketches/uv_1/uv_inv.frag',
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
  
  vertex(-1, -1, 0, 0, 0);
  vertex( 1, -1, 0, 1, 0);
  vertex( 1,  1, 0, 1, 1);
  vertex(-1,  1, 0, 0, 1);
  endShape();
}