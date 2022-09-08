const { HttpErrors } = require("../../shared/HttpErrors");
const { rejectWhenNonExistent } = require("./model-utls.js");

const db = require(`${__dirname}/../db/connection.js`);

exports.selectUserByUsername = async (username) => {
  const {
    rows: [user],
  } = await db.query(
    "SELECT screen_name, user_id, bio, img_url FROM users WHERE username = $1",
    [username]
  );

  user.topics = [];
  return user;
};

exports.updateUserProfile = async (user_id, userProfile) => {
  const { screen_name, bio, img_url } = userProfile;
  const {
    rows: [user],
  } = await db.query(
    "UPDATE users SET screen_name = $1, bio = $2, img_url = $3 WHERE user_id = $4 RETURNING *;",
    [screen_name, bio, img_url, user_id]
  );
  if (!user) {
    return Promise.reject(HttpErrors.itemNotFound);
  }
  return user;
};

exports.selectUserTopics = async (user_id) => {
  const { rows } = await db.query(
    `SELECT topic_name FROM topics 
LEFT JOIN users_topics_join ON
topics.topic_id = users_topics_join.topic_id
WHERE users_topics_join.user_id =  $1;`,
    [user_id]
  );

    //checks for existing user_id
  if (rows.length === 0) {
    return rejectWhenNonExistent("users", "user_id", user_id);
  
  }

  return rows;
};
