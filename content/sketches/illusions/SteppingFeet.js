let x = 0;
let vx = 0.5;
let w = 50;

let img = 0;

function setup() {
  createCanvas(400, 250);
  colorMode(RGB, 255);
}

function draw() {
  if (mouseIsPressed ){
    lowContrastBackground();
  }else{
    highContrastBackground();
  }
  
  if (x+vx > width-w || x+vx < 0){vx*=-1;}
  
  x+=vx;
  
  noStroke();
  
  fill(color(244, 244, 0));
  rect(x, 80, w, 20);
  
  fill(color(4, 4, 156));
  rect(x, 160, w, 20);
}

function highContrastBackground(){
  for (let i = 0; i<750; i+=9){
    if (i%2==0){
      fill(242, 242, 242, 255)
    }else{
      fill(12, 12, 12, 255)
    }
    rect(i, 0, 9, 400);
  }
}

function lowContrastBackground(){
  for (let i = 0; i<750; i+=9){
    if (i%2==0){
      fill(140)
    }else{
      fill(116)
    }
    rect(i, 0, 9, 400);
  }
}