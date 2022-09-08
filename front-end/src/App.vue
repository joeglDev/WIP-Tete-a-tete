<script setup>
import Bio from "./components/Bio.vue"
import Signup from "./components/Signup.vue";
import Interests from "./components/Interests.vue";
import Login from "./components/Login.vue";
import UserBox from "./components/UserBox.vue";
import AddInterests from "./components/AddInterests.vue"


</script>

<template>
  <header>
    <UserBox/>
    <Bio/>
    <Signup/>
    <Interests/>
    <AddInterests/>
    <Login/>
  </header>

  <!-- <RouterView /> -->
</template>


