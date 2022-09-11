class SqlQuerier {
  #_db;

  constructor(db) {
    this.#_db = db;
  }

  get db() {
    return this.#_db;
  }

  async insertColumnItems(table, columns, values) {
    const colsStr = columns.join(", ");
    const valsStr = values.map((val, idx) => `$${idx + 1}`).join(", ");
    const {
      rows: [inserted],
    } = await this.#_db.query(
      `INSERT INTO ${table} (${colsStr}) VALUES (${valsStr}) RETURNING *;`,
      values
    );
    return inserted;
  }

  async insertItem(table, column, value) {
    return await this.insertColumnItems(table, [column], [value]);
  }

  async selectItemAndInsertWhenNonExistent(table, column, value) {
    const item = await this.selectItemWhere(table, column, value);
    if (item === undefined) return await this.insertItem(table, column, value);
    return item;
  }

  async selectItemsWhere(table, col, val, selection) {
    const selectionStr = Array.isArray(selection) ? selection.join(", ") : "*";
    const { rows } = await this.#_db.query(
      `SELECT ${selectionStr} FROM ${table} WHERE ${col} = $1`,
      [val]
    );
    return rows;
  }

  async selectItemWhere(table, col, val, selection) {
    const [item] = await this.selectItemsWhere(table, col, val, selection);
    return item;
  }

  async itemExists(table, column, value) {
    const { rows } = await this.selectItemsWhere(table, column, value);
    return rows.length !== 0;
  }
}

module.exports.SqlQuerier = SqlQuerier;
