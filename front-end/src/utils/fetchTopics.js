import { interestsStore } from "../stores/interestsStore";
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
  console.log(interestsArray.values[0], "state pre axios");
  axios
    .post("http://localhost:9090/conversations", {
      topic_names: [interestsArray.values[0], interestsArray.values[1]],
    })
    .then((response) => {
      console.log(response);
    });
};

export default fetchTopics;
