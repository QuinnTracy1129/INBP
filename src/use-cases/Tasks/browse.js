const TaskModel = require("../../models/Tasks");

module.exports = req =>
  TaskModel.find()
    .populate("userId")
    .sort({ createdAt: -1 })
    .then(tasks => tasks.filter(item => !item.deletedAt))
    .catch(error => ({ error: error.message, statusCode: 400 }));
