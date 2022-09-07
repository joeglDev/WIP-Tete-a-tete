const express = require("express");
const { Endpoints } = require("../shared/Endpoints");
const { authenticateUser } = require("./controllers/login.controller");
const { patchUserProfile } = require("./controllers/users.controller");
const app = express();

//middleware
//const cors = require('cors');
//app.use(cors());
app.use(express.json());

//endpoints
app.post(Endpoints.loginEnd, authenticateUser);
app.patch(`${Endpoints.usersEnd}/:user_id`, patchUserProfile);

//errors
//app.use()

module.exports = app;
