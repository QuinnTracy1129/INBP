const User = require("../../models/Persons/Users"),
  Attendances = require("../../models/Persons/Attendances"),
  generateToken = require("../../config/generateToken"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  fs = require("fs");

const encrypt = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

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

// entity/validateRefresh
exports.validateRefresh = (req, res) => {
  const { token } = req.query;

  if (token) {
    if (token.startsWith("QTracy")) {
      jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET,
        async (err, response) => {
          if (err) {
            res.json({ error: err.message });
          } else {
            const user = await User.findById(response.id)
              .select("-password")
              .populate("fullName.mname fullName.lname");

            if (user) {
              Attendances.find()
                .byUser(user._id)
                .then(items => {
                  const latest = items[items.length - 1];

                  if (latest.out) {
                    res.json({ error: "Logged out from a different device" });
                  } else {
                    res.json(user);
                  }
                })
                .catch(error => res.status(400).json({ error: error.message }));
            } else {
              res.json({ error: "Invalid account!" });
            }
          }
        }
      );
    } else {
      res.json({ error: "Invalid key!" });
    }
  } else {
    res.json({ error: "Invalid parameters!" });
  }
};

// entity/save
exports.save = (req, res) =>
  User.create(req.body)
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/changepassword
exports.changePassword = (req, res) => {
  const { email, password, old } = req.body;

  User.findOne({ email })
    .then(async user => {
      if (user.deletedAt) {
        res.status(400).json({ expired: "Your account has been banned" });
      } else {
        if (user && (await user.matchPassword(old))) {
          let newPassword = await encrypt(password);
          User.findByIdAndUpdate(user._id, { password: newPassword }).then(
            user => res.json(user)
          );
        } else {
          res.json({ error: "Old Password is incorrect." });
        }
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.file = (req, res) => {
  const { path, base64, name } = req.body;
  let url = `./assets/${path}`;
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url, { recursive: true });
  }
  try {
    let filename = `${url}/${name}`;
    fs.writeFileSync(filename, base64, "base64");
    return res
      .status(200)
      .json({ success: true, message: "Successfully Uploaded." });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
