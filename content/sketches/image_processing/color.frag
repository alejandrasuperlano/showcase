precision mediump float;

uniform sampler2D texture;
uniform int brightnessTool;

varying vec2 texcoords2;

float luma(vec3 texel){
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float mean(vec3 texel){
  return (texel.r + texel.g + texel.b)/3.0;
}

float hsv(vec3 texel){
  return max(max(texel.r, texel.g), texel.b);
}

float hsl(vec3 texel){
  float maxColor = max(max(texel.r, texel.g), texel.b);
  float minColor = min(min(texel.r, texel.g), texel.b);

  return (maxColor + minColor)/2.0;
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);
  vec4 newColor;

  // Brightness tools
  if(brightnessTool == 0){
    // Default
    newColor = texel;
  }
  if(brightnessTool == 1){
    // Luma
    newColor = vec4(vec3(luma(texel.rgb)), 1.0);
  }else if(brightnessTool == 2){
    // Mean
    newColor = vec4(vec3(mean(texel.rgb)), 1.0);
  }else if(brightnessTool == 3){
    // HSV
    newColor = vec4(vec3(hsv(texel.rgb)), 1.0);
  }else if(brightnessTool == 4){
    // HSL
    newColor = vec4(vec3(hsl(texel.rgb)), 1.0);
  }

  //Image kernels
  

  gl_FragColor = newColor;
}