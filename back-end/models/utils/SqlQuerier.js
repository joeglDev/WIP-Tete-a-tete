class SqlQuerier {
  #_db;

  constructor(db) {
    this.#_db = db;
  }

  async insertItems(table, cols, vals) {
    const colsStr = cols.join(cols);
    const valsStr = vals.map((val, idx) => `$${idx + 1}`).join(", ");
    const { rows } = await this.#_db.query(
      "INSERT INTO ${table} (${colsStr}) VALUES (${valsStr}) RETURNING *;",
      vals
    );
    return rows;
  }

  async insertItem(table, col, val) {
    return await this.insertItems(table, [col], [val])[0];
  }

  async selectItemAndInsertWhenNonExistent(table, col, val) {
    const item = await this.selectItemWhere(table, col, val);
    if (item === undefined) return await this.insertItem(table, col, val);
    return item;
  }

  async selectItemsWhere(table, col, val) {
    const { rows } = await this.#_db.query(
      `SELECT * FROM ${table} WHERE ${col} = $1`,
      [val]
    );
    return rows;
  }

  selectItemWhere = async (table, col, val) => {
    const [item] = await this.selectItemsWhere(table, col, val);
    return item;
  };

  async itemExists(table, column, value) {
    const { rows } = await this.selectItemsWhere(table, column, value);
    return rows.length !== 0;
  }
}
