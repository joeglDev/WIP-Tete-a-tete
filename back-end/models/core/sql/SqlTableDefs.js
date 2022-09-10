const { PrefixedField } = require("./PrefixedField");

class SqlTableDefs {
  #_tableName;
  #_fields;
  #_prefixed;

  constructor(tableName, fields) {
    this.#_tableName = tableName;
    this.#_fields = fields;
    this.#_prefixed = new PrefixedField(this.tableName, this.fields);
  }

  get tableName() {
    return this.#_tableName;
  }

  get fields() {
    return this.#_fields;
  }

  get prefixedField() {
    return this.#_prefixed;
  }
}

module.exports.SqlTableDefs = SqlTableDefs;
