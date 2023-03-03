const AddressModel = require("../../models/Addresses");

module.exports = req =>
  AddressModel.find()
    .populate({
      path: "user",
      select: "-password -email -updatedAt -role",
    })
    .sort({ createdAt: -1 })
    .then(addresses => ({
      success: addresses.filter(item => !item.deletedAt),
      statusCode: 200,
    }))
    .catch(error => ({ error: error.message, statusCode: 400 }));
