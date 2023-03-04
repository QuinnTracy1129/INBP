const VaccinationModel = require("../../models/Vaccinations"),
  updateEntity = require("../../entities/Vaccinations/update");

module.exports = req => {
  const { user, key } = req.query;

  if (user) {
    if (key) {
      return VaccinationModel.findOne({ user })
        .then(res =>
          updateEntity(req.body, key, res)
            .then(data =>
              VaccinationModel.findByIdAndUpdate(res._id, data, { new: true })
                .then(_data => ({ success: _data, statusCode: 201 }))
                .catch(err => ({ error: err.message, statusCode: 400 }))
            )
            .catch(err => ({ error: err.message, statusCode: 400 }))
        )
        .catch(err => ({ error: err.message, statusCode: 400 }));
    } else {
      return {
        error: "Invalid key!",
        statusCode: 400,
      };
    }
  } else {
    return {
      error: "Invalid User!",
      statusCode: 404,
    };
  }
};
