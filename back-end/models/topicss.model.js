const { getItemAndInsertWhenNonExistent } = require("./model-utils");

exports.selectTopicAndInsertIfNonExistent = async (topic) => {
  return await getItemAndInsertWhenNonExistent("topics", "topic_name", topic);
};
