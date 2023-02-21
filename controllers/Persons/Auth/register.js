const User = require("../../../models/Persons/Users");

module.exports = (req, res) =>
  User.create(req.body)
    .then(user => {
      const _user = { ...user._doc };
      _user.password = undefined;
      res.json(_user);
    })
    .catch(error => res.status(400).json({ error: error.message }));
