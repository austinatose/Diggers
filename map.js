class Map {
  constructor() {
    this.mapArr = [];
  }

  regenerateMap() {
    this.mapArr = [];
    for (let i = 0; i < 15; i++) {
      this.mapArr.push([]);
      for (let j = 0; j < 7; j++) {
        this.mapArr[i].push("0");
      }
    }
  }

  render() {
    for (let i = 0; i < this.mapArr.length; i++) {
      for (let j = 0; j < this.mapArr[i].length; j++) {
        if (this.mapArr[i][j] === "0") {
          fill(255);
        } else {
          fill(0);
        }
        rect(i * ground.w, j * ground.h, ground.w, ground.h);
      }
    }
  }
}

