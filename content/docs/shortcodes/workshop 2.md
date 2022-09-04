# Workshop 1

## Enunciado

Implementar una aplicación web de procesamiento de imagenes que soporte varios kernels y además:

- Visualización de histograma de la imagen
- Diferentes herramientes de luminosidad

## Marco teórico

### Kernel

Un kernel o mascara es una matriz usada para aplicar algun tipo de efecto como difuminado, detección de bordes
, sobre una imagen. Eso se logra realizando una convolución entre el kernel y la imagen.
{{< hint info >}}
**¿Qué es una convolución?**  
En procesamiento de imagenes, una convolución consiste en multiplicar cada píxel de la imagen por la entrada correspondiente del kernel, luego al sumar todos los resultados, se obtiene el valor del nuevo píxel.
{{< /hint >}}

A modo de ejemplo, se escogieron los siguientes kernels para mostrar su aplicación:

{{< details "Sharpening" closed >}}
{{< katex display>}}
\begin{bmatrix}
0 & -1 & 0\\
-1 & 5 & -1\\
0 & -1 & 0\\
\end{bmatrix}
{{< /katex >}}
{{< /details >}}

{{< details "Emboss" closed >}}
{{< katex display>}}
\begin{bmatrix}
-2 & -1 & 0\\
-1 & 1 & 1\\
0 & 1 & 2\\
\end{bmatrix}
{{< /katex >}}
{{< /details >}}

{{< details "Blur" closed >}}
{{< katex display>}}
\begin{bmatrix}
0.0625 & 0.125 & 0.0625\\
0.125 & 0.25 & 0.125\\
0.0625 & 0.125 & 0.0625\\
\end{bmatrix}
{{< /katex >}}
{{< /details >}}

### Histograma

Un histograma de una imagen consiste en la representación gráfica de la distribución tonal de la imagen, trazando el número de píxeles de cada canal.  
En el eje horizontal representa las variaciones tonales, mientras que el vertical, representa la cantidad de píxeles en un tono particular.

{{< hint info >}}
**¿Cómo interpretar un histograma?**

El lado izquierdo del eje horizontal representa las áreas oscuras y el derecho representa las áreas iluminadas.  
Por ejemplo, para una imagen oscura, esta tendrá la mayoría de puntos dibujados en el lado izquiero del histograma.
{{< /hint >}}

### Herramientas de luminosidad

La luminosidad es la percepción visual de la luminancia de un objeto. En colorimetría, es una predicción de que tan iluminado aparecerá un color para un determinado observador.
{{< hint info >}}
**¿Qué es la luminancia?**
Es la médida de intensidad lumínica por unidad de área de la luz viajando en una determinada dirección. Es decir, describe la cantidad de luz que pasa a través, es emitida o reflejada de un área particular.  
Existen varias formas de calcular la luminosidad de un color. A modo de ejemplo, se mostrarán las siguientes 4:
{{< /hint >}}

{{< details "Media aritmética" closed >}}
{{< katex display>}}
I=\frac{R+G+B}{3}
{{< /katex >}}
{{< /details >}}

{{< details "HSV" closed >}}
{{< katex display>}}
V=max(R,G,B)
{{< /katex >}}
{{< /details >}}

{{< details "HSL" closed >}}
{{< katex display>}}
L=\frac{max(R,G,B)+min(R,G,B)}{2}
{{< /katex >}}
{{< /details >}}

{{< details "Luma" closed >}}
{{< katex display>}}
Y=0.2126\cdot R+ 0.7152\cdot G+0.0722\cdot B
{{< /katex >}}
{{< /details >}}

## Solución y resultados

### Kernel

{{< p5-div sketch="/showcase/sketches/imageKernel.js" >}}
A continuación se muestra la función principal, la cual es la encargada de calcula el nuevo valor de cada píxel:

```js
let applyKernelToPixel = (x, y, kernel, kernelSize) => {
  let newR = 0.0;
  let newG = 0.0;
  let newB = 0.0;

  // Go through each kernel entry
  for (let r = 0; r < kernelSize; r++) {
    for (let c = 0; c < kernelSize; c++) {
      // Compute the offset
      let rowOffset = 1 - r;
      let colOffset = 1 - c;

      let imageRow = x - rowOffset;
      let imageCol = y - colOffset;

      let currentPixel = originalImg.get(imageRow, imageCol);

      // Compute new value for each channel
      newR += p.red(currentPixel) * kernel[r][c];
      newG += p.green(currentPixel) * kernel[r][c];
      newB += p.blue(currentPixel) * kernel[r][c];
    }
  }

  // In case the new value is greater than 255
  newR = p.constrain(newR, 0, 255);
  newG = p.constrain(newG, 0, 255);
  newB = p.constrain(newB, 0, 255);

  return p.color(newR, newG, newB);
};
```

### Histograma

{{< p5-div sketch="/showcase/sketches/imageHistogram.js" >}}

A continuación se muestra la función principal, la cual es la encargada de contar la cantidad de píxeles en cada valor de un determinado canal:

```js
let countPixels = () => {
  // Go through each pixel
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let pixel = img.get(x, y);

      // Add 1 to the current tonal value
      let value =
        currentColor === "red"
          ? p.red(pixel)
          : currentColor === "green"
          ? p.green(pixel)
          : p.blue(pixel);
      pixels[value] += 1;
    }
  }
};
```

### Herramientas de luminosidad

{{< p5-div sketch="/showcase/sketches/lightnessTools.js" >}}

A continuación, se muestra la implementación de las 4 maneras de calcular la luminosidad expuestas anteriormente, junto con la función encargada de aplicar ese cálculo a cada pixel de la imagen:

```js
let lightnessModes = {
  mean: (color) => {
    return (p.red(color) + p.green(color) + p.blue(color)) / 3;
  },

  hsv: (color) => {
    return Math.max((p.red(color), p.green(color), p.blue(color)));
  },

  hsl: (color) => {
    let max = Math.max((p.red(color), p.green(color), p.blue(color)));
    let min = Math.min((p.red(color), p.green(color), p.blue(color)));
    return (max + min) / 2;
  },

  luma: (color) => {
    return (
      0.2126 * p.red(color) + 0.7152 * p.green(color) + 0.0722 * p.blue(color)
    );
  },
};

let applyLightness = (mode) => {
  // Extract the current function
  let lightness = lightnessModes[mode];

  // Go through each pixel
  for (let i = 0; i < originalImg.width; i++) {
    for (let j = 0; j < originalImg.height; j++) {
      let newPixel = lightness(originalImg.get(i, j));
      currentImg.set(i, j, p.color(newPixel));
    }
  }
};
```

## Conclusiones

- La aplicación de una convolución usando un kernel a una imagen se vería en extremo beneficiada por la paralelización de dicha aplicación
- Se deben considerar todas las formas de calcular la luminosidad de una imagen a la hora de pasar la imagen a escala de grises
