const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    start: {
      type: String,
      required: true,
      trim: true,
    },
    end: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isEarly: {
      type: Boolean,
      default: false,
    },
    submittedAt: {
      type: String,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byUser = function (userId) {
  return this.where({ userId });
};

modelSchema.query.byCompleted = function (isCompleted) {
  return this.where({ isCompleted });
};

const Entity = mongoose.model("Tasks", modelSchema);

module.exports = Entity;
