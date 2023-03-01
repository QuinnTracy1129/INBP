const UserModel = require("../../models/Users"),
  ascendEntity = require("../../entities/Auth/ascend"),
  roleDb = require("../../fakeDb/roles");

module.exports = req =>
  ascendEntity(req.query)
    .then(id =>
      UserModel.findByIdAndUpdate(id, { role: roleDb[0] })
        .then(async user => {
          if (user) {
            return {
              success: `User (${user.email}) ascended successfully.`,
              statusCode: 200,
            };
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
