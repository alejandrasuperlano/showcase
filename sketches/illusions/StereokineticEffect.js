let centerX;
let centerY;
let circles;
let angle;
let option = 1;

let myBlue;
let myYellow;

class Circle{
  constructor(r, coordR, color){
    this.r = r;
    this.coordR = coordR;
    this.color = color;
  }
 
  render(centerX, centerY, angle){
    const coord = polarCoordinates(this.coordR, angle);
    const x = coord.x;
    const y = coord.y;
   
    noStroke();
    fill(this.color);
   
    circle(centerX+x, centerY+y, this.r);
  }
}

let craterCircles;
let spikeCircles;

function polarCoordinates(r, angle){
  let x = 0; y = 0;
  x = r*cos(angle);
  y = r*sin(angle);
 
  return {x, y};
}

function renderingCirles(){
    for (let i = 0; i<circles.length; i++){
        circles[i].render(centerX, centerY, angle);
    }
}


function setup() {
  myBlue = color(120, 58, 204);
  myYellow = color(132, 239, 240);
 
  createCanvas(400, 400);
 
  angle = 0;
 
  centerX = width/2;
  centerY = height/2;
 
  craterCircles = [
    new Circle(300, 0, myBlue),
    new Circle(270, 15, myYellow),
    new Circle(240, 30, myBlue),
    new Circle(210, 45, myYellow),
    new Circle(180, 60, myBlue),
    new Circle(150, 75, myYellow),
    new Circle(120, 90, myBlue),

    new Circle(90, 90, myYellow),
    new Circle(75, 82.5, myBlue),
    new Circle(60, 75, myYellow),
    new Circle(45, 67.5, myBlue),
    new Circle(30, 60, myYellow),
  ]

  spikeCircles = [
    new Circle(300, 0, myBlue),
    new Circle(270, 15, myYellow),
    new Circle(240, 30, myBlue),
    new Circle(210, 45, myYellow),
    new Circle(180, 60, myBlue),
    new Circle(150, 75, myYellow),
    new Circle(120, 90, myBlue),

    new Circle(90, 105, myYellow),
    new Circle(60, 120, myBlue),
    new Circle(30, 135, myYellow),
  ]

}

function draw() {
  background(255);
  circles = [craterCircles, spikeCircles][option]
  angle += 0.04;
  if (mouseIsPressed ){
    option = 1;
    renderingCirles();
  }else{
    option= 0;
    renderingCirles();
  }
}