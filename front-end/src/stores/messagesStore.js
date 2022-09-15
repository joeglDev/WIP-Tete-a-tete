import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const messagesStore = defineStore("messages", {
  state: () => {
    return {
      joined: false,
      screenName: "",
      text: "",
      messages: [],
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
      console.log(message)
      this.messages = this.messages.concat(message);
      //   this.socketInstance.emit("message", message);
    },
  },
});
