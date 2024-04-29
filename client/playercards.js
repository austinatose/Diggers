class PlayerCard{
    constructor(type, x, y){
        this.type = type //a number
        this.x = x //xpos
        this.y = y //ypos
        this.sprite = new Sprite(x, y);
        this.sprite.width = 30
        this.sprite.height = 60
        this.sprite.collider = "static"
        
        if(this.type == 1){ //This is arbitrary, and will be replaced by actual images
            this.sprite.color = "yellow";
        } else if (this.type == 2){
            this.sprite.color = "green";
        } else if (this.type == 3){
            this.sprite.color = "blue";
        } else {
            this.sprite.color = "purple"
        }
    }
}