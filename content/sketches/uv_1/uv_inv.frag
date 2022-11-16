precision mediump float;

varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(1.0 - texcoords2.x, 1.0 - texcoords2.y, 0.0, 1.0);
}