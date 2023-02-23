const TaskModel = require("../../models/Tasks"),
  createEntity = require("../../entities/Tasks/create");

module.exports = req =>
  createEntity(req.body)
    .then(res =>
      TaskModel.create(res)
        .then(task => task)
        .catch(error => ({ error: error.message, statusCode: 400 }))
    )
    .catch(err => ({ error: err.message, statusCode: 400 }));
