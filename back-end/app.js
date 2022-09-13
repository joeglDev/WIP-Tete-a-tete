const express = require("express");
const { Endpoints } = require("../shared/Endpoints");
const { authenticateUser } = require("./controllers/login.controller");
const {
  patchUserProfile,
  getUserTopics,
  patchUserTopics,
} = require("./controllers/users.controller");
const {
  postNewConversation,
  getMatchingConversations
} = require("./controllers/conversation-controller.js");
const app = express();


//middleware
const cors = require("cors");
const { HttpErrors } = require("../shared/HttpErrors");
app.use(cors());
app.use(express.json());

//endpoints
app.post(Endpoints.loginEnd, authenticateUser);
app.patch(`${Endpoints.usersEnd}/:user_id`, patchUserProfile);
app.get(`${Endpoints.makeUsersTopicsEnd(":user_id")}`, getUserTopics);
app.patch(`${Endpoints.makeUsersTopicsEnd(":user_id")}`, patchUserTopics);
app.post(
  `${Endpoints.makePostUserConversationEnd(":user_id")}`,
  postNewConversation
);
app.post(Endpoints.conversationsEnd, getMatchingConversations)

//errors
app.use((error, req, res, next) => {
  if (error.code === "22P02") {
    res
      .status(HttpErrors.invalidRequest.status)
      .send({ msg: HttpErrors.invalidRequest.msg });
  } else {
    res.status(error.status).send({ msg: error.msg });
  }
});

module.exports = app;
