const TaskModel = require("../../models/Tasks");

module.exports = req =>
  TaskModel.findById(req.params.id)
    .then(task => {
      if (task) {
        if (!task.deletedAt) {
          return TaskModel.findByIdAndUpdate(req.params.id, {
            deletedAt: new Date().toLocaleString(),
          })
            .then(() => ({
              success: `Task (${task._id}) deleted successfully.`,
              statusCode: 200,
            }))
            .catch(error => ({ error: error.message, statusCode: 400 }));
        } else {
          return {
            error: "Task is already deleted",
            statusCode: 400,
          };
        }
      } else {
        return {
          error: "Invalid ID!",
          statusCode: 404,
        };
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
