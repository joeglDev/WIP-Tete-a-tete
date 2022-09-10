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

  async updateUserProfile(userId, newProfile) {
    const { screen_name, bio, img_url } = newProfile;
    const queryStr = `UPDATE ${this.tableName} SET ${this.fields.screenName} = $1, ${this.fields.bio} = $2, ${this.fields.imageUrl} = $3 WHERE ${this.fields.userId} = $4 RETURNING *;`;
    const {
      rows: [user],
    } = await this.#_sqlQuerier.db.query(queryStr, [
      screen_name,
      bio,
      img_url,
      userId,
    ]);
    return user;
  }
}

module.exports.SqlUsersTable = SqlUsersTable;
