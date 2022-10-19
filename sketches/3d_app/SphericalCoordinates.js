let r = 200;
let density;
let densitySlider;

let thetaMax;
let phiMax;

let thetaMaxSlider;
let phiMaxSlider;

function setup() {
  createCanvas(400, 400, WEBGL);//Permite el renderizado en 3D
  angleMode(DEGREES);
  colorMode(HSB);// Matiz/Saturación/brillo
  
  stroke(199,80,88);
  strokeWeight(3);
  noFill();
  
  thetaMax =  createDiv();
  thetaMaxSlider = createSlider(0,360,360,10) 
  
  phiMax =  createDiv();
  phiMaxSlider = createSlider(0,180,180,10) 
  
  density =  createDiv();
  densitySlider = createSlider(3,62,24,1) 
;
}

function draw() {
  background(230,50,15);
  orbitControl(4,4);//Permite desplazarse por un espacio en 3D 
  rotateY(90);
  rotateZ(65);
  
  for(let phi = 0; phi < phiMaxSlider.value() ; phi+=180/densitySlider.value()){
    beginShape();
    for(let theta = 0; theta < thetaMaxSlider.value(); theta += 360/densitySlider.value()){
      let x = r * cos(phi);
      let y = r * sin(phi) * sin(theta);
      let z = r * sin(phi) * cos(theta);
      vertex(x,y,z)
    }
    endShape(CLOSE);
  }
  
  thetaMax.html("Valor máximo de theta : " + thetaMaxSlider.value());
  phiMax.html("Valor máximo de phi : " + phiMaxSlider.value());
  
  let displayDensity = int(map(densitySlider.value(), 3, 62, 1, 60));
  density.html("Valor de densidad: " + displayDensity);
}