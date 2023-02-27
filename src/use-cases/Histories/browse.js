const HistoryModel = require("../../models/Histories");

module.exports = req =>
  HistoryModel.find()
    // .skip((Number(page) - 1) * Number(limit))
    // .limit(limit)
    .sort({ createdAt: -1 })
    .then(histories => ({
      success: histories.filter(item => !item.deletedAt),
      statusCode: 200,
    }))
    .catch(error => ({ error: error.message, statusCode: 400 }));
