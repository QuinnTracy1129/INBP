const UserModel = require("../../models/Users"),
  registerEntity = require("../../entities/Auth/register"),
  roleDb = require("../../fakeDb/roles");

module.exports = req =>
  registerEntity(req.body)
    .then(res => {
      const _user = { ...res };
      _user.role = roleDb[2];
      return UserModel.create(_user)
        .then(user => ({
          success: `User (${user.email}) registered successfully.`,
          statusCode: 201,
        }))
        .catch(error => ({ error: error.message, statusCode: 400 }));
    })
    .catch(err => ({ error: err.message, statusCode: 400 }));
