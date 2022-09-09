const db = require(`${__dirname}/../db/connection.js`);

exports.insertNewUserConversation = async (user_id, new_conversation) => {
  const {rows} = await db.query(
    "INSERT INTO conversations (title, body) VALUES ($1, $2) RETURNING *;",
    [new_conversation.title, new_conversation.body]
  );
  return rows[0]
};
