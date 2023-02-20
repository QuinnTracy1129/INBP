const User = require("../../models/Persons/Users"),
  Attendances = require("../../models/Persons/Attendances"),
  generateToken = require("../../config/generateToken");

// entity/login
exports.login = (req, res) => {
  const { email, password } = req.query;

  User.find({ $or: [{ email }, { mobile: email }] })
    .populate("fullName.mname fullName.lname")
    .then(async users => {
      var user = users[0];
      if (user) {
        if (await user.matchPassword(password)) {
          if (user.deletedAt) {
            res.json({ error: "Your account has been banned!" });
          } else {
            if (user.role) {
              Attendances.find()
                .byUser(user._id)
                .then(attendances => {
                  const handleNew = () =>
                    Attendances.create({
                      userId: user._id,
                      in: new Date().toLocaleTimeString(),
                      out: "",
                    }).then(() => {
                      user.password = undefined;
                      res.json({ user, token: generateToken(user._id) });
                    });

                  if (attendances.length > 0) {
                    const latest = attendances[attendances.length - 1];

                    if (latest.out) {
                      handleNew();
                    } else {
                      user.password = undefined;
                      res.json({ user, token: generateToken(user._id) });
                    }
                  } else {
                    handleNew();
                  }
                });
            } else {
              res.json({ error: "Your role has not been declared yet!" });
            }
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
