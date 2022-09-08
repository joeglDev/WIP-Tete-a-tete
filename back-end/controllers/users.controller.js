const {
  updateUserProfile,
  selectUserTopics,
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
