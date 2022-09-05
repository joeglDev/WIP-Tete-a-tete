class HttpErrors {
    static invalidLogin = {
        status: 401,
        msg: 'Invalid login credentials'
    }
}

module.exports.HttpErrors = HttpErrors;