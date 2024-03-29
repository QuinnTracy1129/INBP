const AddressModel = require("../../models/Addresses"),
  createEntity = require("../../entities/Addresses/create"),
  updateEntity = require("../../entities/Addresses/update");

module.exports = req =>
  AddressModel.findOne({ user: req.query.user })
    .sort({ createdAt: -1 })
    .then(address => {
      if (address) {
        return updateEntity(req.body, req.query.user)
          .then(res =>
            AddressModel.findByIdAndUpdate(address._id, res, { new: true })
              .then(data => ({ success: data, statusCode: 200 }))
              .catch(err => ({ error: err.message, statusCode: 400 }))
          )
          .catch(err => ({ error: err.message, statusCode: 400 }));
      } else {
        return createEntity(req.body, req.query.user)
          .then(res =>
            AddressModel.create(res)
              .then(data => ({ success: data, statusCode: 201 }))
              .catch(err => ({ error: err.message, statusCode: 400 }))
          )
          .catch(err => ({ error: err.message, statusCode: 400 }));
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
