exports.selectUserTopics = async (querier, userId) => {
  return await querier.selectItemsWhere("users_topics_join", "user_id", userId);
};

exports.makeUpdateUserTopicProm = (querier, topicId, joinId) => {
  return querier.db.query(
    `UPDATE users_topics_join  SET topic_id = $1 WHERE id = $2 RETURNING *;`,
    [topicId, joinId]
  );
};

exports.updateUserTopics = async (querier, topics) => {
  const promises = [];
  topics.forEach((topic) => {
    promises.push(
      this.makeUpdateUserTopicProm(querier, topic.topic_id, topic.id)
    );
  });
  const allPromises = await Promise.all(promises);
  const updatedTopicValues = allPromises.map(({ rows }) => {
    return rows[0];
  });
  return updatedTopicValues;
};

//could remove this key word if export all at bottom - maybe?
