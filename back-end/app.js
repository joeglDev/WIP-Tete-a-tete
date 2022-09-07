const express = require("express");
const { Endpoints } = require("../shared/Endpoints");
const { authenticateUser } = require("./controllers/login.controller");
const { updateUserProfile } = require("./models/users.model");
const app = express();

//middleware
//const cors = require('cors');
//app.use(cors());

app.use(express.json());

//endpoints
app.post(Endpoints.loginEnd, authenticateUser);
app.put(`${Endpoints.updateUserProfile}/:user_id`, updateUserProfile);

//errors
//app.use()

module.exports = app;
