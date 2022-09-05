# Visual Illusions 👁

{{< hint danger >}}
<b> Workshop </b>

Estudie, implemente y discuta posibles aplicaciones de algunos fenómenos visuales e ilusiones ópticas conocidas.

{{< /hint >}}


## Illusion 1: Stepping Feet 👣

## Marco Teorico

La ilusión "Stepping Feet" es un fenómeno de percepción del movimiento, donde se percibe que el recuadro azul y amarillo varían sus velocidades relativa de manera dramática, aunque en realidad su movimiento es constante.

{{< hint warning >}}
**¿Qué está pasando?**
Cuando el recuadro azul se encuentra sobre las líneas blancas, el contraste es alto, por lo cual el movimiento se percibe más rápido que su velocidad real. Por otro lado, cuando el recuadro se encuentra sobre las líneas negras, el contraste resultante es bajo y más difícil de ver.

El efecto contrario ocurre para el recuadro amarillo, resultando en la ilusión de que los recuadros dan pasos alternadamente.
{{< /hint >}}

Debido a lo anterior, cuando el contraste desaparece, es posible ver que los recuadros se mueven a la misma velocidad.

## Solucion y resultados

Este efecto es más pronunciado cuando se fija la visión en la zona entre los recuadros.
{{< hint info >}} ‼ Haz click en el canvas para revelar la ilusión. {{< /hint >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/illusions/SteppingFeet.js" lib1="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="405" height="258">}}

## Source Code

```js
let x = 0; // Posición en x de los recuadros
let vx = 0.5; // Velocidad de desplazamiento
let w = 50; // Ancho de los recuadros

function setup() {
  createCanvas(400, 250);
  colorMode(RGB, 255);
}

function draw() {
  // De acuerdo al mouseIsPressed se pinta un fondo con alto o bajo contraste
  if (mouseIsPressed) {
    lowContrastBackground();
  } else {
    highContrastBackground();
  }

  // Actualización de la velocidad cuando llega al limite del canvas
  if (x + vx > width - w || x + vx < 0) {
    vx *= -1;
  }

  // Actualización de la posición en cada iteración
  x += vx;

  noStroke();

  // Recuadro amarillo
  fill(color(244, 244, 0));
  rect(x, 80, w, 20);

  // Recuadro azul
  fill(color(4, 4, 156));
  rect(x, 160, w, 20);
}

function highContrastBackground() {
  for (let i = 0; i < 750; i += 9) {
    if (i % 2 == 0) {
      fill(242, 242, 242, 255);
    } else {
      fill(12, 12, 12, 255);
    }
    rect(i, 0, 9, 400);
  }
}

function lowContrastBackground() {
  for (let i = 0; i < 750; i += 9) {
    if (i % 2 == 0) {
      fill(140);
    } else {
      fill(116);
    }
    rect(i, 0, 9, 400);
  }
}
```

## Illusion 2 : Stereokinetic Effect (SKE) 🧿

## Marco Teorico

La rotación de las figuras adecuadas puede crear una ilusión tridimensional. Un ejemplo que permite demostarlo es el <b>efecto estereocinético</b> el cual una ilusión de profundidad. Puede pasar algún tiempo hasta que surja la percepción.

{{< hint info >}}
**¿Qué es el efecto estereocinético?**  
El efecto estereocinético (SKE) se ha definido y estudiado mediante <b>patrones circulares anidados</b> que giran en una plataforma giratoria. Los círculos deben parecer que no giran, lo que a su vez da lugar a que parecen trasladarse unos a otros.
{{< /hint >}}

## Solucion y resultados

A continuación, podemos observar un ejemplo de lo mencionado anteriormente: <br/>

{{< hint info >}} Manten el click en el canvas para ver otro tipo de efecto !. {{< /hint >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/illusions/StereokineticEffect.js" lib1="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="404" height="408">}}

Se ha comprobado que las visualizaciones consistentes en simples traslaciones evocan impresiones de <b>profundidad sólidas</b>.

{{< hint warning >}}
<b>Musatti (1924)</b> publicó el primer informe sobre los fenómenos estereocinéticos y atribuyó su descubrimiento y denominación a su maestro profesor, Vittorio Benussi
{{< /hint >}}

Como se observa en la ilusión, un conjunto de anillos concéntricos gira como si estuviera en una plataforma giratoria. Un conjunto más pequeño de anillos en el centro gira alrededor de un eje diferente, lo que puede dar la ilusión de que estos anillos más pequeños tienen <b>profundidad espacial</b>.

<img src="/showcase/sketches/illusions/stereokineticEffect.PNG">

<b>Imagen 1</b> : Efecto estereocinético (SKE) tradicional girada 90°.

## Source Code

A continuación se muestran las funciónes principales las cuales permitieron crear esta ilusion:

```js
class Circle {
  constructor(r, coordR, color) {
    this.r = r;
    this.coordR = coordR;
    this.color = color;
  }

  render(centerX, centerY, angle) {
    const coord = polarCoordinates(this.coordR, angle);
    const x = coord.x;
    const y = coord.y;

    noStroke();
    fill(this.color);

    circle(centerX + x, centerY + y, this.r);
  }
}
function polarCoordinates(r, angle) {
  let x = 0;
  y = 0;
  x = r * cos(angle);
  y = r * sin(angle);

  return { x, y };
}

function renderingCirles() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].render(centerX, centerY, angle);
  }
}
```

## Aplicaciones

Los candidatos más lógicos son los sistemas que requieren movimiento en tiempo real pero en los que las limitaciones de coste, tamaño o fiabilidad impiden el uso de motores de geometría 3D.

{{< hint info >}}
<b>Mapas de contorno en movimiento</b> : Los mapas de contorno se utilizan en la navegación por la siesta,
La tripulación correlaciona las características del terreno vistas fuera de la cabina con las características representadas en el mapa para lograr y mantener la orientación geográfica.
{{< /hint >}}
<img src="/showcase/sketches/illusions/application.PNG">

<b>Imagen 2</b> : Una línea de elevación constante representada en una superficie y en un mapa de contorno.

{{< hint info >}}
<b>Pantalla de control del tráfico aéreo</b>: Al enrutar y poner en cola el tráfico aéreo, los controladores necesitan recuperar las relaciones espaciales en 3D entre las aeronaves.

Se han desarrollado y evaluado varios formatos de visualización alternativos que utilizan señales de perspectiva
{{< /hint >}}
<img src="/showcase/sketches/illusions/airTrafficControlDisplay.jpg">

<b>Imagen 3</b> : Pantalla de control de tráfico aereo.

## Conclusiones

* Es útil estudiar algunas ilusiones ópticas para conocer los “Visual Artifacts” que existen, de modo que se eviten o apliquen de manera estratégica cuando sea pertinente, para lograr algún objetivo visual.

# Referencias

{{< hint danger >}}

Stereokinetic Effect.Neurobs.
https://www.neurobs.com/manager/content/docs/psychlab101_experiments/Stereokinetic%20Effect/description.html

Proffitt, D. R., Rock, I., Hecht, H., & Schubert, J. (1992). Stereokinetic effect and its relation to the kinetic depth effect. Journal of Experimental Psychology: Human Perception
and Performance, 18(1), 3–21. https://doi.org/10.1037/0096-1523.18.1.3

G. (2018, 8 noviembre). ¿Qué son las isolíneas, contornos o curvas de nivel? El blog de franz. https://acolita.com/que-son-las-isolineas-contornos-o-curvas-de-nivel/

{{< /hint >}}
