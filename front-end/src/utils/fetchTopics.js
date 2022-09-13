import { interestsStore } from "../stores/interestsStore";
import { convoStore } from "../stores/convoStore";
import axios from "axios";

const fetchTopics = (id) => {
  const interestsArray = interestsStore();

  axios
    .get(`http://localhost:9090/users/${id}/topics`)
    .then((response) => interestsOverwriter(response.data.user_topics))
    .then((response) => {
      getConvos(interestsArray);
    })
    .catch((err) => {
      console.log(err);
    });

  const interestsOverwriter = (fetchedTopics) => {
    interestsArray.setInterestsArray(fetchedTopics);
    return interestsArray;
  };
};

const getConvos = (interestsArray) => {
  const conversations = convoStore();
  axios
    .post("http://localhost:9090/conversations", {
      topic_names: ["Asian Baking"],
      //this should be interestsArray.values after fix (to get all conversations)
    })
    .then((response) => {
      console.log(conversations.values, "convo state pre update");
      console.log(
        [response.data.conversations],
        "what we are updating state with"
      );
      conversations.setConversations(response.data.conversations);
      console.log(conversations.values, "after being set");
    })
    .catch((err) => console.log(err));
};

export default fetchTopics;
