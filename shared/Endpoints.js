class Endpoints {
  static loginEnd = "/login";
  static usersEnd = "/users";
  static makeUsersTopicsEnd(user_id) {
    return `/users/${user_id}/topics`;
  }
}

module.exports.Endpoints = Endpoints;
