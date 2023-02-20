module.exports = app => {
  // List of available Routes
  app.use("/auth", require("./Persons/Auth"));
  app.use("/users", require("./Persons/Users"));
  app.use("/attendances", require("./Persons/Attendances"));
  app.use("/mailer", require("./Persons/Mailer"));
  app.use("/tasks", require("./Tasks"));
};
