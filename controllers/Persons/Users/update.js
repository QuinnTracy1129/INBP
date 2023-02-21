const UserModel = require("../../../models/Persons/Users");

module.exports = (req, res) =>
  UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .select("-password")
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));
