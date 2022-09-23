

<template>
  <div>
    <p></p>
    <div v-if="!messages.joined" class="parent-container">
      <div class="name-container">
        <p class="user-name">{{profile.screen_name}}</p>
        <button class="join-button" v-on:click="join">Join</button>
      </div>
    </div>
    <div v-if="messages.joined">
      <div class="list-container">
        <div v-for="message in messages.messages" :key="message.id">
          <b>
            {{ message.user }}
          </b>
          : {{ message.text }}
        </div>
      </div>
      <div class="text-input-container">
        <textarea v-model="messages.text" class="text-message" id="text"
          v-on:keyup.enter="messages.sendMessage"></textarea>
        <button v-on:click="submitMessage">Send Message</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { messagesStore } from "../stores/messagesStore"
import { onMounted } from "vue"
import { userStore } from "../stores/user"
import socketIO from "socket.io-client";
import {useRoute} from "vue-router";
    const route = useRoute();
  

  



const profile = userStore();

const messages = messagesStore();



  const socket = socketIO.connect('http://localhost:10001');
onMounted(() => {
  console.log(profile.screen_name, "mounted!")
  socket.on("onRoomJoin", (joinRoomData) => {
    console.log(`${joinRoomData.joiner_screen_name} has joined room ${joinRoomData.room_name}.`)
  });

  socket.on("messageSubmitConfirmation", (newMessage) => {
    console.log(`Received new message: ${newMessage}`);
    console.log(newMessage, "Received message in Dialogue")
    messages.addMessage(newMessage)

  })
});

const join = () => {




  const joinRoomData = {
    conversation_id: route.query.conversation_id,
    topic_id: route.query.topic_id,
    joiner_screen_name: profile.screen_name,
  };
console.log(joinRoomData)


  socket.emit("joinRoom", joinRoomData)

  messages.changeMethods(true, profile.screen_name);
}

const submitMessage = () => {
  const newMessage = {
    id: new Date().getTime(),
    text: document.getElementById("text").value,
    user: profile.screen_name,
  }
 console.log(newMessage, "Submitted message")
  socket.emit("messageSubmit", newMessage)
messages.sendMessage(newMessage)
};



// export default {
//   data() {
//     return {
//       joined: false,
//       currentUser: "",
//       text: "",
//       messages: [],
//     };
//   },
//   methods: {
//     join() {
//       this.joined = true;
//       this.socketInstance = io("http://localhost:3000");

//       this.socketInstance.on(
//         "message:received", (data) => {
//           this.messages = this.messages.concat(data);
//         }
//       )
//     },
//     sendMessage() {
//       this.addMessage();

//       this.text = "";
//     },
//     addMessage() {
//       const message = {
//         id: new Date().getTime(),
//         text: this.text,
//         user: this.currentUser,
//       };

//       this.messages = this.messages.concat(message);
//       this.socketInstance.emit('message', message);
//     },
//   },
//   name: "Dialogue",
// };
</script>

<style scoped>
.parent-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  padding-top: 150px;
}

.name-container {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.user-name {
  height: 30px;
  font-size: 20px;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
}

.join-button {
  height: 30px;
  font-size: 20px;
}

.text-input-container {
  height: 100vh;
}

.text-message {
  width: 100%;
  position: absolute;
  bottom: 0px;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
}
</style>