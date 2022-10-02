import { interestsStore } from "../stores/interestsStore";
import axios from "axios";
import { convoStore } from "../stores/convoStore";
import { def } from "@vue/shared";

export const fetchTopics = (id) => {
  const interests = interestsStore();
  axios
    .get(`https://tete-a-tete-back-end.herokuapp.com/users/${id}/topics`)
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
    .post("https://tete-a-tete-back-end.herokuapp.com/conversations", {
      topic_names: interests.values,
    })
    .then((response) => {
      conversations.setConversations(response.data.conversations);
    });
};
