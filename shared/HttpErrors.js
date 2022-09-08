class HttpErrors {
  static invalidLogin = {
    status: 401,
    msg: "Invalid login credentials",
  };
  static itemNotFound = {
    status: 404,
    msg: "Not Found",
  };
  static invalidRequest = {
    status: 400,
    msg: "Invalid request",
  };
}

module.exports.HttpErrors = HttpErrors;
