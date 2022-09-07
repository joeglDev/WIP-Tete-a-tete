const { updateUserProfile } = require("../models/users.model");

exports.createUserProfile = async (req, res, next) => {
  console.log("create profile controller");
  try {
    updateUserProfile();
  } catch (error) {
    console.log(error);
  }
};
