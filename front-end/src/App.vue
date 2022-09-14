<script >
import router from "./router";
import Footer from "./components/Footer.vue";
import Dialogue from "./components/Dialogue.vue";
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
