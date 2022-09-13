<template>
<div>
  <form class="login-submit" @submit="loginSubmit">
    <label>Username:</label>
    <input type="email" required v-model="username" />
    <label>Password:</label>
    <input type="password" required v-model="password" />
    <input class="login-submit-button" type="submit" value="Submit info" />
  </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, defineProps } from "vue";
import router from "../router";
import { userStore } from "../stores/user";
import fetchTopics from "../utils/fetchUserData";

const profile = userStore();

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
        fetchTopics(profile.user_id);
        router.push('/home')
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        alert("invalid user!");
      }
    });
};
</script>
