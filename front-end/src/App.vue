<script >
import router from "./router";
import PageFooter from "./components/PageFooter.vue";
import Dialogue from "./components/Dialogue.vue";
import socketIO from "socket.io-client";

const socket = socketIO.connect('http://localhost:10001');

export default {
  name: "App",
  components: {
    Dialogue,
    PageFooter
},
};
</script>

<template>
  <div>   
    <RouterView />
    <PageFooter/>
  </div>
</template>
