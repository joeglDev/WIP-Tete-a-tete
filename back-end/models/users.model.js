const { HttpErrors } = require("../../shared/HttpErrors");
const { rejectWhenNonExistent, gQuerier } = require("./utils/model-utils.js");
const { updateUserTopics } = require("./user-topic-join.model");
const { selectUserTopics } = require("./user-topic-join.model");
const { selectTopicAndInsertIfNonExistent } = require("./topicss.model");

const db = require(`${__dirname}/../db/connection.js`);

exports.selectUserByUsername = async (username) => {
  const user = await gQuerier.selectItemWhere("users", "username", username, [
    "screen_name",
    "user_id",
    "bio",
    "img_url",
  ]);
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

/*
1) Client sends x topics from frontend ["horse-rideing", "running"]
2) Check topic exists in topics table:
	- Yes: Get topic Id;
	- No: Create topic and return id
3) Get all entries from join table where user_id is that of incoming user profile
4) Update all entries from join table with new incoming topics
*/

exports.updateUserTopics = async (user_id, topicsFromUser) => {
  const selectTopicPromises = topicsFromUser.map((topic) => {
    return selectTopicAndInsertIfNonExistent(topic);
  });
  const topicsTableEntries = await Promise.all(selectTopicPromises); // [ { returns topic_id, topic_name } ]

  const existingJoinState = await selectUserTopics(user_id); // returns join [{id, user_id, topic_id}]
  existingJoinState.forEach((join, index) => {
    if (topicsTableEntries[index] === undefined) {
      join.topic_id = null;
    } else {
      join.topic_id = topicsTableEntries[index].topic_id;
    }
  });

  const updatedTopicsJoin = await updateUserTopics(existingJoinState); //returns new join data [{id, user_id, topic_id}]

  if (updatedTopicsJoin.length === 10) {
    return topicsFromUser;
  }
};
