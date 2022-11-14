precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;

uniform int brightnessToolCombination;

uniform bool tintEnabled;
uniform vec4 tintColor;
uniform int colorBlendingCombination;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// Transformación de brillo sobre texel
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

// Transformación de tintado sobre texel
vec4 mult(vec4 texel){
  return tintColor * texel;
}

vec4 add(vec4 texel){
  return tintColor + texel;
}

vec4 diff(vec4 texel){
  return max(texel, tintColor) - min(texel, tintColor);
}

vec4 light(vec4 texel){
  return max(tintColor, texel);
}

vec4 dark(vec4 texel){
  return min(tintColor, texel);
}


void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color

  vec4 texel = texture2D(texture, texcoords2);

  if (brightnessToolCombination == 0){
    texel = texel;
  }else if (brightnessToolCombination == 1){
    texel = vec4((vec3(luma(texel.rgb))), 1.0);
  }else if (brightnessToolCombination == 2){
    texel = vec4((vec3(hsv(texel.rgb))), 1.0);
  }else if (brightnessToolCombination == 3){
    texel = vec4((vec3(hsl(texel.rgb))), 1.0);
  }else{
    texel = vec4((vec3(mean(texel.rgb))), 1.0);
  } 

  // Tinting
  if (tintEnabled){
    if (colorBlendingCombination == 0){
      texel = mult(texel);
    }else if (colorBlendingCombination == 2){
      texel = add(texel);
    }else if (colorBlendingCombination == 3) {
      texel = diff(texel);
    }else if (colorBlendingCombination == 4){
      texel = light(texel);
    }else if (colorBlendingCombination == 5){
      texel = dark(texel);
    }
  }

  gl_FragColor = texel;
}