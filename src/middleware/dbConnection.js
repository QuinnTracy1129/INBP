const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  // ENV connection to MongoDB
  mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () =>
    console.log("MongoDB connection established successfully")
  );
};
