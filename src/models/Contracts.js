const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clients",
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: {
        values: [
          "NodeJS Developer",
          "ReactJS Developer",
          "Fullstack Developer",
        ],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
    isRegular: {
      type: Boolean,
      default: false,
    },
    expiration: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Contracts", modelSchema);

module.exports = Entity;
