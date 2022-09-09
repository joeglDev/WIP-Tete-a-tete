import { interestsStore } from "../stores/interestsStore";
import axios from "axios";
const fetchTopics = (id) => {
  const interestsArray = interestsStore();
  axios
    .get(`http://localhost:9090/users/${id}/topics`)
    .then((response) => interestsOverwriter(response.data.user_topics))
    .catch((err) => {
      console.log(err);
    });

  const interestsOverwriter = (fetchedTopics) => {
    interestsArray.setInterestsArray(fetchedTopics);
  };
};

export default fetchTopics;
