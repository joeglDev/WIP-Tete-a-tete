const { HttpErrors } = require("../../shared/http-errors");

exports.authenticateUser = (req, res) => {
  res.status(401).send(HttpErrors.invalidLogin);
};
