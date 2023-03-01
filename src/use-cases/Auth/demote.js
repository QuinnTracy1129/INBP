const UserModel = require("../../models/Users"),
  demoteEntity = require("../../entities/Auth/demote"),
  roleDb = require("../../fakeDb/roles");

module.exports = req =>
  demoteEntity(req.query)
    .then(id =>
      UserModel.findById(id)
        .then(user => {
          if (user) {
            if (user.role.access === "employee") {
              return UserModel.findByIdAndUpdate(id, { role: roleDb[2] })
                .then(async user => ({
                  success: `User (${user.email}) demoted successfully.`,
                  statusCode: 200,
                }))
                .catch(error => ({ error: error.message, statusCode: 400 }));
            } else {
              return {
                error: "Can only demote a employee!",
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
        .catch(error => ({ error: error.message, statusCode: 400 }))
    )
    .catch(err => ({ error: err.message, statusCode: 400 }));
