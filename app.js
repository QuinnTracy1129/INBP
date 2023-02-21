const express = require("express"),
  app = express(),
  http = require("http"),
  mongoose = require("mongoose");
require("dotenv").config();

// ENV connection to MongoDB
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = http.createServer(app);

// Used to receive req.body in api
app.use(express.json({ limit: "50mb" }));

mongoose.connection.once("open", () =>
  console.log("MongoDB connection established successfully")
);

// Routes
require("./routes")(app);

const port = process.env.PORT || 5000; // Dynamic port for deployment
server.listen(port, () => console.log(`Server is running on port: ${port}`));
