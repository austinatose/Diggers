let ground, tilesGroup;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  ourMap = new Map();
  ourMap.regenerateMap();
  ground = new Group()
  ground.w = window.innerWidth/15;
  ground.h = ground.w;
  ground.tile = "=";
}

function draw() {
  background(200);
  ourMap.render();
}
