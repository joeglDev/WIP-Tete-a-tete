

exports.selectTopicAndInsertIfNonExistent = async (querier, topic) => {
  return await querier.selectItemAndInsertWhenNonExistent(
    "topics",
    "topic_name",
    topic
  );
};

exports.selectTopicByName = async (querier, topic_name) => {
  return await querier.selectItemWhere("topics", "topic_name", topic_name);
};
