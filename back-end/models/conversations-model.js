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
      const topic = await selectTopicByName(clientQuerier, new_conversation.topics[0]);
//promise.all on first two may be needed

    const newConversationJoin = await clientQuerier.insertColumnValues(
      "topic_conversations_join",
      ["user_id", "conversation_id", "topic_id"],
      [user_id, newConversationAd.conversation_id, topic.topic_id]
    );
    //close successful transaction
    clientQuerier.db.query("COMMIT");
    console.log("newConversationAd", newConversationAd)
    console.log("topic", topic)
    console.log("newConversationJoin",newConversationJoin)
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


  //return 


};
