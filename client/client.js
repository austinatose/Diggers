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
let ourCards = new CardDS();

// function preload(){
//   // p1 = loadImage('./assets/player1.png')
//   p2 = loadImage('assets/player2.png')    
//   p3 = loadImage('assets/player3.png')    
//   ROCK = loadImage('assets/ROCK.png')    
// }

socket.on("mapUpdate", (receivedMap) => {
  console.log("mapUpdate", receivedMap);
  ourMap.mapArr = receivedMap;
  ourMap.init();
});

socket.on("cardUpdate", (receivedCards) => {
  console.log("cardUpdate", receivedCards);
  ourCards.cardData = receivedCards;
  console.log(ourCards.cardData)
  ourCards.init();
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

  // ourMap.checkforScrolling(clientplayer.sprite.pos.x, clientplayer.sprite.pos.y);
  clientplayer.sprite.draw();
  ourMap.draw();
  ourCards.draw();

  // update server
  socket.emit("sendPlayerDataUpdate", [createVector(clientplayer.sprite.pos.x, clientplayer.sprite.pos.y)]);
  if (clientplayer.spawnCard){
    if(frameCount >= clientplayer.lastSpawn + 60){
        console.log("Spawning new Card")
        socket.emit("sendCardUpdate", [1, 50, 50])
        clientplayer.spawnCard = false;
        clientplayer.lastSpawn = frameCount
    } else {
        clientplayer.spawnCard = false
    }
    
  }
  
  // console.log(clientplayer.sprite.pos.x, clientplayer.sprite.pos.y);
}


socket.on("newMessage", (message) => { // new announcement to players
  
});

socket.on("playerDataUpdate", (id, playerData) => {
  console.log("playerDataUpdate", id, playerData);
  // console.log(playerData[0])
  if (playerEntities.has(id) && id !== myID){
    playerEntities.get(id).sprite.pos.x = playerData[0].x;
    playerEntities.get(id).sprite.pos.y = playerData[0].y;
  } else if (id !== myID) {
    let newPlayer = new OtherCharacter(playerData[0].x, playerData[0].y);
    playerEntities.set(id, newPlayer);
  }
})
