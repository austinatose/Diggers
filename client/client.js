let currentRoomCode = null;
let messages = []; // local messages array is for display only
let name = "Anonymous";

let ourMap = new Map();

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

function setup() {
  createCanvas(1400, 800);
  
  new Player(300, 300);
}

function draw() {
  background(200);
  ourMap.render();
}


socket.on("newMessage", (message) => { // new announcement to players
  
});

socket.on("mapUpdate", (receivedMap) => {
  console.log("mapUpdate", receivedMap);
  ourMap.mapArr = receivedMap;
});
