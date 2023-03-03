const VaccinationModel = require("../../models/Vaccinations"),
  createEntity = require("../../entities/Vaccinations/create");

module.exports = req =>
  createEntity(req.body)
    .then(res =>
      VaccinationModel.create(res)
        .then(data => ({ success: data, statusCode: 201 }))
        .catch(err => ({ error: err.message, statusCode: 400 }))
    )
    .catch(err => ({ error: err.message, statusCode: 400 }));
