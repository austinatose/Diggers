import { Server } from "socket.io";

let rooms = [];

const io = new Server(8001, {
  cors: {
    origin: "*",
  },
});

const clients = new Set();

function Client(socket) {
  this.socket = socket;
  this.room = null;
  this.name = "Anonymous";
  this.position = { x: 0, y: 0 };
  this.heldCards = [];
  this.id = clients.size;
}

class Room {
  constructor(id) {
    this.clients = [];
    this.id = id;
    this.map = [];
    this.activeAirDrops = [];
  }

  addClient(client) {
    if (client.room) throw Error("Client already in a room");
    this.clients.push(client);
    client.room = this;
  }

  removeClient(client) {
    if (!this.clients.includes(client)) throw Error("Client not in room");
    this.clients = this.clients.filter((c) => c !== client);
    client.room = null;
  }

  generateNewMap() {
    this.map = [];
    for (let i = 0; i < 7; i++) {
      this.map.push([]);
      for (let j = 0; j < 15; j++) {
        this.map[i].push("0");
      }
    }
    let list = [1, 3, 5]
    let real = list[Math.floor((Math.random()*list.length))];
    this.map[real][14] = "999"
    for (let item in list) {
      if (list[item] !== real) {
        this.map[list[item]][14] = "99"
      }
    }
    // this.map[2][0] = "1"; // for testing
    // this.map[2][1] = "1"; // for testing
    // this.map[2][2] = "3"; // for testing
    // this.map[2][3] = "1"; // for testing
    // this.map[3][1] = "2"; // for testing
    // this.map[3][2] = "5"; // for testing
    // this.map[1][0] = "6"; // for testing
  }

  generateNewCards(){
    this.cards = []
  }
}

console.log("Server started");

io.on("connection", socket => {
  console.log("Client connected");
  let client = new Client(socket);
  clients.add(client);
  socket.emit("connected", client.id);
  console.log("Connect to Client id", client.id);

  socket.on("setName", (name) => {
    console.log("setName received", name);
    client.name = name;
  });

  // socket.on("sendMessage", (message) => {
  //   console.log("sendMessage received", message);
  //   if (!client.room) return;
  //   client.room.messages.push([client, message]);
  //   console.log(client.room)
  //   for (let clientalt of client.room.clients) {
  //     clientalt.socket.emit("newMessage", client.name + ": " + message); // processing of client id is done by server, client only sees name
  //   }
  // });

  socket.on("createRoom", () => {
    console.log("createRoom");
    let roomCode = generateRandomRoomCode();
    let room = new Room(roomCode);
    rooms.push(room);
    room.addClient(client);
    client.room = room;
    room.generateNewMap();
    room.generateNewCards();

    console.log(client.room)
    socket.emit("mapUpdate", room.map);
    socket.emit("setRoomCode", roomCode);
  });

  socket.on("joinRoom", (roomCode) => {
    console.log("joinRoom", roomCode);
    let pass = false;
    for (let room of rooms) {
      if (room.id === roomCode) {
        room.addClient(client);
        console.log("new client added to room", room.id)
        client.room = room;
        for (let c of client.room.clients)
          c.socket.emit("newMessage", client.name + " joined the room");
        socket.emit("mapUpdate", room.map);
        socket.emit("setRoomCode", roomCode);
        pass = true;
      }
    }
    if (!pass) {
      socket.emit("newMessage", "Room not found"); 
    }
  });

  socket.on("playerWin", () => {
    if (!client.room) return;
    socket.emit("winMessage");
    for (let c of client.room.clients) {
      if (c !== client) {
        c.socket.emit("loseMessage");
      }
    }
  })

  socket.on("disconnect", () => {
    if (client.room) {
      for (let c of client.room.clients)
        c.socket.emit("newMessage", client.name + " disconnected");
      client.room.removeClient(client);
    }
    clients.delete(client);
    // clients.forEach((c) => {
    //   c.socket.emit("clientDisconnected", client.id);
    // });
    // no need for this as there are no changes on client side, just broadcasting message will do
  });

  socket.on("sendPlayerDataUpdate", (data) => {
    if (!client.room) return;
    client.position = data[0];
    // client.heldItem = data[1];
    for (let c of client.room.clients) {
      c.socket.emit("playerDataUpdate", client.id, [client.position]);
    }
  });

  socket.on("sendMapUpdate", (newMap) => {
    if(!client.room) return;
    client.room.map = newMap

    for(let c of client.room.clients){
        c.socket.emit("mapUpdate", client.room.map)
    }
  })

  socket.on("sendCardUpdate", (newCards) => {
    if(!client.room) return;
    client.room.cards = newCards

    for(let c of client.room.clients){
        c.socket.emit("cardUpdate", client.room.cards)
    }
  })

  socket.on("freezeCollected", (cli) => {
    if(!client.room) return;
    for(let c of client.room.clients){
        if (c === client) continue;
        c.socket.emit("freezeGive", client.id)
    } 
  })

  socket.on("airdropCollected", (airdropID) => {
    if(!client.room) return;
    console.log("airdropCollected", airdropID);
    for (let i = 0; i < client.room.activeAirDrops.length; i++) {
      if (client.room.activeAirDrops[i][3] === airdropID) {
        // client.heldCards.push(client.room.activeAirDrops[i][0]);
        client.room.activeAirDrops.splice(i, 1);
        break;
      }
    }
    for (let c of client.room.clients) {
      c.socket.emit("deleteAirdrop", airdropID);
    }
  })
});

// this works but all the rooms will get airdrops at the same time lol
let id = 0;
function distributeAirdrops() {
  for (let room of rooms) {
    let newAirdrop = [Math.floor(Math.random()*16)+1, Math.random() * 700, 0, id];
    //let newAirdrop = [16 - Math.floor(Math.random()*5), Math.random() * 700, 0, id];
    for (let client of room.clients) {
      room.activeAirDrops.push(newAirdrop);
      client.socket.emit("newMessage", "Airdrop incoming!");
      client.socket.emit("airdrop", newAirdrop);
      console.log(room.activeAirDrops);
      id++;
    }
  }
}

setInterval(distributeAirdrops, 5000); // every 5 seconds

function generateRandomRoomCode() {
  return (+new Date()).toString(36).slice(-5);
}
