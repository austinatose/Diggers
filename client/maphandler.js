class MapDS {
  constructor() {
    this.mapArr = [];
    this.bricksArr = [];
  }

  clearMap(){
    for(let i = 0; i < 15; i++){
        for(let j = 0; j < 7; j++){
            if(this.bricksArr[i] != undefined){
                this.bricksArr[i][j].remove()
            }
        }
    }

    this.bricksArr = [];
  }

  init() {
    
    console.log("init started");
    // for (let i = 0; i < 15; i++) {
    //   this.mapArr.push([]);
    //   for (let j = 0; j < 7; j++) {
    //     this.mapArr[i].push("0");
    //   }
    // }
    // this.mapArr[14][3] = "1";
    console.log(this.mapArr);
    //this.clearMap()
    for (let i = 0; i < 15; i++) {
      this.bricksArr.push([]);
      for (let j = 0; j < 7; j++) {

        if (this.mapArr[i][j] === "0") { //Uncovered Rock
          let brick = new Sprite(i * 200 + 100, 500 + j * 200);
          brick.color = "black";
          brick.height = 200;
          brick.width = 200;
          brick.collider = 'k';
          brick.img = loadImage('/assets/ROCK.png');
          this.bricksArr[i].push([brick]);
        } else if (this.mapArr[i][j] === "1") { // Walls on both sides
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
        } else if (this.mapArr[i][j] === "2"){//Walls on the right side
            let brickcomponent = new Sprite(i * 200 + 175, 500 + j * 200);
            brickcomponent.color = "black";
            brickcomponent.height = 200;
            brickcomponent.width = 50;
            brickcomponent.collider = 'k';
            // brickcomponent2.img = loadImage('/assets/ROCK.png');
            this.bricksArr[i].push([brickcomponent]);
        } else if (this.mapArr[i][j] === "3"){ //Walls on the left side
            let brickcomponent = new Sprite(i * 200 + 25, 500 + j * 200);
            brickcomponent.color = "black";
            brickcomponent.height = 200;
            brickcomponent.width = 50;
            brickcomponent.collider = 'k';
            // brickcomponent2.img = loadImage('/assets/ROCK.png');
            this.bricksArr[i].push([brickcomponent]);
        } else if (this.mapArr[i][j] === "4"){ //Walls on the top
            let brickcomponent = new Sprite(i * 200 + 100, 500 + j * 200 - 75);
            brickcomponent.color = "black";
            brickcomponent.height = 50;
            brickcomponent.width = 200;
            brickcomponent.collider = 'k';
            // brickcomponent2.img = loadImage('/assets/ROCK.png');
            this.bricksArr[i].push([brickcomponent]);
        } else if (this.mapArr[i][j] === "5"){ //Walls on the top and right
            let brickcomponent1 = new Sprite(i * 200 + 100, 500 + j * 200 - 75);
            brickcomponent1.color = "black";
            brickcomponent1.height = 50;
            brickcomponent1.width = 200;
            brickcomponent1.collider = 'k';
            // brickcomponent1.img = loadImage('/assets/ROCK.png');
            let brickcomponent2 = new Sprite(i * 200 + 175, 500 + j * 200);
            brickcomponent2.color = "black";
            brickcomponent2.height = 200;
            brickcomponent2.width = 50;
            brickcomponent2.collider = 'k';
            // brickcomponent2.img = loadImage('/assets/ROCK.png');
            this.bricksArr[i].push([brickcomponent1, brickcomponent2]);
        } else if (this.mapArr[i][j] === "6"){ //Walls on the top and left
            let brickcomponent1 = new Sprite(i * 200 + 100, 500 + j * 200 - 75);
            brickcomponent1.color = "black";
            brickcomponent1.height = 50;
            brickcomponent1.width = 200;
            brickcomponent1.collider = 'k';
            // brickcomponent1.img = loadImage('/assets/ROCK.png');
            let brickcomponent2 = new Sprite(i * 200 + 25, 500 + j * 200);
            brickcomponent2.color = "black";
            brickcomponent2.height = 200;
            brickcomponent2.width = 50;
            brickcomponent2.collider = 'k';
            // brickcomponent2.img = loadImage('/assets/ROCK.png');
            this.bricksArr[i].push([brickcomponent1, brickcomponent2]);
        }

      }
    }
    console.log(this.bricksArr);
  }

  draw() {
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.bricksArr[i] != undefined && this.bricksArr[i][j]) {
          for (let brickcomponent of this.bricksArr[i][j]) {
            // if(i == 2 && j == 0){
            //     console.log("drawing block state:", this.bricksArr[i][j])
            // }
            brickcomponent.draw();
          }
        }
      }
    }
  }

  updateMap(x, y, value) {

  }
}

