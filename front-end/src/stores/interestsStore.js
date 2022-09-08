import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const interestsStore = defineStore("interests", {
  state: () => {
    return {
      values: [null, null, null, null, null, null, null, null, null, null],
    };
  },
  actions: {
    setInterestsArray(userInterests) {
      this.values = userInterests.values;
    },
  },
});
