# Front-end/App.vue

```
<script setup>
import router from "./router";
import Footer from "./components/Footer.vue";

//initialise socket connection
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:10001');
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


//listen for roomJoin event
socket.on("onRoomJoin", (joinRoomData) => {
  console.log(`${joinRoomData.joiner_screen_name} has joined room ${joinRoomData.room_name}.`)
});

//listen for room leave event
socket.on("onRoomLeave", (leaveRoomData) => {
  console.log(`${leaveRoomData.joiner_screen_name} has joined room ${leaveRoomData.room_name}.`)
});



//join room
socket.emit("createRoom", joinRoomData);
socket.emit("createRoom", joinRoomData2);

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
