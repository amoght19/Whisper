// server.js

const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const roomPasswordHash = new Map();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected ", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected ", socket.id);
  });

  socket.on("room join", async ({ username, roomJoined, password }) => {
    const roomPassword = roomPasswordHash.get(roomJoined);
    let roomNumber = roomJoined;

    console.log("roomPassword=", roomPassword);
    console.log("userPasword=", password);
    if (roomPassword == password) {
      socket.join(roomNumber);
      socket.to(roomNumber).emit("new user joined", {
        username: username,
      });
      socket.emit("successful join", { roomJoined });
    } else {
      socket.emit("wrong password");
    }

    console.log(`${username} joined in ${roomNumber}`);
  });

  socket.on("room create", async ({ roomJoined, username, password }) => {
    let roomNumber = roomJoined;
    let roomUsers = await io.in(roomNumber).fetchSockets();

    if (roomUsers.length > 0) {
      socket.emit("room taken");
    } else {
      socket.join(roomNumber);
      socket.to(roomNumber).emit("new user joined", {
        username: username,
      });
      roomPasswordHash.set(roomJoined, password);
      socket.emit("room available");
    }
  });

  socket.on("chat message send", ({ msg, roomNumber, username }) => {
    socket.to(roomNumber).emit("chat message received", {
      msg: msg,
      username: username,
    });
    console.log("message: " + msg, roomNumber);
  });

  socket.on("leave room", ({ username, room }) => {
    socket.to(room).emit("user left", { username });
    socket.leave(room);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
