class PlayerCharacter {
  constructor(x, y) {
    this.sprite = new Sprite(x, y);
    this.sprite.width = 50;
    this.sprite.height = 100;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.mass = 0;
    // this.sprite.img = 'assets/player2.png'
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

class OtherCharacter {
  constructor(x, y) {
    this.sprite = new Sprite(x, y);
    this.sprite.width = 50;
    this.sprite.height = 100;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.mass = 0;
    // this.sprite.img = 'assets/player2.png'
  }
}