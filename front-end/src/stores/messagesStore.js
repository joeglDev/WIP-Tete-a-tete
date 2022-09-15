import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import { socketStore } from "./socketStore";




// const socketParent = socketStore()
// const socket = socketParent.values.socket

export const messagesStore = defineStore("messages", {

  state: () => {
    return {
      joined: false,
      screenName: "",
      text: "",
      messages: [],
      //currMessage: ""
    };
  },
  actions: {
    changeMethods(joined, user) {
      console.log(user, "in state method")
      this.joined = joined;
      this.screenName = user;

    },
    sendMessage() {
      this.addMessage();
      this.text = "";
    },
    addMessage() {
      const message = {
        id: new Date().getTime(),
        text: this.text,
        user: this.screenName,
      };
      console.log(this.messages, "state array")
      this.messages = this.messages.concat(message);
      //this.currMessage = message;
      socket.emit("messageSubmit", message)
    },
  },
});
