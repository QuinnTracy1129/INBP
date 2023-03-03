const ContractModel = require("../../models/Contracts");

module.exports = req =>
  ContractModel.findOne({ user: req.query.user })
    .populate("client")
    .sort({ createdAt: -1 })
    .then(contract => {
      if (contract) {
        return {
          success: contract,
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
