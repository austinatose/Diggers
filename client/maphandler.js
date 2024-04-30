class MapDS {
    constructor() {
        this.mapArr = [];
        this.bricksArr = [];
    }

    clearMap() {
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 15; j++) {
                if (this.bricksArr[i] != undefined) {
                    for (let k = 0; k < this.bricksArr[i][j].length; k++)
                        this.bricksArr[i][j][k].remove()
                }
            }
        }

        this.bricksArr = [];
    }

    init() {
        console.log("init started");
        // for (let i = 0; i < 7; i++) {
        //   this.mapArr.push([]);
        //   for (let j = 0; j < 15; j++) {
        //     this.mapArr[i].push("0");
        //   }
        // }
        // this.mapArr[14][3] = "1";
        console.log(this.mapArr);
        //this.clearMap()
        for (let i = 0; i < 7; i++) {
            this.bricksArr.push([]);
            for (let j = 0; j < 15; j++) {
                if (this.mapArr[i][j] === "99") { // fake win
                    console.log("win door detected")
                    let brick = new Sprite(i * 200 + 100, 500 + j * 200);
                    brick.color = "yellow";
                    brick.height = 50;
                    brick.width = 50;
                    brick.collider = 'k';
                    this.bricksArr[i].push([brick]);
                } else if (this.mapArr[i][j] === "999") { // real win
                    console.log("real win door detected")
                    let brick = new Sprite(i * 200 + 100, 500 + j * 200);
                    brick.color = "yellow";
                    brick.height = 50;
                    brick.width = 50;
                    brick.collider = 'k';
                    this.bricksArr[i].push([brick]);
                }else if (this.mapArr[i][j] === "0") { //Uncovered Rock
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
                } else if (this.mapArr[i][j] === "2") {//Walls on the right side
                    let brickcomponent = new Sprite(i * 200 + 175, 500 + j * 200);
                    brickcomponent.color = "black";
                    brickcomponent.height = 200;
                    brickcomponent.width = 50;
                    brickcomponent.collider = 'k';
                    // brickcomponent2.img = loadImage('/assets/ROCK.png');
                    this.bricksArr[i].push([brickcomponent]);
                } else if (this.mapArr[i][j] === "3") { //Walls on the left side
                    let brickcomponent = new Sprite(i * 200 + 25, 500 + j * 200);
                    brickcomponent.color = "black";
                    brickcomponent.height = 200;
                    brickcomponent.width = 50;
                    brickcomponent.collider = 'k';
                    // brickcomponent2.img = loadImage('/assets/ROCK.png');
                    this.bricksArr[i].push([brickcomponent]);
                } else if (this.mapArr[i][j] === "4") { //Walls on the top
                    let brickcomponent = new Sprite(i * 200 + 100, 500 + j * 200 - 75);
                    brickcomponent.color = "black";
                    brickcomponent.height = 50;
                    brickcomponent.width = 200;
                    brickcomponent.collider = 'k';
                    // brickcomponent2.img = loadImage('/assets/ROCK.png');
                    this.bricksArr[i].push([brickcomponent]);
                } else if (this.mapArr[i][j] === "5") { //Walls on the top and right
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
                } else if (this.mapArr[i][j] === "6") { //Walls on the top and left
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
                } else if (this.mapArr[i][j] === '7'){
                    this.bricksArr[i].push([])
                }

            }
        }
        console.log(this.bricksArr);
    }

    draw() {
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 15; j++) {
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

    updateMap(x, y, card_no) {
        if (card_no == 1){
            this.mapArr[x + 0][y + 0] = '1'
            this.mapArr[x + 0][y + 1] = '1' 
            this.mapArr[x + 0][y + 2] = '2'
            this.mapArr[x - 1][y + 2] = '6'
        } else if (card_no == 2){
            this.mapArr[x + 0][y + 0] = '1'
            this.mapArr[x + 0][y + 1] = '1' 
            this.mapArr[x + 0][y + 2] = '2'
            this.mapArr[x + 1][y + 2] = '5'
        } else if (card_no == 3){
            this.mapArr[x + 0][y + 0] = '3'
            this.mapArr[x + 1][y + 0] = '2' 
            this.mapArr[x + 1][y + 1] = '3'
            this.mapArr[x + 2][y + 1] = '5'
        } else if (card_no == 4){
            this.mapArr[x + 0][y + 0] = '2'
            this.mapArr[x - 1][y + 0] = '3' 
            this.mapArr[x - 1][y + 1] = '2'
            this.mapArr[x - 2][y + 1] = '6'
        } else if (card_no == 5){
            this.mapArr[x + 0][y + 0] = '2'
            this.mapArr[x - 1][y + 0] = '3' 
            this.mapArr[x - 1][y + 1] = '2'
            this.mapArr[x - 2][y + 1] = '3'
            this.mapArr[x - 2][y + 2] = '1'
        } else if (card_no == 6){
            this.mapArr[x + 0][y + 0] = '3'
            this.mapArr[x + 1][y + 0] = '2' 
            this.mapArr[x + 1][y + 1] = '3'
            this.mapArr[x + 2][y + 1] = '2'
            this.mapArr[x + 2][y + 2] = '1' 
        } else if (card_no == 7){
            this.mapArr[x + 0][y + 0] = '1'
            this.mapArr[x + 0][y + 1] = '3'
            this.mapArr[x + 1][y + 1] = '4'
            this.mapArr[x + 2][y + 1] = '5'
            this.mapArr[x + 2][y + 2] = '1'
        } else if (card_no == 8){
            this.mapArr[x + 0][y + 0] = '1'
            this.mapArr[x + 0][y + 1] = '2'
            this.mapArr[x - 1][y + 1] = '4'
            this.mapArr[x - 2][y + 1] = '6'
            this.mapArr[x - 2][y + 2] = '1'
        } else if (card_no == 9){
            this.mapArr[x + 0][y + 0] = '7'
            this.mapArr[x - 1][y + 0] = '3'
            this.mapArr[x + 1][y + 0] = '2'
        } else if (card_no == 10){
            this.mapArr[x + 0][y + 0] = '3'
            this.mapArr[x + 1][y + 0] = '2'
        } else if (card_no == 11){
            this.mapArr[x + 0][y + 0] = '1'
        } else if (card_no == 12){
            this.mapArr[x + 0][y + 0] = '1'
            this.mapArr[x + 0][y + 1] = '1'
        } else if (card_no == 13){
            this.mapArr[x + 0][y + 0] = '1'
            this.mapArr[x + 0][y + 1] = '1'
            this.mapArr[x + 0][y + 2] = '1'
        }
    }

    checkValidPlacement(type, x, y){
        if(type == 1){
            
            if(x < 1 || y > 14 - 2){
                return false
            }

            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x + 0][y + 1] == '0' &&
            this.mapArr[x + 0][y + 2] == '0' &&
            this.mapArr[x - 1][y + 2] == '0'){
                return true;
            } else {
                return false;
            }
        } else if (type == 2){

            if(x > 6 - 1 || y > 14 - 2){
                return false
            }

            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x + 0][y + 1] == '0' &&
            this.mapArr[x + 0][y + 2] == '0' &&
            this.mapArr[x + 1][y + 2] == '0'){
                return true;
            } else {
                return false;
            }
        } else if (type == 3){

            if(x > 6 - 2 || y > 14 - 1){
                return false
            }

            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x + 1][y + 0] == '0' && 
            this.mapArr[x + 1][y + 1] == '0' &&
            this.mapArr[x + 2][y + 1] == '0'){
                return true;
            } else {
                return false;
            }

        } else if (type == 4){

            if(x < 2 || y > 14 - 1){
                return false
            }

            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x - 1][y + 0] == '0' &&
            this.mapArr[x - 1][y + 1] == '0' &&
            this.mapArr[x - 2][y + 1] == '0'){
                return true;
            } else {
                return false;
            }
        } else if (type == 5){

            if(x < 2 || y > 14 - 2){
                return false
            }

            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x - 1][y + 0] == '0' &&
            this.mapArr[x - 1][y + 1] == '0'&&
            this.mapArr[x - 2][y + 1] == '0'&&
            this.mapArr[x - 2][y + 2] == '0'){
                return true;
            } else {
                return false;
            }
        } else if (type == 6){
               
            if(x > 6 - 2 || y > 14 - 2){
                return false
            }

            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x + 1][y + 0] == '0' &&
            this.mapArr[x + 1][y + 1] == '0'&&
            this.mapArr[x + 2][y + 1] == '0'&&
            this.mapArr[x + 2][y + 2] == '0'){
                return true;
            } else {
                return false;
            }
        } else if (type == 7){
            if(x > 6 - 2 || y > 14 - 2){
                return false
            }

            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x + 0][y + 1] == '0' &&
            this.mapArr[x + 1][y + 1] == '0' &&
            this.mapArr[x + 2][y + 1] == '0' &&
            this.mapArr[x + 2][y + 2] == '0'){
                return true;
            } else {
                return false;
            }
        } else if (type == 8){
            if(x < 2 || y > 14 - 2){
                return false
            }
            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x + 0][y + 1] == '0' &&
            this.mapArr[x - 1][y + 1] == '0' &&
            this.mapArr[x - 2][y + 1] == '0' &&
            this.mapArr[x - 2][y + 2] == '0'){ 
                return true;
            } else {
                return false;
            }
        } else if (type == 9){
            if(x > 6 - 1 || x < 1){
                return false
            }
            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x - 1][y + 0] == '0' &&
            this.mapArr[x + 1][y + 0] == '0'){ 
                return true;
            } else {
                return false;
            }
        } else if (type == 10){
            
            if(x > 6 - 1){
                return false
            }

            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x + 1][y + 0] == '0'){ 
                return true;
            } else {
                return false;
            }
        } else if (type == 11){
            if(this.mapArr[x + 0][y + 0] == '0'){ 
                return true;
            } else {
                return false;
            }
        } else if (type == 12){
            if(y > 14 - 1){
                return false
            }
            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x + 0][y + 1] == '0'){ 
                return true;
            } else {
                return false;
            }
        } else if (type == 13){

            if(y > 14 - 2){
                return false
            }

            if(this.mapArr[x + 0][y + 0] == '0' &&
            this.mapArr[x + 0][y + 1] == '0' &&
            this.mapArr[x + 0][y + 2] == '0'){ 
                return true;
            } else {
                return false;
            }
        }
    }
}

