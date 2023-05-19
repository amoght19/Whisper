// server.js

const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const roomPasswordHash = new Map();

const io = require("socket.io")(server, {
  cors: {
    //To allow our frontend to connect to server
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});

  //Room joining
  socket.on("room join", async ({ username, roomJoined, password }) => {
    //RoomPassword created by user
    const roomPassword = roomPasswordHash.get(roomJoined);

    //Room password entered by user
    let roomNumber = roomJoined;

    if (roomPassword == password) {
      //If equal join the user
      socket.join(roomNumber);

      //Emit new user joined to all sockets in room
      socket.to(roomNumber).emit("new user joined", {
        username: username,
      });

      // emit a successful join event
      socket.emit("successful join", { roomJoined });
    } else {
      //If no match emit wrong password
      socket.emit("wrong password");
    }
  });

  //Room creation
  socket.on("room create", async ({ roomJoined, username, password }) => {
    let roomNumber = roomJoined;

    //Fetch array of sockets present in room
    let roomUsers = await io.in(roomNumber).fetchSockets();

    if (roomUsers.length > 0) {
      //If room taken
      socket.emit("room taken");
    } else {
      //If not taken then let the user join
      socket.join(roomNumber);
      socket.to(roomNumber).emit("new user joined", {
        username: username,
      });

      //Set the new password for room in hash table
      roomPasswordHash.set(roomJoined, password);

      //Emit room available
      socket.emit("room available");
    }
  });

  //Message Sending
  socket.on("chat message send", ({ msg, roomNumber, username }) => {
    //Send the emit to all socket in room with username and message
    socket.to(roomNumber).emit("chat message received", {
      msg: msg,
      username: username,
    });
  });

  //Leaving Room
  socket.on("leave room", ({ username, room }) => {
    //Emit user left in room
    socket.to(room).emit("user left", { username });

    //Disconnect user from room
    socket.leave(room);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
