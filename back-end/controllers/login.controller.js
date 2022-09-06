const { HttpErrors } = require("../../shared/HttpErrors");
const { use } = require("../app");
const { AuthenticatorMock } = require("../mocks/AuthenticatorMock");
const { selectUserByUsername } = require("../models/users.model");

exports.authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const authenticator = new AuthenticatorMock();
  try {
    if (authenticator.authenticateUser(username, password)) {
      const user = await selectUserByUsername(username);
      res.send({ user });
    } else res.status(401).send(HttpErrors.invalidLogin);
  } catch (err) {
    console.log(err);  
    // add next functionality to handle error
  }
};
