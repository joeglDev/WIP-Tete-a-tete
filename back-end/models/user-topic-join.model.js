const { gQuerier } = require("./model-utils");
const db = require(`${__dirname}/../db/connection.js`);

exports.selectUserTopics = async (userId) => {
  return await gQuerier.selectItemsWhere(
    "users_topics_join",
    "user_id",
    userId
  );
};

exports.makeUpdateUserTopicProm = (topicId, joinId) => {
  return db.query(
    `UPDATE users_topics_join  SET topic_id = $1 WHERE id = $2 RETURNING *;`,
    [topicId, joinId]
  );
};

exports.updateUserTopics = async (topics) => {
  const promises = [];
  topics.forEach((topic) => {
    promises.push(this.makeUpdateUserTopicProm(topic.topic_id, topic.id));
  });
  const allPromises = await Promise.all(promises);
  const updatedTopicValues = allPromises.map(({ rows }) => {
    return rows[0];
  });
  return updatedTopicValues;
};

//could remove this key word if export all at bottom - maybe?
