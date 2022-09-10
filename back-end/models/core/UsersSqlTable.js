const { SqlTableDefs } = require("./sql/SqlTableDefs");
const { SqlQuerier } = require("./sql/SqlQuerier");

class SqlUsersTable extends SqlTableDefs {
  #_sqlQuerier;

  constructor(sqlQuerier) {
    super("users", {
      userId: "user_id",
      username: "username",
      screenName: "screen_name",
      bio: "bio",
      imageUrl: "img_url",
    });
    this.#_sqlQuerier = sqlQuerier;
  }

  async selectUserByUsername(username) {
    console.log("In userrs table username method");
    return await this.#_sqlQuerier.selectItemWhere(
      this.tableName,
      this.fields.username,
      username,
      [
        this.fields.userId,
        this.fields.screenName,
        this.fields.bio,
        this.fields.imageUrl,
      ]
    );
  }
}

module.exports.SqlUsersTable = SqlUsersTable;
