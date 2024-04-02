let ground, tilesGroup;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  ground = new Group()
  ground.w = window.innerWidth/15;
  ground.h = ground.w;
  ground.tile = "=";

  tilesGroup = new Tiles(
    [
        "======.=======",
        "=..===.=======",
        "==============",
        "==============",
        "=============="

    ],
    ground.w,
    window.innerHeight/2,
    ground.w + 1,
    ground.h + 1
  );
}

function draw() {
  background(200);
}

