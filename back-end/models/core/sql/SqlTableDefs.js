class SqlTableDefs {
  #_tableName;
  #_fields;

  constructor(tableName, fields) {
    this.#_tableName = tableName;
    this.#_fields = fields;
  }

  get tableName() {
    return this.#_tableName;
  }

  get fields() {
    return this.#_fields;
  }
}

module.exports.SqlTableDefs = SqlTableDefs;
