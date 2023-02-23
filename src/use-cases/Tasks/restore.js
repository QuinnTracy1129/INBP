const TaskModel = require("../../models/Tasks");

module.exports = req =>
  TaskModel.findById(req.params.id)
    .then(task => {
      if (task.deletedAt) {
        return TaskModel.findByIdAndUpdate(req.params.id, {
          deletedAt: null,
        })
          .select("-password")
          .then(() => `Task ${task._id} restored successfully.`)
          .catch(error => ({ error: error.message, statusCode: 400 }));
      } else {
        return {
          error: "Task is already restored.",
        };
      }
    })
    .catch(error => ({ error: error.message, statusCode: 400 }));
