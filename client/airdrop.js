class Airdrop{
    constructor(type, x, y, id){
        this.type = type
        this.id = id
        this.sprite = new Sprite(x, y)
        this.sprite.width = 70
        this.sprite.height = 100
        this.sprite.drag = 10
        this.sprite.img = `assets/card${this.type}.png`     
    }

    checkCollision(player){
        if(this.sprite.colliding(player)){
            return true;
        } else {
            return false;
        }
    }

    draw() {
        this.sprite.draw()
    }
}