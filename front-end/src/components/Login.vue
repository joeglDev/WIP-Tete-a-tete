<script setup>
    import LoginSubmit from "../components/LoginSubmit.vue";
import TrendingChatsLink from "./TrendingChatsLink.vue";
import EmailSubscription from "./EmailSubscription.vue";
import PageFooter from "./PageFooter.vue";
</script>

<template>
    <div class="login-container">
      <div class="item one-login"><img class="chat-icon" src="../assets/chat-icon.svg"></div>
      <div class="item two-login"><img class="light-logo" src="../assets/tete-a-tete-logo-light.svg"></div>
      <div class="item three-login"><h1>Please login with your details below</h1></div>
      <div class="item four-login"><LoginSubmit/></div>
    </div>
    <TrendingChatsLink/>
    <EmailSubscription/>
</template>

