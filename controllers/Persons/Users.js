const User = require("../../models/Persons/Users");

// entity/
exports.browse = (req, res) =>
  User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .then(users => res.json(users.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/archive
exports.archive = (req, res) =>
  User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .then(items => res.json(items.filter(item => item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .select("-password")
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/:id/destroy
exports.destroy = (req, res) =>
  User.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch(error => res.status(400).json({ error: error.message }));
