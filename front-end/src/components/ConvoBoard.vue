<template>
  <!-- convo container class applies so that list appears under form - needs sorting -->
  <div class="convo-creater convo-container">
    <div><img class="chat-icon" src="../assets/chat-icon.svg" /></div>
    <div>
      <img class="light-logo" src="../assets/tete-a-tete-logo-light.svg" />
    </div>
    <form class="login-submit" @submit="onConvoSubmit">
      <p class="question">What do you want to talk about?</p>
      <div class="title">
        <label>Title:</label>
        <input type="text" required v-model="title" />
      </div>
      <div class="description">
        <label>Description:</label>
        <input type="text" required v-model="description" />
      </div>
      <div class="topic">
        <label>Topic:</label>
        <select name="topics" v-model="selected">
          <option v-for="topic in interests.values" :key="topic">
            {{ topic }}
          </option>
        </select>
      </div>
      <input class="submit" type="submit" value="Post!" />
    </form>
    <ul>
      <li v-for="convo in conversations.values" :key="convo.conversation_id" v-on:click="joinChat">
        <p>Title: {{ convo.title }}</p>
        <p>Description: {{ convo.body }}</p>
        <p>Topic: {{ convo.topic_name }}</p>
      </li >
    </ul>
  </div>
</template>

<script setup>
import axios from "axios";
import { userStore } from "../stores/user";
import { convoStore } from "../stores/convoStore";
import { interestsStore } from "../stores/interestsStore";
import {getConvos} from "../utils/fetchUserData"
import router from "../router"


const profile = userStore();
const conversations = convoStore();
const interests = interestsStore();




const onConvoSubmit = (event) => {
  event.preventDefault();

  const newConversation = {
    new_conversation: {
      title: event.target[0].value,
      body: event.target[1].value,
      topics: [event.target[2].value],
    },
  };

  axios
    .post(
      `http://localhost:9090/users/${profile.user_id}/conversation`,
      newConversation
    )
    .then((response) => {    
      console.log(response)
     getConvos(interests) 
     // newly added conversation ad doesn't come back, unavailable on insomnia too
    })
    .catch((error) => {
      console.log(error);
    });
};

const joinChat = () => {
  router.push('/chat')
}
</script>
