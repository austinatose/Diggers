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
          this.bricksArr[i].push([brick]);
        } else if (this.mapArr[i][j] === "1") {
          let brickcomponent1 = new Sprite(i * 200 + 25, 500 + j * 200);
          brickcomponent1.color = "black";
          brickcomponent1.height = 200;
          brickcomponent1.width = 50;
          brickcomponent1.collider = 'k';
          // brickcomponent1.img = loadImage('/assets/ROCK.png');
          let brickcomponent2 = new Sprite(i * 200 + 175, 500 + j * 200);
          brickcomponent2.color = "black";
          brickcomponent2.height = 200;
          brickcomponent2.width = 50;
          brickcomponent2.collider = 'k';
          // brickcomponent2.img = loadImage('/assets/ROCK.png');
          this.bricksArr[i].push([brickcomponent1, brickcomponent2]);
        }
      }
    }
    print(this.bricksArr);
  }

  draw() {
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.bricksArr[i][j]) {
          for (let brickcomponent of this.bricksArr[i][j]) {
            brickcomponent.draw();
          }
        }
      }
    }
  }

  updateMap(x, y, value) {

  }
}

