class Map {
  constructor() {
    this.mapArr = [];
  }

  render() {
    for (let i = 0; i < this.mapArr.length; i++) {
      for (let j = 0; j < this.mapArr[i].length; j++) {
        if (this.mapArr[i][j] === "0") {
          fill(255);
        } else {
          fill(0);
        }
        rect(i * 200, 400 + j * 200, i * 200 + 200, 400 + j * 200 + 200);
      }
    }
  }
}

