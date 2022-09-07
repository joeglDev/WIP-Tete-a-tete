const format = require("pg-format");
const db = require("../connection");


const seed = async ({ usersData, topicsData }) => {

  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);


  const usersTablePromise = db.query(`
  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    screen_name VARCHAR(20) NOT NULL,
    bio VARCHAR(1000),
    img_url VARCHAR(255)
  );`);

  const topicsTablePromise = db.query(`
  CREATE TABLE topics (
    topic_id SERIAL PRIMARY KEY,
    topic_name VARCHAR(25) NOT NULL
  );`);

  await Promise.all([usersTablePromise, topicsTablePromise]);

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

    const insertTopicsQueryStr = format( 
      'INSERT INTO topics (topic_name) VALUES %L RETURNING *;',
      topicsData.map(({ topic_name }) => [
        topic_name
      ])
    );  
    
    const topicsPromise = db
      .query(insertTopicsQueryStr)
      .then((result) => result.rows);

  await Promise.all([usersPromise, topicsPromise]);
  
};

module.exports = seed;
