
# Front-end/App.vue
```
<script setup>
  /*
  This example front end sockets data is for testing and should not be implemented as script tag in vue.
  */
import router from "./router";
import Footer from "./components/Footer.vue";

//initialise socket connection
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:10001');
//testuser joins room
const conversationData = {
  conversation_id: 1,
  topic_id: 1,
  title: "Title A",
  author: "user_1",
};

socket.emit("createRoom", conversationData);
socket.on("onRoomJoin", (roomData) => {
console.log(`User has joined room ${roomData.room_name}.`)
});

</script>

<template>
  <div>
    <RouterView />
    <Footer />
  </div>
</template>


```