let ground, tilesGroup;

function setup() {
  createCanvas(1400, 800);

  ourMap = new Map();
  ourMap.regenerateMap();
  ground = new Group()
  ground.w = window.innerWidth/15;
  ground.h = ground.w;
  ground.tile = "=";

  new Player(300, 300);
}

function draw() {
  background(200);
  ourMap.render();
}
