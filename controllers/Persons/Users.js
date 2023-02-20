const User = require("../../models/Persons/Users");

// entity/
exports.browse = (req, res) =>
  User.find()
    .sort({ createdAt: -1 })
    .select("-password")
    .then(users => res.json(users.filter(user => !user.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/unresolved
exports.unresolved = (req, res) =>
  User.find()
    .select("-password")
    .populate("fullName.mname fullName.lname")
    .then(users =>
      res.json(
        users
          .filter(user => !user.deletedAt && !user.role)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/archive
exports.archive = (req, res) =>
  User.find()
    .select("-password")
    .populate("fullName.mname fullName.lname")
    .then(items =>
      res.json(
        items
          .filter(item => item.deletedAt)
          .sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt))
      )
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/find
exports.find = (req, res) =>
  User.findById(req.params.id)
    .select("-password")
    .then(user => res.json(user.deletedAt ? "No user found" : user))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    populate: "fullName.mname fullName.lname",
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
