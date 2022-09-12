const {
  insertNewUserConversation,
  selectMatchingConversations,
} = require("../models/conversations-model");

exports.postNewConversation = async (req, res) => {
  const { user_id } = req.params;
  const { new_conversation } = req.body;

  try {
    //model response is missing topics key : [] value
    const newConversation = await insertNewUserConversation(
      user_id,
      new_conversation
    );
    newConversation["topics"] = new_conversation.topics;
    const responseBody = { new_conversation: newConversation };
    res.status(201).send(responseBody);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getMatchingConversations = async (req, res) => {
  const { topic_names } = req.body;
  try {
    const matchingConversations = await selectMatchingConversations(
      topic_names
    );
    res.status(200).send({ conversations: matchingConversations });
  } catch (error) {
    throw new Error(error);
  }
};
