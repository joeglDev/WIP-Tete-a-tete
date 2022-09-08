import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return {
      bio: "",
      img_url: "../assets/placeholder-image.svg",
      screen_name: "Log in",
      topics: [],
      user_id: 0,
    };
  },
  actions: {
    setProfile(userObj) {
      this.bio = userObj.bio;
      this.img_url = userObj.img_url;
      this.screen_name = userObj.screen_name;
      this.topics = userObj.topics;
      this.user_id = userObj.user_id;
    },
  },
});
