<script >
import router from "./router";
import Footer from "./components/Footer.vue";
import Dialogue from "./components/Dialogue.vue";
import socketIO from "socket.io-client";

const socket = socketIO.connect('http://localhost:10001');

export default {
  name: "App",
  components: {
   Dialogue
  },
};
</script>

<template>
  <div>   
    <RouterView />
    <Footer />
  </div>
</template>
