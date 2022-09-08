const { selectItemsWhere } = require("./model-utils");
const db = require(`${__dirname}/../db/connection.js`);

exports.selectUserTopics = async (userId) => {
  return await selectItemsWhere("users_topics_join", "user_id", userId);
};

exports.makeUpdateUserTopicProm = (joinId, topicId) => {
  console.log("join model");
  return db.query(
    `UPDATE users_topics_join  SET topic_id = $1 WHERE id = $2 RETURNING *;`,
    [topicId, joinId]
  );
};
