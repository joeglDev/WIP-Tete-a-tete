# Front-end/App.vue

```
<script setup>
import router from "./router";
import Footer from "./components/Footer.vue";

//initialise socket connection
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:10001');
console.log("socket", socket)
//testuser joins rooms
const joinRoomData = {
  conversation_id: 1,
  topic_id: 1,
  title: "Title A",
  joiner_screen_name: "user_X",
};
const joinRoomData2 = {
  conversation_id: 1,
  topic_id: 1,
  title: "Title A",
  joiner_screen_name: "user_Z",
};
const leaveRoomData = {
  conversation_id: 1,
  topic_id: 1,
  title: "Title A",
  joiner_screen_name: "user_X",
};

const message1 = {body: "A test message", screen_name: "user_X", timeStamp: Date.now()};
const message2 = {body: "A test message 2", screen_name: "user_Z", timeStamp: Date.now()};

//listen for messageSubmitted event
socket.on("messageSubmitConfirmation", (newMessage) => {
  console.log(newMessage)
  console.log(`Received new message: ${newMessage}`);
  //add javaScript functionality to add message to all chat messages state and display.
});


//emit messageSubmit event
socket.emit("messageSubmit", message1)
socket.emit("messageSubmit", message2)


//listen for roomJoin event
socket.on("onRoomJoin", (joinRoomData) => {
  console.log(`${joinRoomData.joiner_screen_name} has joined room ${joinRoomData.room_name}.`)
});

//join room
socket.emit("joinRoom", joinRoomData);
socket.emit("joinRoom", joinRoomData2);

//listen for room leave event
socket.on("onRoomLeave", (leaveRoomData) => {
  console.log(`${leaveRoomData.joiner_screen_name} has joined room ${leaveRoomData.room_name}.`)
});

//send leave room requests
socket.emit("leaveRoom", leaveRoomData);



</script>

<template>
  <div>
    <RouterView />
    <Footer />
  </div>
</template>



```
