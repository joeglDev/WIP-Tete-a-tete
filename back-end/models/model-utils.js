const { HttpErrors } = require("../../shared/HttpErrors");

const db = require(`${__dirname}/../db/connection.js`);

exports.rejectWhenNonExistent = async (table, column, value) => {
  const { rows } = await db.query(
    `SELECT * FROM ${table} WHERE ${column} = $1;`,
    [value]
  );

  if (rows.length === 0) {
    return Promise.reject(HttpErrors.itemNotFound);
  }
  return [];
};

exports.selectItemsWhere = async (table, column, value) => {
  const { rows } = await db.query(
    `SELECT * FROM ${table} WHERE ${column} = $1`,
    [value]
  );
  return rows;
};

exports.getItem = async (table, column, value) => {
  const [item] = await this.selectItemsWhere(table, column, value);
  return item;
};

exports.itemExists = async (table, column, value) => {
  const { rows } = await db.query(
    `SELECT * FROM ${table} WHERE ${column} = $1`,
    [value]
  );
  return rows.length !== 0;
};

exports.insertItem = async (table, column, value) => {
  const { rows } = await db.query(
    `INSERT INTO ${table}  (${column}) VALUES ($1) RETURNING *;`,
    [value]
  );
  return rows[0];
};

exports.getItemAndInsertWhenNonExistent = async (table, col, val) => {
  const item = await this.getItem(table, col, val);
  if (item === undefined) return await this.insertItem(table, col, val);
  return item;
};
