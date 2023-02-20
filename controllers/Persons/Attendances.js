const Entity = require("../../models/Persons/Attendances"),
  User = require("../../models/Persons/Users");

// entity/:id/find
exports.find = (req, res) =>
  Entity.find()
    .byUser(req.params.id)
    .then(items =>
      User.findById(req.params.id)
        .select("-password")
        .populate("fullName.mname fullName.lname")
        .then(user => res.json({ attendances: items, user: user || {} }))
        .catch(error => res.status(400).json({ error: error.message }))
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/logout
exports.logout = (req, res) =>
  Entity.find()
    .byUser(req.params.id)
    .then(items => {
      const latest = items[items.length - 1];

      Entity.findByIdAndUpdate(latest._id, {
        out: new Date().toLocaleTimeString(),
      })
        .then(() => res.json("Success"))
        .catch(error => res.status(400).json({ error: error.message }));
    })
    .catch(error => res.status(400).json({ error: error.message }));
