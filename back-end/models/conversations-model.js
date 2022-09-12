const { gQuerier } = require("./utils/model-utils");

const db = require(`${__dirname}/../db/connection.js`);

exports.insertNewUserConversation = async (user_id, new_conversation) => {
  return await gQuerier.insertColumnValues(
    "conversations",
    ["title", "body"],
    [new_conversation.title, new_conversation.body]
  );
};
