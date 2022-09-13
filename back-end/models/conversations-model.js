const { selectTopicByName } = require("./topicss.model");
const { gQuerier } = require("./utils/model-utils");
const { SqlQuerier } = require("./utils/SqlQuerier");

exports.insertNewUserConversation = async (user_id, new_conversation) => {
  //Transactional sql - initialsie a pool client
  const client = await gQuerier.db.connect();
  const clientQuerier = new SqlQuerier(client);
  try {
    //begin transaction
    clientQuerier.db.query("BEGIN");
    const newConversationAd = await clientQuerier.insertColumnValues(
      "conversations",
      ["title", "body"],
      [new_conversation.title, new_conversation.body]
    );
    //GET TOPIC ID THEN call newConversationJoin
    const topic = await selectTopicByName(
      clientQuerier,
      new_conversation.topics[0]
    );
    //promise.all on first two may be needed

    const newConversationJoin = await clientQuerier.insertColumnValues(
      "topic_conversations_join",
      ["user_id", "conversation_id", "topic_id"],
      [user_id, newConversationAd.conversation_id, topic.topic_id]
    );
    //close successful transaction
    clientQuerier.db.query("COMMIT");
    //need to assemble return data
    newConversationAd.topic_id = newConversationJoin.topic_id;
    newConversationAd.user_id = newConversationJoin.user_id;
    return newConversationAd;
  } catch (error) {
    clientQuerier.db.query("ROLLBACK");
    // throw new Error(error)
    throw error;
  } finally {
    //close client instance
    client.release();
  }
};

exports.selectMatchingConversations = async (topicNames) => {
  const client = await gQuerier.db.connect();
  const clientQuerier = new SqlQuerier(client);

  try {
    clientQuerier.db.query("BEGIN");
    //1 - get topic id array from topic names
    const topics = await _topicNamesToTopics(topicNames, clientQuerier);

    //matching ids in topics_conversations_join
    const conversationJoins = await _selectAllConversationJoinsForEachTopic(
      topics,
      clientQuerier
    );

    //get matching conversations
    const conversations = await _convertJoinsForEachTopicToConversations(
      conversationJoins,
      clientQuerier
    );
    clientQuerier.db.query("COMMIT");
    return conversations;
  } catch (error) {
    clientQuerier.db.query("ROLLBACK");
  } finally {
    client.release();
  }
};
async function _convertJoinsForEachTopicToConversations(joins, querier) {
  const conversationPromises = [];
  joins.forEach((joinsPerTopic) => {
    const promises = _conversationJoinsToConversationsProm(
      joinsPerTopic,
      querier
    );
    conversationPromises.push(...promises);
  });
  const conversations = await Promise.all(conversationPromises);
  return conversations.map(({ rows }) => rows[0]);
}

function _conversationJoinsToConversationsProm(joins, querier) {
  return joins.map(({ conversation_id }) => {
    return querier.db.query(
      `
          SELECT j.user_id AS author_user_id, j.conversation_id, j.topic_id, t.topic_name, c.title, c.body, u.screen_name AS author FROM topic_conversations_join j
          INNER JOIN conversations c
          ON j.conversation_id = c.conversation_id
          INNER JOIN users u
          ON j.user_id = u.user_id
          INNER JOIN topics t
          ON j.topic_id = t.topic_id
          WHERE j.conversation_id = $1;
      `,
      [conversation_id]
    );
  });
}

async function _selectAllConversationJoinsForEachTopic(topics, querier) {
  const joinPromises = topics.map(({ topic_id }) => {
    return querier.selectItemsWhere(
      "topic_conversations_join",
      "topic_id",
      topic_id
    );
  });
  const conversationJoins = await Promise.all(joinPromises);
  return conversationJoins;
}

async function _topicNamesToTopics(topicNames, querier) {
  const topicsPromises = topicNames.map((topicName) => {
    return selectTopicByName(querier, topicName);
  });

  const topics = (await Promise.all(topicsPromises)).filter((topic) => {
    return topic;
  });
  return topics;
}
