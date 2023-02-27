const UserModel = require("../../models/Users");

module.exports = req =>
  UserModel.findById(req.params.id)
    .then(user => {
      if (user) {
        if (user.deletedAt) {
          return UserModel.findByIdAndUpdate(req.params.id, {
            deletedAt: null,
          })
            .then(() => ({
              succes: `User (${user._id}) restored successfully.`,
              statusCode: 200,
            }))
            .catch(error => ({ error: error.message, statusCode: 400 }));
        } else {
          return {
            error: "User is already restored.",
            statusCode: 400,
          };
        }
      } else {
        return {
          error: "Invalid ID!",
          statusCode: 404,
        };
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
