precision mediump float;

varying vec2 texcoords2;
varying vec4 color4;

// uniform is sent by the sketch
uniform float opacity;
uniform int combination;

void main() {
  // ////////// //
  // EXPLIACIÓN //
  // ////////// //

  // // gl_FragColor es un vector de cuatro elementos
  // // vec4 es una función que construye dicho vector (n:4)

  // gl_FragColor = vec4(0.0, texcoords2.x, texcoords2.y, opacity);

  // // se utilizan las coordenas texcoords2.x y texcoords2.y
  // // para poblar coordenas del vector de color

  // // en este caso, se pasan las coordenas <x> al canal verde y 
  // // las coordenas <y> al canal azul 

  // ////// //
  // CODIGO //
  // ////// //

  // {'Blue 🔵 + Green 🟢' : 0, 'Blue 🔵 + Red 🔴' : 1, 'Green 🟢 + Red 🔴' : 2, 
  //   'Green 🟢 + Blue 🔵' : 3, 'Red 🔴 + Blue 🔵' : 4, 'Red 🔴 + Green 🟢' : 5 }

  if (combination == 0){
    gl_FragColor = vec4(0.0, texcoords2.x, texcoords2.y, opacity);
  }else if ( combination == 1){
    gl_FragColor = vec4(texcoords2.x, 0.0, texcoords2.y, opacity);
  }else if (combination == 2){
    gl_FragColor = vec4(texcoords2.x, texcoords2.y, 0.0, opacity);
  }else if (combination == 3){
    gl_FragColor = vec4(0.0, texcoords2.y, texcoords2.x, opacity);
  }else if (combination == 4){
    gl_FragColor = vec4(texcoords2.y, 0.0, texcoords2.x, opacity);
  }else if (combination==5){
    gl_FragColor = vec4(texcoords2.y, texcoords2.x, 0.0, opacity);
  }else{
  }
}