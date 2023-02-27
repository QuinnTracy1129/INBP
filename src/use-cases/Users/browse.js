const UserModel = require("../../models/Users");

module.exports = req =>
  UserModel.find()
    .select("-password -mobile -email -createdAt -updatedAt")
    .sort({ createdAt: -1 })
    .then(users => ({
      success: users.filter(item => !item.deletedAt),
      statusCode: 200,
    }))
    .catch(error => ({ error: error.message, statusCode: 400 }));
