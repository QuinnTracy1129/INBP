const User = require("../../models/Persons/Users"),
  generateToken = require("../../config/generateToken");

// entity/login
exports.login = (req, res) => {
  const { email, password } = req.query;

  User.findOne({ $or: [{ email }, { mobile: email }] })
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

// entity/save
exports.save = (req, res) =>
  User.create(req.body)
    .then(user => {
      const _user = { ...user._doc };
      _user.password = undefined;
      res.json(_user);
    })
    .catch(error => res.status(400).json({ error: error.message }));
