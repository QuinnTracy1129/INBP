const express = require("express"),
  app = express(),
  http = require("http"),
  dbConnection = require("./middleware/dbConnection");

const server = http.createServer(app);

// Used to receive req.body in api
app.use(express.json({ limit: "50mb" }));

// Routes
require("./routes")(app);

const port = process.env.PORT || 5000; // Dynamic port for deployment
server.listen(port, () => {
  dbConnection();

  console.log(`Server is running on port: ${port}`);
});
