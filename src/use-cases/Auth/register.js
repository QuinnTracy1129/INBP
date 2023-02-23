const UserModel = require("../../models/Users"),
  registerEntity = require("../../entities/Auth/register");

module.exports = req =>
  registerEntity(req.body)
    .then(res =>
      UserModel.create(res)
        .then(user => {
          const _user = { ...user._doc };
          _user.password = undefined;
          return _user;
        })
        .catch(error => ({ error: error.message, statusCode: 400 }))
    )
    .catch(err => ({ error: err.message, statusCode: 400 }));
