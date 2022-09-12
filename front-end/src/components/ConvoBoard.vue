

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
      <select name="topics" v-model="selected">
        <option >Asian Baking</option>
        <option >Dog Walking</option>
        <option >Coding</option>
      </select>
     
    </div>
    <input class="submit" type="submit" value="Post!" />
  </form>
    
  <div>
 <!-- chatboard -->
  </div>
  </div>
</template>

<script setup> 
import axios from "axios";

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
    .post(`http://localhost:9090/users/1/conversation`, newConversation)
    .then((response) => {
   
        console.log(response)
    
    })
    .catch((error) => {
     console.log(error)
    });


}

</script>




type smth in -- choose topic from state
submit
then generate box

