const { HttpErrors } = require("../../shared/HttpErrors");
const {
  rejectWhenNonExistent,
  upsertItem,
  insertItem,
  updateItem,
  itemExists,
} = require("./model-utils.js");
const {updateUserTopics} = require("./user-topic-join.model");
const {selectUserTopics} = require("./user-topic-join.model");
const { selectTopicAndInsertIfNonExistent } = require("./topicss.model");

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


/*
1) Client sends x topics from frontend ["horse-rideing", "running"]
2) Check topic exists in topics table:
	- Yes: Get topic Id;
	- No: Create topic and return id
3) Get all entries from join table where user_id is that of incoming user profile
4) Update all entries from join table with new incoming topics
*/

exports.updateUserTopics = async (user_id, new_topics) => {

  const newTopicsList = [];  // [ { returns topic_id, topic_name } ]
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
  console.log("new join data to insert", existingJoin)

  const updatedTopicsJoin = await updateUserTopics(existingJoin); //returns new join data [{id, user_id, topic_id}]
  
  if (updatedTopicsJoin.length === 10) {
    return new_topics
  }
  


  /*
  const topic = new_topics[0];
    const topicInDB = await selectTopicAndInsertIfNonExistent(topic); //returns topic_id, topic_name
    const existingJoin = await selectUserTopics(user_id); // returns join [{id, user_id, topic_id}]
    console.log("new topic table entry", topicInDB);
    console.log("existing join", existingJoin)
    //EDITING existing Join
    existingJoin.forEach((join) => {
      const newJoin = ;
    })
    //make new join -> edit join data for new topics then give to updatedTopicsResult
    // const updatedTopicsResult = await updateUserTopics(); grab new join array 
    */
  };

/*
    const insertPromises = [];
    newTopics.forEach((topic) => {
      insertPromises.push(
        db.query("INSERT INTO topics (topic_name) VALUES ($1) RETURNING *;", [
          topic,
        ])
      );
    });
    const results = await Promise.all(insertPromises);
    const upsertTopicResults = results.map((result) => {
      return result.rows[0];
    });
    return { upsertedTopics: upsertTopicResults };
 */

//console.log(result[0].rows[0]);
/*
//update topics table
const {rows} = await db.query(`UPDATE topics SET topic_name = $1`, [])
*/

/*
1) Client sends x topics from frontend ["horse-rideing", "running"]
2) Check topic exists in topics table:
	- Yes: Get topic Id;
	- No: Create topic and return id
3) Get all entries from join table where user_id is that of incoming user profile
4) Update all entries from join table with new incoming topics
*/
