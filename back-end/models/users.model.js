const db = require(`${__dirname}/../db/connection.js`);

exports.selectUserByUsername = async (username) => {
  //query(
  return await db.query("SELECT * FROM users WHERE username = $1", [username])
  

};
