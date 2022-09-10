class PrefixedField {
  #_tableName;
  #_fields;

  constructor(tableName, fields) {
    this.#_tableName = tableName;
    this.#_fields = fields;
    for (const fieldKey in this.#_fields) {
      Object.defineProperty(this, fieldKey, {
        get: () => {
          return `${this.#_tableName}.${this.#_fields[fieldKey]}`;
        },
      });
    }
  }

  get all() {
    return `${this.#_tableName}.*`;
  }
}

module.exports.PrefixedField = PrefixedField;
