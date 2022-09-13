const app = require(`${__dirname}/../app.js`);
//const cors = require(`${__dirname}/../app.js`);
const cors = require("cors");

const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*", //"http://localhost:3000"
  },
});


socketIO.on("connection", (socketIO) => {
  

  //client connected
  console.log("Client connected.");
  socketIO.emit("connected", "Client connected")

  socketIO.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socketIO.on("join", (joinData) => {
    console.log("User Joins", joinData);
    socketIO.join(joinData.roomName);
  });
});


module.exports = socketIO;
