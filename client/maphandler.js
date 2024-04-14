class Map {
  constructor() {
    this.mapArr = [];
    this.bricksArr = [];
  }

  init() {
    // for (let i = 0; i < 15; i++) {
    //   this.mapArr.push([]);
    //   for (let j = 0; j < 7; j++) {
    //     this.mapArr[i].push("0");
    //   }
    // }
    // this.mapArr[14][3] = "1";
    print(this.mapArr);
    for (let i = 0; i < 15; i++) {
      this.bricksArr.push([]);
      for (let j = 0; j < 7; j++) {
        if (this.mapArr[i][j] === "0") {
          let brick = new Sprite(i * 200 + 100, 500 + j * 200);
          brick.color = "black";
          brick.height = 200;
          brick.width = 200;
          brick.collider = 'k';
          brick.img = loadImage('/assets/ROCK.png');
          this.bricksArr[i].push(brick);
        } else {
          this.bricksArr[i].push(null);
        }
      }
    }
    print(this.bricksArr);
  }

  draw() {
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.bricksArr[i][j]) {
          this.bricksArr[i][j].draw();
        }
      }
    }
  }

  updateMap(x, y, value) {

  }
}

