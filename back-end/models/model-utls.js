const { HttpErrors } = require("../../shared/HttpErrors");

const db = require(`${__dirname}/../db/connection.js`);

exports.rejectWhenNonExistent =  (table, column, value) => {
  return db
    .query(`SELECT * FROM ${table} WHERE ${column} = $1;`, [value])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject(HttpErrors.itemNotFound);
      } else {
        return [];
      }
    });
};
