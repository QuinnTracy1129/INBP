const UserModel = require("../../models/Users"),
  loginEntity = require("../../entities/Auth/login"),
  { getAge } = require("../../utilities");

module.exports = req =>
  loginEntity(req.query)
    .then(res =>
      UserModel.findOne({ $or: [{ email: res.email }, { mobile: res.email }] })
        .select("-mobile -email -createdAt -updatedAt")
        .then(async user => {
          if (user) {
            if (await user.matchPassword(res.password)) {
              if (!user.deletedAt) {
                const _user = { ...user._doc };
                _user.password = undefined;
                _user.age = getAge(user.dob);
                return {
                  success: _user,
                  token: await user.createToken(),
                  statusCode: 200,
                };
              } else {
                return {
                  error: "Your account has been banned!",
                  statusCode: 403,
                };
              }
            } else {
              return { error: "Password is incorrect!", statusCode: 400 };
            }
          } else {
            return {
              error: "Credentials does not match!",
              statusCode: 404,
            };
          }
        })
        .catch(error => ({ error: error.message, statusCode: 400 }))
    )
    .catch(err => ({ error: err.message, statusCode: 400 }));
