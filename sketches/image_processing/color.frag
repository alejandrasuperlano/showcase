precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;

// Herramienta de brillo seleccionada
uniform int brightnessTool;

// Posicion del mouse
uniform vec2 mouse;

// Resolucion de la pantalla
uniform vec2 resolution;

uniform float kernel[9];

uniform bool magnifier;
uniform bool region;
uniform float radius;
uniform float scale;

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

vec4 changeBrightness(vec4 defaultColor){
  vec4 newColor;

  if(brightnessTool == 0){
    // Default
    newColor = defaultColor;
  }
  if(brightnessTool == 1){
    // Luma
    newColor = vec4(vec3(luma(defaultColor.rgb)), 1.0);
  }else if(brightnessTool == 2){
    // Mean
    newColor = vec4(vec3(mean(defaultColor.rgb)), 1.0);
  }else if(brightnessTool == 3){
    // HSV
    newColor = vec4(vec3(hsv(defaultColor.rgb)), 1.0);
  }else if(brightnessTool == 4){
    // HSL
    newColor = vec4(vec3(hsl(defaultColor.rgb)), 1.0);
  }

  return newColor;
}

vec4 applyKernel(){
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*kernel[i];
  }

  convolution = vec4(convolution.rgb, 1.0);

  return convolution;
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);

  // Aplica el kernel y el brillo si no hay region
  if(!region){
    // Image kernel
    texel = applyKernel();

    // Brightness tools
    texel = changeBrightness(texel);
  }


  float dist = distance(gl_FragCoord.xy, mouse);

  // Region o lupa
  if(dist < radius){
    // Lupa
    if(magnifier){
      vec2 mouseDist = gl_FragCoord.xy - mouse;

      vec2 newCoords = gl_FragCoord.xy;

      vec2 zoomed = (newCoords - (mouseDist * scale)) / resolution;
      
      // Se invierte el eje y
      zoomed = vec2(zoomed.x, 1.0 - zoomed.y);

      vec4 zoomedTexel = texture2D(texture, zoomed);
      zoomedTexel = changeBrightness(zoomedTexel);

      gl_FragColor = zoomedTexel;

    }
    // Lupa
    else if(region){
      vec2 newCoords = gl_FragCoord.xy;

      vec2 region = newCoords / resolution;

      vec4 regionTexel = texture2D(texture, region);
      regionTexel = applyKernel();
      regionTexel = changeBrightness(regionTexel);

      gl_FragColor = regionTexel;
    }
    // Ninguno esta activo
    else{
      gl_FragColor = texel;
    }
  }
  // Por fuera de la region o lupa
  else{
    gl_FragColor = texel;
  }

}