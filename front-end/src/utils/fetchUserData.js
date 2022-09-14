import { interestsStore } from "../stores/interestsStore";
import axios from "axios";
import { convoStore } from "../stores/convoStore";
import { def } from "@vue/shared";

export const fetchTopics = (id) => {
  const interests = interestsStore();
  axios
    .get(`http://localhost:9090/users/${id}/topics`)
    .then((response) => {
      interestsOverwriter(response.data.user_topics);
    })
    .then((response) => {
      getConvos(interests);
    })
    .catch((err) => {
      console.log(err);
    });

  const interestsOverwriter = (fetchedTopics) => {
    interests.setInterestsArray(fetchedTopics);
    return interests;
  };
};

export const getConvos = (interests) => {
  const conversations = convoStore();
  axios
    .post("http://localhost:9090/conversations", {
      topic_names: interests.values,
    })
    .then((response) => {
      console.log(response)
      const flatConversationsArray = response.data.conversations.flat();
      conversations.setConversations(flatConversationsArray);
    });
};
