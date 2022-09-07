const format = require("pg-format");
const db = require("../connection");

const seed = async ({ usersData, topicsData, topics_users_joinData }) => {
  await db.query(`DROP TABLE IF EXISTS users_topics_join;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);

// sometimes tables don't execute in correct order

  //creates tables

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

  const users_topics_joinTablePromise = db.query(`
  CREATE TABLE users_topics_join (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    topic_id INT REFERENCES topics(topic_id) NOT NULL
  );`);

  await Promise.all([usersTablePromise, topicsTablePromise])
    .then(() => {
      return users_topics_joinTablePromise;
    })
    .then(); 

  // await users_topics_joinTablePromise;

  // inserts data

  const insertUsersQueryStr = format(
    "INSERT INTO users ( username, screen_name, bio, img_url) VALUES %L RETURNING *;",
    usersData.map(({ username, screen_name, bio, img_url }) => [
      username,
      screen_name,
      bio,
      img_url,
    ])
  );

  const usersPromise = db
    .query(insertUsersQueryStr)
    .then((result) => result.rows);

  const insertTopicsQueryStr = format(
    "INSERT INTO topics (topic_name) VALUES %L RETURNING *;",
    topicsData.map(({ topic_name }) => [topic_name])
  );

  const topicsPromise = db
    .query(insertTopicsQueryStr)
    .then((result) => result.rows);

  const insertUsers_Topics_JoinQueryStr = format(
    "INSERT INTO users_topics_join (user_id, topic_id) VALUES %L RETURNING *;",
    topics_users_joinData.map(({ user_id, topic_id }) => [user_id, topic_id])
  );

  const users_Topics_JoinPromise = db
    .query(insertUsers_Topics_JoinQueryStr)
    .then((result) => result.rows);

  await Promise.all([usersPromise, topicsPromise])
    .then(() => {
      return users_Topics_JoinPromise;
    })
    .then();
  // await users_Topics_JoinPromise;
};

module.exports = seed;
