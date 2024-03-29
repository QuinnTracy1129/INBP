const UserModel = require("../../models/Users"),
  HistoryModel = require("../../models/Histories");

module.exports = req =>
  UserModel.findById(req.query.id)
    .then(user => {
      if (user) {
        if (!user.deletedAt) {
          return UserModel.findByIdAndUpdate(req.query.id, {
            deletedAt: new Date().toLocaleString(),
          })
            .then(() =>
              HistoryModel.create({
                model: "Users",
                action: "delete",
                dataId: req.query.id,
              })
                .then(() => ({
                  success: `User (${user._id}) deleted successfully.`,
                  statusCode: 200,
                }))
                .catch(error => ({ error: error.message, statusCode: 400 }))
            )
            .catch(error => ({ error: error.message, statusCode: 400 }));
        } else {
          return {
            error: "User is already deleted",
            statusCode: 208,
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
