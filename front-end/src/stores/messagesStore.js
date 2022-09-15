import { ref, computed } from "vue";
import { defineStore } from "pinia";


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
    addMessage(newMessage) {
      const message = {
        id: new Date().getTime(),
        text: this.text,
        user: this.screenName,
      };
      console.log(newMessage)
      console.log(this.messages, "state array")
      this.messages = this.messages.concat(newMessage);
      //this.currMessage = message;
      //socket.emit("messageSubmit", message)
    },
  },
});
