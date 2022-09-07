const { updateUserProfile } = require("../models/users.model");

exports.patchUserProfile = async (req, res, next) => {
  try {
    const {user_id} = req.params;
    const updatedUser = await updateUserProfile(user_id, req.body);
    console.log(updatedUser)
    res.status(200).send({user: updatedUser});
  } catch (error) {
    console.log(error);
  }
};


