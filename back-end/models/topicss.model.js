exports.selectTopicAndInsertIfNonExistent = async (querier, topic) => {
  return await querier.selectItemAndInsertWhenNonExistent(
    "topics",
    "topic_name",
    topic
  );
};
