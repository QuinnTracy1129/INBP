const UserModel = require("../../../models/Persons/Users");

module.exports = (req, res) =>
  UserModel.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .then(users => res.json(users.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));
