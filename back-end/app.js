const express = require("express");
const { Endpoints } = require("../shared/endpoints");
const { authenticateUser } = require("./controllers/controllers");
const app = express();

app.post(Endpoints.loginEnd, authenticateUser)


module.exports = app;