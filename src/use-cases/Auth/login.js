const UserModel = require("../../models/Users");

module.exports = req => {
  const { email, password } = req.query;

  return UserModel.findOne({ $or: [{ email }, { mobile: email }] })
    .then(async user => {
      if (user) {
        if (await user.matchPassword(password)) {
          if (!user.deletedAt) {
            user.password = undefined;
            return { user, token: await user.createToken() };
          } else {
            return { error: "Your account has been banned!" };
          }
        } else {
          return { error: "Password is incorrect!" };
        }
      } else {
        return { error: "Account is not in our database!" };
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
};
