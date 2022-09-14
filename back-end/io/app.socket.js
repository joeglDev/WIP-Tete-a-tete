const app = require(`${__dirname}/../app.js`);
const {Port} = require("../../shared/Port");
console.log(Port.mainPort)



const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
      origin: "*"
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.emit("hello", "world")
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  //create a room of a specific name
  socket.on('createRoom', (roomData) => {
    const roomName = `${roomData.title}-${roomData.conversation_id}`;
    roomData.room_name = roomName;
    socket.join(roomName);
    console.log(`User has joined room: ${roomName}`);
    socket.emit("onRoomJoin", roomData)
  })

});




http.listen(Port.socketPort, () => {
  console.log(`Server listening on ${Port.socketPort}`);
});


/*
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

*/



