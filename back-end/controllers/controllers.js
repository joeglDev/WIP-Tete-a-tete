const { HttpErrors } = require("../../shared/http-errors")

exports.authenticateUser = (req, res) => {
    res.sendStatus(HttpErrors.invalidLogin.status);
}


