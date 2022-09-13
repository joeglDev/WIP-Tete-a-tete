import { interestsStore } from "../stores/interestsStore";
import axios from "axios";
import { convoStore } from "../stores/convoStore";

const fetchTopics = (id) => {
  const interestsArray = interestsStore();
  axios
    .get(`http://localhost:9090/users/${id}/topics`)
    .then((response) => {
      interestsOverwriter(response.data.user_topics);
    })
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
      topic_names: ["Asian Baking"], // should be {topic_names: interestsArray.values}
    })
    .then((response) => {
      const flatConversationsArray = response.data.conversations.flat();
      //hardcodind additional conversation add - remove
      flatConversationsArray.push({
        title: "Test Title",
        body: "Testing hardcoded second topic",
        conversation_id: 999,
        topic_name: "Asian Baking",
      });
      console.log(flatConversationsArray, "flat Convos in getConvos");
      conversations.setConversations(flatConversationsArray);
    });
};

export default fetchTopics;
