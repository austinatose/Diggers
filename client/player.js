class Player {
  constructor(x, y) {
    this.sprite = new Sprite(x, y);
    this.sprite.diameter = 75;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
  }

  // takeInput() {
  //   if 
  // }

  draw() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.diameter);
  }
}