const TaskModel = require("../../models/Tasks"),
  submitEntity = require("../../entities/Tasks/submit");

module.exports = req =>
  TaskModel.findById(req.params.id)
    .then(task => {
      if (task) {
        if (!task.isCompleted) {
          return submitEntity(task)
            .then(res =>
              TaskModel.findByIdAndUpdate(req.params.id, res, { new: true })
                .select("-createdAt -updatedAt -user")
                .then(task => ({
                  success: task,
                  statusCode: 200,
                }))
                .catch(error => ({ error: error.message, statusCode: 400 }))
            )
            .catch(err => ({ error: err.message, statusCode: 400 }));
        } else {
          return {
            error: "This task has already been completed!",
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
