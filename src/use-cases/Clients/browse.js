const ClientModel = require("../../models/Clients");

module.exports = req =>
  ClientModel.find()
    .sort({ createdAt: -1 })
    .then(clients => ({
      success: clients.filter(item => !item.deletedAt),
      statusCode: 200,
    }))
    .catch(error => ({ error: error.message, statusCode: 400 }));
