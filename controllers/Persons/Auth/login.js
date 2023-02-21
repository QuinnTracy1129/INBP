const UserModel = require("../../../models/Persons/Users"),
  generateToken = require("../../../config/generateToken");

module.exports = (req, res) => {
  const { email, password } = req.query;

  UserModel.findOne({ $or: [{ email }, { mobile: email }] })
    .then(async user => {
      if (user) {
        if (await user.matchPassword(password)) {
          if (!user.deletedAt) {
            user.password = undefined;
            res.json({ user, token: generateToken(user._id) });
          } else {
            res.json({ error: "Your account has been banned!" });
          }
        } else {
          res.json({ error: "Password is incorrect!" });
        }
      } else {
        res.json({ error: "Account is not in our database!" });
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));
};
