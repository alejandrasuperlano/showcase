# 3D App

{{< hint danger >}}
<b> Workshop </b>

Implemente una aplicación 3D
{{< /hint >}}

## Marco teórico

### Transformada de Fourier

{{< hint info >}}

Es usada para transformar señales entre el dominio del tiempo o espacio al dominio de la frecuencia, y viceversa.

{{< /hint >}}

Se define matemáticamente así:
$$X(f)=\int_{-\infty}^{\infty}x(t)e^{-i2\pi ft}dt$$

<img src="/showcase/sketches/3d_app/Fourier Transform.png">

<b>Imagen 1</b> : Dominio del tiempo vs Dominio de la frecuencia de una onda sinusoidal

{{< hint info >}}

La Transformada de Fourier tiene su versión discreta que facilita su implementación computacional, la cual está definida así:
Transformada Discreta de Fourier (DFT):

{{< /hint >}}

$$X_{k}=\sum_{n=0}^{N-1}x_ne^{-\frac{2\pi i}{N}kn}, k=0,...,N-1$$

Por último, existe un algoritmo que reduce la complejidad de la implementación de la DFT, el cual se conoce como la Transformada Rápida de Fourier (FFT), y este es el algoritmo que usa el analizador de audio de Javascript.

La mayoría de los analizadores de FFT permiten la transformación de 512, 1024, 2048 o 4096 muestras.

## Solución y resultados

## Conclusiones
