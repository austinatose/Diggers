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
let ourCards = []

// function preload(){
//   // p1 = loadImage('./assets/player1.png')
//   p2 = loadImage('assets/player2.png')    
//   p3 = loadImage('assets/player3.png')    
//   ROCK = loadImage('assets/ROCK.png')    
// }

socket.on("mapUpdate", (receivedMap) => {
    console.log("mapUpdate", receivedMap);
    ourMap.mapArr = []
    ourMap.mapArr = receivedMap;
    ourMap.clearMap();
    ourMap.init();
});

socket.on("cardUpdate", (receivedCards) => {
    console.log("cardUpdate", receivedCards);
    ourCards.cardData = receivedCards;
    console.log(ourCards.cardData)
})

function setup() {
    new Canvas(1400, 800);

    console.log("creating map");

    world.gravity.y = 20;
    // createCanvas(1400, 800, WEBGL); // idk why it breaks when WEBGL is on

    //texture(p1);
    clientplayer = new PlayerCharacter(300, 300);

}

function draw() {
    background(200);

    // announcements and text
    fill(0);
    textSize(20);
    text("Room Code: " + currentRoomCode, 20, 20);

    // player updates
    clientplayer.takeInput();
    if (clientplayer.sprite.y > height / 2) {
        translate(0, height / 2 - clientplayer.sprite.y);
    }

    // draw others
    for (let [id, player] of playerEntities) {
        // console.log(playerEntities);
        if (id !== myID) {
            player.sprite.draw();
        }
    }

    //testing map updates when placing a card


    if (kb.presses("e")) {
        console.log("block state ", ourMap.mapArr[5][0])
    }


    // ourMap.checkforScrolling(clientplayer.sprite.pos.x, clientplayer.sprite.pos.y);
    clientplayer.sprite.draw();
    ourMap.draw();

    // check for hovering
    // TODO: Add keybind that triggers this, or this should only trigger when a card is selected to be used
    // right now empty spaces below ground level are highlighted BUT this should not be an issue because we will never have empty tiles
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 7; j++) {
            let posx = i * 200 + 100
            let posy = 500 + j * 200
            // if(ourMap.bricksArr[i] != undefined && ourMap.bricksArr[i][j] != undefined && ourMap.bricksArr[i][j][0].mouse.hovering()) { // wait this may not work because translation is funny
            let mod = (clientplayer.sprite.y >= height / 2) ? height / 2 - clientplayer.sprite.y : 0;
            if (
                ourMap.bricksArr[i] != undefined &&
                ourMap.bricksArr[i][j] != undefined &&
                ourMap.mapArr[i][j] == 0 && // only if it is a rock, but if we decide to allow players to replace tunnels, we can just remove this line
                mouse.x < posx + 100 &&
                mouse.x > posx - 100 &&
                mouse.y - mod < posy + ourMap.bricksArr[i][j][0].height / 2 &&
                mouse.y - mod > posy - ourMap.bricksArr[i][j][0].height / 2
            ) {
                push();
                stroke("yellow");
                strokeWeight(5);
                noFill();
                rect(posx - 100, posy - ourMap.bricksArr[i][j][0].height / 2, 200, 200)
                pop();
                if (kb.presses("c")) {
                    console.log("changing map")
                    ourMap.mapArr[2 + i][0 + j] = "0";
                    ourMap.mapArr[3 + i][0 + j] = "1";
                    ourMap.mapArr[3 + i][1 + j] = "3";
                    ourMap.mapArr[4 + i][1 + j] = "5";
                    ourMap.mapArr[4 + i][2 + j] = "1";
                    //ourMap.init()
                    socket.emit("sendMapUpdate", ourMap.mapArr)
                    // console.log("block state: ", ourMap.mapArr[5][0])
                }
            }
        }
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


