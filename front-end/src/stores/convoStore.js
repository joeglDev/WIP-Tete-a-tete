import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const convoStore = defineStore("conversation", {
    
    state: () => {
        return {
            values: []
        };
    },

    actions : {
        setConversations(conversation) {
            this.values.push(conversation)
        },
        removeConversation(index) {
            
        }
    }
})


