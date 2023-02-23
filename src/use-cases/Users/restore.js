const UserModel = require("../../models/Users");

module.exports = req =>
  UserModel.findById(req.params.id)
    .then(user => {
      if (user.deletedAt) {
        return UserModel.findByIdAndUpdate(
          req.params.id,
          {
            deletedAt: null,
          },
          { new: true }
        )
          .select("-password")
          .then(user => `User ${user._id} restored successfully.`)
          .catch(error => ({ error: error.message, statusCode: 400 }));
      } else {
        return {
          error: "User is already restored.",
        };
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
