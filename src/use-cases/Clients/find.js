const ClientModel = require("../../models/Clients");

module.exports = req =>
  ClientModel.findById(req.query.id)
    .sort({ createdAt: -1 })
    .then(client => {
      if (client) {
        return {
          success: client,
          statusCode: 200,
        };
      } else {
        return {
          error: "Invalid ID!",
          statusCode: 404,
        };
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
