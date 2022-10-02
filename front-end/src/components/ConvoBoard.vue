<template>
  <!-- convo container class applies so that list appears under form - needs sorting -->
  <div class="convo-creater">
    <div class="please-work">
      <form class="anything-else" @submit="onConvoSubmit">
        <div class="question"><h1>What do you want to talk about?</h1></div>
        <div class="title">
          <label>Title:</label>
          <input
            class="placeholder-change"
            type="text"
            placeholder="Please enter what you would like to talk about here"
            required
            v-model="title"
          />
        </div>
        <div class="description">
          <label>Description:</label>
          <input
            class="placeholder-desc"
            type="text"
            placeholder="Briefly describe what you would like to talk about"
            required
            v-model="description"
          />
        </div>
        <div class="topic">
          <label>Topic:</label>
          <select name="topics" v-model="selected">
            <option v-for="topic in interests.values" :key="topic">
              {{ topic }}
            </option>
          </select>
        </div>
        <div>
          <input class="submit" type="submit" value="Post!" />
        </div>
      </form>
      <ul>
        <li
          v-for="convo in conversations.values"
          :key="convo.conversation_id"
          v-on:click="joinChat(convo)"
        >
          <p>Title: {{ convo.title }}</p>
          <p>Description: {{ convo.body }}</p>
          <p>Topic: {{ convo.topic_name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { userStore } from "../stores/user";
import { convoStore } from "../stores/convoStore";
import { interestsStore } from "../stores/interestsStore";
import { getConvos } from "../utils/fetchUserData";
import router from "../router";
import {useRoute} from 'vue-router'

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
      `https://tete-a-tete-back-end.herokuapp.com/${profile.user_id}/conversation`,
      newConversation
    )
    .then((response) => {
      console.log(response);
      getConvos(interests);
    })
    .catch((error) => {
      console.log(error);
    });
};

const joinChat = (convo) => {

  router.push({
    name: "dialogue",
    query: convo
  });
};
</script>
