const UserModel = require("../../models/Users"),
  promoteEntity = require("../../entities/Auth/promote"),
  roleDb = require("../../fakeDb/roles");

module.exports = req =>
  promoteEntity(req.query)
    .then(id =>
      UserModel.findById(id)
        .then(user => {
          if (user) {
            if (user.role.access === "guest") {
              return UserModel.findByIdAndUpdate(id, { role: roleDb[1] })
                .then(async user => ({
                  success: `User (${user.email}) promoted successfully.`,
                  statusCode: 200,
                }))
                .catch(error => ({ error: error.message, statusCode: 400 }));
            } else {
              return {
                error: "Can only promote a guest!",
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
