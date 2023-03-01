const TaskModel = require("../../models/Tasks");

module.exports = req => {
  const { status } = req.query;

  if (status) {
    if (status === "completed" || status === "pending") {
      return TaskModel.find()
        .byUser(req.params.user)
        .byCompleted(status === "completed")
        .select("-user -createdAt -updatedAt")
        .sort({ createdAt: -1 })
        .then(tasks => ({
          success: tasks.filter(item => !item.deletedAt),
          statusCode: 200,
        }))
        .catch(error => ({ error: error.message, statusCode: 400 }));
    } else {
      return {
        error: "Invalid status!",
        statusCode: 400,
      };
    }
  } else {
    return TaskModel.find()
      .byUser(req.params.user)
      .select("-user -createdAt -updatedAt")
      .sort({ createdAt: -1 })
      .then(tasks => ({
        success: tasks.filter(item => !item.deletedAt),
        statusCode: 200,
      }))
      .catch(error => ({ error: error.message, statusCode: 400 }));
  }
};
