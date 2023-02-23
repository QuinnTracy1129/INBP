const UserModel = require("../../models/Users");

module.exports = req =>
  UserModel.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .then(users => users.filter(item => item.deletedAt))
    .catch(error => ({ error: error.message, statusCode: 400 }));
