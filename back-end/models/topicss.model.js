const { getItemAndInsertWhenNonExistent } = require("./model-utils");
const db = require(`${__dirname}/../db/connection.js`);
const { SqlQuerier } = require("./utils/SqlQuerier");

const gQuerier = new SqlQuerier(db);

exports.selectTopicAndInsertIfNonExistent = async (topic) => {
  return await gQuerier.selectItemAndInsertWhenNonExistent(
    "topics",
    "topic_name",
    topic
  );
};
