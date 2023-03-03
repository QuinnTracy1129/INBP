const ContractModel = require("../../models/Contracts"),
  createEntity = require("../../entities/Contracts/create"),
  updateEntity = require("../../entities/Contracts/update");

module.exports = req =>
  ContractModel.findOne({ user: req.query.user })
    .sort({ createdAt: -1 })
    .then(contract => {
      if (contract) {
        return updateEntity(req.body, req.query.user)
          .then(res =>
            ContractModel.findByIdAndUpdate(contract._id, res, {
              new: true,
              populate: { path: "client", select: "-updatedAt" },
            })
              .then(data => ({ success: data, statusCode: 200 }))
              .catch(err => ({ error: err.message, statusCode: 400 }))
          )
          .catch(err => ({ error: err.message, statusCode: 400 }));
      } else {
        return createEntity(req.body, req.query.user)
          .then(res =>
            ContractModel.create(res)
              .then(data => ({ success: data, statusCode: 201 }))
              .catch(err => ({ error: err.message, statusCode: 400 }))
          )
          .catch(err => ({ error: err.message, statusCode: 400 }));
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
