const TaskModel = require("../../models/Tasks"),
  HistoryModel = require("../../models/Histories");

module.exports = req =>
  TaskModel.findById(req.query.id)
    .then(task => {
      if (task) {
        if (task.deletedAt) {
          return TaskModel.findByIdAndUpdate(req.query.id, {
            deletedAt: null,
          })
            .then(() =>
              HistoryModel.create({
                model: "Tasks",
                action: "restore",
                dataId: req.query.id,
              })
                .then(() => ({
                  success: `Task (${task._id}) restored successfully.`,
                  statusCode: 200,
                }))
                .catch(error => ({ error: error.message, statusCode: 400 }))
            )
            .catch(error => ({ error: error.message, statusCode: 400 }));
        } else {
          return {
            error: "Task is already restored.",
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
