const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected: $", socket.id);

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log("user with ID: ", socket.id, "Joined the room: ", data);
  });

  socket.on("sendMessage", (data) => {
      socket.to(data.room).emit("receiveMessage", data)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
