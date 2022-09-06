const express = require("express");
const { Endpoints } = require("../shared/Endpoints");
const { authenticateUser } = require("./controllers/login.controller");
const app = express();

//middleware
//const cors = require('cors');
//app.use(cors());
app.use(express.json());

app.post(Endpoints.loginEnd, authenticateUser);

module.exports = app;
