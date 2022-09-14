import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const messagesStore = defineStore("messages", {
  state: () => {
    return {
      joined: false,
      screenName: "solly",
      text: "",
      messages: [],
    };
  },
  actions: {
    changeMethods(joined) {
      this.joined = joined;
    },
    sendMessage() {
      this.addMessage();
      this.text = "";
    },
    addMessage() {
      const message = {
        id: new Date().getTime(),
        text: this.text,
        user: this.currentUser,
      };
      this.messages = this.messages.concat(message);
      //   this.socketInstance.emit("message", message);
    },
  },
});
