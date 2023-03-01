const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      required: true,
    },
    vaccineIndex: {
      type: Number,
      enum: {
        values: [0, 1, 2, 3, 4, 5],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
    initial: {
      location: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    sequel: {
      location: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    booster: {
      location: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    emergency: {
      person: {
        type: String,
      },
      mobile: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Vaccinations", modelSchema);

module.exports = Entity;
