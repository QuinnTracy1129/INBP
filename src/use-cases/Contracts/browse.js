const ContractModel = require("../../models/Contracts");

module.exports = req =>
  ContractModel.find()
    .populate({
      path: "user",
      select: "-password -email -updatedAt -role",
    })
    .populate("client")
    .sort({ createdAt: -1 })
    .then(contracts => ({
      success: contracts.filter(item => !item.deletedAt),
      statusCode: 200,
    }))
    .catch(error => ({ error: error.message, statusCode: 400 }));
