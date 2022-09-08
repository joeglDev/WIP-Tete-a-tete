<template>
  <form class="login-submit" @submit="loginSubmit">
    <label>Username:</label>
    <input type="email" required v-model="username" />
    <label>Password:</label>
    <input type="password" required v-model="password" />
    <input class="login-submit-button" type="submit" value="Submit info" />
  </form>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, defineProps } from "vue";
import { userStore } from "../stores/user";

const fetchTopics = require("./AddInterests.vue")

const profile = userStore();

// const user = reactive({username: '', password: ''})

const props = defineProps({ username: String, password: String });

const loginSubmit = (event) => {
  event.preventDefault();
  axios
    .post(`http://localhost:9090/login`, {
      username: props.username,
      password: props.password,
    })
    .then((response) => {
      if (response.status === 200) {
        profile.setProfile(response.data.user);
        console.log(profile.user_id)
        console.log(fetchTopics(1))
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        alert("invalid user!");
      }
    });
};
</script>
