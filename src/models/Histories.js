const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    dataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: {
        values: ["delete", "restore"],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byAction = function (action) {
  return this.where({ action });
};

const Entity = mongoose.model("Histories", modelSchema);

module.exports = Entity;
