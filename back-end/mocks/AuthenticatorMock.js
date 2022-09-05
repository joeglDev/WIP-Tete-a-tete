const { use } = require("../app");

class AuthenticatorMock {
  #_registeredUsers = [
    { username: "user1@email.com", password: "password" },
    { username: "user2@email.com", password: "password" },
  ];

  authenticateUser(username, password) {
    for (const registeredUser of this.#_registeredUsers) {
      if (
        registeredUser.username === username &&
        registeredUser.password === password
      )
        return true;
    }
    return false;
  }
}

module.exports.AuthenticatorMock = AuthenticatorMock;
