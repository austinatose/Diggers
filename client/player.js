class PlayerCharacter {
  constructor(x, y, name) {
    this.name = name
    this.active = true;
    this.sprite = new Sprite(x, y);
    this.sprite.width = 50;
    this.sprite.height = 50;
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.mass = 0;
    this.avatar_id = Math.floor(Math.random()*4)+1
    this.sprite.img = `assets/player${this.avatar_id}.png`
    //this.sprite.img = `assets/player1.png`
    this.sprite.img.scale = 0.3
    this.sprite.bounciness = 0;
    this.lastSpawn = -60;
    this.isFalling = false
    this.sprite.friction = 0;
    this.maxSpeed = 10
    this.freezeFrame = -600; //the frame where the plaer collected the freeze power up
    this.speedFrame = 0 //last time the speed boost was obtained
    this.groundSensor = new Sprite(x, y + 30);
    this.groundSensor.collider = "none";
    this.groundSensor.width = 5;
    this.groundSensor.height = 1;
    this.groundSensor.mass = 0;
    this.groundSensor.visible = false;
  }

  takeInput(bricksArr) {

    if(!this.active){
        return;
    }
    
    if (kb.pressing(" ") && this.maxSpeed != 0) {
      if (!this.isFalling) {
	      this.sprite.vel.y = -27;
        this.isFalling = true;
      }
    }
    if (kb.pressing("a")) {
      this.sprite.mirror.x = true;
      this.sprite.vel.x = -this.maxSpeed;
    } else if (kb.pressing("d")) {
      this.sprite.mirror.x = false;
      this.sprite.vel.x = this.maxSpeed;

    // hax
    // } else if (kb.pressing("s")) {
    //   this.sprite.y += 100;
    } else {
      this.sprite.vel.x = 0;
    }

    // this may be a resource hog
    for (let brickRow of bricksArr) {
      for (let brick of brickRow) {
        for (let component of brick) {
          if (this.groundSensor.overlaps(component)) {
            this.isFalling = false;
            this.sprite.vel.y = 0;
          }
        }
      }
    }

    this.groundSensor.position.x = this.sprite.position.x;
    this.groundSensor.position.y = this.sprite.position.y + 30;
  }

  draw() {
    this.sprite.rotation = 0;
    this.sprite.draw();
    push();
    textAlign(CENTER)
    fill(255, 255, 255, 255)
    text(this.name, this.sprite.position.x, this.sprite.position.y - 50)
    if(this.maxSpeed == 0){
        fill(0, 100, 255, 100)
        rect(this.sprite.position.x - 50, this.sprite.position.y - 80, 100, 160)
    }
    pop();
  }
}

class OtherCharacter {
  constructor(x, y, name) {
    this.name = name
    this.sprite = new Sprite(x, y);
    this.sprite.width = 50;
    this.sprite.height = 50;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.mass = 0;
    this.maxSpeed = 10;
    // this.avatar_id = Math.floor(Math.random()*3)+1
    this.sprite.img = `assets/player2.png`
    this.sprite.img.scale = 0.3
    this.sprite.collider = 'kinematic'
  }

  draw() {
    this.sprite.rotation = 0; // stop sprite from rotating
    this.sprite.draw();
    push();
    fill(255, 255, 255, 255)
    textAlign(CENTER)
    text(this.name, this.sprite.position.x, this.sprite.position.y - 50)
    if(frameCount - this.freezeFrame <= 600){
        fill(0, 100, 255, 100)
        rect(this.sprite.position.x - 50, this.sprite.position.y - 80, 100, 160)
    }
    pop();
  }
}