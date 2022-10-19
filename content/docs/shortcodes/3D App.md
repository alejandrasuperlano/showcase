# 3D APP : 3D audio analyzer🎶

{{< hint danger >}}
<b> Workshop </b>

Implement a 3d webgl application. The p5.treegl or any other libraries may be used
{{< /hint >}}

## Marco teórico

### Señales electromagnéticas

Como componente teórico principal de la aplicación, se tienen las señales de electromagnéticas, las cuales, a manera de resumen, se pueden descomponer en varias ondas sinusoidales periódicas, y cada una tiene una serie de características propias de una onda electromagnética. En particular, nos interesan 2 de estas:

{{< hint info >}}
<b> Frecuencia: </b>  
Es la medida del número de ciclos o repeticiones de la onda por unidad de tiempo.
{{< /hint >}}

{{< hint info >}}
<b> Amplitud: </b>  
Es el desplazamiento máximo que experimenta un punto de una onda respecto a la posición de equilibrio
{{< /hint >}}

### Transformada de Fourier

{{< hint info >}}

Es usada para transformar señales entre el dominio del tiempo o espacio al dominio de la frecuencia, y viceversa.

{{< /hint >}}

Se define matemáticamente así: <br>
<img src="/showcase/sketches/3d_app/FT Eq.png" width="250" style="margin: auto;">

A continuación, se muestra una comparación del dominio del tiempo y de la frecuencia de una onda sinusoidal.  
<img src="/showcase/sketches/3d_app/Fourier Transform.png" style="margin: auto;">

{{< hint info >}}

La Transformada de Fourier tiene su versión discreta que facilita su implementación computacional, la cual está definida así:
Transformada Discreta de Fourier (DFT):  
<img src="/showcase/sketches/3d_app/DFT Eq.png" width="350" style="margin: auto;">

{{< /hint >}}

Por último, existe un algoritmo que reduce la complejidad de la implementación de la DFT, el cual se conoce como la Transformada Rápida de Fourier (FFT), y este es el algoritmo que usa el analizador de audio de Javascript.

La mayoría de los analizadores de FFT permiten la transformación de 512, 1024, 2048 o 4096 muestras.

## Source Code

### Coordenadas esféricas

<img src="/showcase/sketches/3d_app/coordenadasEsfericas.PNG" width="400" style="margin: auto;">

{{< hint info >}}
El sistema de coordenadas esféricas se basa en la misma idea que las coordenadas polares y se utiliza para determinar la posición espacial de un punto mediante una distancia y dos ángulos.
{{< /hint >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/3d_app/SphericalCoordinates.js" lib1="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="405" height="520">}}

## Source Code: Normalizer.js

{{< details "Normalizer.js" closed >}}

```js
class Normalizer {
  constructor(audio) {
    // Singleton Pattern
    if (typeof Normalizer.instance === "object") {
      return Normalizer.instance;
    }

    // Audio Settings
    this.audio = audio;
    this.audio.crossOrigin = "anonymous";
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.audioSource = this.audioCtx.createMediaElementSource(this.audio);
    this.analyser = this.audioCtx.createAnalyser();
    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    this.analyser.fftSize = 1024; // FFT (Transformada Rápida de Fourier)
    this.bufferLength = this.analyser.frequencyBinCount;

    // Config
    this.scaleType = "linear";
    this.playing = false;

    Normalizer.instance = this;
    return this;
  }

  setLinearScale() {
    this.scaleType = "linear";
  }
  setLogScale() {
    this.scaleType = "log";
  }

  scaleLogToLinear() {
    let newDataArray = [];
    let pow2 = 1;

    while (pow2 <= 256) {
      const initIndex = pow2 - 1;
      const finalIndex = 2 * pow2 - 1;

      let sum = 0;
      for (let i = initIndex; i < finalIndex; i++) {
        sum += this.dataArray[i];
      }

      const n = finalIndex - initIndex;
      newDataArray.push(sum / n);

      pow2 *= 2;
    }

    this.dataArray = new Uint8Array(newDataArray);
  }

  getData() {
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteFrequencyData(this.dataArray);

    if (this.scaleType == "log") {
      this.scaleLogToLinear();
    }

    return this.dataArray;
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    return !this.audio.paused;
  }
}
```

{{< /details >}}

## Solución y resultados

<iframe src="https://saacostam.github.io/3d-music-visualizer/" height="1100" width="700" style="border:none;"></iframe>

## Aplicaciones

<b> La visualización de música </b> es el proceso de interpretar el sonido con imágenes. Tiene la capacidad de mapear las cualidades de una grabación o composición con gráficos mediante la interpretación de señales digitales o electrónicas. El método utilizado para traducir aspectos de la música en cualidades visuales determina el aspecto y la respuesta de la visualización.

{{< hint info >}}  
Existen miles de visualizadores de música diferentes. Cada uno tiene una interpretación diferente de cómo se ve el sonido.
{{< /hint >}}

<img src="/showcase/sketches/3d_app/visualizacion-musica.png" width="600" style="margin: auto;">

La visualización de música es un desarrollo que se puede decir es moderno, pero sus raíces se remontan a siglos atrás. Goethe e Isaac Newton propusieron teorías sobre cómo el sonido y la luz comparten frecuencias comunes.

El sonido y el color son fuente de inspiracion especialmente importante en general para los músicos. Por otro lado las cualidades tímbricas del sonido están fuertemente asociadas con el color y la textura e incluso las notas individuales tienen fuertes conexiones con el color para algunos músicos.

{{< hint warning >}}
La forma en que nuestros sentidos se mezclan cuando experimentamos música nunca se explicará por completo. Ese misterio es parte de lo que atrae a las personas a nuevas formas de visualizar la música.
{{< /hint >}}

## Conclusiones

- Esta aplicación es una manera interactiva de "ver" el sonido.
- Una característica importante de la visualización de música es que las visualizaciones son únicas.
- Cuando se trata de representar música visualmente, sabemos que hay más factores involucrados que las cualidades medibles de una señal.
- Esta visualización de música nos permite evidenciar lo que es posible cuando combinamos sonido y visión.

# Referencias

{{< hint danger >}}

PromocionMusical.es. (2020, 15 enero). Qué es la Visualización de Música: Origen, Evolución y Ejemplos. Recuperado de https://promocionmusical.es/visualizacion-musica

Speigato.¿Qué es la visualización de música?. Recuperado de https://spiegato.com/es/que-es-la-visualizacion-de-musica

Kazuki Umeda. (2021, 15 julio) What We can Create w/ p5js & Spherical Coordinates.Recuperado de https://www.youtube.com/watch?v=SGHWZz5Mrsw&ab_channel=KazukiUmeda
{{< /hint >}}
