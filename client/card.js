class Card{
    constructor(type, x, y){
        this.type = type
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