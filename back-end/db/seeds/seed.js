const format = require("pg-format");
const db = require("../connection");

const seed = async ({ usersData }) => {

  await db.query(`DROP TABLE IF EXISTS users;`);


  const usersTablePromise = db.query(`
  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    screen_name VARCHAR(20) NOT NULL,
    bio VARCHAR(1000),
    img_url VARCHAR(255)
  );`);

  await Promise.all([usersTablePromise]);

  const insertUsersQueryStr = format( 
    'INSERT INTO users ( username, screen_name, bio, img_url) VALUES %L RETURNING *;',
    usersData.map(({ username, screen_name, bio, img_url }) => [
      username,
      screen_name,
      bio,
      img_url
    ])
  );

  
  const usersPromise = db
    .query(insertUsersQueryStr)
    .then((result) => result.rows);

  await Promise.all([usersPromise]);
  
};

module.exports = seed;
