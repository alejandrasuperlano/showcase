# Analizador en 3D de audio

{{< hint danger >}}
<b> Workshop </b>

Implemente una aplicación 3D
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
<img src="/showcase/sketches/3d_app/FT Eq.png" width="250">

A continuación, se muestra una comparación del dominio del tiempo y de la frecuencia de una onda sinusoidal.  
<img src="/showcase/sketches/3d_app/Fourier Transform.png">

{{< hint info >}}

La Transformada de Fourier tiene su versión discreta que facilita su implementación computacional, la cual está definida así:
Transformada Discreta de Fourier (DFT):  
<img src="/showcase/sketches/3d_app/DFT Eq.png" width="350">

{{< /hint >}}

Por último, existe un algoritmo que reduce la complejidad de la implementación de la DFT, el cual se conoce como la Transformada Rápida de Fourier (FFT), y este es el algoritmo que usa el analizador de audio de Javascript.

La mayoría de los analizadores de FFT permiten la transformación de 512, 1024, 2048 o 4096 muestras.

## Source Code: Normalizer.js

```js
class Normalizer{
    constructor(audio){
        // Singleton Pattern
        if (typeof Normalizer.instance === 'object'){
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
        this.analyser.fftSize = 1024;                           // FFT (Transformada Rápida de Fourier)
        this.bufferLength = this.analyser.frequencyBinCount;
        
        // Config
        this.scaleType = 'linear';
        this.playing = false;
        
        Normalizer.instance = this;
        return this
    }
    
    setLinearScale(){this.scaleType = 'linear';}
    setLogScale(){this.scaleType = 'log';}
    
    scaleLogToLinear(){
        let newDataArray = [];
        let pow2 = 1;
        
        while (pow2 <= 256){
            const initIndex = pow2 - 1;
            const finalIndex = (2*pow2) - 1;
            
            let sum = 0;
            for (let i = initIndex; i<finalIndex; i++){
            sum += this.dataArray[i];
            }
            
            const n = finalIndex - initIndex;
            newDataArray.push( sum/n );
            
            pow2 *= 2;
        }
        
        this.dataArray = new Uint8Array(newDataArray);
    }
      
    getData(){
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyser.getByteFrequencyData(this.dataArray);
        
        if (this.scaleType == 'log'){ this.scaleLogToLinear();}
        
        return this.dataArray;
    }

    togglePlay(){
        if (this.audio.paused){ this.audio.play();
        }else{ this.audio.pause();}
        return !(this.audio.paused)
    }
}
```

## Solución y resultados

<iframe src="https://saacostam.github.io/3d-music-visualizer/" height="1100" width="700" style="border:none;"></iframe>

## Conclusiones

- Esta aplicación es una manera interactiva de "ver" el sonido
