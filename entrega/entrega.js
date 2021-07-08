var tabla;
var sig;
var video;
var song;


var dA = 1.1333;
var dB = 0.6;
var feed = 0.00533;
var k = 0.042;

function preload() {
    song = loadSound('audio/mush.mp3');
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  //video = createCapture(VIDEO);
  //video.size(800, 800);
  //video.hide();
  tabla = [];
  sig = [];
  for (var x = 0; x < width; x++) {
    tabla[x] = [];
    sig[x] = [];
    for (var y = 0; y < height; y++) {
    tabla[x][y] = { a: 1, b: 0};
  sig[x][y] = { a:1,  b: 0};
}
}

for (var i = 398; i < 400; i++) {
  for (var j = 398; j <400; j++) {
    tabla[i][j].b = 1;
  }
}
}

function keyPressed() {
    if (keyCode == ENTER) {
      saveCanvas();
    }
    if (keyCode == UP_ARROW){
      song.loop();
  }
}

function draw() {
  background(0);


  for (var x = 1; x < width - 1; x++) {
    for (var y = 1; y < height - 1; y++) {
      var a = tabla[x][y].a;
      var b = tabla[x][y].b;
      sig[x][y].a =
        a + (dA * laplaceA(x, y)) - (a * b * b) + (feed * (1 - a))*0.35;
      sig[x][y].b =
        b + (dB * laplaceB(x, y)) + (a * b * b) - ((k + feed) * b)*0.5;

      sig[x][y].a = constrain(sig[x][y].a, 0, 1);
        sig[x][y].b = constrain(sig[x][y].b, 0, 1);
    } 
  }
 
  //video.loadPixels();
  
  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var pix = (x + y * width) * 4;
      var a = sig[x][y].a;
      var b = sig[x][y].b;
      
      pixels[pix + 0] = b*y;
      pixels[pix + 1] = a*0;
      pixels[pix + 2] = b*x;
      pixels[pix + 3] = 250;
    }
  }
  updatePixels();

  swap();
  
}

function laplaceA(x, y) {
  var sumA = 0;

  sumA += tabla[x][y].a * -1;
  sumA += tabla[x - 1][y].a * 0.205;
  sumA += tabla[x + 1][y].a * 0.205;
  sumA += tabla[x][y - 1].a * 0.2;
  sumA += tabla[x][y + 1].a * 0.2;
  sumA += tabla[x - 1][y - 1].a * 0.05;
  sumA += tabla[x - 1][y + 1].a * 0.05;
  sumA += tabla[x + 1][y - 1].a * 0.05;
  sumA += tabla[x + 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;

  sumB += tabla[x][y].b * -1;
  sumB += tabla[x - 1][y].b * 0.2;
  sumB += tabla[x + 1][y].b * 0.2;
  sumB += tabla[x][y - 1].b * 0.2;
  sumB += tabla[x][y + 1].b * 0.2;
  sumB += tabla[x - 1][y - 1].b * 0.05;
  sumB += tabla[x - 1][y + 1].b * 0.05;
  sumB += tabla[x + 1][y - 1].b * 0.05;
  sumB += tabla[x + 1][y + 1].b * 0.05;
  return sumB;
}

function swap() {
  var temp = tabla;
  tabla = sig;
  sig = temp;
}
