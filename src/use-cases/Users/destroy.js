const UserModel = require("../../models/Users");

module.exports = req =>
  UserModel.findById(req.params.id)
    .then(user => {
      if (user) {
        if (!user.deletedAt) {
          return UserModel.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date().toLocaleString(),
          })
            .then(() => ({
              succes: `User (${user._id}) deleted successfully.`,
              statusCode: 200,
            }))
            .catch(error => ({ error: error.message, statusCode: 400 }));
        } else {
          return {
            error: "User is already deleted",
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
