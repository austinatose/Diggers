class PlayerCard{
    constructor(type, x, y){
        this.type = type //a number
        this.x = x //xpos
        this.y = y //ypos
        this.sprite = new Sprite(x, y);
        this.sprite.width = 70
        this.sprite.height = 100
        this.sprite.collider = "none"
        this.sprite.img = `assets/card${this.type}.png` 
        
        // if(this.type == 1){ //This is arbitrary, and will be replaced by actual images
        //     this.sprite.color = "yellow";
        // } else if (this.type == 2){
        //     this.sprite.color = "green";
        // } else if (this.type == 3){
        //     this.sprite.color = "blue";
        // } else {
        //     this.sprite.color = "purple"
        // }
    }

    draw(){
        this.sprite.draw()
    }

    isClicked(){
        if(mouseX >= this.sprite.x - this.sprite.width/2 && mouseX <= this.sprite.x + this.sprite.width/2 && mouseY >= this.sprite.y - this.sprite.height/2 && mouseY <= this.sprite.y + this.sprite.height/2 && mouseIsPressed){
            return true
        } else {
            return false
        }
    }

    isTouching(){
        if(mouseX >= this.sprite.x - this.sprite.width/2 && mouseX <= this.sprite.x + this.sprite.width/2 && mouseY >= this.sprite.y - this.sprite.height/2 && mouseY <= this.sprite.y + this.sprite.height/2){
            return true
        } else {
            return false
        }
    }

    posUpdate(pos){
       
       this.sprite.x = pos*100 + 900
       this.sprite.y = 100
       this.sprite.draw()
    }
}