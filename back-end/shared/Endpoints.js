class Endpoints {
  static routeEnd = "/";
  static loginEnd = "/login";
  static usersEnd = "/users";
  static conversationsEnd = "/conversations";
  static makeUsersTopicsEnd(user_id) {
    return `/users/${user_id}/topics`;
  }
  static makePostUserConversationEnd(user_id) {
    return `/users/${user_id}/conversation`;
  }
}

module.exports.Endpoints = Endpoints;
