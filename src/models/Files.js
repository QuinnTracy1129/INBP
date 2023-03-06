const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    access: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Files", modelSchema);

module.exports = Entity;
