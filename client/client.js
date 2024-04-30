let currentRoomCode = null;
let playerEntities = new Map();
let name = "Anonymous";
let myID = null;

// const socket = io.connect("ws://192.168.1.81:8001");
const socket = io.connect("ws://localhost:8001");

window.onload = () => {
    const join_option_input = prompt('Select: "CREATE" or "JOIN"', "CREATE");
    if (join_option_input === "CREATE") {
        const temp_name = prompt("Enter Name");
        socket.emit("setName", temp_name);
        socket.emit("createRoom");
        console.log("here")
    } else if (join_option_input === "JOIN") {
        const room_code_input = prompt("Enter Room Code");
        const temp_name = prompt("Enter Name");
        socket.emit("setName", temp_name);
        socket.emit("joinRoom", room_code_input);
        console.log("here2")
    } else {
        window.onload();
    }
};

socket.on("setRoomCode", (roomCode) => {
    currentRoomCode = roomCode;
    console.log("Room Code:", roomCode);
});

socket.on("connected", (id) => {
    myID = id;
    console.log("Connected with ID", id);
});

let ground, tilesGroup;
let p1, p2, p3;
let ourMap = new MapDS();
let airdrops = []
let playerCards = []
let isCardSelected = false;
let selectedCardType = -1;
let selectedCardIndex = -1;
let lastClickFrame = 0;

// function preload(){
//   // p1 = loadImage('./assets/player1.png')
//   p2 = loadImage('assets/player2.png')    
//   p3 = loadImage('assets/player3.png')    
//   ROCK = loadImage('assets/ROCK.png')    
// }

socket.on("mapUpdate", (receivedMap) => {
  console.log("mapUpdate", receivedMap);
  ourMap.mapArr = receivedMap;
  ourMap.clearMap();
  ourMap.init();
});

socket.on("cardUpdate", (receivedCards) => {
    console.log("cardUpdate", receivedCards);
    ourCards = receivedCards;
    console.log("RECEIVED CARD UPDATE")
})

// some weird stuff will definitely happen when people do not collect an airdrop before the next one arrives, i don't have time to worry about that right now
socket.on("airdrop", (newairdropdetails) => {
    console.log("airdrop", newairdropdetails);
    let newAirdrop = new Airdrop(newairdropdetails[0], newairdropdetails[1], newairdropdetails[2], newairdropdetails[3]);
    airdrops.push(newAirdrop);
    console.log("RECEIVED CARD UPDATE")
})

socket.on("deleteAirdrop", (id) => {
    for (let airdrop of airdrops) {
        if (airdrop.id === id) {
            airdrop.sprite.remove();
            airdrops.splice(airdrops.indexOf(airdrop), 1);
        }
    }
})

function setup() {
    new Canvas(1400, 800);

    console.log("creating map");

    world.gravity.y = 50;
    // createCanvas(1400, 800, WEBGL); // idk why it breaks when WEBGL is on

    //texture(p1);
    clientplayer = new PlayerCharacter(300, 300);

}

function draw() {
    background(51, 36, 1);

    // announcements and text
    fill(255);
    textSize(20);
    text("Room Code: " + currentRoomCode, 20, 20);
    fill(0)

    // player updates
    clientplayer.takeInput(ourMap.bricksArr);
    // if (kb.pressing('c')){
    //     if(frameCount - clientplayer.lastSpawn > 60){
    //         console.log("ERROR0")
    //         socket.emit("sendCardUpdate", new Card(Math.floor(Math.random()*15)+1, Math.random()*1300, 20))
    //         // console.log("ERROR1") // This one does not print
    //         clientplayer.lastSpawn = frameCount
    //         console.log("New card spawns")
    //     }
    // }

    

    if (clientplayer.sprite.y > height / 2) {
        translate(0, height / 2 - clientplayer.sprite.y);
    }
    if (clientplayer.sprite.y > 4000) {
        clientplayer.sprite.y = 0;
    }

    

    if(frameCount - clientplayer.speedFrame > 600){
        clientplayer.maxSpeed = 10;
    }

    // airdrop check
    for (let airdrop of airdrops) {
        airdrop.draw();
        if (playerCards.length <= 3 && clientplayer.sprite.overlaps(airdrop.sprite)) {
            console.log("airdrop collected")
            if(airdrop.type == 14){
                console.log("SPEEEEEEEEEEEED")
                clientplayer.maxSpeed = 20
                clientplayer.speedFrame = frameCount
            } else if (airdrop.type == 16){
                console.log("FREEEEEEEZE others")
                socket.emit("freezeCollected", [])
            } else {
                playerCards.push(new PlayerCard(airdrop.type, playerCards.length*100 + 900, 100))
            }
            
            socket.emit("airdropCollected", airdrop.id);
            airdrop.sprite.remove();   
            airdrops.splice(airdrops.indexOf(airdrop), 1)

            // more logic to deal with adding cards to the player's hand goes here
        }
    }

    // draw others
    for (let [id, player] of playerEntities) {
        // console.log(playerEntities);
        if (id !== myID) {
            player.sprite.draw();
            if(frameCount - clientplayer.freezeFrame <= 600){
                fill(0, 100, 255, 100)
                rect(player.sprite.position.x - 50, player.sprite.position.y - 80, 100, 160)
               
            }
            
        }
        
    }


    // ourMap.checkforScrolling(clientplayer.sprite.pos.x, clientplayer.sprite.pos.y);
    clientplayer.sprite.x = constrain(clientplayer.sprite.x, 0, width);
    clientplayer.sprite.draw();
    if(clientplayer.maxSpeed == 0){
        fill(0, 100, 255, 100)
        rect(clientplayer.sprite.position.x - 50, clientplayer.sprite.position.y - 80, 100, 160)
       
    }
    ourMap.draw();

    // check for hovering
    // TODO: Add keybind that triggers this, or this should only trigger when a card is selected to be used
    // right now empty spaces below ground level are highlighted BUT this should not be an issue because we will never have empty tiles

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 15; j++) {
            let posx = i * 200 + 100
            let posy = 500 + j * 200
            text("i: " + i + " j: " + j, posx, posy) // debug
            // if(ourMap.bricksArr[i] != undefined && ourMap.bricksArr[i][j] != undefined && ourMap.bricksArr[i][j][0].mouse.hovering()) { // wait this may not work because translation is funny
            let mod = (clientplayer.sprite.y >= height / 2) ? height / 2 - clientplayer.sprite.y : 0;

            if (
                ourMap.bricksArr[i] != undefined &&
                ourMap.bricksArr[i][j] != undefined &&
                ourMap.mapArr[i][j] == 0 && // only if it is a rock, but if we decide to allow players to replace tunnels, we can just remove this line
                mouse.x < posx + 100 &&
                mouse.x > posx - 100 &&
                mouse.y - mod < posy + ourMap.bricksArr[i][j][0].height / 2 &&
                mouse.y - mod > posy - ourMap.bricksArr[i][j][0].height / 2 &&
                mouse.x > 0 &&
                mouse.x < width &&
                mouse.y > 0 &&
                mouse.y < height &&
                isCardSelected
            ) {
                let isValid = ourMap.checkValidPlacement(selectedCardType, i, j)
                push();
                if(isValid){
                    stroke("yellow")
                } else {
                    stroke("red")
                }
                //stroke("yellow");
                strokeWeight(5);
                noFill();
                rect(posx - 100, posy - ourMap.bricksArr[i][j][0].height / 2, 200, 200)
                pop();
                if (mouseIsPressed && isValid) {
                    console.log("changing map")
                    ourMap.updateMap(i, j, selectedCardType)
                    playerCards[selectedCardIndex].sprite.remove()
                    playerCards.splice(selectedCardIndex, 1)
                    selectedCardType = -1
                    selectedCardIndex = -1
                    isCardSelected = false;
                    socket.emit("sendMapUpdate", ourMap.mapArr)

                    console.log("PLAYER CARDS ARE:", playerCards)
                }
            }
        }
    }

    if (clientplayer.sprite.y > height / 2) { //reverse the translate
        translate(0, -(height / 2 - clientplayer.sprite.y));
    }

    for(let i = 0; i < playerCards.length; i++){
        playerCards[i].draw();
        playerCards[i].posUpdate(i);

       
        if(frameCount - lastClickFrame > 10 && playerCards[i].isClicked()){
            
            if(isCardSelected == false){
                selectedCardType = playerCards[i].type
                selectedCardIndex = i
                isCardSelected = true;
            } else {
                selectedCardType = -1
                selectedCardIndex = -1
                isCardSelected = false;
            }

            lastClickFrame = frameCount
           
        }
        
        

        if(i == selectedCardIndex){
            strokeWeight(5)
            stroke('yellow')
            noFill()
            rect(i*100 + 900 - 36, 100 - 51, 72, 102)
            strokeWeight(0)
            stroke('black')
        }
    }

    fill(0, 255, 255, 255)
    if(clientplayer.maxSpeed != 10){
        rect(300, 20, 600 - (frameCount - clientplayer.speedFrame), 50)
    }



    // update server
    socket.emit("sendPlayerDataUpdate", [createVector(clientplayer.sprite.pos.x, clientplayer.sprite.pos.y)]);

    // console.log(clientplayer.sprite.pos.x, clientplayer.sprite.pos.y);
}


socket.on("newMessage", (message) => { // new announcement to players

});

socket.on("playerDataUpdate", (id, playerData) => {
    //console.log("playerDataUpdate", id, playerData);
    // console.log(playerData[0])
    if (playerEntities.has(id) && id !== myID) {
        playerEntities.get(id).sprite.pos.x = playerData[0].x;
        playerEntities.get(id).sprite.pos.y = playerData[0].y;
    } else if (id !== myID) {
        let newPlayer = new OtherCharacter(playerData[0].x, playerData[0].y);
        playerEntities.set(id, newPlayer);
    }
})

socket.on("freezeGive", (id) => {
    clientplayer.maxSpeed = 0;
    clientplayer.speedFrame = frameCount
    clientplayer.freezeFrame = frameCount
})




