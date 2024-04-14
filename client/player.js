class PlayerCharacter {
  constructor(x, y) {
    this.sprite = new Sprite(x, y);
    this.sprite.diameter = 75;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.mass = 0;
    this.universalX = x;
    this.universalY = y;
    // this.sprite.img = 'assets/player2.png'
  }

  draw() {
    //fill(255);
    //ellipse(this.pos.x, this.pos.y, this.diameter);
    rect(50, 50, 50, 50)
  }

  takeInput() {
    const SPEED = 10;
    if (kb.pressing(" ")) {
      this.sprite.pos.y -= 20;
    }
    if (kb.pressing("a")) {
      this.sprite.pos.x -= SPEED;
    }
    if (kb.pressing("d")) {
      this.sprite.pos.x += SPEED;
    }
  }
}