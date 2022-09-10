const { SqlQuerier } = require("./sql/SqlQuerier");
const { SqlTableDefs } = require("./sql/SqlTableDefs");

class SqlUserTopicsJoinTable extends SqlTableDefs {
  #_sqlQuerier;

  constructor(sqlQuerier) {
    super("users_topics_join", {
      joinId: "id",
      userId: "user_id",
      topic_id: "topic_id",
    });
  }
}

module.exports.SqlUserTopicJoinTable = SqlUserTopicJoinTable;
