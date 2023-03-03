const AddressModel = require("../../models/Addresses");

module.exports = req =>
  AddressModel.findOne({ user: req.query.user })
    .sort({ createdAt: -1 })
    .then(address => {
      if (address) {
        return {
          success: address,
          statusCode: 200,
        };
      } else {
        return {
          error: "Invalid User!",
          statusCode: 404,
        };
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
