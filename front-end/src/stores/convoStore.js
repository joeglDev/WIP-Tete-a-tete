import { ref, computed } from "vue";
import { defineStore } from "pinia";


export const convoStore = defineStore("conversations", {
    
    state: () => {
        return {
            values: []
        };
    },

    actions : {
        setConversations(conversations) {
            this.values = conversations    
        }
    }
})


