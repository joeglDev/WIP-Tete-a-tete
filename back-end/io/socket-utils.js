const { Server } = require("socket.io");

exports.setupIO = (io, serverSocket) => {
  io.on("connection", (socket) => {
    console.log("Setup socket");
    serverSocket = socket;
    socket.emit("connection", "Client connected");
  });
};
