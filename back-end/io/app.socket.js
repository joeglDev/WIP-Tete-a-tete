const app = require(`${__dirname}/../app.js`);


const http = require("http").Server(app);
module.exports = http;
const cors = require("cors");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  //create a room of a specific name
  socket.on("joinRoom", (joinRoomData) => {
    const roomName = joinRoomData.conversation_id;
    joinRoomData.room_name = roomName;
    socket.join(roomName);
    console.log(`${joinRoomData.joiner_screen_name} has joined room: ${roomName}`);
    io.to(roomName).emit("onRoomJoin", joinRoomData);
  });

  //handle user leaving room
socket.on("leaveRoom", (leaveRoomData) => {
  const roomName = `${leaveRoomData.title}-${leaveRoomData.conversation_id}`;
  socket.leave(roomName);
  socket.to(roomName).emit('onRoomLeave', leaveRoomData)
  console.log(`${leaveRoomData.joiner_screen_name} has left room: ${roomName}`)
});


socket.on("messageSubmit", (message) => {
  console.log(`Received message from ${message.user} of body ${message.text}`)
  socket.to(message.room_id).emit("messageSubmitConfirmation", message)
}) //socket.to to send to others  / io.to to send to all users (results in duplication currently)
});

/*
http.listen(Port.socketPort, () => {
  console.log(`Server listening on ${Port.socketPort}`);
});
*/
