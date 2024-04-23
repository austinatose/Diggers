class CardDS{
    constructor(){
        this.cardData = []
        this.cardArr = []
    }
    
    init(){
        for(let card of cardData){
            if(card[0] == 1){
                let newCard = new Sprite(card[1], card[2])
                newCard.color = "yellow"
                newCard.width = 30
                newCard.height = 30
                this.cardArr.push(newCard)
            }
        }
    }

    draw(){
        for(let card of cardArr){
            card.draw();
        }
    }
}