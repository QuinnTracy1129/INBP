const TaskModel = require("../../models/Tasks");

module.exports = req => {
  const { status } = req.query;

  if (status) {
    if (status === "completed" || status === "pending") {
      return TaskModel.find()
        .byUser(req.params.userId)
        .byCompleted(status === "completed")
        .populate("userId")
        .sort({ createdAt: -1 })
        .then(tasks => tasks.filter(item => !item.deletedAt))
        .catch(error => ({ error: error.message, statusCode: 400 }));
    } else {
      return {
        error: "Invalid status!",
        statusCode: 400,
      };
    }
  } else {
    return TaskModel.find()
      .byUser(req.params.userId)
      .populate("userId")
      .sort({ createdAt: -1 })
      .then(tasks => tasks.filter(item => !item.deletedAt))
      .catch(error => ({ error: error.message, statusCode: 400 }));
  }
};
