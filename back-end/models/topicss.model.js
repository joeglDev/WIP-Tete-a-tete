const { gQuerier } = require("./model-utils");

const db = require(`${__dirname}/../db/connection.js`);

exports.selectTopicAndInsertIfNonExistent = async (topic) => {
  return await gQuerier.selectItemAndInsertWhenNonExistent(
    "topics",
    "topic_name",
    topic
  );
};
