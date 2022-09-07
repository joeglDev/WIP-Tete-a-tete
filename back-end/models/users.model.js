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

exports.updateUserProfile = async (username) => {
  console.log("update profile model");
};
