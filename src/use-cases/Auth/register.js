const UserModel = require("../../models/Users");

module.exports = req =>
  UserModel.create(req.body)
    .then(user => {
      const _user = { ...user._doc };
      _user.password = undefined;
      return _user;
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
