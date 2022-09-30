const seed = require("./seed.js");
const db = require("../connection.js");

const ENV = process.env.NODE_ENV || "dev";
const devData = require(`../data/${ENV}-data/index.js`);

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();

module.exports = runSeed;
