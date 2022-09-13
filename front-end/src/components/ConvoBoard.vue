<template>
<div class="convo-creater">
      <div><img class="chat-icon" src="../assets/chat-icon.svg"></div>
      <div><img class="light-logo" src="../assets/tete-a-tete-logo-light.svg"></div>
    <form class="login-submit" @submit="onConvoSubmit">
    <p class="question">What do you want to talk about?</p>
    <div class="title">
      <label>Title:</label>
      <input type="text" required v-model="title"/>
    </div>
    <div class="description">
      <label>Description:</label>
      <input type="text" required v-model="description"/>
      </div>
    <div class="topic">
      <label>Topic:</label>
      <select name="topics" v-model="selected" >
        <option v-for="topic in interests.values" :key="topic">{{topic}}</option>
      </select>
     
    </div>
    <input class="submit" type="submit" value="Post!" />
  </form>    
    <ul>
    <conversation-ad
      v-for="convo in conversations.values"
      :key="convo.id"
      :title="convo.title"
      @remove="conversations.values.splice(index, 1)"
    ></conversation-ad>
  </ul>
  <p>{{conversations.values[0]}}</p>
  </div>
</template>

<script setup> 
import {ref, onMounted} from "vue"
import axios from "axios";
import { userStore } from "../stores/user";
import {convoStore} from "../stores/convoStore"
import ConversationAd from "../components/ConversationAd.vue"
import {interestsStore} from "../stores/interestsStore"
import { helperNameMap } from "@vue/compiler-core";

const profile = userStore();
const conversations = convoStore()
const interests = interestsStore()


const onConvoSubmit = (event) => {
  event.preventDefault() 

   const newConversation = {
      new_conversation: {
        title: event.target[0].value,
        body: event.target[1].value,
        topics: [event.target[2].value],
      }
    };

    axios
    .post(`http://localhost:9090/users/${profile.user_id}/conversation`, newConversation)
    .then((response) => {
      conversations.setConversations(response.data.new_conversation)
   
    })
    .catch((error) => {
     console.log(error)
    });


}



</script>




type smth in -- choose topic from state
submit
then generate box

