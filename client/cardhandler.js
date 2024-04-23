class CardDS{
    constructor(){
        this.cardData = []
        this.cardArr = []
    }
    
    init(){
        console.log("card init started");
        console.log(this.cardArr)
        for(let card of this.cardData){
            if(card[0] == 1){
                let newCard = new Sprite(card[1], card[2])
                newCard.color = "yellow"
                newCard.width = 30
                newCard.height = 30
                this.cardArr.push(newCard)
            }
        }
    }

    draw() {
        console.log(this.cardArr)
        for (let card of this.cardArr){
            card.draw();
        }
    }
}