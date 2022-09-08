<script setup>
import { userStore } from "../stores/user";
const profile = userStore();
console.log(profile.img_url);
</script>

<template>
  <div class="user-box">
    <div class="screen-name-text">
      <h4>{{ profile.screen_name }}</h4>
    </div>
    <div class="user-image"><img src="../assets/placeholder-image.svg" /></div>
  </div>
</template>
