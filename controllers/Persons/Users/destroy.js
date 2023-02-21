const UserModel = require("../../../models/Persons/Users");

module.exports = (req, res) =>
  UserModel.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch(error => res.status(400).json({ error: error.message }));
