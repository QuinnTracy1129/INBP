const ContractModel = require("../../models/Contracts"),
  createOrUpdateEntity = require("../../entities/Contracts/createOrUpdate");

module.exports = req =>
  ContractModel.findOne({ user: req.query.user })
    .sort({ createdAt: -1 })
    .then(contract => {
      if (contract) {
        return createOrUpdateEntity(req.body, req.query.user)
          .then(res =>
            ContractModel.findByIdAndUpdate(contract._id, res, { new: true })
              .then(data => ({ success: data, statusCode: 200 }))
              .catch(err => ({ error: err.message, statusCode: 400 }))
          )
          .catch(err => ({ error: err.message, statusCode: 400 }));
      } else {
        return createOrUpdateEntity(req.body, req.query.user, "create")
          .then(res =>
            ContractModel.create(res)
              .then(data => ({ success: data, statusCode: 201 }))
              .catch(err => ({ error: err.message, statusCode: 400 }))
          )
          .catch(err => ({ error: err.message, statusCode: 400 }));
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
