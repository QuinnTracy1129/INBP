module.exports = app => {
  // List of available Routes
  app.use("/auth", require("./Auth"));
  app.use("/users", require("./Users"));
  app.use("/tasks", require("./Tasks"));
  app.use("/histories", require("./Histories"));
  app.use("/addresses", require("./Addresses"));
  app.use("/clients", require("./Clients"));
  app.use("/contracts", require("./Contracts"));
  app.use("/vaccinations", require("./Vaccinations"));
};
