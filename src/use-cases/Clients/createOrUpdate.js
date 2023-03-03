const ClientModel = require("../../models/Clients"),
  createOrUpdateEntity = require("../../entities/Clients/createOrUpdate");

module.exports = req => {
  if (req.query.id) {
    return ClientModel.findById(req.query.id)
      .sort({ createdAt: -1 })
      .then(client => {
        if (client) {
          return createOrUpdateEntity(req.body)
            .then(res =>
              ClientModel.findByIdAndUpdate(client._id, res, { new: true })
                .then(data => ({ success: data, statusCode: 200 }))
                .catch(err => ({ error: err.message, statusCode: 400 }))
            )
            .catch(err => ({ error: err.message, statusCode: 400 }));
        } else {
          return {
            error: "Invalid ID!",
            statusCode: 404,
          };
        }
      })
      .catch(error => ({ error: error.message, statusCode: 400 }));
  } else {
    return createOrUpdateEntity(req.body, "create")
      .then(res =>
        ClientModel.create(res)
          .then(data => ({ success: data, statusCode: 201 }))
          .catch(err => ({ error: err.message, statusCode: 400 }))
      )
      .catch(err => ({ error: err.message, statusCode: 400 }));
  }
};
