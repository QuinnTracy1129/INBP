const AddressModel = require("../../models/Addresses"),
  createOrUpdateEntity = require("../../entities/Addresses/createOrUpdate");

module.exports = req =>
  AddressModel.findOne({ user: req.query.user })
    .sort({ createdAt: -1 })
    .then(address => {
      if (address) {
        return createOrUpdateEntity(req.body, req.query.user)
          .then(res =>
            AddressModel.findByIdAndUpdate(address._id, res, { new: true })
              .then(data => ({ success: data, statusCode: 200 }))
              .catch(err => ({ error: err.message, statusCode: 400 }))
          )
          .catch(err => ({ error: err.message, statusCode: 400 }));
      } else {
        return createOrUpdateEntity(req.body, req.query.user, "create")
          .then(res =>
            AddressModel.create(res)
              .then(data => ({ success: data, statusCode: 201 }))
              .catch(err => ({ error: err.message, statusCode: 400 }))
          )
          .catch(err => ({ error: err.message, statusCode: 400 }));
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
