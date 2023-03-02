const HistoryModel = require("../../models/Histories");

module.exports = req => {
  const { key, action, data } = req.query;

  const keys = {
    [key]: data,
  };

  if (action) {
    keys.action = action;
  }

  if (key) {
    return HistoryModel.find(keys)
      .then(histories => ({ success: histories, statusCode: 200 }))
      .catch(error => ({ error: error.message, statusCode: 400 }));
  } else {
    return {
      error: "Invalid key!",
      statusCode: 400,
    };
  }
};
