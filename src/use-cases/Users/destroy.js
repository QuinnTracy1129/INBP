const UserModel = require("../../models/Users");

module.exports = req =>
  UserModel.findById(req.params.id)
    .then(user => {
      if (!user.deletedAt) {
        return UserModel.findByIdAndUpdate(
          req.params.id,
          {
            deletedAt: new Date().toLocaleString(),
          },
          { new: true }
        )
          .select("-password")
          .then(user => `User ${user._id} deleted successfully.`)
          .catch(error => ({ error: error.message, statusCode: 400 }));
      } else {
        return {
          error: "User is already deleted",
        };
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
