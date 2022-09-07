

class AuthenticatorMock {
  #_registeredUsers = [
    { username: "user1@email.com", password: "password" },
    { username: "user2@email.com", password: "password" },
    { username: "user3@email.com", password: "password" },
    {username: "sol@email.com", password: "password"},
    {username: "todd2@email.com", password: "password"},
    {username: "joe3@email.com", password: "password"},
    {username: "rob2@email.com", password: "password"},
    {username: "niall3@email.com", password: "password"},
    {username: "test@email.com", password: "password"},
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
