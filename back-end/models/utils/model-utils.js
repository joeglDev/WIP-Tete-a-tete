const { HttpErrors } = require("../../shared/HttpErrors");
const { SqlQuerier } = require(".//SqlQuerier");

const db = require(`${__dirname}/../../db/connection.js`);

exports.gQuerier = new SqlQuerier(db);

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
