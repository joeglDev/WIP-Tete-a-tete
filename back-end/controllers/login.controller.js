const { HttpErrors } = require("../../shared/http-errors");
const { use } = require("../app");
const { AuthenticatorMock } = require("../mocks/AuthenticatorMock");

exports.authenticateUser = (req, res) => {
  const { username, password } = req.body;
  const authenticator = new AuthenticatorMock();
  if (authenticator.authenticateUser(username, password)) {
    const user = { user: {} };
    res.send(user);
  } else res.status(401).send(HttpErrors.invalidLogin);
};
