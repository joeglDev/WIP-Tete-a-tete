<script setup>
import Bio from "./components/Bio.vue";
import Signup from "./components/Signup.vue";
import Interests from "./components/Interests.vue";
import AddInterests from "./components/AddInterests.vue";
import router from "./router";
import Login from "./components/Login.vue";
import UserBox from "./components/UserBox.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <header>
    <!-- <UserBox /> -->
    <!-- <Bio /> -->
    <!-- <Signup /> -->
    <!-- <div><router-link to="/login">LOGIN</router-link></div> -->
    <RouterView />
    <!-- <UserBox />
    <Interests />
    <AddInterests />
    <Login /> -->
    <!-- <Footer /> -->
  </header>
</template>
