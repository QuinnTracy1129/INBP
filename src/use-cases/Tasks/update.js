const TaskModel = require("../../models/Tasks"),
  updateEntity = require("../../entities/Tasks/update");

module.exports = req =>
  updateEntity(req.body)
    .then(res =>
      TaskModel.findByIdAndUpdate(req.params.id, res, { new: true })
        .then(task => task)
        .catch(error => ({ error: error.message, statusCode: 400 }))
    )
    .catch(err => ({ error: err.message, statusCode: 400 }));
