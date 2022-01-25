let objs = [];
let objsNum = 10;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  stroke("#27FF5F");
  fill(180);

  for (let i = 0; i < objsNum; i++) {
    objs.push(new Obj());
  }
}

function draw() {
  background(0);
  lights();

  for (let i = 0; i < objs.length; i++) {
    objs[i].move();
    objs[i].display();
  }
}

class Obj {
  constructor() {
    this.rn = random(100);
    this.tn = random(100, 200);
    this.zoff = random(100);
    this.num = 50;
  }

  move() {
    this.zoff += 0.01;
  }

  display() {
    for (let i = 0; i < this.num; i++) {
      let dr = map(i, 0, this.num, 0, this.num * 0.01);
      let dt = map(i, 0, this.num, 0, this.num * 0.01);
      let maxR = map(i, 0, this.num, 0, width * 0.5);
      let r = map(noise(dr, this.rn, this.zoff), 0, 1, 0, maxR);
      let t = map(noise(dt, this.tn, this.zoff), 0, 1, -360, 360);
      let x = r * cos(t);
      let s = map(i, 0, this.num, width * 0.03, width * 0.0025);
      let y = map(i, 0, this.num, height / 2, -height * 0.3);
      let z = r * sin(t);
      push();
      translate(x, y, z);
			normalMaterial();
      sphere(s);
      pop();
    }
  }
}

let lapse = 0;    
function mousePressed(){
  
  if (millis() - lapse > 400){
    save('pix.jpg');
    lapse = millis();
  }
}