<script setup>
import { RouterLink, RouterView } from "vue-router";
import Bio from "./components/Bio.vue"
import Signup from "./components/Signup.vue";
import Interests from "./components/Interests.vue";
import Login from "./components/Login.vue";
import Profile from "./components/Profile.vue";
</script>

<template>
  <header>
    <Profile/>
    <Bio/>
    <Signup/>
  <Interests/>
  <Login/>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <!-- <RouterView /> -->
</template>


