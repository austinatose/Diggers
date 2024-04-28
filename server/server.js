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
  this.heldItem = null;
  this.id = clients.size;
}

class Room {
  constructor(id) {
    this.clients = [];
    this.id = id;
    this.map = [];
    this.cards = []
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
    for (let i = 0; i < 15; i++) {
      this.map.push([]);
      for (let j = 0; j < 7; j++) {
        this.map[i].push("0");
      }
    }
    // this.map[0][0] = "1";
    // this.map[0][1] = "3";
    // this.map[1][1] = "2";
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
    socket.emit("cardUpdate", room.cards);
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
        socket.emit("cardUpdate", room.cards);
        socket.emit("setRoomCode", roomCode);
        pass = true;
      }
    }
    if (!pass) {
      socket.emit("newMessage", "Room not found"); 
    }
  });

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

  socket.on("sendCardUpdate", (data) => {
    if(!client.room) return;
    client.room.cards.push(data)

    for(let c of client.room.clients){
        c.socket.emit("cardUpdate", client.room.cards)
    }
  })

  socket.on("sendMapUpdate", (newMap) => {
    if(!client.room) return;
    client.room.map = newMap

    for(let c of client.room.clients){
        c.socket.emit("mapUpdate", client.room.map)
    }
  })
});

// function tick() {
//   for (let room of rooms) {
//     for (let client of room.clients) {
//       client.socket.emit("playerDataUpdate", room.clients.map((c) => ({ id: c.id, position: c.position })));
//       // client.socket.emit("mapUpdate", room.map);
//     }
//   }
// }

function generateRandomRoomCode() {
  return (+new Date()).toString(36).slice(-5);
}
