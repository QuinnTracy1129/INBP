const TaskModel = require("../../models/Tasks");

module.exports = req =>
  TaskModel.findById(req.params.id)
    .then(task => {
      if (!task.deletedAt) {
        return TaskModel.findByIdAndUpdate(req.params.id, {
          deletedAt: new Date().toLocaleString(),
        })
          .then(() => `Task ${task._id} deleted successfully.`)
          .catch(error => ({ error: error.message, statusCode: 400 }));
      } else {
        return {
          error: "Task is already deleted",
        };
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
