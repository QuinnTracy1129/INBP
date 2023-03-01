const TaskModel = require("../../models/Tasks");

module.exports = req =>
  TaskModel.find()
    .populate({
      path: "user",
      select: "-password -mobile -email -createdAt -updatedAt",
    })
    .select("-createdAt -updatedAt")
    .sort({ createdAt: -1 })
    .then(tasks => ({
      success: tasks.filter(item => !item.deletedAt),
      statusCode: 200,
    }))
    .catch(error => ({ error: error.message, statusCode: 400 }));
