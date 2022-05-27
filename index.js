const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("chat message", " a user joined a chat");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
  console.log("a user connected");
  socket.on("disconnect", () => {
    io.emit("chat message", " a user disconnected");
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
