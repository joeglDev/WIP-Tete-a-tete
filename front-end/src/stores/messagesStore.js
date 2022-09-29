
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
      this.joined = joined;
      this.screenName = user;

    },
    sendMessage(newMessage) {

      this.addMessage(newMessage);
      this.text = "";
    },
    addMessage(newMessage) {

      this.messages = this.messages.concat(newMessage);
 
  
    },
  },
});
