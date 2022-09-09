const {
  updateUserProfile,
  selectUserTopics,
  updateUserTopics,
} = require("../models/users.model");

exports.patchUserProfile = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const updatedUser = await updateUserProfile(user_id, req.body);
    res.status(200).send({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

exports.getUserTopics = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const rawUserTopics = await selectUserTopics(user_id);

    const userTopics = rawUserTopics.map((topic) => {
      return topic.topic_name;
    });
    res.status(200).send({ user_topics: userTopics });
  } catch (error) {
    next(error);
  }
};

exports.patchUserTopics = async (req, res) => {
  const { user_id } = req.params;
  const { new_topics } = req.body;

  try {
    const updatedTopics = await updateUserTopics(user_id, new_topics);
    const returnBody = { updated_topics: updatedTopics };
    res.status(200).send(returnBody);
  } catch (error) {
    console.log("In controller error block", error);
  }
};
