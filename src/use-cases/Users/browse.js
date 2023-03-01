const UserModel = require("../../models/Users"),
  { getAge } = require("../../utilities");

module.exports = req =>
  UserModel.find()
    .select("-password -mobile -email -createdAt -updatedAt")
    .sort({ createdAt: -1 })
    .then(users => ({
      success: users
        .filter(item => !item.deletedAt)
        .map(user => {
          const _user = { ...user._doc };
          _user.age = getAge(_user.dob);
          return _user;
        }),
      statusCode: 200,
    }))
    .catch(error => ({ error: error.message, statusCode: 400 }));
