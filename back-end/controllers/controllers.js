const { HttpErrors } = require("../../shared/http-errors");

exports.authenticateUser = (req, res) => {
  res.status(HttpErrors.invalidLogin.status).send(HttpErrors.invalidLogin);
};
