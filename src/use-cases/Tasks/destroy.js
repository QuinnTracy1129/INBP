const TaskModel = require("../../models/Tasks"),
  HistoryModel = require("../../models/Histories");

module.exports = req =>
  TaskModel.findById(req.query.id)
    .then(task => {
      if (task) {
        if (!task.deletedAt) {
          return TaskModel.findByIdAndUpdate(req.query.id, {
            deletedAt: new Date().toLocaleString(),
          })
            .then(() =>
              HistoryModel.create({
                model: "Tasks",
                action: "delete",
                dataId: req.query.id,
              })
                .then(() => ({
                  success: `Task (${task._id}) deleted successfully.`,
                  statusCode: 200,
                }))
                .catch(error => ({ error: error.message, statusCode: 400 }))
            )
            .catch(error => ({ error: error.message, statusCode: 400 }));
        } else {
          return {
            error: "Task is already deleted",
            statusCode: 208,
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
