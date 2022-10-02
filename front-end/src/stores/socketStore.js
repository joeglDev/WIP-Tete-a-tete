import { ref, computed } from "vue";
import { defineStore } from "pinia";
import socketIO from "socket.io-client";

export const socketStore = defineStore("socket", {
  state: () => {
    return {
      values: { socket: socketIO.connect("https://tete-a-tete-back-end.herokuapp.com") },
    };
  },
});
