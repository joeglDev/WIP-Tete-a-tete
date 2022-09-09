const format = require("pg-format");
const db = require("../connection");
const seed = async ({
  usersData,
  topicsData,
  conversationsData,
  topics_users_joinData,
}) => {
  //drop existing tables
  await db.query(`DROP TABLE IF EXISTS users_topics_join;`);
  await db.query(`DROP TABLE IF EXISTS conversations;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);

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
    topic_name VARCHAR(25) NOT NULL UNIQUE
  );`);

  const conversationsTablePromise = db.query(`
  CREATE TABLE conversations (
    conversation_id SERIAL PRIMARY KEY,
    title VARCHAR(25) NOT NULL,
    body VARCHAR(1000)
  );
  `);

  await Promise.all([
    usersTablePromise,
    topicsTablePromise,
    conversationsTablePromise,
  ]);

  //anon await function for many to many join table
  await db.query(`
  CREATE TABLE users_topics_join (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    topic_id INT REFERENCES topics(topic_id) 
  );`);

  await db.query(`
  CREATE TABLE topic_conversations_join (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    conversation_id INT REFERENCES conversations(conversation_id) NOT NULL,
    topic_id INT REFERENCES topics(topic_id) NOT NULL
  );
  `);

  //insert data into tables

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

  const insertConversationsQueryStr = format(
    "INSERT INTO conversations (title, body) VALUES %L RETURNING *;",
    conversationsData.map(({ title, body }) => [title, body])
  );

  const conversationsPromise = db
    .query(insertConversationsQueryStr)
    .then((result) => result.rows);

  await Promise.all([usersPromise, topicsPromise, conversationsPromise]);

  const insertUsers_Topics_JoinQueryStr = format(
    "INSERT INTO users_topics_join (user_id, topic_id) VALUES %L RETURNING *;",
    topics_users_joinData.map(({ user_id, topic_id }) => [user_id, topic_id])
  );

  await db.query(insertUsers_Topics_JoinQueryStr).then((result) => result.rows);
};
module.exports = seed;
