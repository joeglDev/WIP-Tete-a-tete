const { HttpErrors } = require("../../shared/HttpErrors");
const { rejectWhenNonExistent } = require("./model-utils.js");
const { updateUserTopics } = require("./user-topic-join.model");
const { selectUserTopics } = require("./user-topic-join.model");
const { selectTopicAndInsertIfNonExistent } = require("./topicss.model");
const { SqlUsersTable } = require("./core/UsersSqlTable");
const { SqlQuerier } = require("./core/sql/SqlQuerier");

const db = require(`${__dirname}/../db/connection.js`);

const gUsersTable = new SqlUsersTable(new SqlQuerier(db));

exports.selectUserByUsername = async (username) => {
  const user = await gUsersTable.selectUserByUsername(username);
  user.topics = [];
  return user;
};

exports.updateUserProfile = async (user_id, userProfile) => {
  const user = await gUsersTable.updateUserProfile(user_id, userProfile);

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

/*
1) Client sends x topics from frontend ["horse-rideing", "running"]
2) Check topic exists in topics table:
	- Yes: Get topic Id;
	- No: Create topic and return id
3) Get all entries from join table where user_id is that of incoming user profile
4) Update all entries from join table with new incoming topics
*/

exports.updateUserTopics = async (user_id, new_topics) => {
  const newTopicsList = []; // [ { returns topic_id, topic_name } ]
  const newTopicsPromises = new_topics.map((topic) => {
    return selectTopicAndInsertIfNonExistent(topic);
  });
  const topicsInsert = await Promise.all(newTopicsPromises); // [ { returns topic_id, topic_name } ]

  const existingJoin = await selectUserTopics(user_id); // returns join [{id, user_id, topic_id}]
  existingJoin.forEach((join, index) => {
    if (topicsInsert[index] === undefined) {
      join.topic_id = null;
    } else {
      join.topic_id = topicsInsert[index].topic_id;
    }
  });

  const updatedTopicsJoin = await updateUserTopics(existingJoin); //returns new join data [{id, user_id, topic_id}]

  if (updatedTopicsJoin.length === 10) {
    return new_topics;
  }
};
