module.exports = app => {
  // List of available Routes
  require("./Persons")(app);
  app.use("/tasks", require("./Tasks"));
};
