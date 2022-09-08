const { selectItemsWhere } = require("./model-utils");

exports.selectUserTopics = async (userId) => {
  console.log("select user topics");
  return await selectItemsWhere("users_topics_join", "user_id", userId);
};

exports.updateUserTopic = async (userId, topic) => {
  console.log("join model");
};
