const { HttpErrors } = require("../../shared/HttpErrors");
const { use } = require("../app");
const { AuthenticatorMock } = require("../mocks/AuthenticatorMock");
const { selectUserByUsername } = require("../models/users.model");

exports.authenticateUser = (req, res) => {
  const { username, password } = req.body;
  const authenticator = new AuthenticatorMock();
  if (authenticator.authenticateUser(username, password)) {
    const user = selectUserByUsername(username);
    res.send(user);
  } else res.status(401).send(HttpErrors.invalidLogin);
};
