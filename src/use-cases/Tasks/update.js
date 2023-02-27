const TaskModel = require("../../models/Tasks"),
  updateEntity = require("../../entities/Tasks/update");

module.exports = req =>
  TaskModel.findById(req.params.id)
    .then(task => {
      if (task) {
        if (!task.isCompleted) {
          return updateEntity(req.body, task.end)
            .then(res =>
              TaskModel.findByIdAndUpdate(req.params.id, res, { new: true })
                .then(task => ({
                  success: `Task (${task.name}) updated successfully.`,
                  statusCode: 200,
                }))
                .catch(error => ({ error: error.message, statusCode: 400 }))
            )
            .catch(err => ({ error: err.message, statusCode: 400 }));
        } else {
          return {
            error: "Cannot update a completed task!",
            statusCode: 403,
          };
        }
      } else {
        return {
          error: "Invalid ID!",
          statusCode: 404,
        };
      }
    })
    .catch(err => ({ error: err.message, statusCode: 400 }));
