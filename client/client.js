let currentRoomCode = null;
let playersArr = [];
let entitiesArr = [];
let name = "Anonymous";

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

let ground, tilesGroup;
let p1, p2, p3;
let ourMap = new Map();

function preload(){
    p1 = loadImage('player1.png')    
}

function setup() {
  new Canvas(1400, 800);
  world.gravity.y = 15;
  // createCanvas(1400, 800, WEBGL); // idk why it breaks when WEBGL is on

  //texture(p1);
  clientplayer = new PlayerCharacter(300, 300);
  ourMap.init();
}

function draw() {

  background(200);
  clientplayer.takeInput();
  if (clientplayer.sprite.y > height / 2) {
    translate(0, height / 2 - clientplayer.sprite.y);
  }
  // ourMap.checkforScrolling(clientplayer.sprite.pos.x, clientplayer.sprite.pos.y);
  clientplayer.sprite.draw();
  ourMap.draw();
}


socket.on("newMessage", (message) => { // new announcement to players
  
});

socket.on("playerDataUpdate", (id, playerData) => {
  for (let data of playerData) {
      if (data.id === id)
          continue;
      if (!em.exists(data.id)) {
          em.registerNewPlayer(data);
      } else {
          em.updatePlayerData(data);
      }
  }
})

socket.on("mapUpdate", (receivedMap) => {
  console.log("mapUpdate", receivedMap);
  ourMap.mapArr = receivedMap;
});
