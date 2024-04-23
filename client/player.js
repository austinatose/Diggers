class PlayerCharacter {
  constructor(x, y) {
    this.sprite = new Sprite(x, y);
    this.sprite.width = 50;
    this.sprite.height = 150;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.mass = 0;
    this.avatar_id = Math.floor(Math.random()*2)+1
    this.sprite.img = `assets/player${this.avatar_id}.png`
    this.spawnCard = false;
    this.lastSpawn = -60;
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
    if (kb.pressing("c")) {
      this.spawnCard = true;
      console.log("this.spawnCard = true")
    }
  }
}

class OtherCharacter {
  constructor(x, y) {
    this.sprite = new Sprite(x, y);
    this.sprite.width = 50;
    this.sprite.height = 150;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.mass = 0;
    this.avatar_id = Math.floor(Math.random()*3)+1
    this.sprite.img = `assets/player3.png`
  }
}