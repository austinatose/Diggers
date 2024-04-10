class Map {
  constructor() {
    this.mapArr = [];
    this.bricksArr = [];
  }

  init() {
    for (let i = 0; i < 15; i++) {
      this.mapArr.push([]);
      for (let j = 0; j < 7; j++) {
        this.mapArr[i].push("0");
      }
    }
    for (let i = 0; i < 15; i++) {
      this.bricksArr.push([]);
      for (let j = 0; j < 7; j++) {
        // if (this.mapArr[i][j] === "0") {
        //   fill(255);
        // } else {
        //   fill(0);
        // }
        let brick = new Sprite(i * 200 + 100, 500 + j * 200);
        brick.height = 200;
        brick.width = 200;
        brick.collider = 'k';
        this.bricksArr[i].push(brick);
      }
    }
  }

  updateMap(x, y, value) {

  }
}

