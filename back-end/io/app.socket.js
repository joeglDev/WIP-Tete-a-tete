const app = require(`${__dirname}/../app.js`);
//const cors = require(`${__dirname}/../app.js`);
const cors = require("cors");

const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*", //"http://localhost:3000"
  },
});

console.log(socketIO);

socketIO.on("connection", (socketIO) => {
  console.log("User connected.");
  socketIO.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  socketIO.on("join", (joinData) => {
    console.log("User Joins", joinData);
    socketIO.join(joinData.roomName);
  });
});
